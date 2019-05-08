---
layout: post
title:  "[Django 스터디#8] Rest API"
date: 2019-05-08 19:15:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물

<br>

**rest-framework templates**

<br>

<img src="/assets/images/190508_result2.PNG">

<br>
<br>

**custom templates**

<br>

<img src="/assets/images/190508_result1.PNG">

<br>
<br>

<hr>

<br>

### Rest API

<br>

**REST란?**

REST(Representational State Transfer)는 자원 이름으로 구분하여 해당 자원의 정보를 주고 받는 모든 것을 의미한다.

예를 들어, 우리 DB에 등록된 Restaurant에 은성밥차가 있다고 하자. 우리는 식당 이름이나 데이터의 id를 url로 전달해 해당 데이터의 정보를 주고 받을 수 있다. 

`(baseURL)/api/v1/restaurants/1`은 restaurants 데이터 중 id가 1번인 데이터를 요청한다는 의미이다.


<br>
<br>

**CRUD**

HTTP Method(GET, POST, PUT, DELETE)를 통해 해당 데이터를 조회, 게시, 수정, 삭제할 수 있다. 

<sub>※HTTP URI(Uniform Resource Identifier) : 해당 데이터에 접근할 수 있는 고유한 ID. 예를 들어, 앞서 언급한 id나 slug 같이 데이터 각각을 구별할 수 있게 하는 것들.</sub>

<br>

HTTP Method | CRUD Operation
------------|---------------
POST | Create 
GET | Read 
PUT | Update
DELETE | Delete

<br>
<br>

**REST API란?**

REST API란 위에서 정의한 REST를 기반으로 데이터를 주고 받을 수 있는 서비스 API를 구현하는 것이다. 

<br>
<br>

**REST API가 필요한 이유?**

나는 교내 메이커톤에서 웨이팅 서비스를 개발할 때 사용했다. 웹 서버에서 대기자 명단 정보를 제공하고, 고객이 안드로이드 폰으로 자신의 대기 번호를 확인하는 서비스였다. 이때, 안드로이드와의 통신을 통해 django의 Rest-framework를 사용했다.

이처럼 REST API는 다른 브라우저, 안드로이드나 아이폰과 같은 다양한 디바이스와의 통신을 위해서 사용할 수 있다. 


<br>
<br>

<hr>

<br>

### setting

<br>

**rest-framework 설치**

- 가상 환경 실행 후, 
- 터미널에 `pip install django-rest-framework` 입력해 rest-framework 설치 

<br>
<br>

**settings.py에 app 추가** 

- INSTALLED_APPS 리스트에 `rest_framework` 추가 
- REST_FRAMEWORK에 딕셔너리 형태로 Rest API에 대한 설정을 할 수 있다. ex) 사용 권한, pagination 등 

<br>

```pyton
INSTALLED_APPS = [
    'randFood',
    'reviewBoard',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # 앱 추가 
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.IsAdminUser', #admin 사용자만 사용 가능하도록 제한  
    ],
    'PAGE_SIZE': 5 # pagination 크기 지정 
}
```


<br>
<br>

<hr>

<br>

### serializer 만들기 

**Serializer란?**

상대방에게 API로 데이터를 제공하기 위해 JSON, XML과 같이 범용적으로 사용되는 데이터 포맷으로 바꿔 줄 필요가 있다. 

serializer는 django의 models 객체나 querysets  데이터를 그러한 데이터 포맷으로 변환하는 역할을 한다.

<br>
<br>

**serializers.py**

- 사용할 models.py가 위치한 앱에 serializers.py 파일을 만들고 아래 내용들로 채운다. 
- rest_framework에서 serializers를 import
- serializers.ModelSerializer를 상속
- Meta 클래스에 model과 보여줄 fields를 정의한다. 

<br>

```python
from rest_framework import serializers
from .models import Restaurant, Review

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Restaurant
        fields = ('name',
                  'location',
                  'category',)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Review
        fields = ('restaurant', 
                  'id',
                  'score', 
                  'title',
                  'review',)
```

<br>
<br>

<hr>

<br>

### views.py

<br>

**import**

`rest_framework.generics`의 view를 이용하면, Create, Retrieve, Update, Delete 기능을 가진 view를 쉽게 구현할 수 있다. 

<br>

```python
# Serializer 
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import RestaurantSerializer, ReviewSerializer
import json
```

<br>
<br>

**Class Based Views**

- queryset : 이전에 배웠던 ORM을 활용해 담고자하는 queryset객체들을 담는다. 
- serializer_class : serializers.py에서 만들었던 Serializer 클래스를 써준다. 

<br>

```python
class ReviewCreateReadView(ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
```

<br>
<br>

<hr>


<br>

### urls.py

- #1 : `v1`과 같이 api 버전을 명시.  
- #2, #4 : view가 달라도 같은 이름을 지정할 수 있다. 
- #3 : 해당 뷰는 특정 데이터에 대한 Update, Delete 등의 기능을 수행하므로 `<int:pk>`와 같은 URI로 데이터를 구별한다. 

<br>

```python
urlpatterns = [
    # Rest API
    path(
        'api/v1/reviews/', #1 
        views.ReviewCreateReadView.as_view(),
        name='review_rest_api' #2
        ),
    path(
        'api/v1/review/<int:pk>/', #3
        views.ReviewReadUpdateDeleteView.as_view(),
        name='review_rest_api' #4
    ),
]
```

<br>
<br>

### REST API 확인

Url에 `(baseURL)/api/v1/review/1`과 같이 조회하고자 하는 데이터의 id를 url에 전달하면 특정 데이터를 update, delete 할 수 있는 페이지로 이동한다. 

`(baseURL)/api/v1/reviews`를 입력하면 모든 리뷰들을 확인할 수 있는 페이지로 이동한다. 

<br>
<br>
