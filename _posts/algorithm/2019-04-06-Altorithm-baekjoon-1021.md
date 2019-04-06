---
layout: post
title:  "[백준 알고리즘#1021] 회전하는 큐 (python)"
date: 2019-04-06 21:20:59
author: Roseline Song
categories: Algorithm
tags: 덱 큐 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

지민이는 N개의 원소를 포함하고 있는 양방향 순환 큐를 가지고 있다. 지민이는 이 큐에서 몇 개의 원소를 뽑아내려고 한다.

지민이는 이 큐에서 다음과 같은 3가지 연산을 수행할 수 있다.



1. 첫 번째 원소를 뽑아낸다. 이 연산을 수행하면, 원래 큐의 원소가 $$a_1, ..., a_k$$이었던 것이 $$a_2, ..., a_k$$와 같이 된다.
2. 왼쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, $$a_1, ..., a_k$$가 $$a_2, ..., a_k, a_1$$이 된다.
3. 오른쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, $$a_1, ..., a_k$$가 ak, $$a_1, ..., a_{k-1}$$이 된다.

큐에 처음에 포함되어 있던 수 N이 주어진다. 그리고 지민이가 뽑아내려고 하는 원소의 위치가 주어진다. (이 위치는 가장 처음 큐에서의 위치이다.) 이때, 그 원소를 주어진 순서대로 뽑아내는데 드는 2번, 3번 연산의 최솟값을 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 큐의 크기 N과 뽑아내려고 하는 수의 개수 M이 주어진다. N은 50보다 작거나 같은 자연수이고, M은 N보다 작거나 같은 자연수이다. 둘째 줄에는 지민이가 뽑아내려고 하는 수의 위치가 순서대로 주어진다. 위치는 1보다 크거나 같고, N보다 작거나 같은 자연수이다.

<br>

**출력**

첫째 줄에 문제의 정답을 출력한다.

<br>
<br>

<hr>

<br>


### 해결

```python
n, m = map(int, input().split())
idx = list(map(int, input().split()))

step = 0 

def move_left(que): # push back
    global step
    step += 1
    
    tmp = que.pop(0)
    que.append(tmp)

def move_right(que): # push front
    global step
    step += 1
    
    tmp = [que.pop(-1)]
    tmp.extend(que)
    que = tmp
    
    return que

# que 만들기 
que = list(range(1, n+1))

# 원하는 수를 다 뽑을 때까지 반복
while idx : 
    if que[0] == idx[0]: 
        que.pop(0)
        idx.pop(0)
    else : 
        # move left or right 
        if que.index(idx[0]) <= len(que)//2:
            while que[0] != idx[0]: move_left(que)
        else : 
            while que[0] != idx[0]: que = move_right(que)
                
print(step)
```

<br>
<br>
