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

<sub>
※ 꼭 docker-compose.yml이라는 이름으로 지어야할까? 그렇지 않다. 원하는 이름으로 짓고, 빌드할 때 `-f` 옵션을 붙여주면 된다. ex) `sudo docker-compose -f foo.yml up -d`. 만약 이름을 따로 변경하지 않았다면 `sudo docker-compose up -d`만 써도 된다.
</sub>

**1. docker-compose.yml**

```yaml
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


**5. 에러**

```
Step 4/5 : COPY requirements.txt /myfolio/
ERROR: Service 'django' failed to build: 
COPY failed: 
stat /var/lib/docker/tmp/docker-builder670106370/requirements.txt: 
no such file or directory
```
<br>
<br>


**6. 시도하기**

- ~~Dockerfile-dev 파일에서 WORKDIR과 ADD 항목의 경로를 여러 가지로 바꿔본다 : 실패~~
- ~~.dockerignore에 부모 폴더를 제외시킨다 : 실패~~
- `requirements.txt`를 docker-compose.yml과 같은 폴더 경로에 위치시킨다 : 성공!

`/var/lib/docker/tmp/docker-builderxxxxxx.../` 폴더에 계속 requirements.txt가 없다고 나와서, docker-builder 폴더로 들어가보았다. 폴더에는 docker-compose.yml, Dockerfile-dev, myfolio프로젝트 앱 폴더가 있었다. 여기에 requirements.txt가 없다고 뜨니 여기로 파일을 옮겨볼까? 했는데 성공했다! 

※ 근데 왜 Dockerfile-dev에서 workdir로 `myfolio`를 정해줬는데, 왜 경로를 읽지 못한 걸까?

**workdir로 정하는 폴더 안에는 Dockerfile-dev와 docker-compose.yml, 그리고 코드 폴더가 같이 들어가 있어야 한다. 따라서 아래 폴더구조하면 workdir를 myfolio가 아닌 compose_ex로 했어야 한다.**

<br>

```
// 폴더 구조
compose_ex/
  docker-compose.yml
  Dockerfile-dev
  myfolio/
    requirements.txt
```

<br>

<sub>※ 폴더로 이동할 때 permission denied가 뜨면 `sudo su` 명령어로 root 권한으로 바꾼 뒤 `cd` 명령으로 폴더에 들어간다. 돌아올 때는 `sudo su ubuntu`</sub>

<br>
<br>

**7. Memory 에러 / killed**


이번엔 memory error가 떴다. requirements.txt에 있는 패키지들을 설치하는 과정에서 버퍼링이 메모리를 너무 많이 잡아먹어서 생기는 오류라고 한다. 다시 한 번 실행할 땐 되는가 싶더니 도커 exit 137코드와 함께 프로세스가 killed되었다고 나온다. 이것도 역시 메모리를 많이 잡아먹어서 docker가 아닌 로컬에서 kill시킨 것이라고 한다. 


- [스택오버플로우](https://stackoverflow.com/questions/40651796/docker-compose-memoryerror) : 메모리 에러  
- [스택오버플로우](https://stackoverflow.com/questions/50425245/how-to-trouble-shooting-docker-container-killed-with-error-code-137) : killed

<br>

<img src="/assets/images/190727_01.png">

<br>

<img src="/assets/images/190727_02.PNG">

<br>
<br>

**8. 에러 해결**

일단 이 문제를 해결하려면 AWS 인스턴스의 메모리를 늘려야 한다. (스터디장님에 따르면 '디지털오션 클라우드'에서 더 좋은 사양을 더 싼 가격에 이용할 수 있다고 한다.) 

또한, 프로세스를 kill해도 메모리가 내려가는 데에는 시간이 걸리기 때문에 이 상태에서 계속 컴포즈를 실행하면 서버가 맛이 가버린다. `AWS 인스턴스 탭 - 모니터링`에 들어가면 (세부 정보는 cloud watch) CPU, 메모리 히스토리 그래프를 확인할 수 있다. 

그렇다면, 인스턴스 복구는 어떻게 할까? `AWS 인스턴스 탭 - 작업 - 기존 인스턴스를 기반으로 시작`해서 다시 만든다. 



<br>
<br>

