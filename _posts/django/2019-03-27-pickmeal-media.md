---
layout: post
title:  "[Django 스터디#5-1] Media 폴더 경로 설정하기"
date: 2019-03-27 20:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django2.jpg"
---

### Media와 Static 폴더의 차이 

<br>

- static : 개발자를 위한 폴더
- media : 사용자를 위한 폴더

<br>

Static 폴더는 css파일, 이미지 파일처럼 **사이트에 필요한 정적인 파일**들을 모아놓은 것이다. 개발자가 이미지나 파일을 추가하지 않는 이상 현 상태가 계속 유지된다. 

반면, Media 폴더는 **데이터를 추가할 때** Imagefield나 Fielfield를 통해 업로드 되는 이미지나 파일들을 모아놓는다. 사용자가 사이트에서 업로드하는 파일들이 여기 모인다. 사이트 관리자가 admin 페이지에서 데이터를 추가할 때 올리는 이미지, 파일도 마찬가지이다. 


<br>
<br>


### 지난 포스트에서 해결 못한 문제 

**media 폴더 경로 문제** 

media 폴더가 프로젝트 폴더 경로에 생긴다. app 폴더의 하위에 media 폴더가 생겨야 하는데, 계속 경로가 엇갈린다. 경로가 틀리니 템플릿에서도 사진이 보이지 않는다. 

<br>
<br>

### 해결

<br>

**요약**

- 프로젝트 폴더 settings.py에 `MEDIA_URL, MEDIA_ROOT` 추가
- 프로젝트 폴더 urls.py에 `urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)` 추가
- models.py의 models.Imagefield()에 `upload_to 옵션` 추가
- view와 템플릿으로 보여주기 

<br>
<br>


**1. 프로젝트 폴더 settings.py**

settings.py에 STATIC_ROOT 코드 밑에 MEDIA_URL과 MEDIA_ROOT를 추가한다. 

<br>

{% highlight python %}

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static') #개발자가 관리하는 파일들 

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') #사용자가 업로드한 파일 관리

{% endhighlight %}

<br>
<br>

**2. 프로젝트 폴더의 urls.py**

아래 코드를 프로젝트 폴더의 urls.py에 넣어준다. 

~~~
urlpatterns += \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
~~~

<br>

**urls.py 코드**
<br>
{% highlight python %}

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('reviewBoard.urls', 'reviewBoard'), namespace='reviewBoard')),
]

urlpatterns += \\ #개행할 때 백슬래시를 써주면 다음 줄로 넘어갈 수 있다.
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
{% endhighlight %}

<br>
<br>


**3. reviewBoard의 Models.py**

<br>

- upload_to 옵션 : media 폴더 내에 어느 경로로 저장할지 설정
- 사용자가 이미지를 업로드할 때 해당 경로의 폴더들이 자동으로 생성된다. (media폴더도 생성해줄 필요 없다.)
- 사용자가 업로드한 이름이 기존 파일 이름과 겹쳐도 알아서 다른 이름으로 바뀐다. 

<br>

reviewBoard는 내 django 앱의 이름이다. models.Imagefield()에 `(upload_to="reviewBoard/images", blank=True)` 옵션을 추가한다. `upload_to`로 media 폴더 내에서도 다른 앱의 이미지와 구별할 수 있도록 경로를 정해줄 수 있다. 이렇게 설정하면 사용자에 의해 최초로 이미지가 업로드 될 때 **media폴더 안에 reviewBoard 폴더, 그 밑에 images 폴더가 자동으로 생성**된다. (ex. 'media/reviewBoard/images/xxx.jpg') 

그리고 사용자가 설정한 이미지 파일 이름이 media 폴더 내의 다른 이미지 파일 이름과 겹쳐도 알아서 이름이 바뀌기 때문에 신경쓰지 않아도 된다. 

<br>

{% highlight python %}

class Review(models.Model) :

    photo = models.ImageField(upload_to="reviewBoard/images", blank=True)

    # ...생략... 
 
{% endhighlight %}

<br>
<br>

**Review 모델 전체 코드**

{% highlight python %}

class Review(models.Model) :
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT)

    title = models.CharField(max_length=50)
    review = models.TextField()
    photo = models.ImageField(upload_to="reviewBoard/images", blank=True)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self) :
        return self.title

{% endhighlight %}

<br>
<br>

**4. View와 템플릿으로 보여주기**

\> **[View, Template으로 보여주기](https://roseline124.github.io/django/2019/03/27/pickmeal-view.html)** 포스트 확인하기!

내용이 길어져서 다음 내용은 다음 포스트로!

<br>
<br>