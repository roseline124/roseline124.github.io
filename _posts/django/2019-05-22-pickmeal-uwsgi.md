---
layout: post
title:  "[Django 스터디#9-3] AWS 배포 - uwsgi"
date: 2019-05-22 19:20:59
author: Roseline Song
categories: Django
tags: python django aws
cover: "/assets/django2.jpg"
---

### uwsgi

파이썬 웹앱(Django, Flask)이 웹 서버와 통신하기 위한 인터페이스. request가 웹서버에 들어오면 WSGI(Web Server Gateway Interface) 서버를 거쳐 웹앱으로 전달된다. `User - WSGI - Django`와 같은 형태로 요청과 응답을 주고 받는다. WSGI를 만들기 위한 파이썬 모듈이 uwsgi이다. 

SSH에서 `python manage.py runserver 0.0.0.0:8000`으로 실행한 뒤, 접속할 수도 있으나 터미널을 끄면 접속이 불가능하다는 단점이 있다. 따라서, **uwsgi를 통해 runserver를 쓰지 않아도 서버에 접속할 수 있도록 한다.**

<br>
<br>

<hr>

<br>

### uwsgi 설정

<br>

**1. uwsgi 모듈 설치**

가상환경이 실행한 후, 모듈을 설치한다.

```
source (가상환경폴더이름)/bin/activate 
pip install uwsgi
```


<br>
<br>

**2. uwsgi.ini 파일 만들기**

uwsgi 설정 파일을 만든다.

- `vim uwsgi.ini`로 파일을 만든다.
- vi/vim 에디터에서는 `i`를 누르면 편집이 가능하다.
- `esc - :wq!`로 '저장 후 닫기'한다.

<br>

```
[uwsgi]
chdir=/home/ubuntu/(#1)
module=(#2).wsgi:application
master=True
pidfile=/tmp/project-master.pid
vacuum=True
max-requests=5000
daemonize=/home/ubuntu/(#1)/django.log
home=/home/ubuntu/(#1)/myvenv
virtualenv=/home/ubuntu/(#1)/venv
socket=/home/ubuntu/(#1)/uwsgi.sock
chmod-socket=666
```

<br>

- #1 : 프로젝트 폴더명을 써준다. 프로젝트 폴더 상위에 다른 폴더가 있으면 함께 써준다. `ex) #1 = www/프로젝트폴더이름`
- #2 : wsgi.py가 있는 폴더의 이름을 써준다. 

<br>
<br>

**※ 옵션 설명**

[uwsgi.ini 옵션 - 블로그 참고](https://nachwon.github.io/django-deploy-2-wsgi/)

- chdir : 장고 프로젝트 폴더의 경로 (manage.py가 있는 폴더)
- module : 장고 프로젝트 폴더 내 wsgi.py 파일 경로. 나의 경우, settings.py가 있는 폴더에 wsgi.py가 있어서 그 폴더명을 써주었다.
- master : 마스터 프로세스 사용 여부
- pidfile : Linux에서 실행되는 프로세스 id의 값을 담고 있는 파일 pidfile을 어느 경로에 생성할지 설정한다.
- socket : uwsgi.sock 파일을 어느 경로에 생성할지 설정
- chmod-socket : 소켓으로 접근하는 사용자가 서버에서 어떤 권한을 가질지 설정한다. 

<br>

<sub>※ SUID, SGID : 유닉스 시스템에서 파일에 대하여, 다른 계정과 그룹의 권한을 일시적으로 빌려주는 것이다.</sub>

<sub>chmod로 사용자 권한을 부여할 때, 숫자를 통해 어느 범위까지 권한을 부여할지 지정할 수 있다. 자신은 4, 그룹은 2, others는 1로 권한을 부여한다. 이 1,2,4를 더하면 1~7까지 만들 수 있다. 단, 0은 허가를 내리지 않은 것이다. 위의 666권한은 2+4이므로 사용자와 그룹에 대하여 쓰기, 읽기 권한을 설정한다.</sub>

<br>
<br>

**3. 설정파일 지정**

터미널에 아래 명령어를 입력해 uwsgi 설정 파일을 지정한다. `source 가상환경폴더명/bin/ activate`로 가상환경을 먼저 실행해야 한다. 

설정 파일이 잘 지정되었다면 `ls -l`로 확인했을 때, `uwsgi.sock` 파일을 확인할 수 있을 것이다.

<sub>나중에 오류가 생긴다면 ini파일을 편집했을 때 Django 프로젝트 폴더(manage.py가 있는 폴더)명을 정확히 적어주었는지 오타나 경로를 확인한다.</sub>

<br>

```
uwsgi --ini (설정파일이름).ini
```

<br>

우리는 위에서 `wsgi.ini`로 지정했으므로 `uwsgi --ini uwsgi.ini`라고 쓰면 된다. 

<br>
<br>

다음은 Nginx.

<br>
<br>
