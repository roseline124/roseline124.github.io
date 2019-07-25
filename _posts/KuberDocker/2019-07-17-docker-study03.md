---
layout: post
title:  "[도커 스터디#3] 이미지 파일 만들기(nginx)"
date: 2019-07-17 18:23:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
published: true
---

### 이미지 파일 만들기 

**1. 도커 이미지 파일 생성**

vim 편집기로 도커 파일을 만든다. 도커 파일의 이름은 항상 `Dockerfile` 이어야 한다. 맨 앞의 대문자에 유의한다.

<br>

```
sudo vim Dockerfile
```

<br>
<br>

**2. 도커 파일 작성하기**

운영체제는 우분투 18.04 / nginx 웹서버를 사용하는 도커 파일을 만든다.

아래 코드에 대한 설명은 [가장 빨리 만나는 도커](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter04/02) 참고!

<sub>
※ 참고 : EXPOSE 코드와 같은 줄에 주석을 달면 오류가 생긴다</sub>

<br>

```dockerfile
FROM ubuntu:18.04
MAINTAINER Roseline <guseod24@gmail.com>

RUN apt-get update
RUN apt-get install -y nginx # install nginx web server ('yes' or 'yes'~)

VOLUME ["/data", "/etc/nginx/site-enabled", "/var/log/nginx"] 

# Open HTTP port for nginx
EXPOSE 80

WORKDIR /etc/nginx 

CMD ["nginx"] 
```

<br>

- `EXPOSE` : EXPOSE는 외부에서 내부로 접속할 때 쓸 포트 번호를 적어준다. 꼭 EXPOSE를 써주지 않아도 실행 시에 `sudo docker run -p 외부포트:내부포트`로 적어주면 잘 동작한다. EXPOSE는 default로 어떤 포트를 사용할 지 정해주는 거라고 생각하면 된다.  


<br>
<br>

**3. 빌드**

현재 디렉터리의 이미지파일을 내가 원하는 이름으로 빌드한다.
`-t`로 해당 이미지의 repository 이름을 정한다.

<br>

```
sudo docker build -t 이미지파일명 .
```

<br>
<br>

**4. 확인하기**

내 이미지 파일을 docki_01이다. ubuntu 이미지 파일을 참조하므로 ubuntu도 함께 뜬다. 

<br>

<img src="/assets/images/190717_01.png" style="width:100%;" >

<br>
<br>

<hr>

<br>

### 컨테이너 띄우기 (이미지 파일 실행)

**1. 서버 포트와 호스트 포트 연결시켜서 run**

`docker run -p 외부포트:내부포트 이미지파일명`. 외부포트 자리가 도커 파일 작성 때 EXPOSE로 명시해줬던 포트 번호이다. 외부 포트를 안써주면 외부포트를 랜덤하게 배치한다.  

<br>

```
sudo docker run -p 80:80 docki_01
```

<br>
<br>

**2. 짠! 오류! : "bind:address already in use"**

<br>

<img src="/assets/images/190717_02.png" style="width:100%;">

<br>
<br>



**3. 오류 원인**

이런 오류가 생기는 이유는 2가지가 있다고 한다.

- 로컬에서 이미 80포트를 쓰고 있거나, 
- 다른 도커 파일에서 같은 포트를 쓰는 경우이다. 이 경우는 `docker ps`로 확인하고 `sudo docker rm -f $(sudo docker ps -aq)`로 모든 컨테이너를 제거한다. 

나의 경우는 로컬에서 이미 다른 프로세스가 80포트를 쓰고 있었다. 아래 명령어로 확인한다. 

<br>

```
sudo netstat -pna | grep 80
```

<br>

'80'을 포함하는 포트 번호(80, 8000, 8080 등)를 사용하는 모든 프로그램의 이름(`-p`), 연결, 수신 대기 포트 표시(`-a`), 주소나 포트 형식을 숫자로 표현(`-n`)한다.


<br>

<img src="/assets/images/190717_03.png" style="width:100%;">

<br>

로컬의 nginx가 80번 포트로 실행 중이다. 


<br>
<br>

**4. 해결하기(실패)**

아래 명령어로 로컬 프로세스를 킬하고 다시 도커 이미지를 실행해본다. 

<sub>nginx를 다시 실행하려면 `sudo nginx` 명령어를 입력하고, `ps -ef | grep nginx`로 실행됐는지 확인한다.</sub>

<br>

```
sudo kill 27360
sudo docker run -p 80:80 docki_01 .
sudo docker ps -a 
```

<br>

<img src="/assets/images/190717_04.PNG" style="width:100%;">

<br>

결과는? 실행된다. 그런데 왜 몇 초만에 상태가 Exited(0)으로 바뀌는 걸까..? 이에 대한 해답은 이분이 잘 정리해놓으셨다.

[도커를 처음 접할 때 오는 멘붕](https://www.popit.kr/%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%B2%98%EC%9D%8C-docker-%EC%A0%91%ED%95%A0%EB%95%8C-%EC%98%A4%EB%8A%94-%EB%A9%98%EB%B6%95-%EB%AA%87%EA%B0%80%EC%A7%80/).
 
도커 컨테이너는 단지 명령만 실행하고 그 결과만 보여준다.
변화를 유지하고, exited 상대가 된 이후에도 컨테이너를 재시작하려면 아래 명령어를 입력한다. 

```
sudo docker start `sudo docker ps -q -l` && sudo docker attach `sudo docker ps -q -l`
```

<br>


<img src="/assets/images/190717_05.PNG" style="width:100%;">

그래도 안된다..! 'you cannot attach to a stopped container, start it first.'라고 뜬다. 분명 restart 명령어를 썼는데 안된다..

어떻게 해결해야할까..? 도와주세요.. 집단지성.

<br>
<br>

**5. 해결하기(성공)**

스터디원들의 집단지성으로 문제를 해결했다. 
일단 로컬에서 기존에 돌아가던 nginx를 kill할 필요도 없다.
dockerfile이 잘못된 것 같으니 `sudo docker pull nginx`으로 다른 이미지 파일을 다운받아서 실행시킨다.

<br>
<br>

다운받은 이미지 파일을 실행한다.

```
sudo docker run -d -p 81:80 nginx
```

<br>

- `-d` : 백그라운드 실행 명령을 내린다. 
- `81:80` : 80번 포트는 이미 쓰고 있으니 아래처럼 외부포트를 81번이라는 다른 포트로 정해준다. 

<br>
<br>

`sudo docker ps -a`로 확인하면 아래처럼 뜬다. 81번 포트로 내부 포트에 접속할 수 있다.

<br>

<img src="/assets/images/190720_01.png" style="width:100%;">

<br>
<br>

그 다음은 AWS 인스턴스의 보안그룹 - 인바운드 규칙에서 사용자지정 TCP에 81번 포트를 열어주면 `Public IP:81`로 접속할 수 있다. 연결 성공! 

<br>


<img src="/assets/images/190720_02.png" style="width:100%;">

<br>
<br>



