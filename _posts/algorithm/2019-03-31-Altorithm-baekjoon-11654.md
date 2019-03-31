---
layout: post
title:  "[백준 알고리즘#11654] 아스키 코드 (python)"
date: 2019-03-31 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---


### 문제

알파벳 소문자, 대문자, 숫자 0-9중 하나가 주어졌을 때, 주어진 글자의 아스키 코드값을 출력하는 프로그램을 작성하시오.

<br>

**입력**

알파벳 소문자, 대문자, 숫자 0-9 중 하나가 첫째 줄에 주어진다.

<br>

**출력**

입력으로 주어진 글자의 아스키 코드 값을 출력한다.

<br>
<br>

### 해결

{% highlight python %}

# chr() : 65 -> A 
# ord() : A -> 65

print(ord(input()))

{% endhighlight %}

<br>
<br>