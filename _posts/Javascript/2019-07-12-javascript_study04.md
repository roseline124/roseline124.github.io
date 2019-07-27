---
layout: post
title:  "[Vue 스터디#4] javascript - 객체지향 프로그래밍 : 객체 정의, 생성자, this"
date: 2019-07-12 16:34:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

※ '생활코딩 - 자바스크립트 기초 문법' 강의를 듣고 작성했습니다. 

### 객체지향 프로그래밍

**1. 객체지향 프로그래밍**

프로그램이 커질 수록 기능 별로 묶고 싶어지는 욕구가 든다. 즉, 연관되어 있는 코드끼리 묶어서 운영하는 것을 객체 지향 프로그래밍이라고 한다. 

예를 들어, 아래처럼 바카라 게임이 있다고 하자. (개념을 이해했다면 굳이 읽을 필요는 없다.)

베팅 테이블, 칩, 사용자 정보, 베팅 완료 버튼이 있다. 베팅 테이블은 베팅 되는 것, 칩은 베팅 테이블에 충돌하는 것, 사용자 정보는 베팅 된 것을 계산하고, 베팅 버튼은 사용자 입력(클릭)을 처리하는 기능들을 맡는다. 이들을 비슷한 기능을 하는 것들끼리 묶어서 각각의 객체들을 만들어 관리한다. 

<br>

<img src="/assets/images/190713_01.png">

<br>
<br>


**2. 추상화**

복잡한 현실 세계를 최대한 단순화시켜서 소프트웨어에 표현하는 것을 추상화라고 한다. 

예를 들어, 대학생을 추상화할 때는 학번, 이름, 학과, 소속 대학 등의 정보만 있으면 된다.

이외에 학생의 머리 색깔은 무엇인지, 소득이 얼마인지는 학생을 관리할 때 필요하지 않다. 
현실 세계의 문제를 다룰 때 필요한 것들 만 가지고 소프트웨어로 표현하는 것이 추상화이다. 

<br>
<br>

**3. 은닉화, 캡슐화**

우리는 컴퓨터가 어떻게 만들어졌는지는 모르지만 컴퓨터를 사용할 수는 있다. 제대로된 부품이라면 그것이 어떻게 만들어졌는지 모르는 사람도 사용 방법만 알면 쓸 수 있다.

즉, 은닉화와 캡슐화는 내부 동작 방법을 케이스 안에 숨기고(객체) 사용자에게는 그 부품의 사용방법만을 노출한다(메서드).


<br>
<br>

**4. 인터페이스**

다른 곳에 썼던 코드를 또 다른 곳에서 사용할 수 있다면 재활용성이 높아진다. 2번 만들 필요가 없어지는 것이다. 이렇게 서로 교환할 수 있는 특징을 표준화라고 한다. 그리고 이런 연결점, 접점을 '인터페이스'라고 한다. 


<br>
<br>

**5. 객체지향 프로그램**

객체지향 프로그램의 특징은 '복제'와 '상속'이 가능하다는 것이다. 

<br>
<br>

<hr>

<br>

### 객체지향 - 생성자와 New

**1. 객체**

자바스크립트에서 객체란 그 객체와 연관된 변수(Property, 속성)와 함수(Method)를 그룹핑한 그릇이라고 보면 된다. 

예를 들어, 게임 캐릭터라는 객체가 있다고 하자. 게임 캐릭터에는 Health Point, Mana Point 등의 변수가 있을 것이고, fight라는 함수가 있을 것이다. 

<br>
<br>


**2. 객체 정의하기 연습 문제 - 게임 캐릭터 객체 정의**

캐릭터 객체를 토대로, '영웅'과 '몬스터'를 객체를 생성할 것이라 생각하고 자신만의 캐릭터를 한 번 정의해보자.

<sub>※ this는 아래에서 배운다.</sub>

<br>

```javascript
function Character(HP, MP, type){
	this.HP = HP, // property
	this.MP = MP,  // property
	this.type = type,  // property
	this.fight = function(target){  // method
		this.MP -= 10;
		target.HP -= 10;
    } 
};
```

<br>
<br>

**3. 생성자(Constructor)**

함수는 **객체를 만드는 창조자**로서 사용할 수 있다.

Character 객체를 사용하여 영웅과 몹 객체를 생성한다. 

<sub>※ 자바 '객체'와의 차이 : 객체지향이지만, 자바스크립트에는 클래스가 존재하지 않는다. 또한, 생성자는 어디에 소속되어 있는 것이 아니라, 그냥 객체를 만드는 함수일 뿐이다.</sub>

<br>


```javascript
var Hero = new Character(100, 100, 'Hero');

var Monster = new Character(50, 50, 'Monster');

// 싸우기 
Hero.fight(Monster); // MP가 90으로 깎인다.  
Monster.HP; // 40으로 깎인다. 
```

<br>
<br>

<hr>

<br>

### 객체 지향 - 전역 객체 

window는 전역 객체이다. 전역 객체는 모든 객체를 property로 갖는다. 객체를 정의할 때, window의 win자도 꺼내지 않았는데, window.함수(); 를 실행하면 함수가 실행된다. 아래 코드는 위에서 썼던 코드와 기능이 같다. 평소에는 window 전역 객체를 생략할 수 있다. 

<br>

```javascript
var Hero2 = window.Character(150, 150, 'Hero');
```

\+ 전역객체의 property가 되는 객체들 즉, 모든 객체는 전역 객체의 메서드를 사용할 수 있다. 

<br>
<br>

<hr>

<br>

### 객체 지향 - this

**1. this**

this를 그대로 해석하면 '이것'이다. this는 객체 자신을 가리키는데, 어떤 객체에 소속되는 메서드의 this는 객체 자신을 가리킨다. 하지만, 어느 객체에도 속하지 않는 함수에서의 this는 전역 객체 window를 가리킨다.  

<sub>※ this가 객체를 참조하려면 '이미 생성이 되어있는 객체'여야 한다. </sub>


<br>
<br>

**2. apply를 이용해 this 이해하기**

다음 this들이 각각 어떤 객체를 가리키는지 확인해보자. 

<br>

```javascript
var Merci = {};
var Mccree = {};

function whois() {
    switch(this){
        case Merci :
            alert("영웅은 죽지 않아요. 대가를 치를 뿐...");
            break;

        case Mccree :
            alert("석양이 진다...");
            break;
            
        case window : 
            alert("나는 창문이다.");
            break;
    }
}

whois();
whois.apply(Merci);
whois.apply(Mccree);
```

<br>

이전에 배웠던 apply 함수를 설명하자면, apply를 쓰면 해당 함수를 객체의 메서드로 만든다. 따라서, 이때 가리키는 this는 Merci 또는 Mccree가 된다. 


<br>
<br>
