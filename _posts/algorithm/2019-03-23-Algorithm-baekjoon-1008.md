---
layout: post
title:  "[백준 알고리즘#1008] 절대, 상대오차 표현 (python)"
date: 2019-03-23 12:40:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1008번

두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

<br>

**출력**

첫째 줄에 A/B를 출력한다. 절대/상대 오차는 소수점 9번째 자리(0.1e-9)까지 허용한다.

<br>

**예제 입력**

`1 3`

<br>

**예제 출력**

`0.33333333333333333333333333333333`

<br>
<br>


### 풀이 

예제 출력을 보니 소수점 32자리까지 표현하길래 32자리까지 표현하는 건가 싶어 방법을 찾아보았다. 하지만 아니었다. 

<br>

{% highlight python %}

#소숫점 32자리까지 표현
%precision 32

#다시 복구하려면
%precision %r

{% endhighlight %}

<br>

또 다른 방법을 생각했다. 출력에서 말하는 절대, 상대 오차는 어떻게 구하는 건가 싶어서 찾아보니 math.isclose()라는 함수가 있었다. 하지만 허용된 오차를 넘는지 여부만 True / False로 알려주기 때문에 정답과는 상관 없어보였다. 이것도 아니었다.

<br>

{% highlight python %}

import math

math.isclose(1, 3, rel_tol=0.1e-9, abs_tol=0.1e-9) # False 반환

{% endhighlight %}

<br>

정말 간단하게 생각해서 소수점 9번째자리까지 보여주는 방법이 있었다. 어렵게 생각할 필요없이 이렇게 하면 됐었다. 흑;

<br>

{% highlight python %}

a,b=map(int,input().split())
print('%0.9f'%(a/b))

{% endhighlight %}

<br>
<br>