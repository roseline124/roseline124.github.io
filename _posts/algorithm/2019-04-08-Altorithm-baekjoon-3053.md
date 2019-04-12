---
layout: post
title:  "[백준 알고리즘#3053] 구현 - 택시 기하학 (python)"
date: 2019-04-08 21:30:59
author: Roseline Song
categories: Algorithm
tags: 기하학 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

19세기 독일 수학자 헤르만 민코프스키는 비유클리드 기하학 중 택시 기하학을 고안했다.

택시 기하학에서 두 점 T1(x1,y1), T2(x2,y2) 사이의 거리는 다음과 같이 구할 수 있다.

$$D(T1,T2) = |x1-x2| + |y1-y2|$$

두 점 사이의 거리를 제외한 나머지 정의는 유클리드 기하학에서의 정의와 같다.

따라서 택시 기하학에서 원의 정의는 유클리드 기하학에서 원의 정의와 같다.

원: 평면 상의 어떤 점에서 거리가 일정한 점들의 집합

반지름 R이 주어졌을 때, 유클리드 기하학에서 원의 넓이와, 택시 기하학에서 원의 넓이를 구하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 반지름 R이 주어진다. R은 10,000보다 작거나 같은 자연수이다.


<br>

**출력**

첫째 줄에는 유클리드 기하학에서 반지름이 R인 원의 넓이를, 둘째 줄에는 택시 기하학에서 반지름이 R인 원의 넓이를 출력한다. 정답과의 오차는 0.0001까지 허용한다.

<br>
<br>

<hr>

<br>


### 해결

[참고](http://pub.chosun.com/client/news/viw.asp?cate=C03&mcate=M1004&nNewsNumb=20170825805&nidx=25806)

<img src="http://monthly.chosun.com/upload/1708/1708_396_6.jpg" style="width=400px;">

**택시 기하학에서 원의 넓이**

위 사진에서 반지름이 1이라고 하자. (0,1), (1,0), (-1,0), (0,-1)의 점을 찍을 수 있다. 각 점 사이의 거리를 구하면 택시 기하학에서의 원의 넓이를 구할 수 있다. 

반지름이 r이라고 하면 피타고라스 정리로 각 점 사이의 거리는 $$\sqrt{r^2 + r^2}$$이다. 정리하면 $$\sqrt{2}r$$이다. 마름모니까 넓이는 $$2r^2$$이 된다. 

<br>

**유클리드 기하학에서 원의 넓이**

$$r^2 π$$

<br>

```python
from math import pi

r = int(input())

euclid = r*r*pi 
taxi = r*r*2

print(round(euclid, 4)) # 소수점 이하 4번째 자리까지 출력
print(round(taxi, 4))
```


<br>
<br>