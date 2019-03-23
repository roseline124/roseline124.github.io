---
layout: post
title:  "[백준 알고리즘#11718 #11719] 그대로 출력하기1, 2 (python)"
date: 2019-03-23 12:30:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 11718번, 11719번

입력 받은 대로 출력하는 프로그램을 작성하시오.

<br>

**입력**

1. 11718번 

입력이 주어진다. 입력은 최대 100줄로 이루어져 있고, 알파벳 소문자, 대문자, 공백, 숫자로만 이루어져 있다. 각 줄은 100글자를 넘지 않으며, 빈 줄은 주어지지 않는다. 또, 각 줄은 공백으로 시작하지 않고, 공백으로 끝나지 않는다.

<br>

2. 11719번

입력이 주어진다. 입력은 최대 100줄로 이루어져 있고, 알파벳 소문자, 대문자, 공백, 숫자로만 이루어져 있다. 각 줄은 100글자를 넘지 않으며, 빈 줄이 주어질 수도 있고, 각 줄의 앞 뒤에 공백이 있을 수도 있다.

<br>

**출력**

입력받은 그대로 출력.

<br>
<br>


### 풀이 

파이썬에서 input()으로 입력을 받으면 시간이 상당히 오래 걸린다고 한다. 

반면, **`readline()`은 좀 더 빠르다. 또한, 여러줄을 한 번에 입력받을 수 있으며 공백이나 빈 줄도 문제 없이 처리**한다. 두 문제 모두 아래 코드로 풀 수 있다. 

<br>

{% highlight python %}
import sys

strings = sys.stdin.read().splitlines() 

for s in strings : 
    print(s)
{% endhighlight %}

<br>
<br>
