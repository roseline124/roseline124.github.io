---
layout: post
title:  "[백준 알고리즘#1924] 2007년 x월 y일의 요일 구하기 (python)"
date: 2019-03-24 20:55:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1924번

오늘은 2007년 1월 1일 월요일이다. 그렇다면 2007년 x월 y일은 무슨 요일일까? 이를 알아내는 프로그램을 작성하시오.

**입력**

첫째 줄에 빈 칸을 사이에 두고 x(1≤x≤12)와 y(1≤y≤31)이 주어진다. 참고로 2007년에는 1, 3, 5, 7, 8, 10, 12월은 31일까지, 4, 6, 9, 11월은 30일까지, 2월은 28일까지 있다.

**출력**
첫째 줄에 x월 y일이 무슨 요일인지에 따라 SUN, MON, TUE, WED, THU, FRI, SAT중 하나를 출력한다.

<br>
<br>

### 풀이

요일을 구하는 공식에는 첼러 공식, 둠스데이 공식 등 여러가지 방법이 있으나 컴퓨터로 코딩하기에는 첼러가 편하다. 

<br>


[참고 : 첼러의 합동식(Zeller’s congruence)](https://terms.naver.com/entry.nhn?docId=3534029&cid=60209&categoryId=60209)

<br>

![첼러 공식](https://dbscthumb-phinf.pstatic.net/4689_000_1/20161021105304690_47XIKZZ5Z.jpg/cd7_171_f1.jpg?type=h30_fst&wm=N) 


<br>

- H는 요일, D는 일, M은 월
- YB는 연도 앞의 2자리 (ex. 2019년은 20), YA는 연도 앞의 2자리(ex. 2019년은 19)
- mod 7 : 7로 나눈 나머지를 구해라. (modular 연산)


<br>
<br>

**고려해야할 것**

- 1월, 2월인 경우 : 13월, 14월로 계산하며, 이럴 때는 12가 넘어가므로 한해 전 년도를 입력해 년도를 맞춰줘야 한다.

- `[ x ]`는 가우스 기호 : x의 값을 넘지 않는 최대의 정수이다. x가 1.5라면 `[x]`는 1이다. int()를 쓰면 내림이 되므로 int()를 쓴다. (math.floor를 써도 된다.)

<br>
<br>


**코드**
<br>

{% highlight python %}

ya = 20 # 2007년의 20
yb = 7 # 2007년의 07

days = {1:'SUN' , 2:'MON', 
        3:'TUE', 4:'WED', 
        5:'THU', 6:'FRI', 0:'SAT'}

m, d = map(int,input().split()) #월, 일

if (m == 1) | (m == 2) : # 1, 2월인 경우 
    m += 12
    yb -= 1

# 첼러의 합동식
h = (d +  int(((m+1)*13)/5) + yb + int(yb/4) + int(ya/4) - 2*ya ) % 7

print(days[h])

{% endhighlight %}



<br>
<br>
