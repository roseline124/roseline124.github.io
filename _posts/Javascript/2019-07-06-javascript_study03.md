---
layout: post
title:  "[Vue 스터디#3] javascript - 클로저, arguments, 함수 호출"
date: 2019-07-06 16:34:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

※ '생활코딩 - 자바스크립트 기초 문법' 강의를 듣고 작성했습니다. 


### 클로저 

**1. 내부 함수, 외부 함수**

- 클로저는 내부함수 내에서도 외부함수의 공간에 접근할 수 있다는 개념이다.
- 내부함수는 외부함수의 지역 변수에 접근할 수 있다. (return 한 함수는 죽은 함수임에도 불구하고)

<br>
<br>

**2. 클로저란?**

- 내부함수가 더 이상 사용되지 않아도, 외부함수에 접근할 수 있다

<br>
<br>

**3. private 변수**

```javascript
function factory_movie(title){
    return {
        get_title : function (){ //내부함수1
            return title; 
        },
        set_title : function(_title){ //내부함수2
            title = _title
        }
    }
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');
```

<br>

- title : private 변수
- 내부 함수에서만 접근할 수 있는 변수이다. 
- 왜 쓰는가? 프로그램이 커질 때, 시스템의 안전성을 위해. 
- title이라는 변수를 지키고 싶을 때. 사용자가 함부로 사용해서 시스템이 망가지지 않도록 하는 목적.

<br>
<br>

**4. 클로저의 잘못된 응용 사례와 수정**

- 잘못된 사례 

```javascript
let arr = []
for(let i = 0; i < 5; i++){
    arr[i] = function(){
        return i;
    }
}
for(let index in arr) {
    console.log(arr[index]());
}
```

<br>

- 수정 

```javascript
let arr = []
for(let i = 0; i < 5; i++){
    arr[i] = function(id) {
        return function(){
            return id;
        }
    }(i);
}
for(let index in arr) {
    console.log(arr[index]());
}
```

<br>
<br>

<hr>

<br>

### arguments

**1. arguments**


- arguments.length() : 인자들의 개수를 셀 수 있다.
- 함수 안에 있는 특수한 이름의 배열(변수에 담긴 숨겨진 유사 배열)
- 매개변수 : parameter / 인자 : argument
- 사용자가 전달한 인자들에 접근할 수 있다.

<br>

```javascript
function sum(){
    let i, _sum = 0;    
    for(i = 0; i < arguments.length; i++){
        document.write(i+' : '+arguments[i]+'<br />');
        _sum += arguments[i];
    }   
    return _sum;
}
document.write('result : ' + sum(1,2,3,4));
```

<br>

- 지금 sum()을 정의할 때 매개변수를 하나도 정의하지 않았지만 
- 인자로 전달된 값들을 arguments로 묶어서 전달한다.

<br>
<br>


**2. 매개변수의 수 : .length**

- 함수.length : 매개변수의 개수를 알려준다.
- arguments.length : 실제로 전달된 인자의 수를 알려준다. 

```javascript
function one(arg1){
    console.log(
        'one.length', one.length,
        'arguments', arguments.length
    );
}

one('val1', 'val2');  // one.length 1 arguments 2



function two(arg1, arg2){
    console.log(
        'two.length', two.length,
        'arguments', arguments.length
    );
}

two('val1');  // two.length 2 arguments 1
```

<br>
<br>

<hr>

<br>


### 함수의 호출, apply

**1. 함수의 호출**

- 객체 : 속성
- 객체 안의 함수 : 메서드 

<br>
<br>

**2. 함수.apply(객체)**

- apply는 함수를 해당 객체의 메서드처럼 만든다.  
- 객체 한 요소요소에 그 함수를 적용할 수 있다. 

ex)

```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
    let _sum = 0;
    for(name in this){
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```


<br>
<br>








