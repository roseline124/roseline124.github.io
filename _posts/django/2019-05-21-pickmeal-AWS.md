---
layout: post
title:  "[Django 스터디#9-1] AWS 배포 - 인스턴스 생성 및 주소 연결"
date: 2019-05-21 15:20:59
author: Roseline Song
categories: Django
tags: python django aws
cover: "/assets/django2.jpg"
---

### 레퍼런스

- [아마존 웹 서비스를 다루는 기술 - 이재홍](http://pyrasis.com/book/TheArtOfAmazonWebServices/Chapter01/02)
- [AWS - 생활코딩 오픈 튜토리얼](https://opentutorials.org/course/2717)
- [AWS - Django 웹앱 배포하기](https://nachwon.github.io/django-deploy-1-aws/)

<br>
<br>

<hr>

<br>

### AWS 소개 

AWS는 클라우드 기반의 서버를 자유롭게 생성, 삭제할 수 있는 서비스이다. 월 단위 요금이 아닌 1시간 단위로 사용 요금을 받으며, 사용한 만큼만 비용을 낸다(서버가 정지 또는 삭제되면 비용을 내지 않는다).

<br>

**사이트 주소**

[아마존 웹 서비스](https://aws.amazon.com/ko/)

<br>
<br>

<hr>

<br>

### 서버 인스턴스 만들기 

<br>

**1. 콘솔 로그인**

회원 가입 후 콘솔에 로그인한다. 해외 결제 가능한 신용카드 정보를 등록하도록 하는데, 결제 가능한 카드인지 확인하기 위해 1\$가 과금될 것이다. 하지만 도로 환불되니 걱정하지 않아도 된다. 

<sub>※해당 과정 중 탄력적 IP(Elastic IP)를 EC2 서버 인스턴스에 연결하지 않으면 과금될 수 있으니 순서를 지켜 따라와야 한다. 과금 정보는 우측 상단 계정의 드롭 메뉴에서 'Billing & Cost Management'(나의 결제 대시보드)에서 확인할 수 있다.</sub> 

<br>

<img src="/assets/images/AWS_deploy/console_login.PNG">*우측 상단 : 콘솔에 로그인*

<br>
<br>

**2. EC2 가상머신 시작**

EC2(Elastic Compute Cloud)는 AWS에서 가장 기본적인 서버 인프라이다. EC2로 만드는 서버 하나하나를 서버 인스턴스라고 한다. EC2 서버 인스턴스는 가상 서버이므로 터미널, 원격 데스크톱으로 접속해서 관리한다. 

콘솔 로그인 후, '솔루션 구축'에서 'EC2를 사용하여'를 클릭해 가상 머신을 시작한다. 

<br>

<img src="/assets/images/AWS_deploy/EC2.PNG">*'솔루션 구축' - 'EC2를 사용하여' 클릭*

<br>
<br>

**3. 서버 region 선택**

우측 상단 메뉴에서 지역을 선택해, 서버 시간을 어느 지역 기준으로 설정할 건지 정한다.

<br>

<img src="/assets/images/AWS_deploy/server_region.PNG">*우측 상단 메뉴 - 지역 선택*

<br>
<br>

**5. 인스턴스 시작**

region을 선택한 후 '인스턴스 시작'을 클릭해 서버 인스턴스를 생성한다. 

<br>

<img src="/assets/images/AWS_deploy/start_instance.PNG">*인스턴스 생성 - 인스턴스 시작 클릭*

<br>
<br>

<hr>

<br>

### 서버 인스턴스 만들기 

<br>

**1. 운영체제 선택**

아마존에는 프리티어라는 것이 있는데 기준선 안에서 사용하면 무료로 이용 가능하다. 프리티어가 아닌 타입은 유료 결제가 되므로 주의한다. EC2는 프리티어에서 리눅스, 유닉스 등의 운영체제를 사용할 수 있다. 

우리는 리눅스 중에서 우분투(Ubuntu) 리눅스를 사용할 것이므로 3번째 리눅스를 선택한다. 

<br>

<img src="/assets/images/AWS_deploy/choose_OS.PNG">*프리티어 사용 가능한 운영체제 선택*

<br>
<br>

**2. 인스턴스 유형(Type) 선택**

프리티어에서 사용 가능한 유형(Type)은 t2.micro이다. 선택하고 다음 단계로 넘어간다.

<br>

<img src="/assets/images/AWS_deploy/instance_type.PNG">*t2.micro 선택*

<br>
<br>

**3. 인스턴스 유형(Type) 선택**

3단계 인스턴스 세부 정보 구성은 스킵. 프리티어 고객은 최대 30GB까지 사용 가능하므로 크기를 30으로 지정한 뒤 다음으로 넘어간다. 다음 5단계도 스킵한다. 

<br>

<img src="/assets/images/AWS_deploy/add_storage.PNG">*30GB까지 추가*

<br>
<br>

**4. 보안 그룹 구성**

- SSH : 터미널에서 들어갔을 때 연결
- HTTP : 웹브라우저에서 접속할 때 연결
- 사용자 지정 TCP : django runserver 커맨드를 내릴 때 연결되는 기본 포트 넘버 
- 소스는 위치무관으로 모두 설정 

<br>

<img src="/assets/images/AWS_deploy/security_group.PNG">*보안 그룹 구성*

<br>
<br>

**5. 키 페어 생성**

퍼블릭 키와 프라이빗 키를 사용해 서버 인스턴스에 접속한다. '새 키 페어 생성'을 선택한 후 키 페어 이름을 원하는 대로 짓는다. 그 다음 '키 페어 다운로드'를 누르면 '키페어명.pem' 파일이 다운로드 된다. 

<br>

<img src="/assets/images/AWS_deploy/09_key_pair.PNG">*key pair 다운로드*

<br>
<br>

**6. 키 페어 생성**

퍼블릭 키와 프라이빗 키를 사용해 서버 인스턴스에 접속한다. '새 키 페어 생성'을 선택한 후 키 페어 이름을 원하는 대로 짓는다. 그 다음 '키 페어 다운로드'를 눌러 '키페어명.pem' 파일을 받는다. 그 다음 '인스턴스 시작'을 누른다. 

<br>

<img src="/assets/images/AWS_deploy/09_key_pair.PNG">*key pair 다운로드*

<br>
<br>

<hr>

<br>

### 탄력적 IP

<br>

**1. 탄력적 IP**

인스턴스를 확인하면 퍼블릭 IP를 볼 수 있다. 컴퓨터를 껐다 켤 때마다 IP가 계속 변하는데, 사람들이 접속하려면 고정된 IP가 필요하다. 왼쪽 네크워크 및 보안 카테고리에서 '탄력적 IP(Elastic IP)'를 클릭한다.  

<br>

<img src="/assets/images/AWS_deploy/13_elastic_ip.PNG" style="width:300px;">*탄력적 IP(Elastic IP)*

<br>
<br>

**2. 주소 할당 및 연결**

주소 할당 후 인스턴스로 다시 이동한다. - 작업 버튼 - 주소 연결 클릭 - 인스턴스 ID를 선택 - 연결 버튼 클릭. 

서버 인스턴스와 탄력적 IP 주소를 연결하면 처음 받았던 주소가 바뀐다. 

<br>

<img src="/assets/images/AWS_deploy/17_connect_address_01.PNG" >*주소 연결*

<br>

<img src="/assets/images/AWS_deploy/18_instance_ID_01.PNG" >*인스턴스 ID 선택*

<br>
<br>

다음 포스팅에서 Putty를 통해 접속한다.

<br>
<br>
