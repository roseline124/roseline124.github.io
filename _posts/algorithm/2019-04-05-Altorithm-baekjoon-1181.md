---
layout: post
title:  "[백준 알고리즘#1181] 단어 정렬하기 (python)"
date: 2019-04-05 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.

- 길이가 짧은 것부터
- 길이가 같으면 사전 순으로

<br>

**입력**

첫째 줄에 단어의 개수 N이 주어진다. (1≤N≤20,000) 둘째 줄부터 N개의 줄에 걸쳐 알파벳 소문자로 이루어진 단어가 한 줄에 하나씩 주어진다. 주어지는 문자열의 길이는 50을 넘지 않는다.

<br>

**출력**

조건에 따라 정렬하여 단어들을 출력한다. 단, 같은 단어가 여러 번 입력된 경우에는 한 번씩만 출력한다.

<br>
<br>

### 해결

```python
import sys 
from collections import defaultdict

strings = sys.stdin.read().splitlines() 
strings = set(strings[1:])

dict_str = {}

for s in strings : 
    dict_str[s] = len(s)
    
# 단어 길이 정렬
len_ordered_words = sorted(dict_str.items(), key=lambda x:x[1])   


# 개수 별로 단어 묶기
dic_ordered_words = defaultdict(lambda : -1)

for w in len_ordered_words : 
    if dic_ordered_words[w[1]] == -1 : 
        dic_ordered_words[w[1]] = [w[0]]
    else : 
        dic_ordered_words[w[1]].append(w[0])
        
# 단어 사전 정렬
for l, w in dic_ordered_words.items() : 
    if len(w) > 1 : 
        dic_ordered_words[l] = sorted(w)
        
# 출력
for words in dic_ordered_words.values():
    for w in words : 
        print(w)
```

<br>

**입력 받기** 

```python
import sys 
from collections import defaultdict

strings = sys.stdin.read().splitlines() #1
strings = set(strings[1:]) #2
```

<br>

- #1 : 입력을 빨리 받으려면 `sys.stdin.read()`로 한꺼번에 읽어들인 뒤 `splitlines`로 한줄한줄 나눈다. 
- #2 : 첫줄에는 단어의 개수가 주어지므로, `strings[1:]`로 첫줄을 제외한다. 또한, 중복된 단어는 제외하므로 set()으로 중복을 제거해준다. (집합 set은 중복을 허용하지 않는다.)

<br>
<br>

**단어 길이 순으로 정렬**

```python
dict_str = {}

for s in strings : 
    dict_str[s] = len(s) #1
    
# 단어 길이 정렬
len_ordered_words = sorted(dict_str.items(), key=lambda x:x[1]) #2
```

<br>

- #1 : 길이 별로 구분하기 위해 `{'i':1, 'im':2, 'no':2, ...}`와 같은 사전형태로 만들어준다.

- #2 : 단어와 단어 길이로 매핑한 사전을 `sorted()`로 정렬해준다. key 옵션에는 함수로 '어떤 기준으로 정렬'할 지 알려줄 수 있다. `dict_str.itmes()`는 ('i', 1)과 같은 형태로 단어, 단어 길이의 쌍으로 묶여 있다. 따라서, x[0]은 단어, x[1]은 단어 길이에 해당한다. key 옵션에서는 x[1]를 기준으로 정렬하므로 즉, '단어 길이'를 기준으로 정렬한다는 의미가 된다.

<br>
<br>


**길이 별로 묶기**

단어 길이가 같을 경우는 다시 사전 순으로 정렬해야한다. 따라서, 같은 길이의 단어들끼리 다시 묶어준 다음, 다시 사전순으로 정렬해줘야 한다. 

<br>

```python
# 개수 별로 단어 묶기
dic_ordered_words = defaultdict(lambda : -1) #1

for w in len_ordered_words : 
    if dic_ordered_words[w[1]] == -1 : #2
        dic_ordered_words[w[1]] = [w[0]] #3
    else : 
        dic_ordered_words[w[1]].append(w[0]) #4
```

<br>

- #1 : defaultdict로 사전의 기본값을 -1로 정해줬다. 사전에 없는 key로 value를 할당하면 keyerror가 나기때문에 이를 방지하기 위해 defaultdict를 썼다. 
- #2 : dic_ordered_words의 key인 w[1]은 단어의 길이다. w[1]에 해당하는 value가 비어있는 상태면 기본값인 -1일 것이다.    
- #3 : value가 비어있는 상태이므로 리스트 형태로 단어 w[0]을 추가해준다. 리스트로 추가하는 이유는, 같은 길이에 해당하는 단어도 묶기 위해서이다. 
- #4 : 기본값이 -1이 아니라면 이미 다른 단어가 추가되어있는 상태라는 것이다. 따라서, 리스트에 append() 함수로 다른 단어를 추가해줄 수 있다.  

<br>
<br>

**사전 정렬**

<br>

```python
# 단어 사전 정렬
for l, w in dic_ordered_words.items() : #1
    if len(w) > 1 : 
        dic_ordered_words[l] = sorted(w) #2

# 출력
for words in dic_ordered_words.values(): #3
    for w in words : 
        print(w)
```

<br>

- #1 : 같은 길이의 단어들을 다시 사전 정렬하기 위해 길이(l), 단어 리스트(w)를 쌍으로 꺼낸다. 
- #2 : 단어 리스트를 sorted()로 정렬하고 이를 다시 dic_ordered_words[l], 즉 원래의 단어 리스트에 다시 저장한다. 이때, 단어 리스트가 하나라면, 굳이 정렬할 필요가 없으므로 if 조건을 넣었다. 
- #3 : 출력 

<br>
<br>











