---
layout: post
title:  "[도커 스터디#14] 도커 네트워크"
date: 2019-08-09 16:43:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
---


<br>

### 도커 네트워크(Docker Network)

도커 네트워크에는 Bridge, None, Host 등이 있다. (다른 네트워크는 플러그인을 설치해 사용할 수 있다) 

- Bridge는 `docker run 이미지명`
- None은 `docker run 이미지명 --network=none`
- Host는 `docker run 이미지명 --network=host`

각각의 네트워크는 위와 같이 파라미터를 전달하여 사용할 수 있다. Bridge는 default 네트워크이기 때문에 파라미터 전달 없이 사용 가능하다.

저번 시간에 공부했던 ingress, overlay 네트워크에 대해 더 정확히 이해하기 위해 각각의 네트워크를 알아보자.

<br>
<br>

<hr>

<br>


### 브릿지 네트워크

호스트에서 생성되는 컨테이너들은 기본적으로 브릿지 네트워크 안에서 연결된다. 이 컨테이너들은 172.17.x.x의 범위 내에서 각각 IP주소를 할당받고, 필요한 경우 이 내부 IP를 통해서 서로 접근할 수 있다. 반대로 동일한 브릿지에 연결되지 않은 컨테이너는 격리시키는 효과가 있다. 

브릿지 네트워크는 동일한 호스트에서 여러 컨테이너가 필요한 경우 사용한다. 만약 다른 호스트에서 실행되는 컨테이너 간에 통신이 필요하다면 Overlay Network를 사용한다. 

<br>
<br>

**1. docker0**

docker를 설치하고 `ifconfig`로 네트워크 인터페이스를 살펴보면 가상 인터페이스 `docker0`를 확인할 수 있다. 

`docker0`는 기본 브릿지 네트워크로서, 사용자 정의 브릿지 네트워크와는 달리 `-p` 또는 `--publish` 옵션으로 컨테이너를 실행할 때마다 포트를 지정해주어야 한다. (반면 사용자 정의 브릿지 네트워크에서는 내부 포트는 자동으로 서로 공유하고, 외부 포트는 하나로 고정해 일일이 지정할 필요가 없다.)

docker0의 IP주소는 172.17.x.1로 고정되어 있다. 

<br>

<img src="/assets/images/190809_01.PNG">*Bridge Network : docker0*

<br>
<br>

**2. veth**

컨테이너를 실행하면, 브릿지 네트워크에 veth를 통해 연결된다. 현재 실행 중인 3개의 컨테이너 만큼 veth가 생성되어 있다. 

※ [리눅스 Namespace와 veth 설명 참고](https://bluese05.tistory.com/28){: target="_blank" }

<br>

<img src="/assets/images/190809_03.PNG">*veth*

<br>

<img src="/assets/images/190809_02.PNG">*현재 실행 중인 컨테이너*

<br>
<br>

### 호스트 네트워크

호스트 네트워크를 사용하는 경우, 브릿지처럼 가상 네트워크 인터페이스로 독립된 네트워크를 사용하는 게 아니라 host 네트워크를 함께 공유한다. 따라서, docker0에 연결되지 않는다. 

host의 다른 프로세스나 특정 컨테이너에서 포트 번호를 쓰면, 다른 컨테이너에서는 이미 선점된 포트 번호를 쓸 수 없다. 

<br>
<br>

<hr>

<br>


### 빈 네트워크(None Network)

<br>

`sudo docker run 이미지명 --network=none`을 통해 실행한 컨테이너는 어떤 네트워크와도 연결(attached)되지 않는다. 그래서 외부 네트워크나 다른 컨테이너에서 접근할 수 없다. 이 네트워크는 스웜 모드에서는 사용할 수 없다.

<br>
<br>

<hr>

<br>

### 오버레이 네트워크

<br>

**1. 오버레이 네트워크**

여러 호스트에 각각의 브릿지 네트워크가 있다. 다른 브릿지 네트워크와는 격리된 상태이기 때문에 다른 브릿지 네트워크의 컨테이너와 통신할 방법이 없다. 이때 아래처럼 오버레이 네트워크를 사용해 모든 노드가 스웜을 통해 통신할 수 있다. 

<br>

```
sudo docker network create --driver overlay --subnet 10.0.9.0/24 오버레이-네트워크-명
```

<br>

새로 만든 컨테이너가 있다면 아래 명령어로 네트워크에 추가할 수 있다. 

<br>

```
sudo docker service create --replica 2 --network 오버레이-네트워크-명 nginx
```

<br>
<br>

**2. 단일 노드에서의 ingress network**

아래 명령어는 하나의 컨테이너만을 운영할 때는 괜찮다. 

<br>

```
sudo docker run -p 외부접속포트:내부포트 이미지명
```

<br>


그런데 스웜 모드로 운영한다고 할 때, 하나의 노드에 여러 개의 replica 컨테이너를 만든다고 하자. 이렇게 되면 여러 컨테이너가 같은 포트를 쓸 수 밖에 없는 상황이 된다. 이럴 때는 도커 스웜에서 자동으로 로드밸런서가 내장된 ingress network를 형성하고 외부 포트에서 들어오는 트래픽을 알아서 적당한 컨테이너에 리다이렉트해준다.

<br>
<br>

**3. 여러 노드에서의 ingress network**

여러 노드에서 ingress network가 형성된 경우, 마치 overlay 네트워크처럼 작동한다. 

사용자가 어떤 노드를 통해 접속해도 로드 밸런서를 통해 다른 노드의 컨테이너에 접근할 수 있다. 

만약 사용자가 접속한 노드에 장애가 있거나 컨테이너가 없는 경우 어떻게 될까? ingress network에서는 routing mesh를 통해 여러 노드 내에서 같은 IP 주소와 포트를 공유할 수 있다. 즉, 사용자가 요청하면 호스트 이름과 포트를 조합해 트래픽을 적절한 서비스로 라우팅한다. 


<br>
<br>

<hr>

<br>


### 참고

- [Kode Kloud - Docker Advanced Networking](https://youtu.be/Xxhhdo2e-DA){: target="_blank" }
- [ㅍㅍㅋㄷ - docker0와 container network 구조](https://bluese05.tistory.com/15){: target="_blank" }
- [도커 공식문서](https://docs.docker.com/network/){: target="_blank" }

<br>
<br>
