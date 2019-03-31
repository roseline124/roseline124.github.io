---
layout: post
title:  "[백준 알고리즘#1157] 단어 공부 (python)"
date: 2019-03-31 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제

알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.

<br>

**입력**

첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.

<br>

**출력**

첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.

<br>
<br>

### 해결

{% highlight python %}

from collections import Counter

word = input().upper()
c = Counter(word)

many = []

for k,v in c.items() :
    if v == max(c.values()) :
        many.append(k)
        
        if len(many) > 1 : 
            break
        
if len(many) == 1 :
    print(many[0])
else : 
    print('?')


{% endhighlight %}

<br>
<br>