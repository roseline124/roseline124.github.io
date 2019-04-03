---
layout: post
title:  "[Django 스터디#5-3] 로그인, 로그아웃 뷰(Login, Logout View)"
date: 2019-04-03 15:07:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django2.jpg"
---

### Login.html 

만들어볼 login.html의 모습. 참고로 template을 손보기 [이전 모습](https://roseline124.github.io/daily-study/2019/04/01/Study-190401.html)은 여기 페이지에서 볼 수 있다. 아래처럼 디자인하려면 bootstrap을 이용한다.

<br>

<img src="/assets/images/190403_login.PNG">*Django Login Page*

<br>
<br>

<hr>

<br>


### 프로젝트 폴더의 urls.py

※ 참고 : [Django 공식문서](https://docs.djangoproject.com/en/2.1/topics/auth/default/#module-django.contrib.auth.views)

<br>

프로젝트 폴더의 urls.py의 urlpatterns에 accounts의 url 경로를 추가한다. 

<br>

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 추가하지 않으면 login 페이지에 접근할 수 없다.
    path('accounts/', include('django.contrib.auth.urls')),  
    ...(생략)...
]
```

<br>

**Django accounts 템플릿**

**auth.urls를 include하면 다음과 같은 url들이 포함**된다. 목록에 있는 것들을 원하는 대로 쓸 수 있다. 이 포스팅에서는 login, logout을 활용한다. 

```python
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
```

<br>
<br>

<hr>

<br>

### 앱 폴더의 urls.py

<br>

```python
from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name="login"),
    path('logout/', auth_views.LogoutView.as_view(), name="logout"),
    ...(생략)...
]
```

<br>

`from django.contrib.auth import views as auth_views`를 추가해야 Django auth에 내장되어 있는 LoginView, LogoutView를 사용할 수 있다. 따라서 앱 폴더의 views.py에서 따로 코드를 작성할 필요가 없다. 

 `as auth_views`로 alias(별칭)을 주는 이유는 앱 폴더 내에 있는 views.py와 충돌하지 않도록 다른 이름을 사용한 것이다. 


<br>
<br>

<hr>

<br>

### Template 덮어쓰기 

위의 view까지만 추가하면 관리자 페이지에 로그인할 때 나오는 페이지를 사용한다. template을 커스터마이징하고 싶다면(아마 대부분 그럴 것이다) `login.html, logged_out.html` 파일을 추가해주면 된다.

※ 주의 : 템플릿을 덮어쓸 때 **login.html, logged_out.html**이라는 이름을 그대로 유지한다.

<br>
<br>


**registration 폴더**

앱 폴더의 templates 하위 폴더에 registration 폴더를 만들고, login.html, logged_out.html 파일을 저장한다. myblog와 같이 templates 폴더 내에 있는 앱 이름의 폴더에는 base.html, index.html 등 개발자가 만든 템플릿을 저장한다. 

<br>

※ templates 폴더 안에 앱 이름과 같은 폴더를 한 번 더 만드는 이유? 

Django는 Templates 폴더 경로를 따로 지정해주지 않는 이상 **각 앱에 있는 Templates 폴더를 찾는다**. 이때, 폴더 이름이 다 Templates이므로 Django가 어느 앱의 Templates 폴더인지 알 수 없으므로 **각 앱의 템플릿 폴더를 구분해주기 위해** 같은 이름의 폴더를 한 번 더 만들어 템플릿 파일을 저장하는 것이다. 

<br>

```bash
└─myblog(앱 이름)
    ├─templates
    │  ├─registration # 계정 관련 template 파일 저장
    │  └─myblog # 개발자가 만든 template 파일 저장
    └─...
```

<br>
<br>


**가장 간단한 형태의 login.html**

<br>

```html
<ul>
{% raw %}{% if user.is_active %}{% endraw %} 
    <!--로그인 상태면 아이디 / logout 이 뜨고-->
    <li><a href="{% raw %}{%url 'login' %}{% endraw %}">{{user.username}}</a></li>
    <li><a href="{% raw %}{% url 'logout' %}{% endraw %}">Logout</a></li>
{% raw %}{% else %}{% endraw %} 
    
    <!--로그인 상태가 아니면 login / admin이 뜬다.-->
    <li><a href="{% raw %}{% url 'login' %}{% endraw %}"> Login</a></li>
    <li><a href="{% raw %}{% url 'admin:index' %}{% endraw %}">Admin</a></li>
{% raw %}{% endif %}{% endraw %}
</ul>
```

<br>
<br>


**가장 간단한 형태의 logged_out.html**

```html
    <h2> Good Bye. </h2>
    <p><a href="{% raw %}{%url 'login'%}{% endraw %}">
        다시 로그인하기 
    </a></p>
```

<br>
<br>

<hr>

<br>

### 프로젝트 폴더의 Settings.py

<br>

**앱 위치 옮기기**

앱 폴더의 login.html로 기존 템플릿을 덮어쓰기 위해서는     `'django.contrib.admin', 'django.contrib.auth'`보다도 상위에 존재해야 한다. 앱을 아래에 추가했다면, 맨 위로 위치를 옮겨준다. 

<br>

```python
INSTALLED_APPS = [
    '앱 이름(app name)', # 맨 위에 app name 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

<br>
<br>


**이전 페이지로 돌아가기**

login 한 뒤 accounts/profile로 리다이렉트 되어 에러가 생기는 경우 프로젝트 폴더의 settings.py 에 login_redirect_url을 정해준다.
	
<br>

```python
LOGIN_REDIRECT_URL = '../../'
```


<br>
<br>

<hr>

<br>

### Template 디자인 

**base.html로 템플릿 확장**

템플릿을 여러 개 만들다보면 내비게이션이나 푸터와 같이 계속 반복해서 써줘야 하는 코드들이 있다. 이런 경우, 반복되는 코드는 base.html(다른 이름도 상관 없다.)로 만들고 `{%raw%}{% extends 'reviewBoard/base.html' %}{%endraw%}`처럼 다른 템플릿에서 이를 확장해서 쓸 수 있다. 확장하고 싶은 부분은 `{%raw%}{% block content %}{%endraw%}`와 `{%raw%}{% endblock %}{%endraw%}`의 템플릿 태그 사이에 작성해주면 된다.  

<br>

base.html의 내비게이션에 로그인 링크를 추가한다. 

<br>


```html
{% raw %}
{% load static %}
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- 부트스트랩 추가 (Add Bootstrap) -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css">
    <title>Site Name</title>

  </head>

  <body>

    <!-- 내비게이션에 login 링크 추가 -->
    <ul class="nav justify-content-end">
        {% if user.is_active %}
        <li class="nav-item">
            <a class="nav-link" href="{% url 'login' %}">{{user.username}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{% url 'logout' %}">logout</a>
        </li>
        {% else %}
        <li class="nav-item">
          <a class="nav-link" href="{%url 'login' %}"> Login</a>
        </li>
        {% endif %}
      </ul>

    <!-- 템플릿 확장을 위한 템플릿 태그 - Block -->
    {% block content %}
    {% endblock %}


  </body>
    <!-- JavaScript -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/js/bootstrap.min.js" integrity="sha384-7aThvCh9TypR7fIc2HV4O/nFMVCBwyIUKL8XCtKE+8xgCgl/PQGuFsvShjr74PBp" crossorigin="anonymous"></script>
  
</html>
{% endraw %}
```


<br>
<br>


**디자인 추가한 login.html**

class에 있는 my, mt같은 경우는 내가 자체적으로 spacing.css를 만들어 margin이나 padding을 클래스로 정의해놓은 것이다. 따라서, class 안에서 my- 또는 mt- 부분은 지우고, 직접 margin을 주고 싶다면 태그 안의 `style="margin-top:2rem; margin-bottom:2rem;"`과 같은 형태로 줄 수 있다. 예를 들면 이렇다. `<div class="..." style="margin-top:2rem; margin-bottom:2rem;">`

※ `{%raw%}{%csrf_token%}{%endraw%}`같은 경우는 보안을 위해 Django에서 필수적으로 요구하는 템플릿 태그다.


<br>

```html
{%raw%}
{% extends 'Your_App_Name/base.html' %}

{% block content %}

<div class="jumbotron jumbotronfluid">

<div class="container my-5" >

    <h3 class="my-3">Login</h3>

    <hr>

    {% if form.errors %}
    <p style="color:red;">아이디, 비밀번호가 일치하지 않습니다. 다시 시도해주세요.</p>
    {% endif %}

    {% if next %}
        {% if user.is_authenticated %}
            <p> 페이지에 대한 접근 권한이 없습니다. 접근 권한을 가진 계정으로 로그인해주세요.</p>
        {% else %}
            <p>페이지를 보시려면 로그인을 해주세요.</p>
        {% endif %}
    {% endif %}

    <form method="post" action="{% url 'login' %}">
    {% csrf_token %}


    <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">ID</label>
            <div class="col-sm-10 mt-1">
              {{ form.username }}
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10 mt-1">
                {{ form.password }}
            </div>
          </div>


    <button class="btn btn-info mt-3" type="submit"> Sign in </button>
    <input type="hidden" name="next" value="{{ next }}">
    </form>

    {# Assumes you setup the password_reset view in your URLconf #}
    <p class="mt-2"><a href="{% url 'password_reset' %}">비밀번호를 잊으셨나요?</a></p>


</div>

</div>
{% endblock %}
{% endraw %}
```

<br>
<br>

**디자인 추가한 logged_out.html**

```html
{%raw%}
{% extends 'Your_App_Name/base.html' %}

{% block content %}
<div class="container">

    <h2 class="mt-5"> Good Bye. </h2>
    <p class="mt-3">
        <a href="{%url 'login'%}">
            <button class="btn btn-info"> 다시 로그인하기 
            </button>
        </a>
    </p>

</div>
{% endblock %}
{% endraw %}
```


<br>
<br>
