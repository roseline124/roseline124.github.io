---
layout: post
title:  "[도커 스터디#6] 도커 컴포즈(Docker Compose)"
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
