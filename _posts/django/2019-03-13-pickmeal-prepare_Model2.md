---
layout: post
title:  "[Django 스터디 준비#3-2] Model 만들기"
date: 2019-03-13 19:35:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django.jpg"
---

### 참고 

- [Django 공식 문서](https://docs.djangoproject.com/es/2.0/ref/models/fields/#field-types)
- [초보 몽키 블로그](https://wayhome25.github.io/django/2017/03/20/django-ep5-model/)

<br>
<br>

<hr>

<br>


### 전체 코드 

<br>

```python
from django.db import models

class ReadingList(models.Model) :

    BOOK_SCORE = ( 
        ('Awesome', 'Awesome'),
        ('Boring', 'Boring'), 
        ('Choigo', 'Choigo'),
        ('Hell', 'Hell'),
    )

    #책 제목 
    title = models.CharField(max_length=50)

    #서평 
    review = models.TextField(help_text="가차없이 적어라!!")

    #평점
    score = models.CharField(
        max_length=15,
        choices=BOOK_SCORE,
        default='Awesome',
    )

    #책 정보
    book_info_url = models.URLField() #url이라고 바꿔주기 

    #시작일, 완독일
    start_date = models.DateTimeField(blank=True, null=True) 
    finished_date = models.DateTimeField(
        auto_now_add=True) #편집 불가. 자동으로 오늘 날짜로 맞춘다. #편집 가능하고, 오늘 날짜로 하고 싶으면 datetime.now()를 쓸 것.

    def __str__(self) : 
        return self.title 
    
class Book(models.Model) :

    # title = models.OneToOneField(ReadingList, on_delete=models.CASCADE)
    title = models.ForeignKey('ReadingList', on_delete=models.CASCADE)
    writer = models.CharField(max_length=50)
    plot = models.TextField(help_text="줄거리")
    published_year = models.DateTimeField(blank=True)

    def __str__(self) :
        return '%s :  %s ' % ( self.title, self.writer)
```

<br>
<br>

<hr>

<br>

### 코드 설명 

**1. 모델의 클래스 이름은 항상 '단수'로 한다.**

Django는 admin 첫 페이지에서 모델명을 나타낼 때, 모델명에 s를 붙여 복수형으로 나타낸다.

내가 만약, Project라는 모델 클래스를 만들면, admin에서는 projects와 같이 복수형으로 띤다.

따라서, projectss 처럼 나타나는 걸 방지하기 위해 '단수'로 입력한다. 

<br>

```python
class ReadingList(models.Model) :
```

<br>
<br>

**2. verbose_name**

: 필드 레이블. 지정되지 않으면 필드명이 쓰인다.

<br>

```python
content = models.TextField(verbose_name='내용')
```

<br>
<br>


**3. 마이그레이션**

Model 을 추가한 뒤에는 마이그레이션 과정을 거친다. 

<br>

```python
{%raw%}
(가상환경) 폴더 경로>python manage.py makemigrations
Migrations for 'myblog':
  myblog\migrations\0001_initial.py
    - Create model ReadingList


(가상환경) 폴더 경로>python manage.py migrate myblog
Operations to perform:
  Apply all migrations: myblog
Running migrations:
  Applying myblog.0001_initial... OK
{%endraw%}
```

<br>
<br>

**4. 관리자 계정이 없다면 생성해주어야 한다.**

password 부분은 원래 무엇을 입력하든 보이지 않는다.

<br>

```python
(가상환경) 폴더 경로>python manage.py createsuperuser
사용자 이름 (leave blank to use '-'):
이메일 주소: user@gmail.com
Password:
Password (again):
Superuser created successfully.
```

<br>
<br>

**5. 그리고 admin.py에 모델 추가**

그럼 127.0.0.1:8000/admin 에서 확인 가능하다.

<br>

```python
from django.contrib import admin
from .models import ReadingList

# Register your models here.
admin.site.register(ReadingList)
```

<br>

<img src="/assets/images/190313_result.png">

<br>
<br>
