---
layout: post
title:  "[도커 스터디#10] 도커 스웜 - 튜토리얼 (단일 머신에서의 배포)"
date: 2019-08-02 17:37:00
author: Roseline Song
categories: KuberDocker
tags: 도커 스터디
cover: "/assets/docker.jpg"
---

[※참고 : Docker Swarm Tutorial](https://youtu.be/m6WgX_LBtEk){: target="_blank" } <br>
[※참고 : 백기선 - 도커 Swarm과 서비스](https://youtu.be/p58k2_HMWRM){: target="_blank" } <br>
[※참고 : 도커 공식문서 - 스웜과 서비스](https://docs.docker.com/get-started/part3/){: target="_blank" }

<br>
<br>

### 싱글 머신에서의 배포 

도커 스웜은 단일 머신 또는 여러 머신에서의 배포가 가능하다. 먼저 단일 머신에서 어떻게 배포하는 지 보기 전에 관련 용어를 알고 가자. 

<br>
<br>

**1. 서비스(service)**

서버를 구성하는 데 필요한 서비스들, 서버에 배포되는 기본적인 단위들을 말한다. 서버를 postgresql과 django 어플리케이션 구성한다고 하면 여기서 서비스는 postgresql과 django가 될 것이다. 

각 서비스는 하나의 이미지를 기반으로 생성되고 동일한 컨테이너를 하나 또는 여러 개 생성할 수 있다. 

서비스 폴더는 `도커 파일`과 `배포하고자 하는 어플리케이션 프로젝트 폴더`로 구성된다. 

<br>
<br>


**2. 도커 컴포즈**

앞서 정의한 서비스들을 어떻게 배포할 지 스크립트로 작성한 파일이다. 도커 공식 문서 튜토리얼의 docker-compose.yml은 아래처럼 작성되어 있다.

`web`이라는 서비스를 배포하며, 내부적으로는 4000번 포트를 쓰고, 외부에서는 80번 포트로 접속할 수 있게 한다. `replicas: 5`는 해당 이미지를 기반으로 컨테이너 인스턴스를 5개 만들겠다는 의미이다.

<br>

```yml
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: "0.1"
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - "4000:80"
    networks:
      - webnet
networks:
  webnet:
```

<br>
<br>

**3. 참고 : docker context**

docker context는 도커를 빌드할 때 필요한 워킹 디렉토리 같은 것이다. 해당 디렉토리를 기준으로 도커가 빌드에 필요한 모든 파일을 참조한다. 

<br>

<img src="/assets/images/190802_02.PNG">*댓글 참고!*

<br>
<br>

**4. 도커 서비스 빌드하기**

아래에서 괄호는 생략하고 자신의 환경에 맞게 입력한다. 

<br>

```
docker build -t {태그명} -f {서비스폴더}/Dockerfile {빌드할 서비스폴더}
```

<br>
<br>

**5. 스웜 모드 시작**

도커 스택을 배포할 때, 커맨드는 `docker deploy` 또는 `stack deploy`를 쓰는데, 이 명령어를 쓰려면 swarm모드를 켜야 한다. `docker swarm init` 명령어를 입력하면 스웜 모드가 시작된다. 그리고 명령어를 입력한 현재 머신(현재는 내 로컬 컴퓨터)은 매니저 노드로 설정된다. 

매니저 노드가 된 현재 머신은 태스크를 실행하지 않고, 스케줄러는 다른 작업자 노드에 명령을 내린다. <br>
반대로 다른 머신에서 `docker swarm join` 을 하면 다른 머신이 그 스웜에 작업자 노드로 참여할 수 있다. 

<br>


```
docker swarm init
```

<br>
<br>

**2. 도커 스택 배포하기**

도커 스택은 우리가 각기 배포한 서비스들을 아우르는 최상위 배포 단위이다. 서비스들을 각자 배포하는 게 아니라 도커 스택을 배포함으로써 여러 어플리케이션을 한번에 배포할 수 있다. 

아래 명령어에서 `getstartedlab`은 배포할 스택의 이름을 정해준 것이다. 자신의 마음대로 정하면 된다. 

<br>

```
docker stack deploy -c docker-compose.yml getstartedlab
```

<br>
<br>

**3. 현재 서비스 확인하기**

`docker servie ls`로 레플리카를 확인할 수 있다. 또는, `docker stack services 스택명` 명령으로 스택과 관련된 모든 서비스를 확인한다. 그럼 아래처럼 뜨는데, NAME은 `앱_서비스`와 같이 구성된다.

<br>

```
docker servie ls 
docker stack services getstartedlab(스택명)

ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
bqpve1djnk0x        getstartedlab_web   replicated          5/5                 username/repo:tag   *:4000->80/tcp
```

<br>
<br>

**4. 태스크 확인하기**

위에서 확인한 서비스의 이름으로, 현재 그 서비스에 어떤 태스크가 존재하는 지 확인할 수 있다. 

<sub>※태스크 : 서비스에서 실행되는 컨테이너 하나하나를 태스크라고 한다.</sub>

<br>

```
docker service ps getstarted_web
```

<br>

**5. 로드 밸런싱 확인**

`curl -4 http://localhost:4000`를 커맨드에 입력하거나 직접 브라우저에 접속해서 호스트네임을 확인한다.

새로고침할 때마다 호스트네임이 바뀐다. 이를 통해 로드밸런싱으로 5개 태스크 중 각기 다른 하나가 요청에 응답하는 것을 알 수 있다. 

<br>

<img src="/assets/images/190802_03.PNG">*출처 : [도커 공식문서](https://docs.docker.com/get-started/part3/){: target="_blank" }*

<br>

태스크 선택은 [라운드로빈(RoundRobin) 스케줄링 방식](https://roseline124.github.io/kuberdocker/2019/08/02/docker-study12.html){: target="_blank" }으로 이루어진다. 

<br>

스택의 모든 task를 확인하려면 `docker stack ps 스택이름`을 실행한다. 각 태스크에는 고유한 ID가 있고, NAME을 보면 각 태스크에 인덱스가 있음을 알 수 있다. 

<br>

```
docker stack ps getstartedlab

ID                  NAME                  IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
uwiaw67sc0eh        getstartedlab_web.1   username/repo:tag   docker-desktop      Running             Running 9 minutes ago                       
sk50xbhmcae7        getstartedlab_web.2   username/repo:tag   docker-desktop      Running             Running 9 minutes ago                       
c4uuw5i6h02j        getstartedlab_web.3   username/repo:tag   docker-desktop      Running             Running 9 minutes ago                       
0dyb70ixu25s        getstartedlab_web.4   username/repo:tag   docker-desktop      Running             Running 9 minutes ago                       
aocrb88ap8b0        getstartedlab_web.5   username/repo:tag   docker-desktop      Running             Running 9 minutes ago
```

<br>
<br>

**6. 앱 스케일 조정**

docker-compose.yml에서 `replicas: 7`로 조정한다. 변경 사항을 반영하려면 `docker stack deploy` 명령을 다시 실행한다. 

<br>

```
docker stack deploy -c docker-compose.yml getstartedlab
```

<br>
<br>


**7. 스택 내리기**

띄웠던 스택을 내리려면 `docker stack rm 스택명` 명령을 실행한다. 

또는 스웜에서 떠나려면 `docker swarm leave --force`를 실행한다. 이 명령어는 여러 머신이 존재하는 노드에서 특정 노드를 스웜에서 제외하고 싶을 때도 사용할 수 있다. 


<br>
<br>
