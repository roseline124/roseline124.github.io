---
layout: post
title:  "[Vue 스터디#6] 뷰하! Vue 설치 및 hello-world 프로젝트 만들기"
date: 2019-07-26 21:23:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---


### Vue 설치 

<br>

**1. vue 설치**

npm과 node.js가 먼저 깔려있어야 한다. `npm --version`과 `node --version`으로 확인한다. 

<br>

```
npm install vue
```

<br>
<br>

**2. vue CLI 설치**

vue CLI는 데이터를 사용하는 웹앱 페이지를 빠르게 빌드할 수 있도록 도와준다. 
`--global`은 라이브러리를 전역으로 사용할 수 있도록 설치하겠다는 의미이다. (어느 폴더에서나 접근 가능)

<br>

```
npm install --global vue-cli
```

<br>
<br>

**3. 환경변수 설정**

- 환경변수 - {User}에 대한 사용자 변수에서 Path 편집
- `C:\Users\{User이름}\AppData\Roaming\npm` 추가 및 저장 
- cmd에서 `vue`를 입력하면 아래와 같이 뜬다. 

<br>

<img src="/assets/images/190727_vue_01.PNG">



<br>
<br>

<hr>

<br>

### 간단한 뷰 프로젝트 시작하기 

<br>

**1. vue init**

공식 템플릿으로 vue의 Hello World 프로젝트를 생성해보자. 참고로 webpack은 모듈 번들러이다. 

<sub>※ 모듈 번들러 : 모듈 로더를 대체하고 빌드 타임에 모든 코드의 번들을 생성한다. Browserify와 Webpack 등이 있다. 모듈 로더는 런타임에 번들을 생성한다. [모듈 포맷, 모듈 로더, 모듈 번들러에 대한 자세한 설명은 이 블로그를 참고](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)할 것!</sub>

<br>

```
vue init webpack my-project
```

<br>


아래처럼 `Runtime + Compiler: recommended for most users`라는 문구가 뜬다. 방향키로 런타임 + 컴파일러가 포함된 프로젝트를 빌드할 건지, 아니면 런타임 전용의 가벼운 프로젝트를 빌드할 건지 선택할 수 있다. 페이지만 볼 것이기 때문에 read-only를 선택 후 enter를 누른다. 이후 각 옵션에 대한 설명은 [이 블로그](https://jinblog.kr/192) 참고

<sub>

<br>

<img src="/assets/images/190727_vue_02.PNG">


<br>
<br>


**2. 프로젝트 실행**

```
cd my-project
npm run dev
```


<br>
<br>

**3. 확인**

[http://localhost:8080](http://localhost:8080) 으로 접속한다.
사진에는 나와있지만, vue 프로젝트를 빌드할 때 적어주는 project명은 head 밑 title태그의 값이 된다. 즉 브라우저 탭에 보이는 홈페이지 이름이 된다.

<br>

<img src="/assets/images/190727_vue_03.PNG">*첫 뷰 페이지*

<br>
<br>

