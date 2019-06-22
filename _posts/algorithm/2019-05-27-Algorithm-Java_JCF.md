---
layout: post
title:  "[Java 자료구조와 알고리즘#1] - 리스트"
date: 2019-05-27 14:18:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 java 
cover: "/assets/java.jpg"
---

※'Think Data Structures - 자바로 배우는 핵심 자료구조와 알고리즘'을 공부한 뒤 정리한 내용입니다. 

### 자바 Interface

interface는 메서드의 집합을 의미한다. 인터페이스를 구현하는 클래스는 그 메서드들의 내용을 구현해야 한다. 예를 들어, java.lang 패키지의 Comparable interface 소스 코드는 다음과 같다. 

```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```

<br>

인터페이스는 타입 파라미터 T를 사용해 Comparable의 타입을 정의한다. 이 인터페이스를 구현(Implements)하는 클래스는 

- T 타입을 명시해야 하며, 
- T 타입 객체 o를 인자로 받으면서 int 타입의 결과값을 반환하는, compareTo() 메서드의 로직을 구현해야 한다.

<br>

이에 따라, compareTo() 메서드를 구현하면 다음과 같다.

```java
public int compareTo(Integer anotherInteger) {
    int thisVal = this.value; // #1 
    int anotherVal = anotherInteger.value; // #2

    if (thisVal < anotherVal) { // #3 
        return -1;
    } else if (thisVal == anotherVal) {
        return 0;
    } else if (thisVal > anotherVal) {
        return 1;
    }
    
}
```

<br>

- #1 : Number 클래스의 value값을 compareTo()메서드의 thisVal 변수에 저장한다.
- #2 : 인자로 전달 받은 int 타입의 anotherInteger를 anotherVal 변수에 저장한다.
- #3 : 두 수를 비교해 각 조건에 따라 다른 값을 return 한다. compareTo() 메서드가 public int compareTo()이므로 반환값은 int 타입이다. 삼항연산자로 `return (thisVal < anotherVal ? -1) : (thisVal == anotherVal? 0:1));` 한 줄로 나타낼 수 있다.

<br>
<br>

<hr>

<br>

### 자바 List 인터페이스

JCF(Java Collection Framework)에는 List라는 인터페이스가 있다. 이 인터페이스를 implements(구현)하는 클래스로는 ArrayList와 LinkedList가 있다. List 인터페이스를 구현하는 클래스는 add, get, remove와 같은 메서드의 로직을 구현해야 한다. 

**1. ArrayList**
