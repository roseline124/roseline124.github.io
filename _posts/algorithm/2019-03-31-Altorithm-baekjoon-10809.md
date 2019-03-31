---
layout: post
title:  "[백준 알고리즘#10809] 알파벳 찾기 (python)"
date: 2019-03-31 21:00:59
author: Roseline Song
categories: Algorithm
tags: 자료구조 알고리즘 python Baekjoon
cover: "/assets/dailystudy.jpg"
---


### 문제

알파벳 소문자로만 이루어진 단어 S가 주어진다. 각각의 알파벳에 대해서, 단어에 포함되어 있는 경우에는 처음 등장하는 위치를, 포함되어 있지 않은 경우에는 -1을 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫째 줄에 단어 S가 주어진다. 단어의 길이는 100을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.

<br>

**출력**

각각의 알파벳에 대해서, a가 처음 등장하는 위치, b가 처음 등장하는 위치, ... z가 처음 등장하는 위치를 공백으로 구분해서 출력한다.

만약, 어떤 알파벳이 단어에 포함되어 있지 않다면 -1을 출력한다. 단어의 첫 번째 글자는 0번째 위치이고, 두 번째 글자는 1번째 위치이다.

<br>
<br>

### 해결

{% highlight python %}

alphabet = list(map(chr, range(97, 123)))
al_dict = dict(zip(alphabet, [-1]*26))

string = input()

for i, s in enumerate(string) : 
    if al_dict[s] == -1 : 
        al_dict[s] = i

for v in al_dict.values() : 
    print(v, end=" ")

{% endhighlight %}

<br>
<br>