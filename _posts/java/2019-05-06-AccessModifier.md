---
layout: post
title:  "Java - 접근 제어자(Access Modifier)"
date: 2019-05-06 17:00:59
author: Roseline Song
categories: Java
tags: java 접근제어자
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 접근 제어자 

<br>

- public 
- protected
- default
- private 

<br>

제어자   | 같은 패키지 | 다른 패키지 | 다른 패키지 & 상속 | 관계 없음
:---------:|:-----------:|:------------:|:-------------------:|:---------:
public   | O | O | O | O
protected| O | O | O | X
default  | O | O | X | X
private  | O | X | X | X

<br>
<br>

<hr>

<br>

### 같은 클래스 내 호출 가능한 범위 

<br>

```java
class A {
	public void pulic_method() {
		System.out.println("public method");
	}
	
	private void private_method() {
		System.out.println("private method");
	}
	
	public void public_method2() {
		private_method();
		System.out.println("It calls private_method()");
	}
}
```

<br>

```java
public class Main { 
	public static void main(String[] args) {

		A a = new A();
		a.pulic_method(); // #1
		a.public_method2(); // #2
	}
}
```

<br>

- #1 : public 메서드 호출 가능 
- #2 : private 메서드 호출 불가능, public 메서드를 통해서는 호출 가능하다.

<br>
<br>

<hr>

<br>

### public 클래스와 클래스

<br>
		
- class : 같은 패키지 내에서만 사용
- public class : 퍼블릭 클래스의 소스코드 파일 이름은 같아야 한다.
- 즉, 하나의 소스코드에는 하나의 퍼블릭 클래스만 존재한다. 

<br>
<br>





