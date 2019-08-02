---
layout: post
title:  "[Vue 스터디#8] modal, 팝업 만들기 (+ v-if가 안될 때)"
date: 2019-08-01 18:23:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

<br>

[`v-if`, `v-show`가 안돼서 왔다면 여기 먼저 참고!](#뷰-인스턴스-속성을-정의-변경하는-메서드는-function-키워드를-사용)

<br>

### v-if, v-show 

vue로 모달을 띄울 때 v-if, v-show를 사용할 수 있다. 둘 다 템플릿에 보여주는 결과는 같지만, 어떻게 동작하는 지는 다르다. 그러므로 엘리먼트가 얼마나 많이 렌더링 될 지에 따라 둘 중에 하나를 선택한다. 

<br>
<br>

**1. v-if와 v-show 차이**

`v-if`와 `v-show`의 가장 큰 차이점은 초기에 렌더링(화면에 표시)할 때 **DOM에 렌더링 되느냐 안되느냐**의 차이다. 아래 사진으로 v-if, v-show가 false인 경우 html에서 어떻게 보여지는지 확인하자. 

`v-if`는 아예 렌더링되지 않는다. <br>
`v-show`는 렌더링이 되어있는 데 반해, `display:none` 속성으로 숨겨져 있다. 

<br>

<img src="/assets/images/190801_v_if.PNG">*v-if 사용*

<br>

<img src="/assets/images/190801_v_show.PNG">*v-show 사용*

<br>
<br>

**2. 렌더링과 토글 비용**

v-if는 초기에 렌더링 비용이 없는 대신, 토글할 때 엘리먼트를 렌더링해야 하므로 토글 비용이 높다. <br> 
반면, v-show는 초기에 렌더링 비용이 있는 대신, 토글할 때 `display:none` 속성만 추가·삭제하면 되므로 토글 비용은 낮다.

따라서, v-if는 자주 쓰이지 않을 것 같은 모달에, v-show는 자주 토글을 해야하는 모달에 사용하면 좋다. 

<br>
<br>

**3. 정리**

<br>

　 | v-if | v-show 
---|------|----
**초기 렌더링 비용** | 낮음 | 높음
**토글 비용** | 높음 | 낮음
**쓰임** | 가끔 쓰이는 경우 | 자주 쓰이는 경우  

<br>
<br>

<hr>

<br>

### 모달창 띄우기 

<br>

**1. template**

- #1 : 버튼에 v-show 또는 v-if가 들어간 엘리먼트를 컨트롤 할 `v-on:click="함수명"` 속성을 넣는다.
- #2 : 띄우고 싶은 모달 엘리먼트의 가장 바깥 div에 `v-if="변수명"` 또는 `v-show="변수명"`을 넣는다. 

<br>

```html
<template>
  <div id="app">

    <!-- #1 : Button trigger modal -->
    <button @click="handle_toggle" type="button">
        모달창 띄우기
    </button>

    <!-- #2 : Modal Window -->
    <div v-show="is_show">
        <h5>뷰하!</h5>
        <p>v-if와 v-show로 모달창을 띄워봅시다.</p>

        <button @click="handle_toggle" type="button">
            확인
        </button>
    </div>

  </div>
</template>
```

<br>
<br>

**2. component**

- #1: template에서 `v-if` 또는 `v-show`의 조건문에 넣을 변수를 `data`에 추가한다. vue에서는 data를 함수로 정의하고 실제 데이터를 return한다.
- #2: method 내에서 같은 컴포넌트 내의 데이터에 접근하려면 `this`를 사용하면 된다. this는 현재 method 자신이 속한 컴포넌트를 가리킨다. ([this와 관련하여 함수를 정의할 때 주의할 것.](#뷰-인스턴스-속성을-정의-변경하는-메서드는-function-키워드를-사용))
- #3: true면 false로, false면 true로 바꾸기 위해 `!`로 부정형을 만든다. 


<br>

```javascript
<script>
export default {
  name: 'App',
  data: () => { // #1
    return {
      is_show: false 
    }
  },
  methods:{
    handle_toggle: function(){ 
      this.is_show = !this.is_show; // #2, #3
    },
  }
}
</script>
```

<br>
<br>

**3. 결과**

<br>

<img src="/assets/images/190801_modal.gif">

<br>
<br>

<hr>

<br>

### 뷰 인스턴스 속성을 정의, 변경하는 메서드는 `function` 키워드를 사용

ES6의 화살표 함수를 사용하면 메서드가 컴포넌트에 bind되지 않는다. [자세한 건 여기 참고할 것](https://joshua1988.github.io/web-development/translation/essential-es6-features-for-vuejs/#%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98-arrow-functions){: target="_blank" }.

따라서, 뷰 인스턴스 속성을 정의할 때는 fucntion 키워드를 사용해 메서드를 정의한다. 

<br>

```javascript
<script>
export default {
  name: 'App',
  data: () => { 
    return {
      is_show: false 
    }
  },
  methods:{

    // this와 바인딩 되지 않는다. 
    arrow_function: () => {  
      console.log(this.is_show); // undefined
    },

    // bind로 묶어도 마찬가지다.
    bind_function: (() => { 
      console.log(this.is_show); // undefined
    }).bind(this),

    // 정상적으로 동작한다.
    it_is_work: function(){
      this.is_show = !this.is_show;
    },

  }
}
</script>
```

<br>
<br>
