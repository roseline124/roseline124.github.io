---
layout: post
title:  "[백준 알고리즘#1152] 단어의 개수 (python)"
date: 2019-03-29 21:55:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 백준 알고리즘 1152번

영어 대소문자와 띄어쓰기만으로 이루어진 문자열이 주어진다. 이 문자열에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오. 단, 한 단어가 여러 번 등장하면 등장한 횟수만큼 모두 세어야 한다.

**입력**

첫 줄에 영어 대소문자와 띄어쓰기로 이루어진 문자열이 주어진다. 이 문자열의 길이는 1,000,000을 넘지 않는다. 단어는 띄어쓰기 한 개로 구분되며, 공백이 연속해서 나오는 경우는 없다. 또한 문자열의 앞과 뒤에는 공백이 있을 수도 있다.

**출력**

첫째 줄에 단어의 개수를 출력한다.

<br>
<br>

### 풀이

이 문제에는 공백의 함정이 있다. 매우 쉬운 문제처럼 보이지만 정답 비율이 23.878%인 문제다. 풀이 방법을 보면 '아 뭐야, 이거였어?' 할 수 있지만 반례를 찾아내는 것 또한 쉽지 않다.  
 
1. 문장 앞이나 뒤에 '공백(띄어쓰기)'이 있는 경우
- 문장을 띄어쓰기로 분리하면 '공백'도 리스트 안에 포함된다. 따라서 `list.remove('')`로 공백을 제거해야 한다.

2. 문장 앞뒤 양쪽에 '공백'이 있는 경우
- `list.remove('')`는 공백을 모두 없애는 게 아니라 한 번만 삭제한다. 따라서 양쪽의 공백을 모두 제거해야 한다.

3. 단어가 하나도 없고 공백만 있는 경우 
- 이런 경우에도 공백을 문자열로 인식하므로 위처럼 공백을 제거해야한다.

<br>
<br>


**코드1**
<br>

{% highlight python %}

string = input("")
if string == " ": # 문장 자체가 공백인 경우 
    print(0)
else : 
    words = string.split(" ") # 띄어쓰기로 구분
    
    while '' in words : #문장 양쪽에 있는 공백이 없어질 때까지 반복
        words.remove('')
        
print(len(words))

{% endhighlight %}


<br>
<br>

**코드2**

<br>

{% highlight python %}

string = input("")
words = string.split(" ")
words = [w for w in words if w != ""] # 공백이 아닌 경우에만 words에 넣음 # 리스트 조건제시법
print(len(words)) 

{% endhighlight %}


<br>
<br>



