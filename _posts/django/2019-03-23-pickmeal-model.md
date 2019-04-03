---
layout: post
title:  "[Django 스터디#4-1] 웹 프로젝트 model 생성 및 마이그레이션"
date: 2019-03-23 19:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django.jpg"
---

### 웹 프로젝트 PickMeal

PickMeal은 한양대 주변 맛집 리뷰를 알려주고, 결정 장애를 겪는 사람들에게 선택에 도움을 주는 사이트이다.  

일단은 2가지 앱으로 나누었다. 랜덤으로 결정해주는 randFood 앱, 그리고 맛집 리뷰를 올리는 게시판 reviewBoard 앱. 사이트 이름처럼 리뷰는 서브 기능이고, 메인은 메뉴 선택에 도움을 주는 기능이다.

하지만 음식점을 결정해주려면 그전에 음식점에 대한 데이터가 있어야 한다. 때문에 먼저 reviewBoard 앱에 Restaurant 모델과 Review 모델을 만들었다. 


<br>
<br>

### Django 모델 

<br>

**Restaurant 모델**

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

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self) :
        return self.name 

{% endhighlight %}

<br>


<br>
<br>

**Review 모델**

사용자가 업로드할 파일들을 관리할 media 폴더 루트를 추가한다. 

<pre><code>

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

</code></pre>

<br>

{% highlight python %}

class Review(models.Model) :
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT)

    title = models.CharField(max_length=50)
    review = models.TextField()
    photo = models.ImageField(upload_to="reviewBoard/images", blank=True) # 처음 이미지를 업로드하면 media 폴더가 자동으로 생성된다.

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self) :
        return self.title

{% endhighlight %}

<br>
<br>

### 마이그레이션

reviewBoard 앱에 마이그레이션을 끝내고, createsuperuser로 관리자 계정을 만들려하는데 계속 session이 존재하지 않는다, auth가 존재하지 않는다와 같은 오류가 떴다. 

알고보니, 프로젝트 초반에 `python manage.py migrate`로 `admin, auth, contenttypes, sessions`를 프로젝트 전체에 반영해줘야 admin을 사용할 수 있었다.

<br>

{% highlight python %}

python manage.py makemigrations reviewBoard
python manage.py migrate reviewBoard

python manage.py migrate # 이걸 먼저 안해서 createsuperuser가 안됬었다.

python manage.py createsuperuser

{% endhighlight %}

<br>
<br>



