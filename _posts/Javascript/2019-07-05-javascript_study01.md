---
layout: post
title:  "[Vue 스터디#1] javascript - 함수, 배열, 객체, 모듈"
date: 2019-07-05 19:58:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

※ '생활코딩 - 자바스크립트 기초 문법' 강의를 듣고 작성했습니다. (+ 변수 부분은 노마드 코더의 바닐라 js 기초 강의를 듣고 작성했습니다.)

### 함수 활용법 

function : 하나의 로직을 재실행할 수 있도록 한다. 코드의 재사용성을 높여준다. 

```javascript
function 함수명( [인자...[,인자]] ){
   코드 내용
   return 반환값
}
```

<br>
<br>

**1. 함수 정의와 호출**

```javascript
// 함수 정의 
function numbering() {
    let name = prompt('what\'s your name?');
    return name 
}

// 함수 호출 
numbering();
```

<br>
<br>

**2. 함수의 입력과 출력**

```javascript
function fucn(args) {
    return args;
}

function add_args(arg1, arg2) {
    return arg1+arg2;
}
```

<br>

자바스크립트는 함수 정의 시 여러 값을 return하면 가장 마지막 값을 반환한다.

```
>function three_return(arg1, arg2, arg3) {
 ...   return arg1, arg2, arg3}

>three_return(1,2,3)
3
```

<br>
<br>

**3. 익명 함수, 일회용 함수**

```javascript
// 정의와 호출을 동시에
(function() {
    //함수 내용 
}) ();  
```

<br>
<br>

**4. 연습 문제**

한 잔에 2,800원인 아메리카노가 있다. 아메리카노의 잔 수를 전달 받아, 가격을 반환하는 함수 만들자.

<sub>let, const는 var의 불편함을 보완하기 위해 javascript es6에서 새롭게 나온 식별자이다. 최근엔 var보다는 let, const를 활용할 것을 권장하고 있다.</sub>

```javascript
// 함수 정의 
function cal_price(num_drinks){
    const price_per_drinks = 2800;
    let total_price = num_drinks*price_per_drinks;

    return total_price;
}

// 익명 함수 정의와 호출
(function(num_drinks){
    const price_per_drinks = 2800;
    let total_price = num_drinks*price_per_drinks;

    return total_price;
})();

```

<br>
<br>

<hr>

<br>

### 배열 

**1. 배열의 형태와 반복문**

```javascript
let members = ['Roseline', 'Bear', 'Shark'];

for(i = 0; i < members.length; i++){
    document.write(members[i].toUpperCase());   
    document.write('<br />');
}
```


<br>
<br>

**2. 배열 : 데이터 추가**

- 하나의 데이터 추가 : push() 
- 여러개의 데이터 추가 concat( [data1, data2] )
- 맨 앞에 추가 : unshift() -> 배열의 length 반환 
- 중간에 추가 : splice() 

<br>

```javascript
// splice 예시 
let arr = ['e','v','e','l','o','p','m','e','n','t']

arr.splice(index, x, 요소) 
// x : index부터 원래의 원소들을 x 만큼 삭제한다. 0을 넣으면 아무것도 삭제하지 않는다. 

//예제
arr.splice(0, 0, 'd'); // 첫번째 인덱스에  아무것도 삭제하지 않고 'd'를 넣는다. 
```

<br>
<br>



**3. 배열 : 데이터 제거**

- 맨 앞 원소 제거 : shift() 
- 맨 뒤 원소 제거 : pop() 

```javascript
arr.shift();
arr.pop();
```

<br>
<br>

**4. 배열 : 데이터 정렬**

- 정렬 : sort() 
- 반대 정렬 : reverse() 
- 기준 정렬 : sort(sortfunc). sortfunc을 정의해서 인자로 전달해야 한다. 

```javascript
// sort_function 예시 
arr.sort(function(a, b){
    return b-a;
    });
```


<br>
<br>

<hr>

<br>

### 객체

**1. 배열과 객체의 차이**

- 배열 : 값을 추가하면 인덱스가 같이 붙는다. 순서가 있는 시퀀스
- 객체 : 객체는 인덱스 대신 우리가 직접 원하는 것으로 정의할 수 있다. 순서가 없이 키로 구분하는 시퀀스 

자바스크립트의 객체는 연관배열, 또는 맵, 딕셔너리라는 데이터 객체에 해당한다.

<br>

```javascript
let object = new Object(); 

// 또는 
let object = {}; 

// 객체에 데이터 추가 
object[key] = value
```

<br>
<br>

**2. 객체와 반복문**

반복문 :  for(let i = 0; ...; ...;) : 이렇게 i를 for의 조건문 안에 정의할 수 있다. 

<br>

```javascript
let grades = {'roseline': 100, 'bear': 61, 'shark': 80};
for(key in grades) {
    document.write("key : "+key+" value : "+grades[key]+"<br />");
}
```

<br>
<br>


**3. 객체 안에 함수 정의하기**

this는 함수가 속해있는 객체를 가리킨다. show에 정의된 함수가 속한 객체는 grades이다. 따라서 this.list는  `{'roseline': 100, 'bear': 61, 'shark': 80}`를 가리킨다. 

<br>

```javascript
let grades = {
    'list': {'roseline': 100, 'bear': 61, 'shark': 80},

    'show' : function(){
        for(let name in this.list){
            document.write(name+':'+this.list[name]+"<br />");
        } // for문
    } // show() 함수
}; // grades

//함수 호출 
grades.show();
grades['show'](); 
```

<br>
<br>

<hr>

<br>

### 모듈

**1. 모듈이란?**

프로그램은 작고 단순한 것에서 크고 복잡한 것으로 진화해왔다. 코드의 재활용성을 높이고, 유지보수를 쉽게 하려면 여러 기법들을 사용하는데, 그 중 하나가 거대한 코드를 여러개의 파일로 잘게 쪼개는 것이다. 그렇게 잘게 쪼개진 파일을 모듈이라고 한다. 

<br>
<br>

**2. 자바스크립트에서의 모듈**

자바스크립트가 구동되는 환경은 호스트 환경이다. '모듈'이라는 개념이 분명하게 존재하지는 않으나, 파일을 여러 개로 나눠서 마치 '모듈'처럼 사용한다. 

<br>
<br>


**3. 모듈과 라이브러리**

둘은 비슷한 개념이다. 

단, 모듈이 프로그램을 구성하는 작은 부품으로서의 로직을 의미한다면, 라이브러리는 자주 사용되는 로직을 재사용하기 편리하도록 잘 정리한 일련의 코드들의 집합을 의미한다. ex) jQuery 

<br>
<br>

<hr>

<br>

### 변수 

**1. const와 let**

변하지 않는 값, 상수로서 사용할 값은 const로 설정한다. 

반면, 바뀌어도 괜찮은 값에는 식별자 let을 사용한다. 

2015년까지는 식별자로 var만 쓸 수 있었는데 es6에서 const와 let이 var의 불편한 점을 보완해 새로운 식별자로 나왔다. const와 var의 차이는 분명한데, var와 let의 차이는 무엇일까?

<br>
<br>

**2. var와 let의 차이**

첫째, **var 키워드는 변수명을 재선언해도 문제가 생기지 않는다**. 하지만 let은 이미 선언한 변수명을 또 다시 선언하려고 하면 에러가 발생한다. 

<br>

```javascript
// var
var variable = 1;

variable = 2; // 가능
var variable = 2; // 가능 

// let
let variable = 1;

variable = 2; // 가능
let variable = 2; // 불가능 
```

<br>

둘째, var는 hoisting 접근 방법(끌어올리기)을 사용한다. 이 방법의 문제는, 선언되기 이전인 변수라도 뒤에 선언되어 있다면, undefined인 상태로 console에 출력한다. 

<br>

```javascript
console.log(whois)  // undefined 출력
var whois = "roseline" 

console.log(whois2)  // SyntaxError
let whois2 = "roseline" 
```

<br>

셋째, var는 전역스코프를 오염시킨다. var는 for나 if 안에서 선언한 변수라도 블록 밖에 있는 같은 이름의 변수에 영향을 미칠 수 있다. let은 블록 밖의 변수에 영향을 주지 않는다. 

```javascript
// var
var stamp = 1 ; 

for(var i = 0; i < 5; i++){ 
	var stamp = i;
	console.log(stamp);
};

console.log(stamp) // 4출력


// let
let stamp2 = 1 ; 

for(let i = 0; i < 5; i++){ 
	let stamp2 = i;
	console.log(stamp2);
};

console.log(stamp2) // 1출력
```

<br>
<br>
