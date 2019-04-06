---
layout: post
title:  "[백준 알고리즘#1427] 소트인사이드 (python)"
date: 2019-04-06 21:20:59
author: Roseline Song
categories: Algorithm
tags: 정렬 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

배열을 정렬하는 것은 쉽다. 수가 주어지면, 그 수의 각 자리수를 내림차순으로 정렬해보자.

<br>

**입력**

첫째 줄에 정렬하고자하는 수 N이 주어진다. N은 1,000,000,000보다 작거나 같은 자연수이다.

<br>

**출력**

첫째 줄에 자리수를 내림차순으로 정렬한 수를 출력한다.

<br>
<br>

<hr>

<br>


### 해결

```python
nums = input()
nums = [int(n)  for n in nums]

ordered_nums = sorted(nums, reverse=True)

for n in ordered_nums : 
    print(n, end="")
```

<br>
<br>
