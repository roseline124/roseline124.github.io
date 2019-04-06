---
layout: post
title:  "[백준 알고리즘#2108] 통계학 (python)"
date: 2019-03-22 12:19:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python 정렬 통계학 Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 2108번

수를 처리하는 것은 통계학에서 상당히 중요한 일이다. 통계학에서 N개의 수를 대표하는 기본 통계값에는 다음과 같은 것들이 있다. 단, N은 홀수라고 가정하자.

- 산술평균 : N개의 수들의 합을 N으로 나눈 값
- 중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
- 최빈값 : N개의 수들 중 가장 많이 나타나는 값
- 범위 : N개의 수들 중 최댓값과 최솟값의 차이

N개의 수가 주어졌을 때, 네 가지 기본 통계값을 구하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 수의 개수 N(1 ≤ N ≤ 500,000)이 주어진다. 그 다음 N개의 줄에는 정수들이 주어진다. 입력되는 정수의 절댓값은 4,000을 넘지 않는다.

<br>

**출력**

- 첫째 줄에는 산술평균을 출력한다. 소수점 이하 첫째 자리에서 반올림한 값을 출력한다.
- 둘째 줄에는 중앙값을 출력한다.
- 셋째 줄에는 최빈값을 출력한다. 여러 개 있을 때에는 최빈값 중 두 번째로 작은 값을 출력한다.
- 넷째 줄에는 범위를 출력한다.

<br>
<br>

<hr>

<br>

### 풀이 

**배운 것**

- input()이 안 먹힐 때가 있는데 `sys.stdin.readline()`으로 읽는 방법이 있었다. 
- collections 패키지의 Counter 모듈을 알게 됨. dict(zip())을 이용해서 빈도 수를 셌었는데, 좋은 바퀴를 발견했다.

<br>

collections의 Counter를 쓰지 않을 땐 아래처럼 했다.

<br>

{% highlight python %}

def mode(nums):
    nums = sorted(nums)
    mode_dict = dict(zip(nums, [0]*len(nums)))
    
    for n in nums : 
        mode_dict[n] += 1
        
    modes = [ k for k, v in mode_dict.items() if v == max(mode_dict.values())]

    ...(생략)...

{% endhighlight %}

<br>

**성공 코드**

```python
import sys 
from collections import Counter

#main
t = int(sys.stdin.readline())

numbers = []
for _ in range(t):
    numbers.append(int(sys.stdin.readline()))
    
def mean(nums):
    return round(sum(nums)/len(nums))

def median(nums):
    nums.sort()
    mid = nums[len(nums)//2] # nums의 개수는 홀수
    
    return mid

def mode(nums):
    mode_dict = Counter(nums)
    modes = mode_dict.most_common()    
    
    if len(nums) > 1 : 
        if modes[0][1] == modes[1][1]:
            mod = modes[1][0]
        else : 
            mod = modes[0][0]
    else : 
        mod = modes[0][0]

    return mod
        
def scope(nums):
    return max(nums) - min(nums)

print(mean(numbers))
print(median(numbers))
print(mode(numbers))
print(scope(numbers))
```

<br>

**오류의 원인**

오류의 원인이었던 mode 함수만 다시 살펴본다. 

<br>

```python
def mode(nums):
    mode_dict = Counter(nums) 
    modes = mode_dict.most_common() #1  
    
    if len(nums) > 1 : 
        if modes[0][1] == modes[1][1]: #2
            mod = modes[1][0]
        else : 
            mod = modes[0][0]
    else : 
        mod = modes[0][0] #3

    return mod
```

<br>

- #1 : from collections import Counter 에서 Counter로 만든 딕셔너리는 most_common() 함수로 최빈값을 찾을 수 있다. 이때, 같은 빈도를 가지는 수는 원래 시퀀스에 있던 순서대로 나열된다. median 함수에서 sort()함수로 이미 nums 시퀀스를 정렬했으므로 다시 정렬해줄 필요 없다. 

- #2 : modes[0][1]은 가장 앞에 있는 최빈값의 빈도수이다. modes[1][1]은 그 다음 최빈값의 빈도수이다. 이 둘이 같다면 최빈값이 최소 2개 이상 있다는 뜻인데, 이 경우, 두번째로 작은 값을 채택해야 하므로 modes[1][0]을 mod에 저장한다.  

- #3 : 만약 modes의 개수가 1라면 맨 첫번째 수를 mod에 저장한다.

<br>
<br>


**아래는 계속해서 틀렸던 코드**

<br>

{% highlight python %}
def mean(nums):
    return round(sum(nums)/len(nums))

def median(nums):
    nums = sorted(nums)
    idx = round(len(nums)/2)
    return nums[idx]

def mode(nums):
    from collections import Counter
    mode_dict = Counter(nums)
    modes = [ k for k, v in mode_dict.items() if v == max(mode_dict.values())]
    modes = sorted(modes)

    return modes[0] if len(modes) == 1 else modes[1]
        
def scope(nums):
    return max(nums) - min(nums)

# main
import sys
 
t = int(sys.stdin.readline())

numbers = []
for _ in range(t):
    numbers.append(int(sys.stdin.readline()))

print(mean(numbers))
print(median(numbers))
print(mode(numbers))
print(scope(numbers))
{% endhighlight %}

<br>
<br>

