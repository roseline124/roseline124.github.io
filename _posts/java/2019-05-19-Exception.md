---
layout: post
title:  "Java - 예외 (Exception)"
date: 2019-05-19 23:20:59
author: Roseline Song
categories: Java
tags: java 예외 trycatch
cover: "/assets/java.jpg"
---

**생활코딩 - 자바** 공부 후 정리한 내용입니다.

<br>

### 예외 처리 (Exception Handling)

개발자가 의도치 않은 방법으로 프로그램을 사용해 장애가 생기는 경우가 있다. 이를 대비하기 위해 예상치 못한 오류를 처리하는 것을 예외 처리, Exception Handling이라고 한다. 개발자 선에서 처리를 하거나, 코드의 사용자에게 처리를 맡길 수 있고, Java에서 정의된 Exception이 없는 경우 자신이 Exception을 정의할 수도 있다. 

<br>
<br>

<hr>

<br>

### 직접 처리하기 

<br>

**Try Catch**

python의 try-except와 같다. try문에 오류가 날 것 같은 코드를 작성하고, catch문에 어떤 오류가 발생했을 때 어떤 방식으로 처리할 건지 작성한다. catch문을 if-else if처럼 다중 catch문을 작성할 수도 있다. finally문의 코드는 예외의 발생 여부와 관계 없이 실행된다. 

<br>

```java
	public static void divide(int left, int right) {
			try {
				System.out.println(left/right); // #1
			} catch(ArithmeticException e) { // #2
				System.out.println("오류 발생 : " + e.getMessage()); 
				e.printStackTrace();
			} finally { // #3
                System.out.println("Finally"); 
            }
		}
```

<br>

- #1 : try문에는 오류가 발생할 수 있는 코드를 넣는다. 위 코드에서는 0으로 나누는 경우 에러가 난다.
- #2 : catch에 그로 인해 발생할 수 있는 오류 'ArithmeticException'을 전달한다. try 내의 코드에서 에러가 발생하면 catch문 안의 코드블럭이 실행된다 
- #3 : 오류가 발생하든, 발생하지 않든 finally의 코드가 실행된다. finally는 꼭 쓸 필요 없고, try-catch문까지만 써도 된다. 

<br>
<br>

**오류 발생시키기 : throw**

특정 조건에서 예외를 발생시켜 처리할 수도 있다. if문에 오류가 발생할 조건을 넣고, `throw new 예외 이름`으로 예외를 발생시킨다. 이후 try-catch로 예외를 처리한다. 

<br>

```java
	public static void divide(int left, int right) {
		if (right==0) {
			throw new ArithmeticException("0으로 나눌 수 없습니다."); // 생성자에 에러 메시지 전달
		}
```

<br>
<br>

<hr>

<br>

### 오류 떠넘기기 : throws 

Exception을 throws하면 코드의 사용자에게 예외 작성을 넘길 수 있다. 

<br>

```java
class AAA {
	public void run() throws FileNotFoundException {
        // 이 함수의 사용자는 FileNotFoundException을 처리해야 한다. 
	}
}
```

<br>
<br>

<hr>

<br>

### Throwable? checked, unchecked exception 

예외가 throwable하다면, throw로 예외를 발생시켜 try-catch로 처리하거나, throws로 사용자에게 예외 처리를 맡길 수 있다. 반대로 throwable하지 않다면, 두 가지 경우를 모두 사용할 수 없다. 

Throwable의 자식 클래스로는 Error와 Exception이 있다. Error는 메모리 부족과 같은 개발자가 처리할 수 없는 종류의 오류들을 말한다. Exception은 개발자가 해결할 수 있다. 그러나 모든 Exception을 throws 할 수는 없다. Exception에서도 RuntimeException을 상속받는 경우와 그렇지 않은 경우가 있다. 상속받는 경우 unchecked exception이라고 하고, 그렇지 않은 경우는 checked exception이라고 한다. 

unchecked exception은 한 번 잘못되면 이후 로직을 실행할 수 없어 프로그램에 계속 영향을 주는 오류들이다. 반면 unchecked exception, 예를 들어 IOException 같은 경우 사용자에게 파일 이름을 잘못 입력 받으면 다시 입력받으면 된다. throw한 후, try-catch로 반드시 예외를 처리하거나 throws로 사용자에게 에러 핸들링을 맡긴다.  

<br>

- throwable : checked exception  
- un-throwable : unchecked exception (extends RuntimeException)

<br>
<br>


**exception 사용자 정의**

exception을 정의할 때, unchecked인지 checked인지 정한 후 unchecked라면 RuntimeException을 상속한다. 

<br>

```java
class UncheckedException extends RuntimeException { 
    // RuntimeException의 하위클래스인 특정 exception을 상속하여 특화시켜 처리할 수 있다. 
	UncheckedException() {
		super();
	}
	UncheckedException(String message){
		super(message);
	}
}

class CheckedException extends Exception {
	CheckedException() {
		super();
	}
	CheckedException(String message2){
        // throws 로 사용자에게 예외처리를 맡기거나 try catch를 해야 한다. 
		super(message2);
	}
}
```


<br>
<br>
