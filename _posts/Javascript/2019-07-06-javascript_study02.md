---
layout: post
title:  "[Vue 스터디#2] javascript - 정규표현식, 유효범위, 함수와 콜백"
date: 2019-07-06 15:59:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

※ '생활코딩 - 자바스크립트 기초 문법' 강의를 듣고 작성했습니다. 


### 정규표현식

**1. 정규표현식 단계**

- 컴파일 : 패턴 만들기 
- 실행 : 패턴으로 구체적인 명령 실행

<br>

```javascript
// 정규표현식 리터럴 
let pattern = /a/;

// 정규표현식 객체 생성자 
let pattern = new RegExp('a');


let pattern = /a/;
> undefined

pattern = new RegExp('a');
> /a/

pattern = new RegExp('b');
>/b/
```

<br>
<br>

**2. 정규표현식 메서드**

- `RegExp.exec()` : 패턴 객체가 존재하는 배열을 리턴 (추출)
- exec : 패턴과 매치하는 문자들을 인자로 전달된 문자열에서 찾아 리턴한다. 
- `RegExp.test()` : 패턴 존재 여부에 따라 True, False 리턴 

<br>


```javascript
> pattern.exec('abcdef');
['a']

> let pattern = /a./;
> pattern.exec('abcdef');
['ab']
```

<br>
<br>

**3. 문자열과 정규표현식**

- `String.match(pattern)` : `RegExp.match()`과 비슷하다.
- `string.replace(pattern, 'A')` : 패턴을 찾아서 'A'로 바꾼다. 


<br>
<br>

**4. 옵션**

- i : 대소문자를 구분하지 않는다.
- g: g를 붙이면 검색된 모든 결과를 리턴 
- . : 문자 하나를 의미한다. 점이 2개면 abc까지 반환한다.


```javascript
// i
let oi = /a/i;

>'Abcde'.match(oi)
['A']

// g
let og = /a/g;

>'abcdea'.match(og)
['a','a']

// 같이 사용 가능 
let oi = /a/ig;
```

<br>
<br>

**5. 캡처**

- 패턴 객체를 변수처럼 재사용할 수 있다. 
- () : 그룹 
- \w : 문자 (A~Z, a~z, 0~9)
- \+ : 문자가 하나 이상인 경우 
- \s : 공백 ex) `(\w+)\s(\w+)`
- \$2, \$1 : 인덱스 (두번째 그룹, 첫번째 그룹 의미)

```javascript 
> let str = "coding everybody";
> let result = str.replace(pattern, '$2, $1');

everybody, coding
```

<br>

<sub>※정규표현식 테스트 사이트 : https://regexr.com/<br>※정규표현식 시각화 사이트 : https://regexper.com/</sub>


<br>
<br>

<hr>

<br>

### 유효 범위 

**1. 전역 변수와 지역 변수**

- scope : 변수의 수명

<br>

```javascript
var vscope = 'global';

function fscope(){
    var vscope = 'local'; // #1
    alert(vscope);
}

fscope(); // local 출력

alert(vscope) // #2 : global 출력 
```

<br>

- #1 : var 을 붙이는 것은 별도의 변수를 만든다는 것을 의미 
- #2 : 함수 안에서 var을 붙이면 '지역 변수'로서 쓰겠다는 의미이기때문에 해당 변수는 함수가 끝난 뒤 제거된다. 따라서 global이 나온다. 

<br>
<br>

```javascript
// #1에 var를 안붙이는 경우 
var vscope = 'global';

function fscope(){
    vscope = 'local'; // #1
    alert(vscope);
}

fscope(); // local 출력

alert(vscope) // #2 : local 출력 
```

<br>


- #1 : #1에서 var를 붙이지 않으면 전역변수를 사용한다. 
- #2 : vscope 변수에 'local'이라는 값으로 덮어씌운 상태이므로 local을 출력한다. 

<br>

<sub>※ let으로 해도 마찬가지의 결과가 나온다.</sub>

<br>
<br>

**2. 전역 변수의 사용**

- 전역 변수 아래에 변수를 만들어준다. 

<br>

```javascript
MYAPP = {}
MYAPP.calculator = {
    'left' : null,
    'right' : null
}
MYAPP.coordinate = {
    'left' : null,
    'right' : null
}
MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum(){
    return MYAPP.calculator.left + MYAPP.calculator.right;
}
document.write(sum());
```

<br>

- 전역 변수 자체의 사용도 싫다면 익명 함수로 묶어주어 지역 변수로 만든다.

<br>

```javascript
(function(){}());
```

<br>
<br>

**3. 유효 범위 대상 : 함수**

자바, 파이썬에서는 블록 안에서만 유효한 변수가 되지만, 자바스크립트에서는 블록과 상관없이 전역변수로 인식된다. 

<br>
<br>

**4. 정적 유효범위**

- **함수가 정의된 시점**에서의 유효범위를 갖는다.
- 이를 정적 유효 범위, 렉시컬 스코핑이라고도 한다. 

```javascript
let i = 5;

function a() {
    let i = 10;
    b();  
}

function b() {
    document.write(i); // 5 출력 : 사용될 때가 아니라 정의될 때의 값을 참조하므로. 
}
```


<br>
<br>

<hr>

<br>

### 값으로서의 함수, 그리고 콜백 

**1. 값으로서의 함수**

- 함수도 객체다
- 다시 말해 일종의 값이다.
- 함수 자체가 값이 되어 다른 변수에 담을 수 있다.

<br>

`let func = function(){}`

<br>

**2. 메서드**

- 객체의 속성으로 담겨진 함수를 메서드라고 한다. 

또한, 함수는 값이기 때문에 다른 함수의 인자로서 전달할 수도 있다. 

<br>

`obj = { func : function(){} }`

<br>
<br>

**3. 함수의 용도 : 다른 함수의 인자, 리턴 값, 배열 값**

- 리턴 값으로서의 사용 예시 

이렇게 다양한 용도로 사용되는 함수를 first-class, citizen 등으로 부른다.

<br>

```javascript
function cal(mode){
    let funcs = {
        'plus' : function(left, right){return left + right},
        'minus' : function(left, right){return left - right}
    }
    return funcs[mode];
}
alert(cal('plus')(2,1));
alert(cal('minus')(2,1));
```

<br>
<br>

**4. 콜백 함수**

```javascript
let sortfunc = function(a, b) {
     return a-b; 
    // return b-a ; // 역순 정렬
}

array.sort(sortfunc) // #1, #2
```

<br>


- #1 : 여기서 sortfunc는 콜백 함수(callee), 함수에 의해 다시 한 번 호출되는 함수를 의미한다.
- #2 : 콜백 : 함수의 인자로, 함수를 전달한다. 

<br>

<sub>WIKI : "프로그래밍에서 콜백(callback)은 다른 코드의 인수로서 넘겨주는 실행 가능한 코드를 의미한다."</sub>

<br>
<br>

**5. 비동기 처리**

- 콜백은 비동기 처리에서 유용하게 사용된다. 
- 콜백으로 지정하면 해당 작업이 끝났을 때 미리 등록한 작업을 실행하도록 할 수 있다. 
- 웹에서 문서 전체를 다시 다운 받지 않고, 서버와의 통신을 통해 필요한 정보만 받는 것을 AJAX라고 한다. 
- AJAX 를 사용하는 방법은 브라우저마다 다르다. 
- jQuery에서의 비동기 처리

```javascript
$.get(url, func, 'json'); // url에 접근했을 때, func 호출, func에 전달되는 인자값을 url에 접근했을 때 얻는 정보(여기서 func 매개변수에 callback함수를 인자로 준다.)
```

<br>
<br>
