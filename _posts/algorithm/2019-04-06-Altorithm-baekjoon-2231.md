---
layout: post
title:  "[백준 알고리즘#2231] 분해합 (python)"
date: 2019-04-06 21:00:59
author: Roseline Song
categories: Algorithm
tags: 부르트포스 무차별대입 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

어떤 자연수 N이 있을 때, 그 자연수 N의 분해합은 N과 N을 이루는 각 자리수의 합을 의미한다. 어떤 자연수 M의 분해합이 N인 경우, M을 N의 생성자라 한다. 예를 들어, 245의 분해합은 256(=245+2+4+5)이 된다. 따라서 245는 256의 생성자가 된다. 물론, 어떤 자연수의 경우에는 생성자가 없을 수도 있다. 반대로, 생성자가 여러 개인 자연수도 있을 수 있다.

자연수 N이 주어졌을 때, N의 가장 작은 생성자를 구해내는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 자연수 N(1 ≤ N ≤ 1,000,000)이 주어진다.

<br>

**출력**

첫째 줄에 답을 출력한다. 생성자가 없는 경우에는 0을 출력한다.

<br>
<br>

<hr>

<br>


### 해결

```python
N = int(input()) # 목표 분해합
low = 0

def get_devided_num(low_n):
    e = list(map(int, str(low_n)))
    devided_num = low_n + sum(e)
    
    return devided_num

while get_devided_num(low) != N:
    if low == N :
        low = 0
        break
    else : 
        low += 1

print(low)
```

<br>
<br>

**분해합 구하기**

<br>

```python
def get_devided_num(low_n): #1
    e = list(map(int, str(low_n))) #2
    devided_num = low_n + sum(e) #3
    
    return devided_num
```

<br>

- #1 : 무차별로 대입할 생성자 low_n을 분해해서 분해합을 만든다. 
- #2 : low_n값이 198이라면 1, 9, 8로 분해해서 int로 변환시키는 코드다.
- #3 : 분해합을 구하려면 원래 값과 분해한 수들의 합을 더한다. 

<br>
<br>

**무차별 대입하기** 

<br>

```python
while get_devided_num(low) != N: #1
    if low == N : #3
        low = 0
        break
    else : 
        low += 1 #2

print(low) #4
```

<br>

- #1 : 분해합을 구해서 주어진 분해합과 같지 않다면 계속 반복한다. 
- #2 : low값을 1씩 더해가면서 주어진 분해합과 같은 값이 나올 때까지 반복한다. 
- #3 : 만약 1씩 더해가며 분해합과 같은 수에 까지 도달했다면, 분해합에 대한 생성자가 없다는 뜻이므로 low에 0을 대입하고 루프문을 빠져나온다.
- #4 : 출력 

<br>
<br>

