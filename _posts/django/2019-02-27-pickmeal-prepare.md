---
layout: post
title:  "[Django 스터디 준비#2-2] MTV 패턴 공부하면서 궁금했던 내용 정리"
date: 2019-02-27 19:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django.jpg"
---

### 믹스인 클래스​

인스턴스를 만드는 용도보다는 다른 클래스에게 부가기능을 상속시키기 위한 용도로 만들어진다.

여러 클래스를 다중 상속하여 꼭 필요한 메서드를 묶어 믹스인 클래스로 만든다.

제네릭 뷰는 이런 믹스인 클래스를 상속하여 코드의 재사용을 높인다. 

<br>
<br>

<hr>

<br>

### 왜 독립적으로 프로그램을 개발해야 할까?

한 파일 안에서 디자인, 그리고 시스템을 컨트롤하는 코드를 작성한다고 해보자. 서로의 코드에서 겹치는 부분이 생겨 유지보수가 불편하고 하나의 수정 사항이 생길 때마다 다른 개발자가 작업을 완료하길 기다려야 한다. 따라서, 독립적인 공간을 마련하여 프로그램을 개발할 수 있도록 한다. 이 파트들은 각각의 역할을 수행하는데 model, template, view 이다.  

<br>
<br>

<hr>

<br>

### urls.py에서 url과 path 의 차이 

url vs path 기능은 같지만,  url에는 정규표현식을 적어줘야 하고, path에는 경로를 적어주면 된다. path는 django 2.0부터 사용 가능하다.

<br>
<br>

<hr>

<br>

### url conf란?

- settings.py에 최상위 URLConf 모듈을 지정
- 특정 URL과 뷰 매핑 list
- Django 서버로 Http 요청이 들어올 때마다, URLConf 매핑 List 를 처음부터 끝까지 순차적으로 훝으며 검색
- 매칭되는 URL Rule 을 찾지못했을 경우, 404 Page Not Found 응답을 발생
- settings.py에서 urlconf가 참고하고 있는 urls.py 파일을 확인할 수 있다. 

<br>

```python
ROOT_URLCONF = 'mysite.urls' # 프로젝트/urls.py 파일
```

<br>
<br>
