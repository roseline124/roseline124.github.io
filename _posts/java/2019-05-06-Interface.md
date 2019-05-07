---
layout: post
title:  "Java - 인터페이스(Interface)"
date: 2019-05-06 17:20:59
author: Roseline Song
categories: Java
tags: java 인터페이스
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 인터페이스

<br>

인터페이스의 변수, 메서드들은 public이어야 한다.

<br>

```java
interface I { 
	public void z ();
}

class Interface_A implements I{
	public void z() {
	}
}
```

<br>

- `class Interface_A implements I` : 인터페이스 I를 구현한다.
- 인터페이스를 구현할 때는 인터페이스의 메서드를 반드시 구현해야 한다.
- 하나의 클래스는 여러 인터페이스를 구현할 수 있다. `ex) class A implements I1, I2`
- 단, 반드시 그 안의 메서드를 모두 구현해야 한다.

<br>
<br>

