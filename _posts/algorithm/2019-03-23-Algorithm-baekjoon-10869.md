---
layout: post
title:  "[백준 알고리즘#10869 #10430 #2558] 사칙연산 (python)"
date: 2019-03-23 12:49:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 10869번

두 자연수 A와 B가 주어진다. 이때, A+B, A-B, A*B, A/B(몫), A%B(나머지)를 출력하는 프로그램을 작성하시오. 

<br>

**입력**

두 자연수 A와 B가 주어진다. (1 ≤ A, B ≤ 10,000)

<br>

**출력**

첫째 줄에 A+B, 둘째 줄에 A-B, 셋째 줄에 A*B, 넷째 줄에 A/B, 다섯째 줄에 A%B를 출력한다.

<br>
<br>


### 풀이 

출력 설명에서 넷째줄은 A/B라고 했지만 나누기와 헷갈려서는 안된다. 문제 설명할 때 '몫'이라고 했다. 

<br>

{% highlight python %}

x, y=map(int,input().split())

print(x+y)
print(x-y)
print(x*y)
print(x//y) 
print(x%y)

{% endhighlight %}


<br>

<hr>

<br>

### 백준 알고리즘 10430번

- (A+B)%C는 (A%C + B%C)%C 와 같을까?
- (A×B)%C는 (A%C × B%C)%C 와 같을까?

세 수 A, B, C가 주어졌을 때, 위의 네 가지 값을 구하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 A, B, C가 순서대로 주어진다. (2 ≤ A, B, C ≤ 10000)

<br>

**출력**

첫째 줄에 (A+B)%C, 둘째 줄에 (A%C + B%C)%C, 셋째 줄에 (A×B)%C, 넷째 줄에 (A%C × B%C)%C를 출력한다.

<br>
<br>


### 풀이 

특별한 설명이 필요 없다.

<br>

{% highlight python %}

a, b, c = map(int,input().split())

print((a+b)%c)
print(( (a%c) + (b%c) )%c)
print((a*b)%c)
print(( (a%c) * (b%c) )%c)

{% endhighlight %}


<br>

<hr>

<br>

### 백준 알고리즘 2558번

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 A, 둘째 줄에 B가 주어진다. (0 < A, B < 10)

<br>

**출력**

첫째 줄에 A+B를 출력한다.

<br>
<br>

### 풀이 

특별한 설명이 필요 없다.

<br>

{% highlight python %}

import sys

a, b = map(int, sys.stdin.read().splitlines())
print(a+b)

{% endhighlight %}

<br>
<br>