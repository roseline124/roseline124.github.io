---
layout: post
title:  "[자료 구조와 알고리즘#7] 버블 정렬보다 빠른 선택 정렬"
date: 2019-01-23 06:04:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 
cover: "/assets/dailystudy.jpg"
---

### 선택 정렬

선택 정렬은 현재의 값과 최솟값을 비교하고 교환한다. 버블정렬은 값을 하나씩 이동하며 올바른 순서로 맞췄지만, 선택은 인덱스를 통해 멀리 있는 값과도 교환할 수 있어 이동이 적다.  

<br>
<br>
 
<hr>

<br>

### 소스코드 

<br>

```python
import random 

arr2 = random.sample(range(0,100),40)
step = 0

for i in range(len(arr2)) : 
    min_idx = i
    for j in range(i+1,len(arr2)) :
        step +=1
        if arr2[j] < arr2[min_idx] :
            min_idx = j
            
    if min_idx != i : 
        arr2[i], arr2[min_idx] = arr2[min_idx], arr2[i]
        step +=1
        
print("list :",arr2, "\n\nstep :", step)
```

<br>
<br>

<hr>

<br>

### 코드 설명 

```python
import random 

arr2 = random.sample(range(0,100),40)
```

<br>

random.sample(population, k) : 0부터 99까지의 모집단에서, 40개의 표본을 무작위로 꺼낸다. 

<br>
<br>

```
for i in range(len(arr2)) : 
    min_idx = i
```

<br>

- 바깥 for 문 : arr2의 개수만큼 반복한다. 현재의 인덱스 i를 min_idx 에 저장하고 안쪽 for문을 실행한다.

<br>
<br>

​```
    for j in range(i+1,len(arr2)) :
        step +=1
        if arr2[j] < arr2[min_idx] :
            min_idx = j
```

<br>

- 안쪽 for문 : 그전에 비교했던 인덱스와 현재의 인덱스는 비교할 필요 없다. range(i+1, len(arr2))로 i 인덱스 그 다음부터의 인덱스와 비교한다.
- step : 비교 횟수를 실행 횟수에 추가한다.
- arr2[j] < arr2[min_idx] : 만약 j 인덱스의 값이 min_idx 인덱스의 값보다 작다면, j를 최솟값의 인덱스로 저장한다.
- 안쪽의 for문을 반복하면 최종적인 최솟값의 인덱스가 min_idx에 저장된다.

<br>
<br>

​```
    if min_idx != i : 
        arr2[i], arr2[min_idx] = arr2[min_idx], arr2[i]
        step +=1
```

<br>

- 다시 바깥 for문 : 안쪽 for문을 빠져나온 후, min_idx 가 현재 인덱스와 같은 게 아니라면(즉, 현재 인덱스의 값보다 더 작은 값이 있었다면), 그 값들을 교환해준다. 
- step : 교환이 일어나면 교환 횟수를 실행 횟수에 추가한다. 

<br>
<br>

<hr>

<br>

### 버블 정렬과 비교 

최악의 시나리오로 한 건 아니고, 난수로 무작위 배열된 시퀀스를 기준으로 측정했다.

<br>


원소 개수 | 비교 횟수 | 교환 횟수 | 총 횟수
------|------|------|------|
10|45|5|50
50|1225|47|1272
100|4950|95|5045
200|19900|195|20095

<br>

버블 정렬

<br>

원소 개수 | 비교 횟수 | 교환 횟수 | 총 횟수
------|------|------|------|
10|44|21|65
50|1222|628|1850
100|4845|2346|7191
200|19890|9496|29386

<br>
<br>
