---
layout: post
title:  "[백준 알고리즘#11399] ATM (Java, Python)"
date: 2019-04-18 23:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon 탐욕알고리즘
cover: "/assets/dailystudy.jpg"
---

### 문제 

인하은행에는 ATM이 1대밖에 없다. 지금 이 ATM앞에 N명의 사람들이 줄을 서있다. 사람은 1번부터 N번까지 번호가 매겨져 있으며, i번 사람이 돈을 인출하는데 걸리는 시간은 Pi분이다.

사람들이 줄을 서는 순서에 따라서, 돈을 인출하는데 필요한 시간의 합이 달라지게 된다. 예를 들어, 총 5명이 있고, P1 = 3, P2 = 1, P3 = 4, P4 = 3, P5 = 2 인 경우를 생각해보자. [1, 2, 3, 4, 5] 순서로 줄을 선다면, 1번 사람은 3분만에 돈을 뽑을 수 있다. 2번 사람은 1번 사람이 돈을 뽑을 때 까지 기다려야 하기 때문에, 3+1 = 4분이 걸리게 된다. 3번 사람은 1번, 2번 사람이 돈을 뽑을 때까지 기다려야 하기 때문에, 총 3+1+4 = 8분이 필요하게 된다. 4번 사람은 3+1+4+3 = 11분, 5번 사람은 3+1+4+3+2 = 13분이 걸리게 된다. 이 경우에 각 사람이 돈을 인출하는데 필요한 시간의 합은 3+4+8+11+13 = 39분이 된다.

줄을 [2, 5, 1, 4, 3] 순서로 줄을 서면, 2번 사람은 1분만에, 5번 사람은 1+2 = 3분, 1번 사람은 1+2+3 = 6분, 4번 사람은 1+2+3+3 = 9분, 3번 사람은 1+2+3+3+4 = 13분이 걸리게 된다. 각 사람이 돈을 인출하는데 필요한 시간의 합은 1+3+6+9+13 = 32분이다. 이 방법보다 더 필요한 시간의 합을 최소로 만들 수는 없다.

줄을 서 있는 사람의 수 N과 각 사람이 돈을 인출하는데 걸리는 시간 Pi가 주어졌을 때, 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.

**입력**

첫째 줄에 사람의 수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄에는 각 사람이 돈을 인출하는데 걸리는 시간 Pi가 주어진다. (1 ≤ Pi ≤ 1,000)

**출력**

첫째 줄에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 출력한다.

<br>
<br>

<hr>

<br>

### 풀이 - Python 

**탐욕 알고리즘**이란? 여러 경우 중 하나를 결정해야 할 때마다 그 순간에 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 해답에 도달한다. (출차:위키피디아) 

즉, **선택의 순간마다 당장 최적의 답이 되는 것을 고른다**. 그리디 알고리즘으로 모든 단계를 끝냈을 때는 반드시 최적의 해를 구한다고 볼 수 없다. 하지만, 고려할 것이 줄어들기 때문에 빠르고 간단한 의사결정이 가능하다. 


<br>

```python
N = int(input())
nums = list(map(int, input().split()))

if N == 1 : #1
    print(nums[0])
else : 
    nums.sort() #2

    i_sum = 0 
    min_sum = 0

    for i in range(N): 
        min_sum += (i_sum + nums[i]) #3
        i_sum += nums[i] #4
        
    print(min_sum)
```
<br>

- #1 : 사람이 한 명일 때는 else문의 for문처럼 list를 순회할 수 없으므로 바로 출력한다. 
- #2 : 사람이 2명 이상인 경우, 돈을 인출하는 데 가장 적은 시간이 드는 순서로 정렬한다. 그래야 누적되는 시간이 줄어든다. 
- #3 : i_sum에는 이전 사람들이 돈을 인출하는 데 걸렸던 시간을 포함한다. nums[i]는 현재 사람이 돈을 인출하는 데 걸리는 시간이다. 이 둘을 더하면 한 사람이 돈을 인출하는 데 걸리는 전체 시간을 구할 수 있다. 그리고 이를 min_sum에 더한다.  
- #4 : i_sum에 현재 사람이 인출하는 데 걸리는 시간을 더해, 다음 사람 순서의 #3에 반영할 수 있도록 한다.

<br>
<br>

<hr>

<br>

### 풀이 - Java

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		// 입력 받기
		Scanner scanner = new Scanner(System.in);
		String N = scanner.nextLine(); // N
		String input = scanner.nextLine(); // ArrayList
		
		// 개수가 1 개일 때.
		if (N=="1") {
			System.out.println(input);
		} else {
		
		// 숫자 ArrayList 만들기 
		ArrayList<Integer> nums = new ArrayList<>();
		List<String> inputList = Arrays.asList(input.split(" "));
		for(String s : inputList) nums.add(Integer.valueOf(s)); 
		
		// 정렬 
		Collections.sort(nums);
		
		// 더하기 
		int i_sum = 0; 
		int min_sum = 0;
		
		for(int i=0; i<nums.size(); i++) {
			min_sum += (i_sum + nums.get(i));
			i_sum += nums.get(i);
		}
			
		System.out.println(min_sum);
		}
	}
}

```

<br>
<br>
