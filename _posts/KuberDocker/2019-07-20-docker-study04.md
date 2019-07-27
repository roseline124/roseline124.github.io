---
layout: post
title:  "[도커 스터디#4] 도커 - 첫번째 스터디"
date: 2019-07-20 18:14:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
---

### 첫번째 스터디 

OT 이후 첫번째 온라인 스터디였다. 
각자 공부한 것을 발표하고, 모르는 건 준비해뒀다가 질문하는 방식으로 진행했다. 

<br>
<br>

<hr>

<br>

### 새롭게 배운 것

**1. 포트 연결**

[포트 연결에 오류가 났으나 스터디원들의 도움으로 해결](https://roseline124.github.io/daily-study/2019/07/17/Study-190717-docker-study03.html)했다. 

<br>

**2. `.dockerignore`** 

도커 이미지를 빌드할 때 같은 디렉터리에 있는 파일을 모두 도커 데몬(도커 API 요청 수신 및 도커 객체 관리)에 전송된다. dockerignore로 도커 이미지를 빌드할 때 필요없는 모듈을 제외할 수 있다.

<br>

**3. `CMD`** 

도커 파일 작성 시, `CMD ["nginx"]` 말고도 `CMD nginx`처럼 대괄호 없이 띄어쓰기로 작성할 수 있다.  

<br>

**4. `-f`** 

`sudo docker build -f Dockerfile_01` 처럼 도커파일의 이름이 `Dockerfile`이 아니어도 다른 이름으로 이미지를 빌드할 수 있다. 

<br>

**5. `docker search --limit 5 nginx`**

`docker search`는 도커 허브에서 이미지 파일을 찾아주는데, `--limit` 옵션을 걸면 위와 같이 nginx 관련 이미지 파일 중 가장 인기 있는 것(stars) 5개를 보여준다. 

<br>

**6. `docker image ls`** 

`docker images`와 같다. 

<br>

**7. 태그명 변경하기** 

`docker image tag 이미지명:A 이미지명:B`처럼 A태그를 B태그로 변경할 수 있다. 

<br>

**8. 내가 작성한 이미지를 외부에 공개하려면?** 

도커 허브 웹 접속 - repository 생성 - repository 이름과 맞게 태그명 변경 - `docker image push 이미지:태그`로 푸시한다.

<br>

**9. `exited (0)`** 

`docker ps -a` 명령어를 쓰면 컨테이너 상태를 볼 수 있는데, exited 옆의 괄호 안 숫자는 종료 코드를 의미한다. 종료코드는 [여기](http://blog.naver.com/PostView.nhn?blogId=alice_k106&logNo=221310477844&parentCategoryNo=&categoryNo=21&viewDate=&isShowPopularPosts=true&from=search) 잘 정리되어 있다.

<br>

**10. `docker stop`** 

도커 컨테이너 중지 

<br>

**11. `docker logs 컨테이너ID[:4]`**

도커 컨테이너 ID 앞의 4글자를 입력해서 도커 컨테이너의 로그를 확인할 수 있다. 

<br>

**12. `sudo docker run -it 이미지:태그 리눅스명령어`** 

컨테이너를 띄울 때 리눅스 명령어를 실행한다.  

<br>

가장 빨리 배우려면, 책이나 강의에서 알려주는 것만 하지말고 직접 이런 저런 명령어도 쳐보고 가지고 놀면서 배우는 게 빠르다.  


<br>
<br>


### 다음 스터디 

`도커 컴포즈`에 대해 공부하고 실습해오기 + 질문은 2개 이상 준비해오기 

<br>
<br>
