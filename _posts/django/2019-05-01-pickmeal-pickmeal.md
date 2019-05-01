---
layout: post
title:  "[Django 스터디#7-2] ORM으로 맛집 추천하기"
date: 2019-05-01 19:15:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물 


**룰렛 돌려서 한식, 중식, 일식, 양식 고르기**

- ORM은 아니다. javascript로 구현한 룰렛을 돌려서 추천한다. 
- codepen에 올려져 있는 [javascript 코드](https://codepen.io/mak1986/pen/WmZXBv)를 조금 수정했다.

<br>

<iframe width="544" height="306" src="https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=952ECA30BCFDBE40270284A486BDEC4A5DAF&outKey=V122a0e219aee710f8a089447ddd712975bbe2c498564830f03559447ddd712975bbe" frameborder="no" scrolling="no" title="NaverVideo" allow="autoplay; gyroscope; accelerometer; encrypted-media" allowfullscreen></iframe>

<br>

**ORM으로 DB에 등록된 맛집을 랜덤으로 추천하기**

- [ORM 쿡북에서 연습](https://roseline124.github.io/django/2019/04/30/pickmeal-orm.html)했던 함수 활용 

<br>

<iframe width="544" height="306" src="https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=C4727E076FFC9411E8D4F69F4E449C4A7A6A&outKey=V128da67e850bca71b2c506c4828033047f0a3eda1df2e2714ae206c4828033047f0a" frameborder="no" scrolling="no" title="NaverVideo" allow="autoplay; gyroscope; accelerometer; encrypted-media" allowfullscreen></iframe>

<br>
<br>

<hr>

<br>

### views.py

random으로 맛집을 추천하는 randFood 앱의 views.py이다. 
`django.db.models`에서 Max, Avg 등 집계 함수를 import하고,
reivewBoard앱에 있던 model들도 가져온다.

<br>

```python
from django.shortcuts import render
from django.db.models import Max, Avg
from reviewBoard.models import Review, Restaurant
import random

def get_random_restaurant():
    max_id = Restaurant.objects.all().aggregate(max_id = Max("id"))['max_id']
    while True : 
        pk = random.randint(1, max_id)
        restaurant = Restaurant.objects.filter(pk=pk).first()
        if restaurant : 
            return restaurant

def index(request):
    restaurant = get_random_restaurant()
    score_avg = Review.objects.filter(restaurant__name=restaurant.name).aggregate(Avg('score'))

    return render(request, 'randFood/index.html', {'restaurant':restaurant, 'score_avg':score_avg})
```

<br>
<br>

**무작위 데이터 추출**

- #1 : id중에서 제일 큰 수를 max_id 키에 매핑한 후 `['max_id']`로 해당 id를 가져온다. 
- #2 : randint로 1에서 max_id까지의 수(randint는 max_id까지 포함한다.) 중 하나의 수를 무작위 추출해 pk 변수에 담는다.
- #3 : filter 함수에 pk값을 인자로 전달해서 객체를 구한 후 restaurant 변수에 담는다. 
- #4 : 만약 restaurant 객체가 있다면 해당 객체를 반환하고, 존재하지 않는다면 다시 while문을 반복한다. 

<br>

```python
def get_random_restaurant():
    max_id = Restaurant.objects.all().aggregate(max_id = Max("id"))['max_id'] #1
    while True : 
        pk = random.randint(1, max_id) #2
        restaurant = Restaurant.objects.filter(pk=pk).first() #3
        if restaurant : #4
            return restaurant
```

<br>
<br>

- #1 : 위에서 만든 get_random_restaurant() 함수로 무작위 restaurant 객체를 가져온다.
- #2 : restaurant.name으로 Review 데이터를 filtering 해서 가져온다. 해당 식당의 리뷰 데이터만 가져온 후, Avg() 집계 함수로 score 필드의 값들을 평균 낸 후, score_avg 변수에 저장한다. 
- #3 : 딕셔너리 형태로 앞서 구한 데이터들을 전달한다. 

<br>

```python
def index(request):
    restaurant = get_random_restaurant() #1
    score_avg = Review.objects.filter(restaurant__name=restaurant.name).aggregate(Avg('score')) #2

    return render(request, 'randFood/index.html', {'restaurant':restaurant, 'score_avg':score_avg}) #3
```

<br>
<br>

<hr>

<br>


### urls.py 


randFood의 urls.py에 views.py의 index() 함수를 url 주소와 매핑한다.

<br>

```python 
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index' )
]
```

<br>
<br>

<hr>

<br>

### index.html

혼란스럽지 않게 하기 위해 ORM이 들어간 html 코드만 남겨두고, 나머지는 아래 코드에서 뺐다. 

<br>

```html
{% raw %}
{% extends 'reviewBoard/base.html' %}
{% load static %}

{% block content %}

<div class="container pt-5">
        <h3 class="pt-5 text-center">땡기는 게 없다구요? 이 식당은 어때요? :)</h3>

        <!-- #1 -->
        <div class="py-3 text-center alert alert-info" role="alert">
            <h4>오늘의 맛집 : <strong> {{restaurant.name}} ( {{restaurant.category}} )</strong></h4>
            <h4>평균 평점 : <strong>{{score_avg.score__avg}}</strong></h4>
            <h4>주소 : <strong>{{restaurant.location}}</strong></h4>
        </div>
        
        <!-- #2 -->
        {% if restaurant.review_set.all %}
        <h4 class="py-3 text-center">리뷰 목록</h4>

        <hr class="mb-5" style="width:200px;"> 

        <!-- #3 -->
        {% for rev in restaurant.review_set.all %}
        <div class="mt-3 container d-flex justify-content-start" >

            <!-- #4 -->
            {% if rev.photo %}
                    <a href={% url 'reviewBoard:review-detail' rev.id %}></a>
                        <img src="{{ rev.photo.url }}" alt="reviewPhoto" class="img-thumbnail rounded review-thumb">
                    </a>
                    <br>
                    {% endif %}
                        <div class="ml-3">
                          <a href={% url 'reviewBoard:review-detail' rev.id %} 
                             style="color:gray; text-decoration: none;">
                              <h2>{{ rev.title }} </h2>
                            </a>
                            
                            <p>{{rev.updated_date | date}}</p>
                            <p> 평점 : {{ rev.score }}</p>

                            <p> {{rev.review | truncatechars:100 }}</p>
                            <a href="{% url 'reviewBoard:review-detail' rev.id %} "> 자세히 보기 </a>
            </div>
        </div>

        {% endfor %}
        {% endif %}

        <br>
        <br>

</div>
{% endblock %}

{% endraw %}
```

<br>

- #1 : views.py에서 index() 함수가 템플릿에 `{'restaurant':restaurant, 'score_avg':score_avg}`로 데이터를 전달했다. 내 코드의 model 클래스를 보면 이해가 더 잘가겠지만, restaurant 데이터에 name이나 location, category 필드가 있어서 위와 같이 썼다.
- #2 : 템플릿 태그에서 `if restaurant.review_set.all` 코드로 restaurant와 관련된 review 데이터가 존재하는지 확인한다.
- #3 : 만약 있다면, restaurant와 관련된 review 데이터를 모두 가져오고 for문으로 반복변수 rev에 review 데이터를 하나씩 담는다.
- #4 : 이 코드 부분은 reviewBoard의 index.html 부분을 그대로 가져왔다. 필드의 내용을 가져오는 것뿐이다. 


<br>
<br>
<br>
