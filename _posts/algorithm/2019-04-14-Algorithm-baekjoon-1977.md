---
layout: post
title:  "[백준 알고리즘#1977] 완전제곱수 (java,python)"
date: 2019-04-14 16:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

M과 N이 주어질 때 M이상 N이하의 자연수 중 완전제곱수인 것을 모두 골라 그 합을 구하고 그 중 최솟값을 찾는 프로그램을 작성하시오. 예를 들어 M=60, N=100인 경우 60이상 100이하의 자연수 중 완전제곱수는 64,  81,  100 이렇게 총 3개가 있으므로 그 합은 245가 되고 이 중 최솟값은 64가 된다.

<br>

**입력**

첫째 줄에 M이, 둘째 줄에 N이 주어진다. M과 N은 10000이하의 자연수이며 M은 N보다 같거나 작다.

<br>

**출력**

M이상 N이하의 자연수 중 완전제곱수인 것을 모두 찾아 첫째 줄에 그 합을, 둘째 줄에 그 중 최솟값을 출력한다. 단, M이상 N이하의 자연수 중 완전제곱수가 없을 경우는 첫째 줄에 -1을 출력한다.

<br>
<br>

### 풀이 - Java

```java
import java.util.*; // Scanner, ArrayList

public class Main {
	public static void main(String args[]) {

		// 입력 받기
		Scanner scanner = new Scanner(System.in); // Scanner 클래스 객체 생성 
		String input = scanner.nextLine();
		int M = Integer.parseInt(input);		
		
		String input2 = scanner.nextLine();
		int N = Integer.parseInt(input2);
		
		// 완전제곱수 Arraylist
		ArrayList<Integer> perfectSquare = new ArrayList<>();
		
		for(int i=1;i<=100;i++) {
			int s = i*i;
			if((s>=M) && (s<=N)) {
				perfectSquare.add(s);
			}
		}
		
		// 합 구하기 
		int sum = 0;
		
		for(int j=0; j < perfectSquare.size(); j++) {
			sum += perfectSquare.get(j);
		}
		
        // 출력 
		if (perfectSquare.size() == 0 ) {
			System.out.println(-1);
		} else {
			System.out.println(sum); // 합
			System.out.println(perfectSquare.get(0)); // 최소값 : index : arraylist.get(index)
		}
	}
}
```

<br>
<br>


**완전제곱수**

```java
import java.util.*; // Scanner, ArrayList

    ArrayList<Integer> perfectSquare = new ArrayList<>(); // #1
    
    for(int i=1;i<=100;i++) { // #2
        int s = i*i;
        if((s>=M) && (s<=N)) { // #3
            perfectSquare.add(s);
        }
    }
```

<br>


- #1 : `import java.util.ArrayList`로 ArrayList 자료구조를 사용할 수 있다. 
- #2 : 문제에서 완전제곱수는 10000까지의 자연수를 구하면 되므로, 제곱근은 100까지 구하면 된다. 
- #3 : 완전제곱수가 입력받은 M부터 N 까지인 것들만 perfectSquare ArrayList에 추가한다. 

<br>
<br>


**합 구하기**

```java
    int sum = 0;
    
    for(int j=0; j < perfectSquare.size(); j++) {
        sum += perfectSquare.get(j);
    }
```

<br>

perfectSquare ArrayList를 순회하면서 값들을 합한다.

<br>
<br>


**출력**

```java
    if (perfectSquare.size() == 0 ) {
        System.out.println(-1);
    } else {
        System.out.println(sum); // 합
        System.out.println(perfectSquare.get(0)); // 최소값 
    }
```

<br>

M과 N 사이에 완전제곱수가 없는 경우, `perfectSquare.size()`는 0이다. 이 경우, -1을 출력하고 그 외에는 합과 최소값을 출력한다.  

<br>
<br>

### 풀이 - Python

```python
M = int(input())
N = int(input())

# 완전제곱수 리스트
perfect_square = []

for x in range(1,101):
    s = x*x
    if (s>=M) & (s<=N) : # M과 N 사이에 있는 완전제곱수 추가 
        perfect_square.append(s)

# 출력        
if len(perfect_square) == 0 : # 완전제곱수가 없는 경우 
    print(-1)    
else : 
    print(sum(perfect_square)) # 합
    print(perfect_square[0]) # 최소값
```

<br>
<br>



