---
layout: post
title:  "[백준 알고리즘#2750] 수 정렬하기 - 버블, 삽입 정렬 (python)"
date: 2019-04-02 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제

N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오. (오름차순 : 1, 2, 3, 4, 5)

<br>

**입력**

첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 숫자가 주어진다. 이 수는 절댓값이 1,000보다 작거나 같은 정수이다. 수는 중복되지 않는다.

<br>

**출력**
첫째 줄부터 N개의 줄에 오름차순으로 정렬한 결과를 한 줄에 하나씩 출력한다.

<br>
<br>


### 해결 

채점할 때 틀리거나, 에러 발생 시 확인할 것 

1. 라이브러리가 import 되어있는지 확인
2. enumerate() 사용 -> range(len) 사용

**버블 정렬**

<br>

{% highlight python %}
N = int(input())

numbers = []

for _ in range(N) : 
    numbers.append(int(input()))

# Bubble Sort
for i in range(len(numbers)) : 
    for j in range(len(numbers)) : 
        if numbers[i] < numbers[j] : 
            numbers[i], numbers[j] = numbers[j], numbers[i]
            
for n in numbers : 
    print(n)

{% endhighlight %}

<br>
<br>

**삽입 정렬**

{% highlight python %}

N = int(input())
nums = []

for _ in range(N) : 
    nums.append(int(input()))

# Insert Sort
for i in range(1, len(nums)) :
    while (i>0) & (nums[i] < nums[i-1]) :
        nums[i], nums[i-1] = nums[i-1], nums[i]
        
        i -= 1
        
for n in nums : 
    print(n)

{% endhighlight %}
