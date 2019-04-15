---
layout: post
title:  "[백준 알고리즘#1978] 소수 찾기 (java,python)"
date: 2019-04-15 12:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하시오.

<br>

**입력**

첫 줄에 수의 개수 N이 주어진다. N은 100이하이다. 다음으로 N개의 수가 주어지는데 수는 1,000 이하의 자연수이다.

<br>

**출력**

주어진 수들 중 소수의 개수를 출력한다.

<br>
<br>

<hr>

<br>

### 풀이 - Java

<br>

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		// 입력 받기 
		Scanner scanner = new Scanner(System.in);
		String _ = scanner.nextLine();
		String input = scanner.nextLine();
		
		// 숫자 ArrayList 만들기 
		ArrayList<Integer> nums = new ArrayList<>(); // make nums ArrayList
		List<String> inputList = Arrays.asList(input.split(" ")); // split input -> inputList
		for(String s : inputList) nums.add(Integer.valueOf(s)); // for-each
		
		// Filtering 
		nums.removeIf(n -> ((n%3==0)&&(n!=3)) || ((n%2==0)&&(n!=2)) || (n==1) || (n==4));
		
		// Count Prime Numbers
		int count = 0;
			for(int i=0; i<nums.size(); i++) {
				boolean is_prime = true;
				int curr = nums.get(i); // 현재 값
				double sqrt_c = Math.sqrt(curr);
				
				for(int j=2; j<(Math.round(sqrt_c+1)); j++) {
					if(curr%j == 0) {
						is_prime = false;
						break;
					} // if
				} // inner for문 
				
				if(is_prime==true) {
					count += 1;
				} // if
				
			} // outer for문
			
		System.out.println(count);
	}
}
```

<br>

**입력 받기**

```java
    Scanner scanner = new Scanner(System.in);
    String _ = scanner.nextLine();
    String input = scanner.nextLine();
```

<br>

첫번째 입력값은 사용하지 않으므로 `String _`와 같이 변수명을 '_' 으로 설정.  

<br>

**숫자 ArrayList 만들기**

```java
    ArrayList<Integer> nums = new ArrayList<>(); // #1
    List<String> inputList = Arrays.asList(input.split(" ")); // #2 
    for(String s : inputList) nums.add(Integer.valueOf(s)); // for-each
```

<br>

- #1 : String에서 Integer로 캐스팅한 숫자들을 담아줄 ArrayList nums 생성
- #2 : `input.split(" ")` input 변수에 담긴 입력 값을 띄어쓰기로 구분하여 나눈다. 값은 inputList에 담는다. 
- #3 : inputList에 있는 값은 String 타입이기 때문에, Integer 형으로 캐스팅한다. for-each문으로 값을 하나씩 꺼내 `Integer.valueOf()`로 정수형으로 변환하고, nums ArrayList에 추가한다.

<br>

**필터링**

```java
    nums.removeIf(n -> ((n%3==0)&&(n!=3)) || ((n%2==0)&&(n!=2)) || (n==1) || (n==4));
```

<br>

`ArrayList.removeIf()`로 안에 있는 값들을 필터링하여 제거할 수 있다. 
3 또는 2로 나누어지는 경우 소수가 아니기 때문에 소수인 2와 3은 제외하고 삭제한다. 
다음 코드에서 2부터 주어진 수의 제곱근까지 순회하며 소수를 찾는데, 1과 4는 이 루프문의 예외에 해당하므로 제거한다. 


<br>


**소수 찾기**

```java
    int count = 0;

        for(int i=0; i<nums.size(); i++) { // #1
            boolean is_prime = true; 
            int curr = nums.get(i); // #2
            double sqrt_c = Math.sqrt(curr); // #3 
            
            for(int j=2; j<(Math.round(sqrt_c+1)); j++) { // #4
                if(curr%j == 0) { // #5
                    is_prime = false;
                    break;
                } // if
            } // inner for문 
            
            if(is_prime==true) { // #6 
                count += 1;
            } // if
            
        } // outer for문
```

<br>

- #1 : nums Arraylist를 순회
- #2 : 현재 값이 소수인지 판단하기 위해, `nums.get(i)`로 현재 값을 꺼내 curr 변수에 담는다. 
- #3 : 다음 for문에서, 2부터 제곱근까지 나눠보면서 소수 여부 판단. 제곱근은 `Math.sqrt()`로 구한다.
- #4 : Math.round()로 제곱근 값에 1더한 값을 반올림한다. 1을 더한 이유는 '등호'가 포함되지 않기 때문에 2*2나 5*5와 같이 완전 제곱수의 경우 j에는 2와 5보다 작은 값까지만 할당되기 때문이다.  
- #5 : 현재값 curr을 j로 나누었을 때 0으로 나누어 떨어지면 소수가 아니기 때문에 is_prime에 false를 할당하고 break문으로 inner for문을 빠져나온다. 
- #6 : `is_prime == true` 즉, 소수인 경우 count에 1을 더한다. 


<br>
<br>

<hr>

<br>

### 풀이 - Python

위의 내용을 python으로 옮기면 다음과 같다. 

<br>

```python
_ = input()
nums = list(map(int, input().split()))
nums = [ n for n in nums if not (n==1)|(n==4)| \
        ((n%2==0)&(n!=2))|((n%3==0)&(n!=3))]

import math 

count = 0

for num in nums : 
    is_prime = True

    for n in range(2, round(math.sqrt(num)+1)) : 
        if num%n == 0 :
            is_prime = False
            break
            
    if is_prime : 
        count += 1   
        
print(count)
```

<br>
<br>
