---
layout: post
title:  "[백준 알고리즘#1094] 막대기 (Java, Python)"
date: 2019-05-04 17:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon 시뮬레이션
cover: "/assets/dailystudy.jpg"
---

### 문제 

지민이는 길이가 64cm인 막대를 가지고 있다. 어느 날, 그는 길이가 Xcm인 막대가 가지고 싶어졌다. 지민이는 원래 가지고 있던 막대를 더 작은 막대로 자른다음에, 풀로 붙여서 길이가 Xcm인 막대를 만들려고 한다.

막대를 자르는 가장 쉬운 방법은 절반으로 자르는 것이다. 지민이는 아래와 같은 과정을 거쳐서 막대를 자르려고 한다.

지민이가 가지고 있는 막대의 길이를 모두 더한다. 처음에는 64cm 막대 하나만 가지고 있다. 이때, 합이 X보다 크다면, 아래와 같은 과정을 반복한다.
가지고 있는 막대 중 길이가 가장 짧은 것을 절반으로 자른다.
만약, 위에서 자른 막대의 절반 중 하나를 버리고 남아있는 막대의 길이의 합이 X보다 크거나 같다면, 위에서 자른 막대의 절반 중 하나를 버린다.
이제, 남아있는 모든 막대를 풀로 붙여서 Xcm를 만든다.
X가 주어졌을 때, 위의 과정을 거친다면, 몇 개의 막대를 풀로 붙여서 Xcm를 만들 수 있는지 구하는 프로그램을 작성하시오. 


**입력**

첫째 줄에 X가 주어진다. X는 64보다 작거나 같은 자연수이다.

**출력**

문제의 과정을 거친다면, 몇 개의 막대를 풀로 붙여서 Xcm를 만들 수 있는지 출력한다.

<br>
<br>

<hr>

<br>

### 풀이 - Java 

<br>

```java
import java.util.*;

public class Main {
	public static int arraySum(ArrayList<Integer> arr) { 
		int output = 0;
		for (int a : arr) {
			output += a;
		}
		return output;
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int X = sc.nextInt();
		int bars[] = {32, 16, 8, 4, 2, 1, 1};
		ArrayList<Integer> b_sum = new ArrayList<>();
		
		for(int b : bars) {
			if (b<=X  && arraySum(b_sum) + b <= X) {
				b_sum.add(b);
			}
		}
		
		if (X==64) {
			System.out.println(1);
		} else {
			System.out.println(b_sum.size());
		}
	}
}
```


<br>
<br>

**ArrayList 원소의 합 구하기**

<br>

ArrayList의 합을 구하는 메서드가 자바 API에 따로 없는 것 같아서 만들었다.

```java
	public static int arraySum(ArrayList<Integer> arr) {  // #1
		int output = 0; 
		for (int a : arr) { // #2
			output += a;
		}
		return output;
	}
```

<br>

- #1 : return 값의 데이터 유형이 int이기 때문에 arraySum 함수명 앞에 `int`를 붙인다. 매개변수는 int 원소들이 들어있는 ArrayList로 지정한다.
- #2 : for-each 문으로 arr 내의 원소들을 하나씩 꺼내 a에 담고 output에 더한다.

<br>
<br>

**main 함수**

<br>

64cm를 반으로 계속 쪼개면 32, 16, 8, 4, 2, 1, 1 의 총 7개 막대기가 남는다. 순회하면서 

1. 자신의 길이가 X보다 작고, 
2. 자신과 다른 막대기들을 합했을 때 X보다 작다면 활용 가능한 막대기들의 배열 b_sum에 넣는다. 

예를 들어 X가 23이라면, 32는 1번 조건에 부적합하므로 활용할 수 없고, 16은 1번 2번 조건 모두 만족하므로 가능하다.
8은 1번은 만족하지만, 16과 8을 더했을 때 24이므로 2번 조건에는 부합하지 않는다. 나머지 4,2,1은 1번 2번 조건 모두 만족하므로 b_sum 배열에 들어간다. bars를 모두 순회한 후, b_sum의 크기를 구하면 16, 4, 2, 1 막대기들이 있으므로 size는 4가 나온다.     

<br>

```java
public static void main(String[] args) {
        // #1 : 입력 받기
		Scanner sc = new Scanner(System.in);
		int X = sc.nextInt();

        // #2 : 활용 가능한 막대기 배열
		int bars[] = {32, 16, 8, 4, 2, 1, 1};
		ArrayList<Integer> b_sum = new ArrayList<>();
		
        // #3 : 모두 합할 때 X와 같아지도록 하는 배열 b_sum  
		for(int b : bars) {
			if (b<=X  && arraySum(b_sum) + b <= X) {
				b_sum.add(b);
			}
		}
		
        // #4 : 64인 경우는 예외적인 경우이므로 1 출력 
		if (X==64) {
			System.out.println(1);
		} else {
			System.out.println(b_sum.size());
		}
	}
```

<br>

- #1 : Scanner 객체로 입력 받는다.
- #2 : 문제대로 막대기를 계속 쪼개면, 64cm 막대는 `{32, 16, 8, 4, 2, 1, 1}`의 총 7개의 막대기로 구성된다.
- #3 : bars를 순회하며, 원소들을 b에 하나씩 담는다. 현재 막대기 b가 X보다 작고, b_sum ArrayList 안의 막대기들과 b를 합했을 때 X보다 작다면 b_sum에 b를 추가한다.
- #4 : X가 64인 경우는 1을, 그렇지 않은 경우는 활용 가능한 막대기들이 담긴 b_sum의 원소 개수를 반환한다. 

<br>
<br>

<hr>

<br>

### 풀이 - Python 

<br>

파이썬으로는 더 간단하게 나타낼 수 있다. 풀이 방식은 자바와 같다. 

<br>

```python
X = int(input())

bars = [32, 16, 8, 4, 2, 1, 1]

b_sum = []
for b in bars : 
    if (b <= X) & ((sum(b_sum) + b) <= X) :
        b_sum.append(b)

if X == 64 : 
    print(1)
else : 
    print(len(b_sum))
```

<br>
<br>
