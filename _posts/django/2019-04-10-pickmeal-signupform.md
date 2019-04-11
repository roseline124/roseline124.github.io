---
layout: post
title:  "[Django 스터디#6-1] 회원가입폼 (Sign Up, Join Form), class Meta"
date: 2019-04-10 23:07:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물 

<br>

<img src="/assets/images/190411_signup.PNG">*회원가입 화면*

<br>

<img src="/assets/images/190411_users.PNG">*User table에 반영된 모습*

<br>
<br>

<hr>

<br>

### forms.py 

앱 폴더에 forms.py 파일을 만들고 아래 코드 추가 

<br>

```python
from django import forms 
from django.contrib.auth.models import User #1

class UserForm(forms.ModelForm):
    class Meta: #2
        model = User 
        fields = ['username', 'email', 'password']
```

<br>


- #1 : 기존의 User 모델 import하기 
- #2 : class Meta에 model과 fields 속성에 지정. 

<br>

**class Meta**

[참고, 번역](https://www.quora.com/Why-do-we-use-the-class-Meta-inside-the-ModelForm-in-Django)

파이썬의 메타 클래스와는 다른 개념이고, django form의 class Meta는 단순히 **이름이 Meta인 내부 클래스(inner class)**이다. Meta 클래스는 ModelForm 클래스에 메타데이터를 제공하기 위해 쓰인다. 

<sub>※ Meta : Meta란 '이전의, ~에 대해서'라는 의미이다. 메타데이터는 데이터에 대한 데이터이다. 예를 들어, file이라는 데이터가 있다면, 그 file의 작성자는 누구고, 언제, 어디서 작성되었는가는 메타데이터이다.</sub>

<br>

Django의 ModelForm은 기본값을 갖고 있지만, 나만의 Form을 만들기 위해서는 아래와 같은 ModelForm의 메타 옵션을 재정의한다. 일부 옵션은 반드시 지정해야 한다. 

- model: form 만들기에 사용할 모델 클래스
- fields: form에 포함할 필드 목록
- exclude: form에서 제외할 필드 목록
- widgets: field, widget 쌍으로 된 dictionary


<br>
<br>

<hr>

<br>

### 클래스형뷰(CBV)로 구현하기  

<br>

**views.py**

<br>

```python
from django.views.generic import CreateView 
from .forms import UserForm

class UserCreateView(CreateView): #2
    form_class = UserForm 
    template_name = 'reviewBoard/signup.html'
    success_url = "/" #1
```
<br>

- #1 : data 생성이 성공한 뒤, redirect될 주소. index 페이지로 이동한다. 
- #2 : CreateView의 속성 form_class, template_name, success_url 등을 지정해줌으로써 훨씬 더 간단하게 Sign Up View를 구현할 수 있다. 

<br>
<br>

**urls.py**

```python
urlpatterns = [
    path('join/', views.UserCreateView.as_view(), name='join'),
]
```

<br>
<br>

<hr>

<br>

### 함수형 뷰(FBV)로 구현하기 

**views.py**

[참고 블로그]()

클래스형 뷰를 사용하지 않고 함수형 뷰로 구현한다면 다음과 같이 할 수 있다. 

<br>

```python
from django.contrib.auth import views, models, login
from django.shortcuts import render, redirect
from .forms import UserForm

def signup(request):
    if request.method == "POST": #1
        form = UserForm(request.POST)
    
        if form.is_valid(): #2
            new_user = models.User.objects.create_user(**form.cleaned_data) #5
            login(request, new_user)
        
        return redirect('reviewBoard:index')

    else: #3
        form = UserForm()

    return render(request, 'reviewBoard/signup.html', {'form': form}) #4
```

<br>

- #1 : template에서 form method가 'POST'인 경우. 즉, form을 작성하고, submit 버튼을 누른 경우이다. 
- #2 : form이 양식에 맞게 잘 작성된 경우, user 객체를 생성해 new_user에 저장. new_user 정보를 login() 함수에 전달해 회원가입과 동시에 로그인. 
- #3 : request method가 POST가 아니면 GET인데, 이때는 UserForm 객체를 만들어 form 변수에 저장
- #4 : #3에서 저장한 form 또는 #1에서 `form = UserForm(request.POST)`로 저장한 form 데이터를 signup.html 템플릿에 전달
- #5 : cleaned_data

<br>

**cleaned_data는 왜 쓰는 걸까?**

[참고](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Forms)

데이터를 획득하고, 기본 유효성 검사 도구를 이용해 입력값을 다듬는다(cleaned). 안전하지 않을 수 있는 입력값을 필터링하며, 해당 입력값에 맞는 표준 형식으로 변환한다.

<br>
<br>

**urls.py**

```python
urlpatterns = [
    path('join/', views.signup , name='join'),
]
```

<br>

보기에는 함수형 뷰가 좀 더 복잡해보이지만, 위의 클래스형 뷰는 정말 단순하게 구현한 경우이고, 클래스형 뷰도 얼마든지 길어질 수 있다.(다음 포스팅에서 확인 가능)

<br>
<br>

<hr>

<br>

### Template 

<br>

**signup.html**

뷰에서 지정한 signup.html 파일을 만든다. 디자인 요소는 뺐다. 트위터의 부트스트랩을 사용하면 직접 디자인해볼 수 있다.

<br>

```html
{% raw %}
{% extends 'reviewBoard/base.html' %} 
{% load static %}

{% block content %}

    <!-- #1 -->
    {% if form.errors %}
    <p style="color:red;">양식에 맞게 작성해주세요.</p>
    {% endif %}

    <!-- #2 -->
    <form method="post" action="{% url 'reviewBoard:join' %}">
    <!-- #3 -->
    {% csrf_token %} 

    <!-- #4 -->
    {{form.as_p}}

    <button type="submit"> 가입하기 </button>
    </form>

{% endblock %}
{% endraw %}
```

<br>

- #1 : form 양식이 틀린 경우 error 메시지를 보여줄 수 있다. 
- #2 : `form method="POST"`로 되어있다. 위의 함수형 뷰에서 말한 것처럼, button으로 양식을 제출했을 때 request의 method는 POST이다.
- #3 : Django는 form에는 보안상 csrf_token을 넣어야하는 것을 의무화하고 있다. form 태그 안에 태그를 넣어주기만 하면 된다. 
- #4 : form 안의 속성 as_p는 form이 가진 필드를 각각 p 태그로 감싸서 보여준다. as_table은 tb 태그를 사용한다. 


<br>
<br>

**base.html**

base.html에 join 페이지에 접근할 수 있는 링크를 삽입한다. 

```html
{% raw %}
<!-- 로그인 중 -->
{% if user.is_active %} 
    <li class="nav-item">
        <a class="nav-link" href="{% url 'login' %}">{{user.username}}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="{% url 'logout' %}">logout</a>
    </li>

<!-- 로그아웃 상태 -->
{% else %}
    <li class="nav-item">
        <a class="nav-link" href="{%url 'login' %}"> Login</a>
    </li>
<!-- 이 부분 추가 -->
    <li class="nav-item">
        <a class="nav-link" href="{%url 'reviewBoard:join' %}">Sign Up</a>
    </li>
{% endif %}
{% endraw %}
```


<br>
<br>

