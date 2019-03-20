---
layout: post
title:  "[백준 알고리즘#1193] 분수 찾기 (Python)
"
date: 2019-03-20 09:33:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python 규칙
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1193번
<br>
무한히 큰 배열에 다음과 같이 분수들이 적혀있다.

<br>

<img src="https://postfiles.pstatic.net/MjAxOTAzMjBfMjMg/MDAxNTUzMDQ2NjMwMTkx.Yj34Gk1IQIUw7pgYKnhb3U8lSbcY5ZECcOkDL23addQg.AmDBM5U_vubKLGuC2Tn_IDwl-uXzB2OeAg7Pj8qWjyog.PNG.guseod24/table.PNG?type=w966" style="width:400px;">

<br>

이와 같이 나열된 분수들을 1/1 -> 1/2 -> 2/1 -> 3/1 -> 2/2 -> … 과 같은 지그재그 순서로 차례대로 1번, 2번, 3번, 4번, 5번, … 분수라고 하자.

X가 주어졌을 때, X번째 분수를 구하는 프로그램을 작성하시오.
<br>

**입력**

첫째 줄에 X(1 ≤ X ≤ 10,000,000)가 주어진다.

**출력**

첫째 줄에 분수를 출력한다.
<br>





**풀이1**

<br>

{% highlight python %}
def get_degree(idx) :
    num = 1

    while idx > 0 :
        idx -= num
        num += 1 

    return num-1

{% endhighlight %}

<br>

{% highlight python %}
idx = int(input())

num = get_degree(idx)

stack = []

for n in range(1,num+1) :
    degree = []

    if n % 2 == 1 :
        degree = [ f'{n-(d-1)}/{d}' for d in range(1,n+1) ] #d : denominator
    else : 
        degree = [ f'{m}/{n-(m-1)}' for m in range(1,n+1) ] #m : molecule 
        
    stack.extend(degree)

print(stack[idx-1])
{% endhighlight %}

<br>
<br>



**풀이2**
<br>
{% highlight python %}

idx=int(input())

degree=0
degree_sum=0

while(degree_sum<idx):
    degree+=1
    degree_sum+=degree

gap = degree_sum - idx

if(degree%2==1):
    denom = degree - gap
    numer= degree+1 - denom
else:
    numer = degree - gap
    denom = degree+1 - numer
    
print("{}/{}".format(numer,denom))

{% endhighlight %}




