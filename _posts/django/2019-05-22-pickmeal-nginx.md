---
layout: post
title:  "[Django 스터디#9-4] AWS 배포 - Nginx"
date: 2019-05-22 20:20:59
author: Roseline Song
categories: Django
tags: python django aws
cover: "/assets/django2.jpg"
---

### Nginx

"Nginx(엔진 x라 읽는다)는 웹 서버 소프트웨어로, 가벼움과 높은 성능을 목표로 한다." (출처 : [위키백과](https://ko.wikipedia.org/wiki/Nginx)) 

uwsgi로 runserver를 하지 않아도 접속할 수 있게 되었으나, 더 나아가 포트 번호 없이 클라이언트가 접속하게 하려면 Nginx로 사용자와 django 웹 서버를 연결시킨다.


<br>
<br>

<hr>

<br>

### Django웹앱과 Nginx와의 연동

**1. nginx설치**

- nginx 설치. 

<br>

```
sudo apt-get install nginx
```

<br>
<br>

**2. nginx.conf 파일 수정**

nginx.conf 파일을 수정할 때, 최고 권한이 필요하므로 앞에 `sudo`를 써준다. 

<br>

```
sudo vim /etc/nginx/nginx.conf 
```

<br>

http 태그 안에 아래 코드를 추가한다.

<sub>※ nginx upstream : Nginx 서버는 `User - Nginx - uWSGI - Django`처럼 중간 다리 역할을 한다. 사용자로부터 nginx가 받은 request를 어느 서버에 넘겨줄지 정해주는 것이 upstream이다. 아래보면 uwsgi.sock 파일을 지정해서 django의 uWSGI 서버로 request를 전달하도록 설정한다. 

</sub>

```
   upstream django {
       server unix:/home/ubuntu/(uwsgi.sock 파일 경로);
   }
```

<br>
<br>

**3. default 파일 수정**

<br>

```
sudo vim /etc/nginx/sites-enabled/default
```

<br>

server 태그 안에 다음 코드 추가한다. #1에는 manage.py가 있는 djagno 프로젝트 폴더의 경로를 써준다. 

uwsgi_pass 다음의 django는 위에서 써주었던 upstream django를 가리킨다. 

<br>


```
   location /static/ {
       root /home/ubuntu/(#1);
   }


   location / {
       include /etc/nginx/uwsgi_params;
       uwsgi_pass django; 
   }
```

<br>
<br>

**4. nginx 설정 갱신**

설정을 갱신한 후에는 포트 번호를 입력하지 않아도 IP주소나 DNS만 입력하면 접속이 가능하다. 도메인을 구입하여 IP주소를 대체하면 일반 사이트처럼 접속할 수 있다.

<br>

```
sudo service nginx reload
```

<br>

<img src="/assets/images/AWS_deploy/28_nginx.PNG">*포트번호 없이 접속 성공*

<br>
<br>

