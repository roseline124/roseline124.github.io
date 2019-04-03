---
layout: post
title:  "[Django 스터디#4-2] 웹 프로젝트 model join 및 뷰, 템플릿"
date: 2019-03-23 20:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django2.jpg"
---

### Model Join 

Restaurant 모델에는 음식점 이름, 카테고리(한식, 중식 등), 주소 정보가 있으며, Review 모델에는 제목, 리뷰, 사진 정보가 있다. 

이를 모두 한 template에 하나의 view로 보여주고 싶었다. Review 모델이 forienkey field로 Restaurant을 참조하고 있으니 Join을 생각했고, 각 모델의 데이터를 한 번에 보여줄 방법을 찾아봤다.

<br>

**모델 코드 참고**

<br>

{% highlight python %}

import PIL # Review 모델의 imagefield를 위해 추가 
from django.db import models

class Restaurant(models.Model) :
    cat_food = (
        ("한식","한식"),
        ("중식","중식"),
        ("일식","일식"),
        ("양식","양식"),
    )

    name = models.CharField(max_length=30)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=cat_food) 

    ...(생략)...

class Review(models.Model) :
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT) #참조키

    title = models.CharField(max_length=50)
    review = models.TextField()
    photo = models.ImageField(upload_to="reviewBoard/images", blank=True) # 처음 이미지를 업로드하면 media 폴더가 자동으로 생성된다.

    ...(생략)...

{% endhighlight %}

<br>
<br>

### Django ORM CookBook

8퍼센트 프로덕트팀에서 번역한 ORM CookBook을 참고했다. 

[참고: ORM CookBook](https://django-orm-cookbook-ko.readthedocs.io/en/latest/join.html)

<br>

{% highlight python %}

>>> restaurants = Review.objects.select_related('restaurant') #foreignkey 변수 이름

>>> restaurants
<QuerySet [<Review: 은성밥차 맛집 리뷰>]>

{% endhighlight %}

<br>
<br>

select_related() 함수에 Review 모델이 foreignkey로 잡은 `restaurant`이라는 이름을 인자로 전달했다. 겉보기에는 일반적인 Review 데이터를 가져온 것 같지만 SQL 문으로 보면 INNER JOIN의 결과라는 걸 알 수 있다. 

<br>

{% highlight python %}

>>> print(restaurants.query)

SELECT 

"reviewBoard_review"."id", 
"reviewBoard_review"."restaurant_id", 
"reviewBoard_review"."title", 
"reviewBoard_review"."review", 
"reviewBoard_review"."photo", 

"reviewBoard_restaurant"."id", 
"reviewBoard_restaurant"."name", 
"reviewBoard_restaurant"."location", 
"reviewBoard_restaurant"."category"

FROM "reviewBoard_review" 

INNER JOIN "reviewBoard_restaurant" 
ON ("reviewBoard_review"."restaurant_id" = "reviewBoard_restaurant"."id")

{% endhighlight %}

<br>
<br>

### 참조하는 테이블_set.all()

하지만 위 쿼리셋에서 어떤 방법을 써야 Restaurant 모델의 데이터를 가져올 수 있는지 알 수 없었다. 그래서 다른 방법을 스택 오버 플로우에서 찾았다. 

[참고: ORM CookBook](https://django-orm-cookbook-ko.readthedocs.io/en/latest/join.html)

<br>

**인터랙티브 셸에서 확인**

{% highlight python %}
>>> from reviewBoard.models import Restaurant, Review
>>> r2 = Restaurant.objects.all()
>>> r2[0].review_set.all()

<QuerySet [<Review: 은성밥차 맛집 리뷰>]>

{% endhighlight %}

참조당하는 테이블 Restaurant의 데이터 객체에서 `참조하는 테이블(소문자)_set.all()`과 같은 형태로 적어주면 관계 테이블의 데이터를 가져올 수 있다. 

<br>


**views.py**

<br>

{% highlight python %}

def index(request) :
    restaurants = Restaurant.objects.all()
    return render(request, "reviewBoard/index.html", {'restaurants' : restaurants})

{% endhighlight %}

<!-- <br>
<br>

**templates : index.html**

<br>
~~~
{% for res in restaurants %}
    <h3>{{ res.name }} | {{ r.category }}</h3>

    {% for rev in res.review_set.all %}
        <h5>{{ rev.title }}</h5>
        <p>{{ rev.review }}</p>
        {{ rev.photo }}
    {% endfor %}

{% endfor %}
~~~ -->

<br>
<br>

### 해결할 문제 

**1. media 폴더 경로 문제** : media 폴더가 프로젝트 폴더 경로에 생긴다. app 폴더의 하위에 media 폴더가 생겨야 하는데, 계속 경로가 엇갈린다. 경로가 틀리니 템플릿에서도 사진이 보이지 않는다. 

<br>
<br>

### 해결 (190327)

**[media 폴더 경로 추가하기](https://roseline124.github.io/django/2019/03/27/pickmeal-media.html)** 포스트 확인


<br>
<br>