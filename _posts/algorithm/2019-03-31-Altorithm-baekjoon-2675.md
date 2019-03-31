---
layout: post
title:  "[백준 알고리즘#2675] 문자열 반복 (python)"
date: 2019-03-31 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---


### 문제

문자열 S를 입력받은 후에, 각 문자를 R번 반복해 새 문자열 P를 만든 후 출력하는 프로그램을 작성하시오. 즉, 첫 번째 문자를 R번 반복하고, 두 번째 문자를 R번 반복하는 식으로 P를 만들면 된다. S에는 QR Code "alphanumeric" 문자만 들어있다.

QR Code "alphanumeric" 문자는 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\$%*+-./: 이다.

<br>

**입력**

첫째 줄에 테스트 케이스의 개수 T(1 ≤ T ≤ 1,000)가 주어진다. 각 테스트 케이스는 반복 횟수 R(1 ≤ R ≤ 8), 문자열 S가 공백으로 구분되어 주어진다. S의 길이는 적어도 1이며, 20글자를 넘지 않는다. 

<br>

**출력**

각 테스트 케이스에 대해 P를 출력한다.

<br>
<br>

### 해결

{% highlight python %}

n = int(input())

strings = []

for _ in range(n) : 
    strings.append(input())
    
for s in strings :
    num = int(s[0])
    string = s[2:]
    
    for ss in string : 
        print(ss*num, end="")
    
    print()

{% endhighlight %}

<br>
<br>