---
layout: post
title:  "[백준 알고리즘#1038] 감소하는 수 (Java, Python)"
date: 2019-04-16 23:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python java Baekjoon
cover: "/assets/dailystudy.jpg"
---

### 문제 

음이 아닌 정수 X의 자릿수가 가장 큰 자릿수부터 작은 자릿수까지 감소한다면, 그 수를 감소하는 수라고 한다. 예를 들어, 321과 950은 감소하는 수지만, 322와 958은 아니다. N번째 감소하는 수를 출력하는 프로그램을 작성하시오. 0은 0번째 감소하는 수이고, 1은 1번째 감소하는 수이다. 만약 N번째 감소하는 수가 없다면 -1을 출력한다.

**입력**

첫째 줄에 N이 주어진다. N은 1,000,000보다 작거나 같은 자연수 또는 0이다.

**출력**

첫째 줄에 N번째 감소하는 수를 출력한다.

<br>
<br>

<hr>

<br>

### 풀이 - Java 

```java
import java.util.*;

public class Main {
	public static ArrayList getDownNumber(long num, int digit, ArrayList downNumList) {
			
		if(digit > 10) {
			return downNumList;
		}
		
		downNumList.add(num);
		
		for(int i=0; i<10; i++) {
			if(num%10 > i) {
				getDownNumber((num*10) + i, digit+1, downNumList);
			}
		}
		
		return downNumList;
	}
	
	public static void main(String[] args) {
		
		// 입력 받기 
		Scanner scanner = new Scanner(System.in);
		String input = scanner.nextLine();
		int idx = Integer.parseInt(input);
		
		// 감소하는 수 리스트 만들기 
		ArrayList<Integer> downNumList = new ArrayList<>();
		
		for(int num=0; num<10; num++) {
			 getDownNumber(num, 1, downNumList);
		}
		
		// 정렬
		Collections.sort(downNumList);
		
		if(idx >= 1023) {
			System.out.println(-1);
		}
		else {
			System.out.println(downNumList.get(idx));
		}
	}
}
```

<br>
<br>

**감소하는 수 만들기**

숫자를 1부터 증가시켜가며 찾으면 '시간초과'로 실패 판정이 난다. 
브루트포스(무차별 대입) 기법이지만, **감소하는 수들의 규칙**을 찾아야 한다. 
감소하는 수들은 0 10 210 3210 43210 처럼 앞에 1씩 증가한 숫자가 계속 붙는다. 

<br>

```java
	public static ArrayList getDownNumber(long num, int digit, ArrayList downNumList) { // #1
			
		if(digit > 10) { // #2
			return downNumList;
		}
		
		downNumList.add(num); // #3
		
		for(int i=0; i<10; i++) { 
			if(num%10 > i) { // #4
				getDownNumber((num*10) + i, digit+1, downNumList); // #5
			}
		}
		
		return downNumList;
	}
```

<br>

- #1 : 매개변수 num의 타입을 int로 쓰면 10자리 숫자인 '9876543210'은 처리하지 못한다. 이런 경우를 방지하기 위해 **long 타입을 사용**한다.
- #2 : 재귀의 깊이는 최대 9번까지 허용한다. 맨 앞자리 수가 9인 경우, 뒤의 수는 최대 9번까지 붙을 수 있다. ex) 9'876543210'
- #3 : downNumList에 현재 숫자를 푸시한다.
- #4, #5 : num의 1의 자리 수가 i보다 크다면, 재귀 호출한다. 아래처럼 실제로 어떻게 돌아가는지 확인해보자.  

<br>

main함수에서 for문을 돌며 인자로 0부터 9까지 넘겨준다. 이 수들은 **매개변수 num에 전달되며, 맨 앞자리 수를 의미**한다.
getDownNumber함수에서 num이 3일 때는, #4의 if문에 따라 i=0,1,2인 경우 재귀 호출한다. -> 30, 31, 32  

이제 #5를 보자. 

num=30) 30은 #4를 만족하지 못하므로 i=0일 때 return 문으로 빠져나온다. 

num=31) num에 31을 지정하며 getDownNumber() 함수를 다시 호출한다. 이때는 `31%10=1`이므로 i=0일 때 #4를 만족한다. num에 310을 지정하여 재귀 호출하고 -> #4 불만족시키므로 -> return. 

num=32) num에 32지정하여 재귀 호출 -> i=0,1인 경우 만족 -> 320, 321로 재귀 호출 -> 320은 #4불만족 / 321은 i=0일 때 만족 -> 3210으로 재귀호출 -> #4 불만족 

이렇게 해서 3일 때는 `[3, 30, 31, 310, 32, 320, 321, 3210]` 의 감소하는 수를 만든다. 

<br>
<br>

**main 함수**

<br>

```java
public static void main(String[] args) {
		
		// 입력 받기 
		Scanner scanner = new Scanner(System.in);
		String input = scanner.nextLine();
		int idx = Integer.parseInt(input);
		
		// #1 : 감소하는 수 리스트 만들기 
		ArrayList<Integer> downNumList = new ArrayList<>();
		
		for(int num=0; num<10; num++) {
			 getDownNumber(num, 1, downNumList);
		}
		
		// #2 : 정렬
		Collections.sort(downNumList);
		
        // #3 : 필터링
		if(idx >= 1023) {
			System.out.println(-1);
		}
		else {
			System.out.println(downNumList.get(idx));
		}
	}
```

<br>

- #1 : 위에서 설명한 getDownNumber() 함수로 리스트를 만든다. 함수가 사용할 ArrayList를 만들어준 후, for문으로 맨 앞자리 수를 0부터 9까지 num으로 전달한다. getDownNumber() 함수에서 재귀적으로 0, 1, 10, 2, 21, 210 과 같이 감소하는 수를 만든다.

- #2 : 보다시피, 자리수대로 정렬된 게 아니라 정렬해줘야 한다. 
- #3 : 마지막 감소하는 수는 9876543210 이며, 이 수의 인덱스는 1022이다. 이 이상으로는 감소 수가 없기 때문에 -1을 출력한다. 

<br>
<br>

<hr>

<br>

### 풀이 - Python 


<br>

```python
def get_dec(num, dec_nums, digit=1):
    
    if digit > 10:
        return 
    
    dec_nums.append(num)
    
    for i in range(10):
        if num%10 > i :
            get_dec((num*10)+i, dec_nums, digit=digit+1)
            
    return dec_nums

n = int(input())
dec_nums = []

for num in range(10):
    r = get_dec(num, dec_nums)
    
r.sort()

if n >= 1023:
    print(-1)
else : 
    print(r[n])
```

<br>
<br>

**이런 저런 함수들**

이런저런 함수들을 만들었다.

10의 n자리수에서 첫번째 감소 수, 마지막 감소 수를 찾는 함수들, 수를 파싱해서 딕셔너리로 만들어주는 함수, 그리고 숫자가 감소 수인지 판별하는 함수들이다. 

<br>
<br>

**첫번째 감소 수, 마지막 감소 수**

<br>

```python
first = (10**n)*n + (10**(n-1))*(n-1) + (10**(n-2))*(n-2)
last = (10**n)*9 + (10**(n-1))*(9-1) ... 
```

<br>

$$10^n$$자리 수의 첫번째, 마지막 감소 수는 위와 같은 방법으로 구할 수 있다.
n이 하나씩 줄어들면서 각 자리의 숫자가 더해지는 형태이므로 재귀 함수로 찾았다. 

<br>

```python
def get_first(n, n_sum=0):
    """10^n의 첫 감소하는 수를 찾는다."""
    
    if n >=0: 
        n_sum += (10**n)*n
        n_sum = get_first(n-1, n_sum=n_sum)
        
    return n_sum

def get_last(n, k=0, n_sum=0):
    """10^n의 마지막 감소하는 수를 찾는다."""
    if n >= 0:
        n_sum += (10**n)*(9-k)
        n_sum = get_last(n-1, k=k+1, n_sum=n_sum)
        
    return n_sum
```

<br>
<br>

**파싱**

숫자를 string 타입으로 만들어 쪼갠 후, dict 형태로 만들어 각 자리와 각 자리의 숫자를 매핑한다. 

<br>

```python
def parse(num):
    """
    num_dict
    - key : 10의 n자리
    - value : 10의 n자리의 수
    """
    num_dict = {}
    string = str(num)
    n = len(str(num)) - 1

    for s in string : 
        num_dict[n] = int(s) 
        n -= 1
        
    return num_dict
```

<br>
<br>

**감소 수 판별**

<br>

```python
def is_dec(num):
    num_dict = parse(num)
    len_n = len(num_dict)
    
    for i in range(len_n):
        if i+1 <= (len_n-1):
            if num_dict[i] >= num_dict[i+1]:
                return False
        
    return True
```

<br>

위에서 만든 parse()함수를 사용해 num의 각 자리 숫자들을 확인한다. num_dict를 순환하면서 뒷자리 수가 앞자리 수보다 크다면 감소 수가 아니므로 False를 반환한다. num_dict를 모두 순회하였는데도, `return False`로 함수가 종료된 상황이 아니라면 True를 반환한다. 

<br>
<br>
