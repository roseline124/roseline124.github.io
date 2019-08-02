---
layout: post
title:  "[도커 스터디#11] 도커 스웜 - 튜토리얼 (여러 머신에서의 배포)"
date: 2019-08-02 17:37:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
---

[※참고 : Docker Swarm Tutorial](https://youtu.be/m6WgX_LBtEk){: target="_blank" } <br>
[※참고 : 백기선 - 도커 Swarm과 서비스](https://youtu.be/p58k2_HMWRM){: target="_blank" } <br>
[※참고 : 도커 공식문서 - 스웜](https://docs.docker.com/get-started/part4/){: target="_blank" }

<br>
<br>

### 여러 머신에서의 배포 

저번 포스팅에서는 단일 머신(로컬 컴퓨터)에서 스웜 모드를 이용하는 튜토리얼을 다뤘다. 이번에는 여러 머신에서 스웜을 이용하는 튜토리얼을 공부한다. 

<br>
<br>

**1. 여러 개의 가상 머신 띄우기**

아래 명령어로 virtualbox 가상 머신을 두 개 띄운다. 

<br>

```
docker-machine create --driver virtualbox myvm1
docker-machine create --driver virtualbox myvm2
```

<br>
<br>

**2. 가상 머신의 ip 주소로 스웜 모드 명령 보내기**

`docker-machine ls`로 매니저 노드로 만들 가상 머신의 ip를 확인한다. 

<br>

```
docker-machine ls
```

<br>

도커 머신을 매니저 노드로 만들기 위해 해당 가상머신에서 `docker swarm init` 명령을 내린다. 이때 가상머신으로 명령을 보내기 위해 `docker machine ssh 가상머신이름 "명령문"`을 사용한다.

```
docker-machine ssh myvm1 "docker swarm init --advertise-addr <myvm ip>"
```

<br>
<br>

**3. 작업자 노드 추가하기**

2번에서 `docker swarm init` 명령어를 치면 아래 같은 안내문이 뜬다. 

docker 스웜에 작업자를 추가하고 싶으면 `docker swarm join --token ...토큰... ip주소:포트`를 입력하라~~. 그대로 복사해서 입력하면 된다. 

현재 도커 머신들 중 어느 것이 매니저 노드인지 확인하고 싶다면 아래 명령어를 입력한다. 별표 표시가 되어있는 것이 매니저 노드이다. 

<br>

```
docker-machine ssh "docker node ls"
```

<br>

특정 노드를 스웜에서 해고하고 싶으면 `docker-machine ssh 머신이름 "docker swarm leave"`를 입력한다. 


<br>
<br>

<hr>

<br>

### 도커 머신으로 들어가기 

앞에서는 계속 `docker-machine ssh` 명령어로 머신들에게 명령을 내렸다. 그런데 매번 치려니 귀찮다. 이 명령어를 입력하지 않고, 현재 쉘을 가상 머신의 도커와 연결시키려면 어떻게 할까? 

<br>
<br>


**1. 연결하기**

`eval $(docker-machine env myvm1)`으로 해당 머신에 들어간 것처럼 명령을 내릴 수 있다. 

<br>

```
eval $(docker-machine env myvm1)
```

<br>
<br>

**2. 배포하고 노드 확인하기**

스택을 배포하고 `docker stack ps`로 현재 스택을 확인한다. 

<br>

```
docker stack deploy -c docker-compose.yml getstartedlab
docker stack ps
```

<br>

그럼 myvm1, myvm2 각각에 태스크가 할당된 것을 볼 수 있다. 참고로 매니저 노드에게도 태스크가 할당 된다. 
즉, 매니저, 작업자 노드 둘다에게 배포할 수 있다.

<br>

<img src="/assets/images/190802_01.PNG">*출처 : 백기선 개발자님 유튜브*

<br>

*스터디 질문! 위 사진은 유튜브에서 가져왔습니다. myvm1은 매니저 노드입니다. 매니저 노드에도 태스크가 할당되어 있습니다. 할당만 되고 직접 실행은 하지 않는 걸까요? 뭘까요?*

<br>
<br>

**3. 확인하기**

`curl -4 http://localhost:4000`를 커맨드에 입력하거나 직접 브라우저에 myvm1 또는 myvm2의 아이피 주소를 입력하면 앱을 확인할 수 있다.

<br>
<br>

**4. 도커 스택 내리기**

<br>

```
docker stack rm getstartedlab
```

<br>
<br>

**5. 연결시킨 가상머신 떼어내기**


그리고 아까 연결시켰던 환경을 떼어내려면 `eval $(docker-machine env -u)` 명령어를 실행한다.

<br>

```
eval $(docker-machine env -u)
```

<br>
<br>

**6. 가상 머신 정지시키기**

가상 머신도 내리려면?

<br>

```
docker-machine stop myvm1
docker-machine stop myvm2
```

<br>
<br>
