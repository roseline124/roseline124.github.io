---
layout: post
title:  "[백준 알고리즘#11047] 동전 0 (Java, Python)"
date: 2019-04-18 23:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon 탐욕알고리즘
cover: "/assets/dailystudy.jpg"
---

### 문제 

준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.


**입력**

첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)

둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)


**출력**

첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다

<br>
<br>

<hr>

<br>

### 풀이 - Java 


```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine(); // 동전 개수, 목표 가치 
		
		// 동전 개수 N, 목표 가치 K
		int N = Integer.parseInt(input.split(" ")[0]);
		int K = Integer.parseInt(input.split(" ")[1]);
		
		// 동전 종류 입력 받기 
		ArrayList<Integer> coins = new ArrayList<>(); 

		for(int i=0; i<N; i++) {
			coins.add(sc.nextInt());
		}
		
		// 최소 동전 개수 구하기 
		int coinNum = 0;
		
		for(int j=N-1; j>=0; j--) { // 인덱스 끝부터 시작
			int coin = coins.get(j);
			
			if(K >= coin) {
				int q = K/coin;
				K -= coin*q; 
				coinNum += q;
			} // if 문 
		} // for문 
		
		System.out.println(coinNum);
	}
}
```

<br>
<br>

**입력 받기**

coins라는 이름의 ArrayList를 만들고, `sc.nextInt()`로 동전의 개수만큼 입력 받는다.

<br>

```java
Scanner sc = new Scanner(System.in);
String input = sc.nextLine(); // 동전 개수, 목표 가치 

// 동전 개수 N, 목표 가치 K
int N = Integer.parseInt(input.split(" ")[0]);
int K = Integer.parseInt(input.split(" ")[1]);

// 동전 종류 입력 받기 
ArrayList<Integer> coins = new ArrayList<>(); 

for(int i=0; i<N; i++) {
    coins.add(sc.nextInt()); 
}
```


<br>
<br>

**최소 동전 개수 구하기**

목표 값인 K보다 작으면서도 가장 큰 가치를 지닌 동전을 찾기 위해 인덱스 끝부터 순회한다. 
\#1을 설명하자면, 현재 동전의 가치(이하 coin)가 K보다 작다면, coin으로 K를 나눈 몫을 q(qoutient, 몫) 변수에 담는다. 그 다음, 현재 coin 값과 q를 곱한 후 K에서 빼서, K를 최대한 작게 만든다. 문제에서 원하는 것은 최소 동전 개수이므로, 동전 개수 q를 coinNum에 더한다. 

<br>

```java
int coinNum = 0;

for(int j=N-1; j>=0; j--) { // 인덱스 끝부터 시작
    int coin = coins.get(j); 
    
    if(K >= coin) { // #1
        int q = K/coin;
        K -= coin*q; 
        coinNum += q;
    } // if 문 
} // for문 

System.out.println(coinNum);
```

<br>
<br>

<hr>

<br>

### 풀이 - Python

풀이는 자바와 같다. 

```python
# 입력 받기 
N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]

# 최소 동전 개수 구하기 
coin_num = 0

for i in range(1,N+1):
    # 인덱스 끝부터 순회 : 마이너스 인덱스 
    coin = coins[-i]
    
    if K >= coin : 
        num = K//coin
        K -= coin*num
        coin_num += num
        
print(coin_num)
```

<br>
<br>
