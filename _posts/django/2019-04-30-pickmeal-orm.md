---
layout: post
title:  "[Django 스터디#7-1] Django ORM - or,not, 집계(aggregation), 무작위 추출"
date: 2019-04-30 22:15:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

<br>

### Django ORM CookBook

랜덤으로 맛집을 추천하는 PickMeal의 기능을 구현하기 전에 ORM CookBook으로 원하는 데이터를 가져오는 연습을 했다. 

Django ORM CookBook은 8퍼센트에서 Dev Django 행사 때 나눠준 ORM 교재이다. 나는 당시 인턴이었고, 블로그에 올릴 소재도 얻고 개발자들의 이야기도 듣고 싶어서 행사에 참석했다. 그 때는 이 교재를 볼 일이 없었지만 혹시나 싶어 기념으로 가져왔는데, 지금 와서 이렇게 잘 쓰게 될 줄을 몰랐다.

아무튼, 교재가 없어도 아래 사이트에서 확인할 수 있다. 
8퍼센트 만세 ^^

<br>

[Django ORM CookBook](https://django-orm-cookbook-ko.readthedocs.io/en/latest/)

<br>
<br>

<hr>

<br>

### ORM 연습하기 : shell

터미널에서 가상환경을 실행한 뒤 아래 명령어로 shell을 연다. shell을 연 후에는 `from 앱이름.models import *`처럼 model을 import해야 데이터를 조회할 수 있다. 

<br>

```python
>>> python manage.py shell
>>> from reviewBoard.models import * 

# 모두 조회
>>> Restaurant.objects.all()
<QuerySet [<Restaurant: 은성밥차>, <Restaurant: 일미닭갈비 한양대점>, <Restaurant: 신탕떡볶이 한양대점>, <Restaurant: 따봄>, <Restaurant: 플랜비>]>

# filtering
>>> Restaurant.objects.filter(name__startswith='은')
<QuerySet [<Restaurant: 은성밥차>]>
```

<br>
<br>

<hr>

<br>

### or, and, not 연산

<br>

**or**

```python
# or 연산 
>>> Restaurant.objects.filter(name__startswith='은')|Restaurant.objects.filter(name__startswith='신')
<QuerySet [<Restaurant: 은성밥차>, <Restaurant: 신탕떡볶이 한양대점>]>
```

<br>
<br>

**and**

```python
# and 연산
>>> Restaurant.objects.filter(name__startswith='은')&Restaurant.objects.filter(category__startswith='한')
<QuerySet [<Restaurant: 은성밥차>]>
```


<br>
<br>

**not**

`django.db.models` 에서 Q 객체를 import 한다.
물결 표시(~)로 not 연산을 한다.

<br>

```python
# not 연산
>>> from django.db.models import Q
>>> Restaurant.objects.filter(~Q(name__startswith='은'))
<QuerySet [<Restaurant: 일미닭갈비 한양대점>, <Restaurant: 신탕떡볶이 한양대점>, <Restaurant: 따봄>, <Restaurant: 플랜비>]>
```

<br>
<br>

<hr>

<br>

### 항목의 집계 구하기 

`from django.db.models import Count, Avg, Min, Max, Sum`으로 집계 함수를 import한다. 

<br>

```python
>>> from django.db.models import Count, Avg, Min, Max, Sum 

>>> Review.objects.all().aggregate(Avg('score'))
{'score__avg': 4.725}

>>> Review.objects.all().aggregate(Min('score'))
{'score__min': 3.9}

>>> Review.objects.all().aggregate(Max('score'))
{'score__max': 5.0}

>>> Review.objects.all().aggregate(Sum('score'))
{'score__sum': 37.8}
```

<br>
<br>

<hr>

<br>

### 항목을 무작위로 뽑는 법 

id가 중간에 삭제된 것들이 있기 때문에 while문으로 존재하는 객체를 찾을 때까지 계속 실행한다. 

<br>

```python 
def get_random3() : 
    max_id = Review.objects.all().aggregate(max_id = Max("id"))['max_id']
    whie True : 
        pk = random.randint(1, max_id)
        review = Review.objects.filter(pk=pk).first()
        if review : 
            return review
```

<br>
<br>

이외에 정렬, union, join, 특정 열만 골라서 조회하는 등의 방법은 맨 처음 언급한 사이트에 모두 나와있다. 


<br>
<br>