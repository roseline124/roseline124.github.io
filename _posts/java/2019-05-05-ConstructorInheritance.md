---
layout: post
title:  "Java - 생성자와 상속(Constructor & Inheritance)"
date: 2019-05-05 10:40:59
author: Roseline Song
categories: Java
tags: java 생성자 상속
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 생성자 (Constructor)

<br>

- python 클래스의 `def init(self):`과 같은 역할을 한다. 
- 클래스 안의 어떤 메서드보다 먼저 실행되어 클래스 변수를 초기화한다.  
- 이때 생성자 함수는 **클래스와 이름이 같아야** 한다.

<br>

```java
class Calculator {
	int left, right;
	
	public Calculator(int left, int right) {
        // 생성자 
		this.left = left;
		this.right = right; 
	}
}
```

<br>
<br>

**생성자**

<br>

```java
public class Main {
	public static void main(String[] args) {
		Calculator c1 = new Calculator(10, 20); 
	}
}
```

<br>

- new 다음의 `Calculator()` : 생성자

<br>
<br>

<hr>

<br>

### 상속 (Inheritance)

<br>

- `class 자식클래스 extends 부모클래스` : 부모 클래스 상속 
- `super()` : 부모 클래스의 생성자 호출. super()를 썼다면 하위 클래스의 초기화 코드는 super() 코드 이후에 만들어져야 한다. 상위 클래스 초기화 이후 하위 클래스 초기화가 가능. 

<br>

```java
class SubstractableCalculator extends Calculator {
	public SubstractableCalculator(int left, int right) {
		super(left, right); // 부모클래스의 생성자를 호출
	}
	
	public void substract() { 
		System.out.println("상속");
	}
}
```

<br>
<br>