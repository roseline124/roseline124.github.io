---
layout: post
title:  "[Django 스터디#6-3] 리뷰 form + CreateView / 한 템플릿에 2개의 폼 넣기"
date: 2019-04-10 23:30:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물 

<br>

<img src="/assets/images/190411_home.PNG">*'리뷰 작성하기' 버튼을 누르면 form 페이지로 이동*

<br>

<img src="/assets/images/190411_reviewForm.PNG">*맛집 리뷰 form*

<br>

<img src="/assets/images/190411_restaurantForm.PNG">*맛집 form*

<br>
<br>

<hr>

<br>

### forms.py 

앱 폴더에 forms.py 파일을 만들고 아래 코드 추가 

<br>

```python
from django import forms 
from django.db import models

from .models import Review, Restaurant

class RestaurantForm(forms.ModelForm):
    class Meta:
        model = Restaurant
        fields = ['name', ...]

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['restaurant', 'score', ...]
```

<br>
<br>

<hr>

<br>

### CreateView - views.py

<br>

**간단한 뷰**

<br>

```python
from django.views.generic import CreateView
from .forms import ReviewForm

class ReviewCreateView(CreateView):
    template_name = 'reviewBoard/review_new.html'
    success_url = '/' #1
    form_class = ReviewForm #2
```
<br>

- #1 : 데이터 생성에 성공한 경우 리다이렉트할 url. 위에서는 index 페이지로 이동한다. 
- #2 : CreateView가 사용할 form_class를 지정한다. 

<br>
<br>

**urls.py**

```python
urlpatterns = [
    path('review/new/', views.ReviewCreateView.as_view(), name='review_new'),

]
```

<br>
<br>

<hr>

<br>

### 한 템플릿에 두 개의 폼 넣기 

리뷰를 작성하려면 Restaurant 필드에서 식당을 선택해야 한다. 하지만 원하는 식당이 데이터에 없다면, 리뷰를 추가할 수 없는 상황이 온다.

그래서 Review Form을 먼저 보여준 뒤, 원하는 식당이 없다면 Restaurant Form 을 보여주고, Review Form은 숨긴다. 

기존 CreateView로는 하나의 폼만 사용할 수 있기 때문에 **믹스인, 클래스 상속으로 여러 폼을 넣을 수 있는 클래스뷰**를 만든다.

아래 코드들을 참고했으나, validator가 제대로 작동하지 않는 오류가 있어 내 코드에 맞게 일부분 바꿨다. 

<br>

[참고 코드](https://gist.github.com/michelts/1029336)

[참고 코드2](https://chriskief.com/2012/12/30/django-class-based-views-with-multiple-forms/)

<br>
<br>

<hr>

<br>



### mixin

<br>

```python
# code source : https://gist.github.com/michelts/1029336

from django.shortcuts import render, render_to_response
from .forms import ReviewForm, RestaurantForm

#################### Mixins ####################
from django.views.generic.base import View, TemplateResponseMixin
from django.views.generic.edit import FormMixin, ProcessFormView

class MultipleFormsMixin(FormMixin):
    """
    A mixin that provides a way to show and handle several forms in a
    request.
    """
    form_classes = {} 

    def get_form_classes(self):
        return self.form_classes

    def get_forms(self, form_classes):
        return dict([(key, klass(**self.get_form_kwargs())) \
            for key, klass in form_classes.items()])

    def forms_valid(self, forms):
        return super(MultipleFormsMixin, self).form_valid(forms)

    def forms_invalid(self, forms):
        return self.render_to_response(self.get_context_data(forms=forms))


class ProcessMultipleFormsView(ProcessFormView):
    """
    A mixin that processes multiple forms on POST. Every form must be
    valid.
    """
    def get(self, request, *args, **kwargs):
        form_classes = self.get_form_classes()
        forms = self.get_forms(form_classes)
        return self.render_to_response(self.get_context_data(forms=forms))

    #1
    def post(self, request, *args, **kwargs):
        form_classes = self.get_form_classes()
        forms = self.get_forms(form_classes)

        if 'ReviewForm' in request.POST:
            form_class = self.form_classes['ReviewForm']
            form_name = 'ReviewForm'
        else:
            form_class = self.form_classes['RestaurantForm']
            form_name = 'RestaurantForm'

        #2
        form = self.get_form(form_class)

        if form.is_valid(): #3
            return self.form_valid(form)
        else:
            #4 
            return self.render_to_response (self.get_context_data(forms=forms))


class BaseMultipleFormsView(MultipleFormsMixin, ProcessMultipleFormsView):
    """
    A base view for displaying several forms.
    """

class MultipleFormsView(TemplateResponseMixin, BaseMultipleFormsView):
    """
    A view for displaing several forms, and rendering a template response.
    """
```

<br>
<br>

**form 마다 나눠서 POST하기**

<br>

```python
class ProcessMultipleFormsView(ProcessFormView):

    ...(생략)...

    def post(self, request, *args, **kwargs):
        form_classes = self.get_form_classes()
        forms = self.get_forms(form_classes)

        #1
        if 'ReviewForm' in request.POST:
            form_class = self.form_classes['ReviewForm']
            form_name = 'ReviewForm'
        else:
            form_class = self.form_classes['RestaurantForm']
            form_name = 'RestaurantForm'

        form = self.get_form(form_class)

        if form.is_valid(): #2
            return self.form_valid(form)
        else:
            #3
            return self.render_to_response (self.get_context_data(forms=forms))
```

<br>

- #1 : form_classes에서 key 값이 'ReviewForm'인 것의 value를 ReviewForm 객체이다. 만약 request.POST을 통해 전달된 form이 ReviewForm이라면 form_class 변수에 ReviewForm 객체를 담고, 그렇지 않으면 RestaurantForm 객체를 담는다. 

- #2 : form 변수에 담긴 form이 유효한지 확인하고, 유효하다면 MultipleFormsMixin에 담긴 form_valid를 실행.

- #3 : 유효하지 않다면, form에 담긴 데이터를 그대로 다시 돌려주고, 현재 페이지에 다시 리다이렉트 된다. 


<br>
<br>

<hr>

<br>

### views.py 

<br>

**ReviewCreateView**

<br>

```python
from django.shortcuts import render, render_to_response
from django.views.generic import CreateView

from django.utils.decorators import method_decorator
from django.contrib.auth import views, models, login, decorators 
from django.contrib.auth.decorators import login_required 

from .models import Restaurant, Review
from .forms import ReviewForm, RestaurantForm


# New Review
class ReviewCreateView(CreateView, MultipleFormsView):
    model = Review
    fields = ('writer','restaurant', 'score', 'title', 'review', 'photo')
    template_name = 'reviewBoard/review_new.html'
    success_url = '/'
    #1
    form_classes = {'ReviewForm': ReviewForm,
                    'RestaurantForm': RestaurantForm}

    #2
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ReviewCreateView, self).dispatch(*args, **kwargs)

    #3
    def get_review_initial(self):
        return {'title':'...',}

    def get_restaurant_initial(self):
        return {'name':'...',}
```

<br>

- #1 : form_classes 속성에 dictionary로 여러 폼을 전달할 수 있다. 

- #2 : 로그인을 한 사람에게만 리뷰를 작성할 수 있도록, 로그인을 요구하는 데코레이터이다.

- #3 : 각 필드의 초기값 설정 

<br>
<br>

**urls.py**

<br>

```python
from django.contrib.auth import views as auth_views
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

### Template

```html
{% raw %}

<!-- #1 -->
<form id="ReviewForm"
    class="jumbotron collapse show multi-collapse" 
    method="POST" 
    enctype="multipart/form-data"
    action="{% url 'reviewBoard:review_new' %}">{% csrf_token %}

    <h3>리뷰 추가하기</h3><hr>

    {% for field in forms.ReviewForm %}
    
    <div class="form-group row ">
        <label for="colFormLabel" class="col-sm-2 col-form-label">{{ field.label_tag }}</label>
        {# error message 출력 #}
        <div class="col-sm-10 ">
            {{ field }}
            
            {% if field.errors %}
                {% for e in field.errors %}
                    <p style="color:palevioletred;">{{ e | escape }}</p>
                {% endfor %}
            {% endif %}

            <!-- #2 -->
            {% if field.label == "Restaurant" %}
                <button type="button" 
                data-toggle="collapse" 
                data-target=".multi-collapse" 
                aria-expanded="false" 
                aria-controls="ReviewForm RestaurantForm"
                >맛집이 리스트에 없나요?</button>
            {% endif %}
        </div>
    </div>
{% endfor %}
<button value='action' name='ReviewForm' type="submit">리뷰 추가하기</button>
</form>

<!-- #3 -->
<form id="RestaurantForm" 
    class="jumbotron collapse multi-collapse"
    method="POST" 
    action="{% url 'reviewBoard:review_new' %}">{% csrf_token %}
    
    <h3>맛집 추가하기</h3>
    <hr class="mb-5">

    {{forms.RestaurantForm.as_p}}

    <button value='action' name='RestaurantForm' type="submit">식당 추가하기</button>
</form>

{% endraw %}
```

<br>

- #1 : form class의 `collapse show multi-collapse`는 부트스트랩에 내장된 클래스이다. multi-collapse는 여러 개의 elements에 속한다는 것을 알려주는 크래스. show는 element를 보여주는 클래스이다. #2의 버튼에 있는 collapse cotrol에 따라 없어지고, 나타난다. 

- #2 : `data-target=".multi-collapse" aria-controls="ReviewForm RestaurantForm"` data-target을 통해 .multi-collapse 클래스를 가진 엘리먼트를 동시에 컨트롤한다. aria-controls는 id 속성 값이 ReviewForm, RestaurantForm인 엘리먼트를 컨트롤한다. 

- #3 : 토글 버튼을 누르면 ReviewForm이 사라지고, RestaurantForm이 나타난다. 

<br>
<br>
