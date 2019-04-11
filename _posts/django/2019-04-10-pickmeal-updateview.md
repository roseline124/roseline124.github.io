---
layout: post
title:  "[Django 스터디#6-4] 리뷰 수정 폼 UpdateView - 맛집 리뷰 사이트"
date: 2019-04-10 23:45:59
author: Roseline Song
categories: Django
tags: python django 
cover: "/assets/django2.jpg"
---

### 결과물 

<br>

<img src="/assets/images/190411_updateForm.PNG">*리뷰 수정을 위한 update Form*


<br>
<br>

<hr>

<br>

### views.py 

앱 폴더의 views.py에 Updateview 추가 

<br>

```python
class ReviewUpdateView(UpdateView):
    model = Review
    context_object_name = 'review' #1
    form_class = ReviewForm
    template_name = 'reviewBoard/review_update.html' #2
    success_url = '/' #3

    #get object
    def get_object(self): 
        review = get_object_or_404(Review, pk=self.kwargs['pk']) #4

        return review
```

<br>

- #1 : context_object_name를 정해주면 해당 이름으로 template에서 사용할 수 있다. 
- #2 : `reviewBoard/review_update.html`을 템플릿 파일로 정한다.
- #3 : 데이터 업데이트에 성공할 경우 이동할 url이다. 여기서는 index 페이지로 이동한다. 
- #4 : 사용자가 버튼을 통해 UpdateView에 접근하면, 해당 데이터 객체의 pk를 받아서 해당 pk와 일치하는 Review 데이터 객체를 찾는다. 그런 뒤, review에 담아 반환한다. pk 값은 어디로부터 받을까? urls.py에서 확인해보자. 


<br>
<br>

**urls.py**

<br>

```python
from django.urls import path
from . import views

urlpatterns = [
    path('review/<int:pk>/edit/', views.ReviewUpdateView.as_view(), name='review_edit'),
]
```

<br>

url을 통해 전달된 pk를 ReviewUpdateView에 전달한다. 


<br>
<br>

<hr>

<br>

### Template

\#1의 form 태그의 `{%raw%}action="{% url 'reviewBoard:review_edit' review.id %}"{% endraw %}` 코드를 보자.

UpdateView에서 지정해준 context_object_name 을 review로 지정해주었다. review의 id를 review_edit이란 이름의 url에 전달한다(pk 전달). url과 함께 매핑된 ReviewUpdateView에 pk를 전달한다. 그 아래는 review_new와 같다. 

<br>

```html
{%raw%}
<!-- #1  -->
<form class="jumbotron" 
      method="POST" 
      action="{% url 'reviewBoard:review_edit' review.id %}">
      {% csrf_token %}

    <h3>리뷰 수정하기</h3><hr>

    {% for field in form %}
    
    <div class="form-group row ">
        <label for="colFormLabel" class="col-sm-2 col-form-label">{{ field.label_tag }}</label>

        <div class="col-sm-10 ">
            {{ field }}
            
            {% if field.errors %}
                {% for e in field.errors %}
                    <p style="color:palevioletred;">{{ e | escape }}</p>
                {% endfor %}
            {% endif %}

        </div>
    </div>
{% endfor %}

<button value='action' name='ReviewForm' type="submit">리뷰 수정하기</button>
</form>
{%endraw%}
```


<br>
<br>

<hr>

<br>


### index.html

게시글이 보여지는 index 페이지에서 수정 페이지로 넘어갈 수 있도록 index.html에 버튼 추가.
urls.py에서 review_edit이라는 name을 가진 url에 접근하고, 접근할 때 데이터 객체의 id를 전달한다. 

<br>

```html
    {% raw %}
    <a href="{% url 'reviewBoard:review_edit' rev.id %}">
        <button> 수정하기 </button>
    </a>
    {%endraw%}
```

<br>
<br>
