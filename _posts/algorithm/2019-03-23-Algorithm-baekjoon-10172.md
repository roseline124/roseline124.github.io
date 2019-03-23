---
layout: post
title:  "[백준 알고리즘#10172] 개 그리기 (python)"
date: 2019-03-23 12:19:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 7287번

개를 출력한다. 

<br>

멍멍

<br>

**출력**

~~~
|\_/|
|q p|   /}
( 0 )"""\
|"^"`    |
||_/=\\__|
~~~


<br>
<br>


### 풀이 

docstring으로도 출력할 수 있지 않을까? 싶어서 해봤는데 잘못된 형식의 출력이라고 나왔다. 

<br>

{% highlight python %}
dog = """
|\_/|
|q p|   /}
( 0 )\"\"\"\\
|"^"`     |
||_/=\\\__|"""

print(dog)
{% endhighlight %}

<br>
<br>

**정답**

<br>

{% highlight python %}
print("|\_/|")
print("|q p|   /}")
print("( 0 )\"\"\"\\")
print("|\"^\"`    |")
print("||_/=\\\__|")
{% endhighlight %}

<br>
<br>


