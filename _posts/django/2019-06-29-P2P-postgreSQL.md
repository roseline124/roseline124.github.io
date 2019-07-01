---
layout: post
title:  "[P2P 프로젝트#1] Windows 환경에서 django, postgreSQL 연동"
date: 2019-06-29 23:20:59
author: Roseline Song
categories: Django
tags: python django postgreSQL
cover: "/assets/django2.jpg"
---

### 개발 환경 

- Python : 3.7.2
- Django : 2.1.9
- PostgreSQL : 10.9
- psycopg2 : 2.8.3
- OS : Windows 10 

<br>
<br>

<hr>

<br>

### 밑작업

`django-admin startproject 프로젝트명 .` 으로 django 프로젝트 시작. 

<br>
<br>

<hr>

<br>

### postgreSQL 설치 

- [설치 가이드](http://www.postgresqltutorial.com/install-postgresql/)
- [PostgreSQL 설치](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows)

32비트, 64비트인지 확인하고 다운 받을 것. 

<br>

<img src="/assets/images/P2P/190629_pg_1.PNG">*자신에게 맞는 버전으로 다운*

<br>

stack builder 체크 박스 해제. stack builder는 postgreSQL 설치를 보완하는 툴, 드라이버, 다른 응용프로그램을 추가로 설치한다. 같이 설치하지 않아도 문제 없었다.

<br>

<img src="/assets/images/P2P/190629_pg_2.PNG">*stack builder 체크 해제*

<br>

port 번호는 5432 사용 

<img src="/assets/images/P2P/190629_pg_3.PNG">*port번호 설정*

<br>
<br>

<hr>

<br>

### 환경변수 설정 

postgreSQL 셸(psql)이 있는 경로를 사용자 변수에 추가한다. 성공하면 cmd 창에서 psql을 열 수 있다. 

<br>

Windows 키 + pause break -> 고급 시스템 설정 -> 환경 변수 -> 사용자 변수 -> Path 편집 -> psql.exe가 있는 폴더 경로 추가 ex) `C:\Program Files\PostgreSQL\10\bin` 

<br>
<br>

<hr>

<br>

### 데이터베이스 생성 - pgadmin4 (GUI로 하는 법)

CLI(커맨드라인에서 하는 법)은 아래에 

<br>
<br>

**접속**

windows 키 + Q (검색) -> pgadmin4 으로 접속 

<br>

<img src="/assets/images/P2P/190629_pg_4.PNG">*pgadmin4 화면*

<br>
<br>

**유저 생성**

login/Group Role 추가 

<br>

<img src="/assets/images/P2P/190629_pg_5.PNG">*create user*

<br>
<br>

**이름**

새로운 사용자의 이름 추가  

<br>

<img src="/assets/images/P2P/190629_pg_6.PNG">*이름*

<br>
<br>

**비밀번호 설정**

해당 사용자의 비밀번호 설정  

<br>

<img src="/assets/images/P2P/190629_pg_7.PNG">*비밀번호 설정*

<br>
<br>

**이름**

기본 사용자인 postgres와 같은 권한을 부여한다. 여기까지 한 후 하단의 save를 누른다. 

- 로그인할 수 있는가
- 슈퍼유저인가
- 사용자를 생성할 수 있는가
- 데이터베이스를 생성할 수 있는가
- 부모 사용자로부터 권한을 물려받는가?
- 복제 또는 백업 

<br>

<img src="/assets/images/P2P/190629_pg_8.PNG">*권한*

<br>
<br>

**데이터베이스 생성**

데이터베이스 생성

<br>

<img src="/assets/images/P2P/190629_pg_9.PNG">*createdb*

<br>
<br>

**데이터베이스 생성2**

데이터베이스 이름을 써주고, Owner에 사용자를 선택한다.

<br>

<img src="/assets/images/P2P/190629_pg_10.PNG">*createdb2*

<br>
<br>

<hr>

<br>

### 데이터베이스 생성2 (CLI로 하는 법)

[공식문서 참고](https://www.postgresql.org/docs/9.3/app-createuser.html)

<br>
<br>

**create user**

`createuser -P -s -e 사용자명`으로 슈퍼유저 생성. 그냥 유저 생성은 `createuser 사용자명`

- `-P` : 이 유저의 새로운 비밀번호 생성 
- `-s` : 이 유저를 슈퍼유저로서 생성한다.
- `-e` : 'createuser 명령을 실행하고 서버로 보내는' 명령을 실행한다. 
- `--replication` : 복제 권한 부여

<br>
<br>

**확인**

유저가 생성됐는지 확인하려면 cmd창에서 `psql postgres`명령어로 SQL 셸을 연다.

그 다음 `\du`를 입력해서 현재 사용자들을 확인한다. 

<br>

<img src="/assets/images/P2P/190629_pg_11.PNG">*유저와 권한 확인*

<br>
<br>

<hr>

<br>

### Django 연동

**settings.py 수정**

아래처럼 수정 

<br>

```python
DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': '데이터베이스이름',
            'USER': '사용자명',
            'PASSWORD':'비밀번호',
            'HOST':'127.0.0.1', # 혹은 'localhost'
            'PORT': '5432', # 혹은 ''
    }
}
```

<br>
<br>

**psycopg2 설치**

- 가상환경 실행 : `가상환경이름\Scripts\activate`
- `pip install psycopg2`로 설치
- `python -c "import psycopg2"` 실행

바이너리 파일로 다운받아서 하라는 글을 봐서 주소로 들어갔는데 접속이 안되서 그냥 설치했더니 잘만 되었다. 

<br>
<br>

**마이그레이션 및 슈퍼유저 생성**

- 마이그레이션 : `python manage.py migrate`
- django 관리자 생성 : `python manage.py createsuperuser --username 사용자명`
- `python manage.py runserver`로 테스트 서버 실행

<br>
<br>

###연동 성공

pyadmin4에서 해당 데이터베이스의 schema - Tables에서 Django와 연동되었는지 확인한다. 

<br>

<img src="/assets/images/P2P/190629_pg_12.PNG">*확인*

<br>
<br>



