---
layout: post
title:  "[Vue 스터디#5] javascript - 객체지향 프로그래밍 : 상속, 객체 확장, object, 원시데이터 타입, 참조"
date: 2019-07-13 21:23:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

※ '생활코딩 - 자바스크립트 기초 문법' 강의를 듣고 작성했습니다. 


### 객체지향 - 상속

**1. 상속**

부모 객체의 원하는 속성, 메서드를 물려 받고 필요한 메서드를 추가할 수도 있다. 


<br>
<br>

**2. prototype**

자식 객체가 부모 객체의 속성, 메서드를 상속하려면 자식 객체의 prototype으로 상속 받으면 된다. 
이전 포스팅에서 정의한 Character 객체로 상속해보자. 

<br>

```javascript
// 객체 정의하기
function Character(HP, MP, type){
	this.HP = HP, 
	this.MP = MP,  
	this.type = type,  
	this.fight = function(target){  
		this.MP -= 10;
		target.HP -= 10;
    } 
};

// 자식 객체 전체가 물려받을 메서드 추가하기
Character.prototype.introduce = function() {
    return "Hello, I'm " + this.type; 
};

// 자식 객체 
function Hero(HP, MP, type){
	this.HP = HP, 
	this.MP = MP,  
	this.type = type,  
	this.fight = function(target){  
		this.MP -= 10;
		target.HP -= 10;
    } 
};

// 부모 객체 상속
Hero.prototype = new Character(100,100,'Hero');

// 자식 객체에 새로운 메서드 추가하기 
Hero.prototype.getQuest = function(number){
    return "몬스터를 " + number + "마리 사냥하십시오."; 
};

hero1 = new Hero(100,100,'Hero'); // 자식 객체로 생성
console.log(hero1.getQuest(100)); // 자식 객체 Hero의 메서드
console.log(hero1.introduce()); // 부모 객체의 메서드
```


<br>
<br>

**3. prototype chain**

상속과 상속으로 연결되어 있는 관계이다. 게임 캐릭터, 그리고 캐릭터 중 영웅, 영웅 중 힐러, 이렇게 상속으로 묶여있다고 해보자. 자식 객체의 prototype에서 내가 찾고자 하는 속성이나 메서드가 없으면 부모 객체의 prototype을 순회하며 검색한다. 그래도 없으면 더 윗세대 부모 객체를 찾아간다. 

```javascript
function Character(){};
Character.prototype.Prop = "캐릭터";

function Hero(){};
Hero.prototype = new Character();

function Healer(){};
Healer.prototype = new Hero();

var Merci = new Healer();
console.log(Merci.Prop);
```

<br>

**Quiz!**

그렇다면, 맨 윗 조상과 그 윗 조상이 같은 속성을 갖고 있을 때 어떤 걸 반환할까? 

<br>

```javascript 
function Character(){};
Character.prototype.Prop = "캐릭터";

function Hero(){};
Hero.prototype = new Character();
Hero.prototype.Prop = "영웅";

function Healer(){};
Healer.prototype = new Hero();

var Merci = new Healer();
console.log(Merci.Prop); // "영웅"
```

<br>

가장 촌수가 가까운 조상의 속성을 반환한다.

<br>
<br>

<hr>

<br>

### 객체 지향 - 표준 내장 객체의 확장

**1. 자바스크립트가 가진 내장 객체 : 표준 내장 객체(SBO : standard built-in object)**

표준 내장 객체는 자바스크립트가 기본적으로 제공하는 객체를 말한다. 표준 내장 객체에는 다음과 같은 종류가 있다. 외우지 말자. 

<br>

- Object
- Function
- Array
- String
- Boolean
- Number
- Math
- Date
- RegExp

<br>
<br>

**2. 표준 내장 객체에 사용자 정의 함수 만들기**

표준 내장 객체 Array에 사용자 정의 함수를 추가해보자. 아래 코드를 활용해서 스터디할 때 발표자를 선정하는 함수를 만들어도 좋다. 

<br>

```javascript
var healers = new Array("Merci", "Ana", "Lucio", "ZenYaTTA");


// 사용자 정의 함수 만들기 
function randomChoice(arr){
    var idx = Math.floor(arr.length * Math.random());

    return arr[idx];
}

console.log(randomChoice(healers));

// 표준 내장 객체에 메서드 추가하기
Array.prototype.random = function(){
    var idx = Math.floor(this.length * Math.random());

    return this[idx];
};

var healers = new Array("Merci", "Ana", "Lucio", "ZenYaTTA");
console.log(healers.random());
```

<br>
<br>

<hr>


<br>

### Object 

**1. Object**

자바스크립트의 그냥 객체와 달리 모든 객체의 공통 부모가 되는 객체이다. 이름이 Object이다. 

<br>
<br>

**2. Object의 메서드들**

- `toString()` : 이 객체가 갖고 있는 값, 상태를 알려주는 메서드
- `keys()` : 해당 객체가 가진 키를 알려주는 메서드
- `values()` : 해당 객체가 가진 값을 알려주는 메서드

<br>

```javascript
var healers = new Array("Merci", "Ana", "Lucio", "ZenYaTTA");

console.log(healers.toString());

var healers = {
	'Merci':"영웅은 죽지 않아요.",
	'Lucio':"신나게 함 달려볼까"
};

console.log(Object.keys(healers));
console.log(Object.values(healers));
```

<br>
<br>

**3. Object 확장 연습 문제 - map() 구현하기**

Object.prototype을 이용해 `객체의 키와 값을 한 쌍으로 묶어 반환`하는  items() 메서드를 추가해보자. 

Object.keys(), Object.values()를 활용한다.

<sub>※ 힌트 : map()함수를 이용하자. [스택오버플로우 참고](https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript)</sub>

<br>

```javascript
// map 함수 
var a = [1, 2, 3]
var b = ['a', 'b', 'c']

var c = a.map(function(e, i) {
  return [e, b[i]];
});

console.log(c);
```

<br>

```javascript
// 확장
Object.prototype.items = function(){
    var keys = Object.keys(this);
    var values = Object.values(this);

    return keys.map(function(k, i){
        return [k, values[i]];
    })
}

// 확인
var person = {
    name : "roseline",
    age: "20",
    job: "developer"
};

var roseline = person.items();

for ( var i = 0; i<roseline.length; i++){
	console.log(roseline[i]);
};
```

<br>
<br>

**4. Object 확장의 위험**

Object에서 확장하면 앞으로 생성하는 모든 객체는 그 새로운 property를 상속받는다. 
for-in 문으로 돌 때, 해당 객체의 요소를 전부 순회하기 때문에 마지막에 새롭게 추가한 메서드도 보여준다. 

그럼 평소에 Object가 가진 속성이 나타나지 않게 하는 방법은 무엇일까?

boolean타입을 리턴하는 `hasOwnProperty()`로 해당 객체가 직접 갖고 있는 속성인지 구분해준다. 만약 Object에서 정의된 속성 또는 메서드이고, 해당 객체 스스로 정의한 속성이 아니라면 false를 반환한다. 

<br>
<br>

<hr>

<br>

### 원시데이터 타입

자바스크립트의 데이터 타입은 크게 두가지로 구분한다.

- 원시 데이터 타입 : 기본
- 객체 데이터 타입 : 참조

<br>
<br>

**1. 원시데이터 타입**

숫자, 문자열, boolean, null, undefined

그 외에는 다 객체 데이터 타입이다. 

<br>
<br>

**2. 래퍼(wrapper) 객체**

원시 데이터 타입은 그 순간에만 쓸 수 있고 더 이상은 쓸 수 없다. 증발하고 만다.

그 다음 줄에서도 원시 데이터 형을 객체처럼 사용할 수 있도록 하는 객체가 Wrapper Object이다.

원시 데이터 형을 객체로 감싸서 잠시 동안 객체 데이터 형처럼 사용할 수 있다. 

<br>
<br>

<hr>

<br>

### 참조 

**1. 복제**

분신술이라고 생각하자. 닌자가 분신술을 써서 또 하나의 자신을 만들어냈다. 악당이 분신에게 아무리 타격을 줘봤자 본체는 아무런 상처를 입지 않는다.

<br>
<br>

**2. 참조**

구글의 공유 문서를 써 보면, 하나의 문서를 팀원이 함께 수정할 수 있다. 문서는 하나이고, 각 팀원의 컴퓨터는 서로 다른 컴퓨터고 자기 컴퓨터에서 해당 문서를 연다. 이때, 한 팀원이 문서를 수정하면 다른 팀원의 문서도 함께 수정된다. 두 팀원의 컴퓨터가 참조하는 문서가 같기 때문이다. (예시이고, 실제로 구글 공유 문서가 어떻게 돌아가는지는 모른다.)

<br>
<br>

**3. 자바스크립트에서의 함수와 참조**

<br>

```javascript
var a = {'id' : 1};

function func(b) {

    b = {'id':2};
    b.id = 2;

}

func(a);
```

<br>

- b = {'id' : 2}; 객체를 새로 생성하면서 a와의 link는 끊어진다.
- b.id =2 ; 여전히 a와 같은 객체를 참조하고 있는 상태에서 값을 바꾸기 때문에 a에 영향을 준다. 


<br>
<br>


고생하셨습니다! 찾아보니까 [생활코딩 최신 강의](https://www.youtube.com/watch?v=DHIlPmJUDzk&list=PLuHgQVnccGMAMctarDlPyv6upFUUnpSO3&index=2&t=0s) 있더라고요. 이건 따로 배워봅시다!

<br>
<br>
