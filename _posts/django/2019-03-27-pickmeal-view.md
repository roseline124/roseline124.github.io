---
layout: post
title:  "[Django 스터디#5-2] 함수형 & 클래스형 뷰 - 맛집 리뷰 사이트"
date: 2019-03-27 21:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django2.jpg"
---

### Media 폴더 경로 추가하기 

<br>

\> **[media 폴더 경로 추가하기](https://roseline124.github.io/django/2019/03/27/pickmeal-media.html)** 포스트 확인

<br>

리뷰 사이트에서 사용자가 업로드한 이미지와 함께 리뷰를 보여주려면 먼저 **media 폴더 경로를 추가**하고 models.py에 **imagefield를 추가**해야한다. 

※ 이전 포스트에서 다뤘으니 먼저 확인하고 오세요! :)

<br>
<hr>
<br>


### index.html

<br>

<img src="/assets/images/190328_view.PNG">

<br>
<hr>
<br>


### reviewBoard 앱의 views.py

#### 1. 함수형 뷰(Function Based View) - FBV

<br>

**리스트 뷰**


{% highlight python %}

from django.shortcuts import render, get_object_or_404 
from .models import Restaurant, Review #1

# 리뷰 리스트를 보여줄 index 뷰
def index(request) : 
    restaurants = Restaurant.objects.all() #2
    
    return render(request, 
                "reveiwBoard/review_index.html", 
                {'restaurants':restaurants}) #3

{% endhighlight %}

<br>
<br>

- #1 : Restaurant, Review 모델 import
- #2 : django ORM으로 Restaurant의 데이터 객체를 모두 가져온다. '쿼리셋'이라고 하는데 이를 restaurants 변수에 담는다. 
- #3 : 두번째 인자에는 이 데이터를 담아서 보여줄 템플릿 경로를 써주고, 세번째 인자는 위처럼 딕셔너리를 바로 전달해도 되고 전해야할 데이터가 많은 경우 아래처럼 해도 된다. render 함수에 바로 인자를 전달할 수 있으나 가독성을 위해 context 변수에 담아서 전달한다.
<br>
{% highlight python %}
context = {'one' : one,
           'others' : others,
           'another' : another,}

render(request, '템플릿 경로', context)
{% endhighlight %}


<br>
<br>

**디테일 뷰**


{% highlight python %}

# 상세 리뷰 페이지를 보여줄 detail 뷰
def detail(request, pk) : #1
    review = get_object_or_404(Review, pk=pk) #2

    return render(request, "reviewBoard/review_detail.html", {'review' : review}) #3
{% endhighlight %}

<br>

- #1 : detail뷰는 url로 넘어오는 pk를 인자로 전달 받는다. 예를 들어, review/1/ 이면 Review 데이터 중 \*pk가 1인 데이터를 찾는다. 
- #2 : url로 전달받은 pk를 id로 가지는 데이터를 찾는다. get_object_or_404() 함수를 써서, 만약 해당 pk를 가진 Review 데이터가 없으면 404를 반환한다. 만약 있다면 review 변수에 데이터가 담긴다. 
- #3 : 리스트뷰에서 설명한 것과 같다.

※ **pk(primary key)** : 해당 모델의 테이블에서 고유한 값들을 갖는 column을 말한다. 각 행을 다른 데이터와 구분해주기 위한 용도로 쓴다. 마치 현실세계의 주민등록번호 같은 역할을 한다. 이름이 같아도 주민등록번호로 구분할 수 있는 것처럼 제목이나 내용이 같아도 pk로 구분할 수 있다.

<br>
<br>

#### 함수형 뷰는 urls.py에서 어떻게 매핑할까?

- #1 : `views.뷰함수 이름`을 path() 함수의 두번째 인자로 전달한다. `name`은 template에서 url 경로를 지정해줄 때 `/review/`와 같이 하드코딩하는 대신 이름을 써서 편하게 관리할 수 있도록 해준다.

- #2 : `<int:pk>` 부분에 조회하고자 하는 데이터의 pk를 views.detail 뷰 함수에 전달해준다. 

<br>

{% highlight python %}

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"), #1
    path('review/<int:pk>/', views.detail, name="review-detail"), #2
]
{% endhighlight %}

<br>

<hr>

<br>


#### 2. 클래스형 뷰(Class Based View) - CBV 

Django에서는 함수형 뷰가 복잡해지는 것을 막고, 코드의 재활용성을 높이기 위해 자주 쓰는 뷰(ListView, DetailView, AboutView, TemplateView 등)를 미리 만들어놓은 것을 말한다. Django 개발자는 **이 generic view를 상속받아 특정 변수들에 오버라이딩** 해주면, django에서 알아서 그 뷰에 맞는 기능을 수행한다.

<br>

{% highlight python %}

from django.views.generic import ListView, DetailView #1

# 리뷰 리스트뷰
class ReviewListView(ListView) :

    model = Restaurant #2
    template_name = "reviewBoard/index.html" #3
    context_object_name = "restaurants" #4

{% endhighlight %}

<br>

- #1 : django의 generic view를 상속받기 위해 ListView, DetailView를 import한다.
- #2 : **사용할 model 지정**. 함수형 뷰에서 ORM을 사용하여 `Restaurant.objects.all()`로 Restaurant 모델의 데이터를 가져오는 것과 같다.
- #3 : 사용할 템플릿 경로를 지정해준다. 
- #4 : **context_obejct_name을 지정해주지 않으면 template에서 `obejct_list`라는 이름**으로 데이터를 가져와야 한다. 

<br>
<br>


{% highlight python %}

# 상세 페이지뷰
class ReviewDetailView(DetailView):
    model = Review #1
    template_name = 'reviewBoard/review_detail.html' #2  
    context_object_name = 'review' #3


{% endhighlight %}

<br>

- #1 : URLConf를 통해 전달 받은 pk로 특정 데이터의 record를 컨텍스트 변수(object)에 담는다. (record는 쉽게 말해 테이블의 row를 말한다.)
- #2 : 이름을 정해주지 않으면 default 값인 `<app_label>/<model_name>_detail.html`으로 설정한다.
- #3 : listView에서 설명한 것과 같다. 

<br>
<br>

#### 클래스형 뷰는 urls.py에서 어떻게 매핑할까?

- #1 : `views.뷰함수 이름`을 path() 함수의 두번째 인자로 전달한다. `name`은 template에서 url 경로를 지정해줄 때 `/review/`와 같이 하드코딩하는 대신 이름을 써서 편하게 관리할 수 있도록 해준다.

- #2 : `<int:pk>` 부분에 조회하고자 하는 데이터의 pk를 views.detail 뷰 함수에 전달해준다. 또한, 클래스형 뷰는 `as_view()` 함수로 view를 호출할 수 있는 내장 함수를 반환한다. 

<br>

{% highlight python %}

from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReviewListView.as_view(), name="index"), #1
    path('review/<int:pk>/', 
        views.ReviewDetailView.as_view(), 
        name="review-detail"), #2
]
{% endhighlight %}

<br>
<br>

템플릿은 다른 포스팅에서 다룰 예정.

<br>
<br>