---
layout: post
title:  "[Django 스터디#5] Django 템플릿 - 맛집 리뷰 사이트"
date: 2019-03-28 21:30:59
author: Roseline Song
categories: Django
tags: python django
cover: "/assets/django2.jpg"
---

### index.html

<br>

<img src="/assets/images/190328_view.PNG">

<br>
<hr>
<br>

### 템플릿 

1. base.html

```html
{% load static %}
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>site name</title>
  </head>

  <body>

    {% block content %}
    {% endblock %}
  </body>
</html>
```

2. index.html

```
{% extends 'reviewBoard/base.html' %}
{% load static %}

{% block content %}

<div style="margin-left:20px; margin-top:20px;">
    <h1>한양대 에리카 맛집 리뷰</h1>
    {% if restaurants %}

    <!-- Restaurant -->
    {% for res in restaurants %}
    <hr>
    <h3>
        <strong>{{ res.name }} | {{ res.category }}</strong>
    </h3>    
    
    <br>

        <!-- Review -->
        {% for rev in res.review_set.all %}

            <a href={% url 'reviewBoard:review-detail' rev.pk %}>
                {{ rev.title }} | {{rev.updated_date}}
            </a> 
            
            <br>
            <br>
            {% endfor %}
        {% endfor %}
    {% endif %}

</div>

{% endblock %}
```


3. review_detail.html

```html
{% extends 'reviewBoard/base.html' %}
{% load static %}

{% block content %}

<div style="margin-left:20px; margin-top:20px;">

    <h3>{{review.title}}</h3>

    <br>

    <p>{{ review.review }}</p>

    <br>

    {% if review.photo %}
        <img src="{{ review.photo.url }}" alt="reviewPhoto" style="width:200px;"><br>
    {% endif %}

    <br>

    <a href="../../"> 돌아가기 </a>
</div>


{% endblock %}
```

