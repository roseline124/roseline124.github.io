---
layout: post
title:  "Java - 다형성 (Polymorphism)"
date: 2019-05-07 23:20:59
author: Roseline Song
categories: Java
tags: java 다형성
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 다형성 (Polymorphism)

<br>

하나의 메서드가 다양한 방법으로 동작하는 것을 의미한다. 같은 조작 방법이라도 다른 결과를 발생시킬 수 있다. 예를 들어, 키보드는 '누른다'는 같은 조작 방법을 가져도 ESC는 취소, Enter는 실행의 목적을 가진다. 

<br>
<br>


**다형성 활용하는 법**

상속 관계에 있는 클래스, 추상 클래스(abstract class), 인터페이스(interface) 등으로 다형성을 활용할 수 있다. 

```java
// 상속 관계의 클래스
부모클래스 변수명 = new 자식클래스();

// 추상 클래스
추상클래스 변수명 = new 구현클래스();

// 인터페이스
인터페이스 변수명 = new 구현클래스();
```

<br>
<br>

<hr>

<br>


### 클래스와 다형성 

```java
class A {
    public String x() {
        return "A.x";
    }
}

class B extends A { // #1
    public String x() { // #2
        return "B.x";
    }

    public String y() {
        return "y";
    }
}

public class Main {
    public static void main(String[] args){
        A obj = new B(); // #3 
        System.out.println(obj.x()); // #4
        //obj.y(); // #5
    }
}
```

<br>

- #1 : 클래스 B는 A를 상속한다. 
- #2 : 클래스 B는 A의 메서드 x를 오버라이딩한다. 
- #3 : 클래스 B를 오브젝트화 시킬 때, 객체의 타입을 A로 할 수 있다.
- #4 : obj의 실질적인 타입은 A이다. 하지만, 클래스 B에서 오버라이딩하고 있기 때문에 클래스 B의 메서드를 사용한다. `B.x`를 출력한다.
- #5 : obj 타입은 A이므로 클래스 B의 메서드를 인지하지 못한다. 


<br>
<br>

**추상 클래스와 다형성**

구현 클래스를 객체화할 때 추상 클래스를 객체의 타입으로 설정할 수 있다.

<br>

```java
abstract class A {
	public abstract int b(); 
}

class B extends A { 
	public int b() { 
		return 0;
	}
}

public class Main {
    public static void main(String[] args){
        A obj = new B();
        obj.b();
    }
}
```

<br>
<br>

**다형성을 활용하는 이유**

다형성을 활용하면 클래스의 메서드 사용을 제한할 수 있어, 사용자의 선택의 폭을 줄인다. 사용자 입장에서 잘 쓰지 않는 메서드에 굳이 신경쓰지 않아도 되게끔 하는 것이다.

<br>
<br>

<hr>

<br>

### 인터페이스 

생활코딩 강의의 예제의 비유가 너무 좋아서 그대로 가져왔다.  

<br>

```java
interface Mother {}
interface Father {}
interface Programmer {
    public void coding(){};
}

class Jane implements Mother, Programmer {
    public void coding() {
        System.out.println("Elegance");
    }
}

class David implements Father, Programmer {
    public void coding() {
        System.out.println("Fast");
    }
}

public class WorkSpace{ // #1
    public static void main(String[] args){
        Programmer employee1 = new Jane(); // #2
        Programmer employee2 = new David();

        employee1.coding(); // #3 
        employee2.coding();

    }
}
```

<br>

- #1, #2 : 직장에서 Jane과 David는 programmer라는 직업을 가진 직원에 해당한다. 직장에서 Jane과 David의 mother, father의 역할은 요구되지 않는다. 
- #3 : 직장에서는 이 두 직원에게 mother, father로서 가진 메서드를 명령내릴 수 없다. programmer로서 coding의 노동만 명령내릴 수 있다. 또한, 같은 메서드라도 Jane은 우아하게 코딩하고, David는 빠르게 코딩하여 동작 결과도 다르게 나온다. 

<br>
<br>
 
