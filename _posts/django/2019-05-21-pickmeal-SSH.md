---
layout: post
title:  "[Django 스터디#9-2] AWS 배포 - puTTY로 SSH 접속하기"
date: 2019-05-21 17:20:59
author: Roseline Song
categories: Django
tags: python django aws
cover: "/assets/django2.jpg"
---

### SSH, PuTTy

AWS에서 EC2로 서버 인스턴스를 만들었다. 이제 PuTTY를 통해 서버에 원격으로 접속할 수 있다. SSH(Secure Shell)는 원격지 호스트 컴퓨터에 접속하기 위해 사용되는 인터넷 프로토콜, 보안 셸이다. 

클라이언트에서 SSH로 접속할 경우, Windows는 일반적으로 PuTTy를 사용해 접속한다. 반면, mac OS는 기본 터미널에서 ssh 명령어로 접속하면 된다. 

<br>
<br>

<hr>

<br>

### Mac

터미널 실행 후, ssh 명령어로 바로 접속한다.  `ssh -i (키 파일 이름).pem ubuntu@(서버의 탄력적 IP주소)` 입력. 

<br>
<br>

<hr>

<br>

### Windows

<br>

**1. PuTTy 설치하기**

Windows 운영체제를 사용하는 경우, [PuTTY 사이트](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)에 접속하여 PuTTY를 다운로드한다. 

<br>

<img src="/assets/images/AWS_deploy/20_putty.PNG">*운영체제에 맞는 버전 다운*

<br>
<br>

**2. PuTTygen**

PuTTYgen을 실행. key generator로 pem 파일을  변환한다. `conversions 탭 - import key - pem 파일 선택 - save private keys`

<sub>참고로, ppk(PuTTy private key) 파일을 github의 public repository에 올리지 않도록 주의한다. 해커들이 public repository의 root key들을 크롤링해서 서버를 해킹하는 경우도 있다고 한다. 해킹된 서버는 비트코인 같은 암호화폐 채굴에 사용했던 사례도 보았다. 조심, 조심.</sub>

<br>

<img src="/assets/images/AWS_deploy/21_puttykeygen.PNG">*PuTTY Key Generator*

<br>
<br>

**3. PuTTy - 인증**

생성한 키로 서버에 접속할 수 있도록 인증한다. 

- 왼쪽의 카테고리에서 `SSH - 인증(Auth) - Browse` 클릭  
- PuTTygen으로 만들었던 ppk 파일 선택

<br>
<br>

**4. PuTTy - 접속**

닫지 말고 왼쪽 카테고리에서 
- `Session 클릭 - IP 주소, 세션 이름 입력 - port 번호는 22`(SSH의 포트 번호는 22). 세션 이름은 아무거나 내키는 걸로 쓴다. 
- 세션을 save하고 Open을 누른다.
- 이후 경고창이 뜨면 Yes 버튼 클릭하고 로그인한다. 
- login as : ubuntu 입력 

<br>

<img src="/assets/images/AWS_deploy/25_host_connect_01.PNG">*SSH 접속*


<br>
<br>

<hr>

<br>

### 개발 환경 갖추기 

원격 접속한 서버에서 Django를 실행하기 위해서는 먼저 개발 환경이 갖춰져야 한다. python이 깔아야 하고, python을 깔기 위해서는 먼저 우분투 환경에서 필요한 패키지를 다운 받아야 한다. 

<br>
<br>

**1. 우분투 서버에서 필요한 패키지 다운받기**

※ sudo : 최고 관리자 권한으로 명령어 실행

```
sudo apt-get update
```

<br>

```
sudo apt-get install build-essential
```

<br>
<br>

**2. Python 설치**


```
sudo apt-get install python3
```

<br>

python 설치 확인

```
python3 -V
```

<br>

pip 설치 

```
sudo apt-get install python3-pip
```

<br>


pip 업그레이드 

```bash
sudo pip3 install --upgrade pip
```

<br>
<br>

**3. requirements.txt**

이제 우리가 만든 웹앱에 필요한 패키지를 다운받을 수 있다. SSH에서 프로젝트 폴더를 다운받기 전에 해야할 것이 있다. 해당 폴더에 requirements.txt가 없다면, 만들어두는 게 좋다. 

SSH가 아닌 **자신의 터미널에서 해당 앱에 가상환경을 실행**한 뒤 `pip freeze > requirements.txt`로 파일을 생성한다. 

<sub>requirements.txt : 해당 프로젝트를 위해 import 시켜야할 모듈들의 목록을 만들어둔 파일이다. 사용자는 이 파일을 통해 필요한 모듈들을 한 번에 다운받을 수 있다.</sub>

<br>
<br>

**4. settings.py**

프로젝트 폴더에서 settings.py로 이동해 `ALLOWED_HOST = ['*']`로 모든 IP에서 접속할 수 있도록 열어둔다. 

그런 뒤, 지금까지의 변경 내용을 원격저장소에 push한다.

<br>
<br>

<hr>

<br>

### GitHub에서 프로젝트 폴더 다운받기 

**1. deploy key 생성**

깃허브 repository를 배포(deploy)하기 위해서 2가지 키를 생성한다. 키 하나는 repository의 deploy keys에 추가하고, 다른 하나는 자기 계정의 SSH keys에 추가할 것이다. 

**SSH 터미널에서** 아래 명령어를 입력한다. 

<br>

```
ssh-keygen -t rsa
```

<br>

ssh 키를 만들 때 사용자로부터 3번의 입력을 받는데...

- 처음 질문에는 `Enter`를 친다. (어느 경로에 key를 저장할 건지 묻는 것이다.)
- 그 다음은 깃허브에서 파일을 다운받을 때 필요한 비밀번호를 입력한다. 마지막은 비밀번호 확인을 위해 한번 더 입력한다.
- 끝나면 아래와 같은 문구가 중간에 나올 것이다. `Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub.`
- 그럼 `cd .ssh`와 같이 본인 경로에 맞게 이동한다.
- `cat id_rsa.pub`으로 키를 복사한다.
- 깃허브 repository로 이동 - settings - deploy keys - ssh keys에 붙여넣기 



<br>

**2. public key 생성하기**

깃허브 repository에서 use SSH를 클릭했을 때 `You don't have any public SSH keys in your GitHub account. You can add a new public key,...`와 같이 뜬다면, 'new public key' 링크를 클릭한다. 그 다음...

- **SSH 터미널에서** `ssh-keygen -t rsa -C "깃허브이메일주소"` 명령어로 키 파일을 생성한다. 
- 생성됐는지 확인하기 위해 `ls -al ~/.ssh`명령어로 public key가 있는지 확인한다. 
- `.pub` 확장자 파일이 생겼다면 `cat ~/.ssh/해당파일이름.pub`으로 SSH 키를 확인하고 복사한다. 


<br>
<br>

**3. github에 public key 추가**

github에서 우측 상단 자기 계정 클릭 - settings - SSH and GPG keys - New SSH Key 클릭 - title은 아무거나 적고, key에 아까 복사한 SSH키를 붙여넣는다. 

<br>
<br>


**3. git clone repository**

github의 프로젝트 repository - Clone or download - Use SSH - 해당 주소 복사 

이제 SSH 터미널을 열어서 아래 명령어들을 입력한다. 

<br>

```
mkdir web
cd web
git clone 저장소주소
```

<br>
<br>
<br>

<hr>

<br>

### Django 웹앱 실행

**1. 가상환경 설치**

`ls -l`로 깃허브에서 받은 프로젝트의 폴더 이름을 확인한 뒤, **`cd 폴더이름`으로 해당 폴더로 이동**한다. 그 다음 아래 명령어로 가상환경을 설치한다.

가상환경 이름은 myvenv로 지정했다. 그 다음 가상환경을 실행시킨다. 만약 오류가 생긴다면 `virtualenv -p python3 myvenv`로 실행한다. 

```
sudo apt-get install virtualenv
virtualenv -p python myvenv
source myvenv/bin/activate
```

<br>
<br>

**2. 모듈 다운받기**

아까 만들어두었던 requirements.txt로 필요한 모듈을 한번에 다운 가능하다. 

```
pip install -r requirements.txt
```

<br>
<br>

**3. 마이그레이션**

이제 마이그레이션까지 하면 된다. 

```
python manage.py makemigrations 
python manage.py migrate
```

<br>
<br>

**4. 실행**

SSH에서는 포트 번호를 적어줘야 한다. 터미널에서는 0.0.0.0:8000 포트로 서버를 열고, 클라이언트에서는 `Elastic_IP주소(탄력적IP주소):8000`으로 접속할 수 있다. 

<br>

```
python manage.py runserver 0.0.0.0:8000
```

<br>
<br>
