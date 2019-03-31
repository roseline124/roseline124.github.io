---
layout: post
title:  "[백준 알고리즘#1316] 그룹 단어 체커 (python)"
date: 2019-03-31 21:10:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---


### 문제

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

<br>

**출력**

첫째 줄에 그룹 단어의 개수를 출력한다.

<br>
<br>

### 해결

{% highlight python %}

# function
def checker(word) :
    stack = []
    
    for i, c in enumerate(word) : 
        if c not in stack : 
            stack.append(c)
        else : 
            if (i!= 0) & (word[i] != word[i-1]) :
                return 0
    
    return 1

# input
n = int(input())
words = []

for _ in range(n) : 
    words.append(input())

# print
num = 0 

for w in words :
    num += checker(w)
    
print(num)

{% endhighlight %}

<br>
<br>