---
layout: post
title:  "[자료구조와 알고리즘 - 기초#3] 알고리즘과 연산
"
date: 2019-01-15 06:04:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 
cover: "/assets/dailystudy.jpg"
---

<br>

저번 포스팅에서는 자료 구조의 특징에 따라 연산 속도가 어떻게 변화하는지 보았다. 집합의 '중복을 허용하지 않는다'는 특징때문에 삽입 연산에서 배열에 비해 N단계가 추가된 2N+1 단계가 필요했다. 이번에는 검색 알고리즘을 예시로, 알고리즘에 따라 연산 속도가 어떻게 변하는지 본다. 


<br>
<br>

<hr>

<br>

### 정렬된 배열 

정렬된 배열은 순서가 있는, 순서대로 요소가 나열된 배열이다. **정렬 배열은 특정한 검색 알고리즘과 만났을 때 효과를 발휘**한다. 정렬 배열의 예로 [10, 20, 30, 40, 50]이 있다고 하자. 새로운 데이터 '35'로 삽입 연산을 실행할 경우, 일반 배열은 맨 끝에 데이터를 삽입해 한 단계면 끝난다. 하지만, 정렬 배열은 순서를 고려해야 한다. '10보다 크고, 20보다 크고, 30보다 크고, 40보다 작다'는 결과를 내기 위해 10부터 40까지 총 4번을 비교하고(4단계), 삽입할 자리를 비우기 위해 40과 50을 오른쪽으로 밀고(2단계), 마지막으로 적절한 위치에 '35'를 삽입한다(1단계). 일반 배열에 비해 6단계나 더 소요되었다. 

​

정렬 배열은 일반 배열보다 덜 효율적으로 보일 수 있다. 하지만, 앞서 말했듯이 검색 연산에 있어서는 알고리즘에 따라 더 효율적인 연산 속도를 보인다. 검색에는 이전 포스팅에서 보았듯이 찾고자 하는 데이터와 기존 데이터를 하나하나 비교해보며 찾는 '선형 검색'이 있었다. 하지만 이외에도 '이진 검색'이라는 알고리즘이 있다. 
​
<br>
<br>

<hr>

<br>

### 이진 검색 알고리즘 : UpDown 게임

<img src="https://postfiles.pstatic.net/MjAxOTAxMTRfMTkg/MDAxNTQ3Mzk0MjAzMzU0.8aL5kCCmxSqOpiG7jNzG5mXKg5-msXVZQA8kmy10eogg.5Xrcyegmf04XqPSGDEErAeCmHv-wE1VOyMSxN-jIuS8g.JPEG.guseod24/eiliv-sonas-aceron-697462-unsplash.jpg?type=w966" style="width:400px;">

<br>

언젠가 술자리에서 소주 뚜껑에 있는 번호 맞추기 게임을 해본 적이 있을 것이다. 미성년자라면 번호 맞추기 게임이라고 생각하면 된다. 1부터 100까지 상대방이 머릿 속에 떠올린 특정한 숫자를 맞추는 게임이다. 본인이 독심술을 쓰는 게 아니라면, 가장 최단으로 맞출 수 있는 방법을 고려해야 한다. 우리는 독심술을 못 쓰니까 이진 검색 알고리즘을 사용해보자. 

용어는 어렵지만 원리는 간단하다. 제일 먼저 반으로 나눈다. 50이상인가? Yes or No의 대답만 얻어도 나머지 50의 경우는 고려하지 않아도 된다. 그리고 다시 25로 나누고, 13으로 나누고.. 이렇게 반씩 나눠가며 경우의 수를 좁혀간다.

<br>
<br>

​<hr>

<br>

### 코드로 연산 속도 비교하기 (정렬 배열) 

**정렬 배열 선형 검색**

<br>

```python
def linearSearch(key) :

    arr = list(range(1,101))
    step = 0

    for i in range(len(arr)) :

        if key != arr[i] :
            step += 1
        elif key < arr[i] :
            step += 1
            print("failed")
            break 
        elif key == arr[i] :
            step += 1 
            print("successed")
            break


    print("linear | step : ", step)
    return step 
```

<br>

- 각 단계를 실행할 때마다 step을 하나씩 증가시킨다.
- else if (arr[i] > key) : 원하는 값보다 더 높은 값을 만나면 실행을 멈춘다. 정렬 배열이기 때문에, 찾으려고 하는 key 값 그 이상의 값은 찾지 않아도 된다.

<br>
<br>

**정렬 배열 이진 검색**

<br>

```python
def binSearch(key) :

    arr = list(range(1,101))
    step = 0

    first = arr[0] # 1
    last = arr[len(arr)-1] # 100

    for i in range(len(arr)) :

        border = round((first + last)/2) 

        if key > border : 
            first = border + 1 
            step += 1
        elif key < border : 
            last = border -1 
            step += 1
        elif key == border :
            step += 1            
            break

    print("bin | step : ", step)
    return step 
```

<br>
<br>

**실행 결과**

<br>

```python
linearSearch(100) # 선형 검색으로 100을 찾는다.
binSearch(100) # 이진 검색으로 100을 찾는다.

>>>
linear | step :  100 # 선형 검색
bin | step :  6 # 이진 검색
```

<br>

정렬 배열은 일반 배열보다 삽입 연산은 훨씬 느리지만, 검색 연산에서 만큼은 이진 검색 알고리즘을 통해 속도를 높일 수 있다. 자료 구조와 알고리즘에 따라 연산 속도는 달라진다. 정답은 없되, 최선을 구하기 위해서는 상황에 맞게 골라 써야 한다.

<br>
<br>
