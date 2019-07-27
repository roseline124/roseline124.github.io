---
layout: post
title:  "[Vue 스터디#7] Vue 프로젝트 생성 + Json 파일 읽기/출력"
date: 2019-07-26 22:23:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

### 프로젝트 생성 및 실행

<br>

**1. 생성**

설치 옵션 중 `webpack-simple`는 웹팩의 최소 기능만을 활용하여 프로젝트를 구성한다. 프로젝트명은 적어도 되고 안적어도 된다. 


<br>

```
vue init webpack-simple {프로젝트명}

? Project name {프로젝트명}
? Project description {프로젝트 설명}
? Author {개발자}
? License MIT 
? Use sass? {Y/N}

// 프로젝트 폴더로 이동
npm install // vue 프로젝트에 필요한 모듈을 node_modules에 다운받는다.
npm run dev
```

<br>

개발자도구의 audits 탭을 통해 모바일 버전, 웹 버전의 퍼포먼스를 비교해가며 볼 수 있다.

<br>

<img src="/assets/images/190727_vue_04.PNG">

<br>
<br>

**2. 파일**

- assets : css나 이미지 등의 웹 자원이 들어간다. 
- components : 컴포넌트들은 app.vue와 같은 경로에 components 폴더를 만들어 그곳에 모아놓고 관리한다.
- app.vue : 가장 최상위 컴포넌트이다. 하향식으로 데이터를 전달할 수는 있지만, 상향식으로 데이터를 전달할 수는 없다.
- main.js : vue 객체를 생성한다.
- index.html : 컴포넌트들이 main.js를 통해 마운트되어 렌더링된다. 

<sub>※ [프로젝트 폴더 구조 참고](https://joshua1988.github.io/web-development/vuejs/vue-structure/) : 실무에서는 가장 간단한 구조에서 필요한 기능을 하나씩 덧붙여 간다. + [참고2](https://beomy.tistory.com/40)</sub>

<br>

<img src="/assets/images/190727_vue_05.PNG">

<br>

- #3 : index.html에서 어느 요소에 vue를 적용할 지 정한다.
- #2 : app.vue에서 해당 요소를 어떻게 다룰지 작성한다. 
- #1 : Vue객체를 html 요소에 마운트한다. 

<br>

<img src="/assets/images/190727_vue_06.PNG">

<br>



<br>
<br>

<hr>

<br>

### JSON 데이터를 읽고 출력하기


