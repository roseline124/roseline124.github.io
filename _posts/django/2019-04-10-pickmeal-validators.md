---
layout: post
title:  "[Django 스터디#6-2] 커스텀 유효성 검사기 만들기 - validators "
date: 2019-04-10 23:15:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물 

<br>

<img src="/assets/images/190411_validateForm.PNG">*양식에서 벗어나면 error message 출력*

<br>
<br>

<hr>

<br>

### validators.py 

유효성 검사기라는 이름이 어렵지만, 쉽게 말해서 필드에 특정한 제약 조건을 걸어두는 것이다. 맛집 리뷰의 평점을 0보다 작거나 5보다 크게 매길 수 없도록 아래와 같은 유효성 검사기를 만들었다. 

앱 폴더에 validators.py 파일을 만든 후, 아래 코드 추가 

<br>

```python
from django.core.exceptions import ValidationError 

def validate_score(value):
    """평점(score)이 5보다 크면 Validation Error 를 일으킨다."""
    if (value > 5) | (value < 0 ):
        msg = u"'평점은 0 이상 5 이하로 매겨주세요."
        raise ValidationError(msg)
```

<br>
<br>

<hr>

<br>

### models.py 

앱 폴더의 models.py에 아래 내용 추가. 바꾼 코드만 남겼다. 원본 모델의 코드를 확인하려면 [포스팅 참고](https://roseline124.github.io/django/2019/03/23/pickmeal-model.html)

<br>

```python
from django.db import models
from .validators import validate_score

class Review(models.Model) :

    score = models.FloatField(default=None, null=True, validators=[validate_score])
```

<br>

**default=None, null=True**

Review 모델에 기존 데이터가 있는 상태에서 score 필드를 만들어주었다. 이 상태에서 마이그레이션 후, 데이터를 추가하면 기존 데이터들은 해당 field가 없기 때문에 에러가 난다. 

따라서, field 값이 없을 때 default 값으로 None을(Null) 넣어준다. 그리고 `Null=True`는 field 값이 null이어도 괜찮다는 의미이다.

나의 경우에는 평점이기 때문에 default=3으로 바꿨다. 

<br>

**validators=[validate_score]**

`from .validators import validate_score`으로 validators.py의 validate_score 함수를 가져온다. 

score의 FloatField에는 `validators=[validate_score]` 옵션을 넣어서 유효성 검사를 하도록 한다.  

<br>
<br>

<hr>

<br>

### Migration

모델의 내용을 바꾸었으므로 마이그레이션을 한다. 셸에서 가상환경 실행 후 아래 코드를 순차적으로 실행

```python
python manage.py makemigrations App_name
python manage.py migrate App_name
```

<br>
<br>


<hr>

<br>

### forms.py

앱 폴더의 forms.py 생성 후 아래 코드 작성 

<br>

```python
from django import forms 
from django.db import models

from .models import Review, Restaurant

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['restaurant', 'score', ... ]
```

<br>

class Meta에 ReviewForm에 사용할 모델과 field를 지정한다. 


<br>
<br>


<hr>

<br>

### CreateView

앱 폴더의 views.py에 CreateView로 Review 폼 뷰를 만든다. 

<br>

```python
from django.views.generic import CreateView

from .models import Restaurant, Review
from .forms import ReviewForm

class ReviewCreateView(CreateView):
    template_name = 'reviewBoard/review_new.html'
    success_url = '/'
    form_class = ReviewForm
```

<br>
<br>

<hr>

<br>

### urls.py 

앱 폴더의 urls.py에 추가 

<br>

```python
from django.urls import path
from . import views

urlpatterns = [
    path('review/new/', views.ReviewCreateView.as_view(), name='review_new'),
]
```

<br>
<br>

<hr>

<br>

### template

createview에서 `template_name = 'reviewBoard/review_new.html'`, review_new.html 템플릿 파일을 지정했기 때문에 해당 이름의 html 파일을 만든다. 

<br>

```html 
{% raw %}
{% extends 'reviewBoard/base.html' %}
{% load static %}

{% block content %}

<form method="POST" action="{% url 'reviewBoard:review_new' %}">
    {% csrf_token %} 

    <h3>리뷰 추가하기</h3><hr>

    <!-- #1 -->
    {% for field in ReviewForm %}
    
    <div>
            {{ field }}
            <!-- #2 -->
            {% if field.errors %}
                {% for e in field.errors %}
                    <p style="color:palevioletred;">{{ e | escape }}</p>
                {% endfor %}
            {% endif %}
    </div>
{% endfor %}

<button value='action' type="submit">리뷰 추가하기</button>
</form>

{% endblock %}
{% endraw %}
```

<br>

- #1 : `{{ReviewForm.as_p}}`같이 쓸 수 있지만 필드 사이에 디자인 요소를 추가하기 위해 루프문 사용
- #2 : 만약 에러들이 있다면, 에러 리스트에서 하나씩 꺼낸다.

<br>
<br>
