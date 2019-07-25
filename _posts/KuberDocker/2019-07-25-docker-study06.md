---
layout: post
title:  "[도커 스터디#6] 도커 컴포즈(Docker Compose) - Django 프로젝트 배포"
date: 2019-07-24 13:52:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
---


### 도커 컴포즈(Docker Compose)

**1. 도커 컴포즈란?**
컴포즈의 사전적 의미는 '짓다', '조립하다'이다. 도커 컴포즈는 여러 개의 컨테이너를 짓고 조립(함께 사용)하는 데 유용하다. 여러 컨테이너에 대한 옵션을 `docker-compose.yml`이라는 파일로 작성하면, `docker-compose up`이라는 한 번의 명령어로 서비스를 시작할 수 있다. 

<br>
<br>



**2. 도커 컴포즈를 사용하기 위한 Three-Step!**

1. Dockfile로 애플리케이션 환경을 정의한다.
2. 앱을 구성하는 `services`를 docker-compose.yml에 정의해서 한꺼번에 실행 가능하도록 한다.
3. `docker-compose up` 명령어로 컴포즈를 실행해 앱을 시작한다.

<br>

2번에서 말하는 `services`에는 실행하려는 컨테이너들을 정의하면 된다. 도커 컴포즈에서는 `services` 항목에 앱 구성에 필요한 컨테이너들을 여러 개 정의할 수 있다.  

또한, services 안 각 컨테이너 항목에서는 도커 이미지를 실행(run)할 때 쓰던 커맨드라인에 쓰던 여러 옵션(ex. ports)들을 적어둘 수 있다.

<br>
<br>

<hr>

<br>

### 도커 컴포즈 설치하기 

도커 컴포즈는 도커 엔진에 의존하므로 도커가 먼저 설치되어 있어야 한다. 
깔려 있다면 컴포즈를 설치하자 :)

<br>

**1. 도커 컴포즈 설치하기**

도커 컴포즈 릴리즈는 [여기서 확인](https://github.com/docker/compose/releases)하고 원하는 대로 설치하면 된다. 가장 최신이 1.24.1이기 때문에 1.24.1로 설치!

<sub>
curl 설치는 [이 포스팅 참고!](https://roseline124.github.io/kuberdocker/2019/07/17/docker-study02.html)
</sub>

<br>

```
sudo curl -L "https://github.com/docker/compose/releases/download/{도커 컴포즈 버전}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

<br>


그리고 도커 컴포즈를 실행 가능하도록 권한을 부여한다. 

<br>

```
sudo chmod +x /usr/local/bin/docker-compose
```

<br>
<br>

<hr>

<br>

### 도커 컴포즈로 Django 프로젝트 배포하기

여러 컨테이너가 가는 Django 프로젝트로 도커 컴포즈를 연습해보자. `docker-compose.yml`과 `Dockerfile-dev` 각 항목에 대한 설명은 [이 블로그](https://www.44bits.io/ko/post/almost-perfect-development-environment-with-docker-and-docker-compose#docker-compose.yml-%ED%8C%8C%EC%9D%BC)에 잘 나와있다.

**1. docker-compose.yml**

```dockerfile
version : '3.7' 

services : 
  postgre:
    image : postgres
    volumes:
      - ./docker/data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB= myfolio
      - POSTGRES_USER= test
      - POSTGRES_PASSWORD= test123
      - POSTGRES_INITDB_ARGS= --encoding=UTF-8

  django:
    build:
      context: .
      dockerfile: ./dockerfiles/Dockerfile-dev
    environment:
      - DJANGO_DEBUG= True
      - DJANGO_DB_HOST= posrgre
      - DJANGO_DB_PORT= 5432
      - DJANGO_DB_NAME= myfolio
      - DJANGO_DB_USERNAME= test
      - DJANGO_DB_PASSWORD= test123
      - DJANGO_SECRET_KEY= 세팅 파일의 시크릿키 
    ports:
      - "8000:8000"
    command:
      - python manage.py runserver
    volumes : 
      - ./:/myfolio/
```

<br>
<br>

**2. Dockerfile-dev**

```dockerfile
FROM python:3

RUN apt-get update && apt-get -y install libpq-dev

WORKDIR /myfolio
ADD ./requirements.txt /myfolio/
RUN pip install -r requirements.txt
```

**3. version**

자신이 사용하는 도커 버전에 맞게 [도커 컴포즈 파일의 버전](https://docs.docker.com/compose/compose-file/compose-versioning/)을 적어주면 된다. 도커 버전은 `sudo docker version`으로 확인 가능하다. 


<br>
<br>

**4. environments 항목에서 주의할 점**

`POSTGRES_DB = myfolio`와 같이, 변수에 띄어쓰기가 있으면 안된다. 즉, `POSTGRES_DB= myfolio`나 `POSTGRES_DB=myfolio` 처럼 space를 없애야 한다. 


<br>
<br>

**4. 에러**

```
docker-compose up -d
```

<br>

로 실행하니 아래와 같은 에러가 뜬다. 


<br>

<img src="/assets/images/190725_03.PNG" style="width:100%;">

<br>


sudo를 붙여주면 해결할 수 있다. 

<sub>
※ [스택오버플로우 참고](https://stackoverflow.com/questions/50979424/couldnt-connect-to-docker-daemon-at-httpdocker-localhost-with-docker-compose)
</sub>

<br>


```
sudo docker-compose up -d
```

<br>
<br>


**5. 또 에러..!**

나한테 왜 그러는거야..?



<img src="/assets/images/190725_04.PNG" style="width:100%;">

<br>
<br>


**6. 시도하기**

- `Dockerfile-dev` 파일에서 WORKDIR과 ADD 항목의 경로를 여러 가지로 바꿔본다 : 실패  
- `.dockerignore`에 부모 폴더를 제외시킨다 : 실패

<br>

도와주세요.. 집단지성.

<br>
<br>
