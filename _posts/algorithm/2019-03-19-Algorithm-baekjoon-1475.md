---
layout: post
title:  "[백준 알고리즘#1475] 방 번호 구하기 - 최소 세트 개수 (Python)
"
date: 2019-03-19 09:33:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python 규칙
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1475번

<br>


다솜이는 은진이의 옆집에 새로 이사왔다. 다솜이는 자기 방 번호를 예쁜 플라스틱 숫자로 문에 붙이려고 한다.

다솜이의 옆집에서는 플라스틱 숫자를 한 세트로 판다. 한 세트에는 0번부터 9번까지 숫자가 하나씩 들어있다. 다솜이의 방 번호가 주어졌을 때, 필요한 세트의 개수의 최솟값을 출력하시오. (**6은 9를 뒤집어서 이용할 수 있고, 9는 6을 뒤집어서 이용**할 수 있다.)

**입력** 

첫째 줄에 다솜이의 방 번호 N이 주어진다. N은 1,000,000보다 작거나 같은 자연수 또는 0이다.

**출력**

첫째 줄에 필요한 세트의 개수를 출력한다.

<br>



### 풀이1 (Python)

<br>

{% highlight python %}
import math

room_num = list(map(int, str(input())))

k = range(9)
v = [0]*len(k)
num_set = dict(zip(k, v))

for n in room_num : 
    if (n==6) | (n==9) :
        num_set[6] += 0.5

    else:
        num_set[n] += 1
    
answer = math.ceil(max(num_set.values()))
print(answer)
{% endhighlight %}

<br>

### 풀이2 : 조금 더 간단하게

<br>

{% highlight python %}
import math

room_num = list(map(int, str(input())))
num_set = [0]*9

for n in room_num : 
    
    if (n==6) | (n==9) :
        num_set[5] += 0.5
    else:
        num_set[n] += 1
    
answer = math.ceil(max(num_set))
print(answer)
{% endhighlight %}

