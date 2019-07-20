---
layout: post
title:  "[도커 스터디#2] 개발환경 세팅 및 배포 실습"
date: 2019-07-17 17:23:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
published: true
---

### 개발 환경

- AWS EC2 <sub>※ 참고 : [EC2 인스턴스 생성하기](https://roseline124.github.io/django/2019/05/21/pickmeal-AWS.html) </sub>
- OS : Ubuntu 18.04 LTS 


<hr>

<br>

### 자동 설치 스크립트로 도커 설치하기

도커는 리눅스 배포판 종류를 자동으로 인식해 Docker 패키지를 설치해주는 스크립트를 제공한다. 

<br>

```
sudo wget -qO- https://get.docker.com/ | sh
```

<br>

-  `wget` : 인터넷에서 파일을 받을 때 사용하는 리눅스 명령어이다.
- `-O` : wget은 다운로드 경로의 마지막 슬래시 다음에 오는 단어를 파일 이름으로 한다. 여기서는 빈칸이 되니 다른 이름으로 저장하는 옵션 -O를 사용한다.
- `-q` : 출력없이 종료한다.
- `| sh` : `|`는 파이프라인, 즉 wget으로 파일을 다운받은 후 셸을 실행한다는 의미이다. 


<br>
<br>

<hr>

<br>

### 우분투에서 패키지로 도커 설치하기 

**1. repository 인덱스 갱신하기**

우분투를 포함해 리눅스 배포판들은 주요 리눅스 프로그램들을 저장소라는 곳에 한 데 모아 제공한다. 이러한 프로그램을 패키지라고 한다. 

이 저장소에 올라간 패키지들은 최신 버전이 아닌 경우가 많고, 사용자 리눅스 환경설정과 맞지 않아 설치가 되지 않는 경우가 있다. 

최신 패키지로 저장소에 있는 패키지들을 업데이트 하려면 아래 명령어를 입력한다. 

<br>

```
sudo apt update // 또는 sudo apt-get update 
```

<br>
<br>

**2. 도커 다운을 위해 필요한 패키지 설치**

```
sudo apt install apt-transport-https 
sudo apt install ca-certificates
sudo apt install curl 
sudo apt install software-properties-common
```

<br>

- `apt-transport-https` : 패키지 관리자가 https를 통해 데이터 및 패키지에 접근할 수 있도록 한다. 
- `ca-certificates` : ca-certificate는 certificate authority에서 발행되는 디지털 서명. SSL 인증서의 PEM 파일이 포함되어 있어 SSL 기반 앱이 SSL 연결이 되어있는지 확인할 수 있다.
- `curl` : 특정 웹사이트에서 데이터를 다운로드 받을 때 사용 
- `software-properties-common` : \*PPA를 추가하거나 제거할 때 사용한다.


<sub>
※ wget대신 굳이 curl을 쓰는 이유는? <br>
둘 다 웹사이트의 데이터를 다운로드 받을 수 있음. curl은 더 다양한 프로토콜 지원. 더 다양한 플랫폼에서 빌드/작동 가능. 자동 압축해제 지원. 업로드와 보내는 방법 지원. 
wget은 왼손만으로 타이핑할 수 있다! + HTTP POST 지원

<br>

※ PPA란? <br>
Personal Package Archive, 개인 패키지 저장소. 개발자가 소스코드를 업로드하면 자동으로 패키지화함. 사용자가 다운로드 받아 설치할 수 있게 해주는 소프트웨어 저장소.   


</sub>

<br>
<br>

**3. curl 명령어로 도커 다운받기**

<br>

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
```

<br>

curl 명령어의 옵션

- `f` : HTTP 요청 헤더의 contentType을 multipart/form-data로 보낸다. 
- `s` : 진행 과정이나 에러 정보를 보여주지 않는다.(--silent)
- `S` : SSL 인증과 관련있다고 들었는데, 정확히 아시는 분 있다면 댓글 부탁!
- `L` : 서버에서 301, 302 응답이 오면 redirection URL로 따라간다. 
- `apt-key` : apt가 패키지를 인증할 때 사용하는 키 리스트를 관리한다. 이 키를 사용해 인증된 패키지는 신뢰할 수 있는 것으로 간주한다. add 명령어는 키 리스트에 새로운 키를 추가하겠다는 의미이다. 

<br>
<br>

**4. repository에 경로 추가하기**

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
```

- `add-apt-repository` : PPA 저장소를 추가해준다. apt 리스트에 패키지를 다운로드 받을 수 있는 경로가 추가된다. 
- `apt update` : 저장소의 패키지 갱신

<br>
<br>

**5. 도커 설치하기**

```
apt-cache policy docker-ce
sudo apt install docker-ce
```

- `apt-cache` : 우분투에서 소프트웨어나 라이브러리를 터미널에서 검색한다. ex) apt-cache search 검색어
- `policy` : 내가 어떤 저장소를 설치했는지 보여준다. 저장소를 설치했는지 안했는지 기억이 안날 때 유용하다!


<br>
<br>

**6. 확인하기**

도커 시스템 확인하기 

```
sudo systemctl status docker
```

- `systemctl` : 리눅스에서 서비스를 등록, 삭제(mask, unmask) / 활성화, 비활성화(enable, disable) / 시작, 중지, 재시작(start, stop, restart) / 상태 확인(status) / 서비스 확인(list-units, list-unit-files)을 할 수 있는 명령어

<br>
<br>

<hr>

<br>

### Hello World

**1. Hello-World 이미지 파일 다운**

자동 설치 스크립트로 다운받았던 사람들은 hello-world 이미지 파일이 이미 있으니 다시 다운 받지 않아도 된다. 

※ `docker pull`은 [도커 허브 사이트](https://hub.docker.com)에서 이미지 파일을 가져온다. 

<br>

```
sudo docker pull hello-world
```


<br>
<br>

**2. 이미지 리스트 확인하기**

내 시스템에 어떤 이미지들이 있는지 확인하려면 `docker images`를 활용한다.

```
sudo docker images
```

<br>
<br>

**3. 컨테이너를 띄워보자**

두근두근!

<br>


```
sudo docker run hello-world
```


<br>
<br>

**4. 컨테이너 확인하기**

`docker ps -a`로 어떤 컨테이너가 띄워져있는지 확인 가능하다. 명령어로 컨테이너 ID를 확인한다.

```
sudo docker ps -a 
```

<br>
<br>

**5. 컨테이너 삭제**

`docker rm` 명령어로 현재 띄워져있는 컨테이너를 삭제할 수 있다. 컨테이너를 삭제해도 이미지 파일은 남는다. 

<br>

```
sudo docker rm 컨테이너ID
sudo docker images
```


<br>
<br>

<hr>

<br>

### References

- [AWS EC2에 도커 설치 및 도커파일로 웹 서버 구동시키기](https://www.youtube.com/watch?v=PjgukGtZDmM&list=PLRx0vPvlEmdChjc6N3JnLaX-Gihh5pHcx&index=3)
- [리눅스 wget 명령어 사용 예제](https://sisiblog.tistory.com/25)
- [wget 옵션](https://swstyle.tistory.com/23)
- [wget과 curl 차이](https://m.blog.naver.com/PostView.nhn?blogId=alkydes&logNo=220593597738&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
- [apt-transport-https](https://packages.debian.org/jessie/apt-transport-https)
- [ca-certificates](https://packages.debian.org/en/jessie/ca-certificates)
- [apt-key](https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_apt-key)
- [우분투 repository 설명](https://wnw1005.tistory.com/26)
- [우분투 apt-get 설명](https://m.blog.naver.com/PostView.nhn?blogId=sharpyoo&logNo=10084494283&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
- [apt-cache policy](https://www.reddit.com/r/linuxquestions/comments/6wplfn/what_does_the_sudo_aptcache_policy_command_do/)
- [systemd, systemctl](https://m.blog.naver.com/PostView.nhn?blogId=idrukawa&logNo=220460417974&proxyReferer=https%3A%2F%2Fwww.google.com%2F)

<br>
<br>
