---
layout: post
title:  "[도커 스터디#5] 서버/컨테이너 중지 오류 해결 - foreground, background"
date: 2019-07-24 13:52:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
published: true
---

### 오류 

우분투에 nginx를 사용하는 이미지를 빌드하고 컨테이너를 실행하는데, [컨테이너가 계속 중지되는 상황](https://roseline124.github.io/kuberdocker/2019/07/17/docker-study03.html)이 발생했다. 스터디에서는 도커 허브에서 nginx 이미지 파일을 받아 실행하는 방법으로 해결한 후, 이미지 파일에 문제가 있는 것 같으니 확인해보라는 조언을 해주셨다. 그래서 도커 파일을 다시 보았다!

**foregroud, background 설명이 더 궁금한 사람들은 [여기](#도커에서-foreground와-background-실행) 클릭**

<br>
<br>

<hr>

<br>

### 해결 

**1. 이전 Dockerfile**

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
<br>

**2. 이미지 삭제**

기존 이미지를 삭제하고 수정된 이미지를 빌드하기 위해서 이미지를 삭제한다.
이미지 삭제할 때는 이미지에 종속된 컨테이너를 삭제해야 하는데, 컨테이너 상관 없이 이미지 파일을 삭제하고 싶다면 `-f` 옵션을 붙이면 된다. 

<br>

```
// 도커 이미지 목록을 확인한다.
sudo docker images // 또는 sudo docker image ls 

// Option1 : 컨테이너 삭제 후 도커 이미지 삭제
sudo docker ps -a
sudo docker stop 컨테이너ID // 실행 중이라면 컨테이너 실행을 중지시킨다.
sudo docker rm 컨테이너ID 
sudo docker rmi 이미지ID

// Option2 : 컨테이너 상관없이 도커 이미지 삭제 
sudo docker rmi -f 이미지ID
```

<br>
<br>



**3. 수정 후 Dockerfile**

\#1과 #2가 추가됐다.

- #1 : `daemon off`는 nginx 서버를 foreground에서 실행할 수 있게 해준다. 이 명령어가 없으면 컨테이너를 실행할 때 `-d`를 붙여도 서버가 중지된다. 
- #2 : `chown`은 파일 소유자 권한을 부여하는 명령어이다. `/var/lib/nginx` 디렉터리에 대한 소유권을 www-data에 부여한다. 사실 이번 오류와는 상관 없지만, 보안을 위해서는 추가해두면 좋다고 한다. ※ [kldp 참고](https://kldp.org/node/141854)

<br>

\#1에 대해서는 [아래](#도커에서-foreground와-background-실행)에서 더 자세히 보자.


<br>

```dockerfile
FROM ubuntu:18.04
MAINTAINER Roseline <guseod24@gmail.com>

RUN apt-get update
RUN apt-get install -y nginx 
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf #1
RUN chown -R www-data:www-data /var/lib/nginx #2


VOLUME ["/data", "/etc/nginx/site-enabled", "/var/log/nginx"] 

# Open HTTP port for nginx
EXPOSE 80

WORKDIR /etc/nginx 

CMD ["nginx"] 
```

<br>
<br>

**4. dockerfile 빌드**

```
sudo docker build -t 이미지파일명 . // 도커 이미지 파일 생성
sudo docker imgages // 이미지 파일 목록 확인
```


<br>
<br>

<hr>

<br>

### 도커에서 foreground와 background 실행

<br>

**1. 도커 컨테이너 실행**

```
sudo docker run -d -p 외부포트:내부포트 이미지파일명  
```

<br>

`-d` 옵션은 도커 컨테이너 실행을 background로 한다는 의미이다. background는 프로세스를 계속 실행시키면서도 다른 프로세스를 실행시킬 수 있다. 즉, 도커 컨테이너를 실행 중인 상황에서 다른 명령을 실행할 수 있다.

그런데, 수정하기 이전 dockerfile에서 컨테이너를 실행할 때도 `-d` 옵션을 썼는데 nginx 서버가 중지 됐던 걸까? **nginx 서버를 foreground로 돌리지 않으면 컨테이너를 background로 실행해도 컨테이너 안의 서버가 실행이 안된 상태이기 때문에** 컨테이너가 상태가 exited가 된다.

그래서 `daemon off`로 foreground로 계속 실행 중인 상황으로 만들어주었기 때문에 수정 후 이미지 파일을 실행시켰을 때는 정상적으로 서비스 되었다.


<br>
<br>

**2. foreground 실행 - 컨테이너 exited**

`-d` 옵션을 주지않으면 foreground로 실행된다. foreground는 하나의 명령이 실행되고 있는 동안에는 다른 명령을 실행할 수 없다. 아래 사진은 foreground 상태로 컨테이너를 실행시킨 상태이다. 

<br>

<img src="/assets/images/190725_01.png" style="width:100%;">

<br>


따라서, 다른 명령을 실행하기 위해서는 foreground로 실행 중인 프로세스를 중지하고, 명령을 실행한 후 다시 프로세스를 시작해야 한다. 

컨테이너 상태를 확인하기 위해 `sudo docker ps -a` 명령을 쳐야 하고,
이 명령을 실행하기 위해서는 컨테이너가 중지된다. 그래서 막상 컨테이너 상태를 확인하면 exited인 상태가 나온다. 

<br>
<br>

**3. background 실행**

아래 사진은 `-d` 옵션을 주어 background로 실행시킨 상태이다. nginx 서버를 foreground로 돌리고 있다는 가정 하에 컨테이너를 background로 실행시키면 잘 돌아간다. 

- #1 : foreground로 실행시킨 후 `sudo docker ps -a`로 확인하면 exited가 뜬다.
- #2 : background로 실행시키면, 컨테이너가 실행되고 있는 상태에서 `sudo docker ps -a`로 확인할 수 있다.

<br>

<img src="/assets/images/190725_02.png" style="width:100%;">

<br>
<br>

