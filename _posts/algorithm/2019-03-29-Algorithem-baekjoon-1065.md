---
layout: post
title:  "[백준 알고리즘#1065] 한수 구하기 (python)"
date: 2019-03-29 20:55:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1065번

어떤 양의 정수 X의 자리수가 등차수열을 이룬다면, 그 수를 한수라고 한다. 등차수열은 연속된 두 개의 수의 차이가 일정한 수열을 말한다. N이 주어졌을 때, 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력하는 프로그램을 작성하시오. 

**입력**

첫째 줄에 1,000보다 작거나 같은 자연수 N이 주어진다.

**출력**

첫째 줄에 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력한다.

<br>
<br>

### 풀이

풀이 코드는 쉽지만 문제 자체를 이해하기 쉽지 않았다. 문제를 해석하면 이렇다. 123의 숫자가 있다고 하면 자릿수대로 이 숫자들을 하나씩 분리한다. 그럼 1, 2, 3의 숫자가 된다. 이 숫자들은 등차수열을 이루므로 123은 한수이다. 주의할 것은 **1부터 9까지도 한수에 포함**한다.

<br>
<br>


**코드**
<br>

{% highlight python %}

num = int(input())
hansu = 0

for n in range(1, num+1) :
    if n <= 99 : # 1부터 99까지는 모두 한수
        hansu += 1 
    
    else :     
        nums = list(map(int, str(n))) # 숫자를 자릿수대로 분리 
        if nums[0] - nums[1] == nums[1] - nums[2] : #등차수열 확인
            hansu+=1

{% endhighlight %}


<br>
<br>


<br>
<br>
