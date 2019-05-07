---
layout: post
title:  "Java - 오버라이딩, 오버로딩 (Overriding & Overloading)"
date: 2019-05-05 10:50:59
author: Roseline Song
categories: Java
tags: java 오버라이딩 오버로딩
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 오버라이딩 (Overriding)

<br>

**재정의, 덮어쓰기**

오버라이딩은 부모 클래스의 메서드를 다른 코드로 재정의한다. 


<br>

```java
class Parent {
	public void parent_say() {
		System.out.println("내가 니 부모다.");
	}
}

class Child extends Parent {
	public void parent_say() {
		
		super.parent_say(); // #1
		
		System.out.println("아직도 내가 니 부모로 보이니?"); // #2
	}
}
```

<br>

- Child 클래스는 Parent 클래스를 상속하고 있다. 
- #1 : Parent 클래스에 정의된 parent_say() 메서드의 로직을 `super.부모클래스의메서드()`로 가져온다.(꼭 가져오지 않아도 된다.) 실행하면 `"내가 니 부모다."`가 출력될 것이다. 
- #2 : #1의 실행 후, 오버라이딩된 코드가 실행된다. 

<br>
<br>

**오버라이딩 특징**

- 부모 메서드와 자식 메서드의 형식이 일치해야 한다.
- return 타입, 메서드 이름, 파라미터의 '타입, 개수, 순서'가 일치해야 한다. 

<br>
<br>

<hr>

<br>

### 오버로딩 

<br>

오버라이딩을 하고 나면 코드가 덮어쓰였기 때문에 기존 메서드의 로직은 쓸 수 없다. 그래서 기존 메서드는 그대로 유지하고 다른 매개변수를 써야 하는 경우는 오버로딩을 사용한다. 

이름이 같아도 **매개변수가 다르다면 다른 메서드로 인식**하기 때문에, 두 메서드는 공존할 수 있다. 단, **return 타입은 같아야** 한다.

<br>

```java

public class Main {

	public static void overload() { // #1
		System.out.println("I'm original method.");
	}
	
	public static void overload(String str) { // #2
		overload(); // #3
		System.out.println(str); 
	}
	
	public static void main(String[] args) {
        // #4
		overload();
		overload("I'm overloaded method");

	}

}

```

<br>

- #1 : 원래의 메서드 
- #2 : 원래 메서드와 달리 매개변수를 넣어줌으로써 다른 메서드로 인식된다. 
- #3 : 코드 중복을 없애기 위해 원래의 메서드를 호출할 수 있다.
- #4 : 매개변수 유무에 따라 각자 다른 메서드가 실행된다. 

<br>
<br>




