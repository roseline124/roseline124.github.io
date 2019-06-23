---
layout: post
title:  "[자료 구조와 알고리즘#6] 버블 정렬"
date: 2019-01-20 06:04:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 
cover: "/assets/dailystudy.jpg"
---

### 버블 정렬

가장 기본적인 정렬 알고리즘. 무작위로 나열된 원소들이 있을 때, 데이터를 하나씩 '**비교**'하고 '**교환**'하며 차례대로 정렬한다.

<br>
<br>
 
<hr>

<br>

### 구현

**[소스코드 1]**

<br>

```python
"""
버블 정렬 구현하기
1. 비교 2. 교환
"""

def bubble_order(*args) : #시퀀스를 매개변수로 받는다.

    unorder_list = list(args) # *args 타입은 튜플이기때문에 데이터 수정을 위해 list로 캐스팅해준다.

    # 이중 for문으로 모두 정렬될 때까지 반복. 
    for i in range(len(unorder_list)-1) :

        for j in range(len(unorder_list)-1) : 

            #비교 # 교환 
            if unorder_list[j] > unorder_list[j+1] : 
                unorder_list[j], unorder_list[j+1] = unorder_list[j+1], unorder_list[j]
 
    return unorder_list


print(bubble_order(5,4,7,9,123,47,120))
```

<br>
<br>

**[소스코드 2]**

소스코드 1과 알고리즘 면에서 다른 건 없다. 비교 단계 면에서 비효율적이다. 매개변수와 인자만 다르게 전달했다. 

<br>

```python
import random

def bubble_order(unorder_list) : 

    step = 0

    # 이중 for문으로 모두 정렬될 때까지 반복. 
    for i in range(len(unorder_list)-1) :

        for j in range(len(unorder_list)-1) : 

            #비교 # 교환 
            if unorder_list[j] > unorder_list[j+1] : 
                unorder_list[j], unorder_list[j+1] = unorder_list[j+1], unorder_list[j]
                step += 1


    #정렬된 시퀀스, 교환 횟수를 반환. 
    return unorder_list, step

list_unorder = random.sample(range(1000),500)


print(bubble_order(list_unorder[1])) # 리턴이 2개일 때 배열 인덱스로 정해주면 된다. step을 반환
```

<br>
<br>

**[소스코드 3]**

마지막 인덱스를 제외하여 비교 단계에서 소스코드 1, 2보다 더 효율적이다.

<br>

```python
"""
버블 정렬 구현하기
1. 비교 2. 교환
"""

import random

def bubble_order(unorder_list) : 

    unorder_list_idx = len(unorder_list)-1
    sorted = False

    while not sorted : 
        sorted = True

        for j in range(unorder_list_idx) : 

            #비교 # 교환 
            if unorder_list[j] > unorder_list[j+1] : 
                sorted = False
                unorder_list[j], unorder_list[j+1] = unorder_list[j+1], unorder_list[j]

        unorder_list_idx -= 1
 
    return unorder_list

list_unorder = random.sample(range(1000),500)

print(bubble_order(list_unorder)) 
```

<br>
<br>

<hr>

<br>

### 코드 비교 (코드 1,2 vs 코드 3)

### [소스코드 1]

**1. 패킹된 매개변수와 매개변수 타입**

<br>

```python
def bubble_order(*args) :
    unorder_list = list(args)

    ...(생략)

#함수 호출
bubble_order(5,4,7,9,123,47,120))
```

<br>

- \*args : 함수에 전달될 매개변수로 *args를 써서 패킹된 매개변수임을 선언한다. 함수를 호출할 때 마지막 줄과 같이 여러 개의 인자를 전달하면, '튜플 형태'로 하나의 시퀀스로 묶어서 함수에 전달한다. 

콘솔에 아래와 같이 확인할 수 있다. 함수에 패킹 매개변수(*args)를 전달하고 이를 _list에 저장한 후 type() 함수로 데이터의 타입을 확인했더니 tuple이 나온다.

<sub>※ 언패킹 매개변수로는 '**kwargs'가 있다. 언패킹 매개변수는 시퀀스를 변수에 저장하지 않고 바로 전달이 가능하다.</sub>

<br>

```python
>>> def tutu(*args) :
...     return args
...
>>> _list= tutu(1,3,5)
>>> type(_list)
<class 'tuple'>
```

- list(args) : 정렬을 하려면 순서가 뒤바뀐 원소들을 교환해야 한다. 하지만 튜플 타입은 불변 데이터이므로 수정이 불가능하다. 따라서 list 타입으로 캐스팅해서 가변 데이터형으로 바꿔준다.

<br>
<br>

**2. 패스 스루의 반복**​

<br>

```python
    # 이중 for문으로 모두 정렬될 때까지 반복. 
    for i in range(len(unorder_list)-1) :
        for j in range(len(unorder_list)-1) : 
            #비교 # 교환 
            if unorder_list[j] > unorder_list[j+1] : 
                unorder_list[j], unorder_list[j+1] = unorder_list[j+1], unorder_list[j]
```

<br>

- 패스 스루(pass through) : 한 번의 정렬 단계를 '통과'하는 것을 패스 스루라고 한다. [4,3,1,2] 와 같은 데이터가 있을 때 for문을 한 번 실행하면 (4,3,1,2) -> (3,4,1,2) -> (3,1,4,2) -> (3,1,2,4) 로 끝난다. 3과 4를 바꾸고 나서 인덱스는 4와 1을 가리키고, 맨 앞의 3은 고려하지 않기때문에 정렬되지 않은 상태로 남는다. 따라서 모든 원소가 다 정렬될 때까지 반복해줘야 하기 때문에 이중 for문을 썼다.  

- 정렬은 되지만, 바깥 for문을 실행할 때 이전에 순서가 완전히 들어맞은 끝쪽의 인덱스는 빠지지 않기때문에 비교 단계에서 쓸모 없는 실행이 발생한다. [10, 3, 1, 2] 와 같은 시퀀스에서 한 번 정렬하면, (3,1,2, 10)과 같이 맨 앞의 10이 맨 끝으로 이동하여 자신의 자리를 찾는다. 이중 for문을 이용하면 인덱스 처음부터 끝까지 반복하기 때문에 이미 순서가 맞는 10까지도 비교하게 되면서 무의미한 실행이 일어난다. 

<br>
<br>

<hr>

<br>

### ​[소스코드 2]​

<br>

```python
import random

def bubble_order(unorder_list) : 

... (생략)

     return unorder_list, step

list_unorder = random.sample(range(1000),500)

print(bubble_order(list_unorder)[1]) # 리턴이 2개일 때 배열 인덱스로 정해주면 된다.
```

<br>
<br>

**1. 매개변수**

매개변수 *args 는 list로 변환해줘야 하고, 인자를 패킹시켜버리므로 list_unorder를 인자로 전달하면 하나의 데이터 요소로 본다. 즉 args 는 [list_unorder, ...] 와 같이 되고, 정렬해봤자 원소는 list_unorder 하나이므로 list_unorder 안의 데이터 원소는 그대로 남아있게 된다. 따라서 위와 같이 아예 매개변수를 **\*args를 쓰지 않고 일반 변수를 쓰거나, bubble_order(random.sample(range(1000),500)) 처럼 변수에 할당하지 않고 함수에 바로 전달하면 \*args에서 바로 패킹된다.**
​
<br>
<br>

**2. 난수 리스트 생성**

random.sample(population, k) : **population 인자는 시퀀스 또는 집합 데이터**여야 한다. range(1000)을 population으로 전달하여 0부터 999까지 범위 내의 숫자를 인자로 전달한다. **k는 population이라는 모수에서 뽑아낼 표본의 개수**이다. random.sample(range(1000), 500)은 0부터 999까지의 범위에서 500개의 숫자를 무작위로 뽑는다는 의미이다. 

<br>
<br>

**3. 여러 개의 리턴 값 중 하나만 보고 싶을 때**

소스코드 2에서는 return 값이 정렬된 시퀀스와 교환 횟수(비교 횟수는 i*j이다)이다. **리턴 값이 여러 개일 때는 리스트에서 특정 인덱스의 값을 뽑듯이 함수()[index]를 해주면, 해당 인덱스의 리턴값을 반환**한다.

<br>
<br>

<hr>

<br>

### [소스코드 3]

```python
def bubble_order(unorder_list) : 

    unorder_list_idx = len(unorder_list)-1
    sorted = False

    while not sorted : 
        sorted = True

        for j in range(unorder_list_idx) : 

            #비교 # 교환 
            if unorder_list[j] > unorder_list[j+1] : 
                sorted = False
                unorder_list[j], unorder_list[j+1] = unorder_list[j+1], unorder_list[j]

        unorder_list_idx -= 1
 
    return unorder_list
```

<br>

앞선 소스코드 1, 2보다 비교 단계에서 조금 더 효율적이다. 한 번 패스 스루를 끝내면, 올바른 순서에 위치한 마지막 인덱스는 제외시키고 다음 for문을 반복시키기 때문에 원소의 개수가 N인 데이터라면 N번의 비교 횟수는 항시 절약된다. 또한, 첫번째 패스 스루에서 모든 정렬이 끝난다면 무조건 모두 비교하는 이중 for문과 달리 첫번째 단계에서 끝내기 때문에 상황에 따라 더 빨리 연산을 끝낼 수 있다.

- if 문 중간의 sorted = False : 만약 모든 데이터 원소가 정렬된 상태라면 if 문 안의 sorted = False는 실행하지 않는다. 따라서, sorted = True 인 채로 for 문이 끝나고, while sorted를 빠져나온다.

<br>
<br>

<hr>

<br>
​
### 버블 정렬의 효율성

버블 정렬의 비교, 교환 단계에서 일어나는 횟수를 빅 오 표기법으로 나타내면 O(N2)이다.

- 비교 : 패스 스루를 한 번 완료할 때마다, 올바른 순서에 위치한 마지막 인덱스는 제외시키므로 (N-1) + (N-2) + (N-3) + ... + 1 번 실행한다. 

- 교환 : 최악의 시나리오는 모든 수가 역순으로 배치된 경우다. 비교할 때마다 교환이 일어나므로 (N-1) + (N-2) + (N-3) + ... + 1 번 실행한다.

<br>

데이터 개수 N | 실행 횟수 | N2
------------|---------|--------
5|20|25
10|90|100
20|380|400
40|1560|1600

<br>

버블 정렬의 실행 횟수는 약 N2과 같다. O(N2)은 이차 시간이라고도 부른다. 

<br>
<br>
