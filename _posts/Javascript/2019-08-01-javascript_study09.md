---
layout: post
title:  "[Vue 스터디#9] 하위 컴포넌트에서 상위 컴포넌트로 데이터 전달 - 웨이팅 리스트"
date: 2019-08-01 19:23:00
author: Roseline Song
categories: Javascript
tags: 자바스크립트 스터디
cover: "/assets/vue.jpg"
---

<br>

### 하위 컴포넌트에서 상위 컴포넌트 관계 맺기  

대기자 신청 양식을 작성하는 `WaitingForm` 컴포넌트, 그리고 데이터를 받아서 리스트에 추가하는 `WaitingList` 컴포넌트가 있다. 

`WaitingForm`을 하위 컴포넌트로 `WaitingList`를 상위 컴포넌트로 **관계를 맺어주고 하위 컴포넌트에서 상위 컴포넌트로 데이터를 넘기는 작업**을 해보자. 

<br>
<br>

**1. 컴포넌트 간의 관계 맺어주기**

export와 import로 컴포넌트 간에 부모, 자식 관계를 만들어줄 수 있다. 이때 부모(상위) 컴포넌트는 하위 컴포넌트를 import하는 쪽이다.

<br>
<br>


**2. WaitingForm.vue : 하위 컴포넌트**

<br>

```javascript
<script>
export default {
    name:"WaitingForm",
    // data, methods, ...
}
</script>
```

<br>
<br>

**3. WaitingList.vue : 상위 컴포넌트**

<br>


```javascript
<script>
import WaitingForm from "./WaitingForm";

export default {
    name:"WaitingList",
    // data, methods, ...
}
</script>
```

<br>
<br>

<hr>

<br>

### 데이터 전달

<br>

**1. 하위 컴포넌트 : WaitingForm의 template**

- #1 : **v-model로 컴포넌트 data의 `input_name`과 엘리먼트를 연결**시킨다. submit을 통해 form이 제출되면 input 태그에 있던 값이 컴포넌트 데이터에 전달된다.
- #2 : select 태그에서는 **option이 아닌 select태그에 v-model을 쓴다**.
- #3 : placeholder 역할을 하는 옵션 태그이다.
- #4 : `v-for`를 통해 1부터 10까지 반복되며 그 값은 number에 담긴다. `v-bind:value="number"` 속성을 통해 템플릿 내에서 콧수염 태그로 변수를 사용할 수 있다. ex) `\{\{number\}\}명`. `\` 백슬래시는 빼고 생각하면 된다. 
- #5 : 클릭하면 컴포넌트 내의 `prevent_event` 메서드를 호출한다.

<br>

```html
<template>
  ... 생략 ...

  <form >
    <h3>대기자 등록</h3>

    <div>
        <label for="inputName">이름</label>

        <!-- #1 -->
        <input 
          v-model="input_name" 
          placeholder="이름을 입력해주세요." 
          type="name" 
        >
    </div>
    
    <div>
        <!-- #2 -->
        <select v-model="input_people_numbers" id="inputPeople">

          <!-- #3 -->
          <option value="" disabled selected>0명</option>

          <!-- #4 -->
          <option v-for="number in 10" 
                  v-bind:value="number" 
                  :key="number.id"
                  selected="0">
            \{\{number\}\}명
          </option>
        </select>
    </div>

    <!-- #5 -->
    <button @click="prevent_event" type="submit" >
      등록
    </button>
  </form>
</template>
```

<br>
<br>

**2. 하위 컴포넌트 : WaitingForm의 script**

<br>

```javascript
<script>
export default {
    name:"WaitingForm",
    data: () => {
        return { 
          is_show: false,
          // v-model로 input태그와 연결된 데이터들
          input_name:'',
          input_people_numbers:'',
        };
    },
    methods: {
        form_toggle: function(){
          this.is_show = !this.is_show;
        },
        prevent_event: function(event){
          if (event) event.preventDefault(); // 새로고침 방지
          this.create_waiting(); // 상위 컴포넌트로 전달할 데이터 생성
        },
        // 폼 제출 후 데이터 초기화
        initialize_data: function(){ 
          this.input_name = '이름을 입력해주세요.';
          this.input_people_numbers = '0';
        },
        create_waiting: function(){ 
          // 입력 받은 데이터를 모아 하나의 객체로 생성
          let wait = { 
            'name' : this.input_name,
            'people': this.input_people_numbers,
          }
          
          this.initialize_data(); // #폼 양식 초기화
          this.form_toggle(); // #모달창 닫기
          this.$emit('create_wait', wait); // #하위 컴포넌트에서 상위컴포넌트로 데이터 전달
        },
    }
}
</script>
```

<br>
<br>

**3. 이벤트 버스, emit**

하위 컴포넌트에서 자식 컴포넌트로 이벤트와 함께 데이터를 전달할 때 emit을 사용한다. `this.$emit('이벤트명', 데이터1, 데이터2, ...)`와 같이 쓴다. 

<br>

```javascript
this.$emit('create_wait', wait); // #하위 컴포넌트에서 상위컴포넌트로 데이터 전달
```

<br>
<br>

**4. 상위 컴포넌트 : WaitingList의 template**

- #5 : `<WaitingForm @create_wait="update_waiting"/>`으로 `create_wait` 이벤트가 발생하면 상위 컴포넌트 내 메서드 `update_waiting`을 호출한다. 
- #4 : 하위 컴포넌트를 전달할 때 라우터 뷰를 사용한다. 템플릿 내에서는 오직 하나의 컴포넌트만 존재해야 하므로, 하위 컴포넌트를 `<div id="WaitingList"></div>` 안에 써야 한다.
- #1 : update_waitings라는 배열에 담긴 객체를 하나씩 꺼내 `item`에 담는다. index에는 배열이 갖는 인덱스 숫자가 담긴다. 
- #2 : #1에서 item을 `v-bind:value="item"`으로 바인딩했기 때문에 템플릿 내에서 콧수염 태그로 데이터를 사용할 수 있다.
- #3 : delete_waiting 메서드를 호출해 대기자 리스트에서 해당 대기자를 삭제한다. 

<br>

```html
<template>
  <div id="WaitingList">
    
    <div>
      <!-- #1 -->
      <ul v-for="(item, index) in updated_waitings" 
          v-bind:value="item" 
          :key="item.id" 
      >
        <!-- #2 -->
        <li>이름 : \{\{ item.name\}\}</li>
        <li>예약 번호 : \{\{ index + 1\}\}</li>
        <li>예약 인원 : \{\{ item.people\}\}명</li>

        <!-- #3 -->
        <button @click="delete_waiting"
                type="button" class="close" aria-label="Close">
        
        <span aria-hidden="true">&times;</span>
        </button>
      </ul>   
    </div>

    <!-- #4, #5 -->
    <router-view>
      <WaitingForm @create_wait="update_waiting"/>
    </router-view> 

  </div>
</template>
```

<br>
<br>

**5. 상위 컴포넌트 : WaitingList의 script**

<br>

```javascript
<script>
import WaitingForm from "./WaitingForm";

export default {
  name: "WaitingList",
  components:{
    WaitingForm // 하위 컴포넌트 
  },
  data: () => {
    return {
      updated_waitings: [], // 대기자 리스트. 하위컴포넌트로부터 받은 데이터를 추가
    }
  },
  methods: {
    update_waiting: function(waiting_list){ // 이벤트 버스로부터 받은 객체
      this.updated_waitings.push(waiting_list);
    }, // 데이터를 리스트에 추가
    delete_waiting: function(){
      this.updated_waitings.pop(); // 간단하게 pop으로 삭제하도록 했지만, 나중에 인덱스로 지정된 대기자를 삭제하도록 다시 구현하겠다.
    }
  },
}
</script>
```

<br>
<br>


**6. 결과**

<br>

<img src="/assets/videos/190801_waiting_list.gif">

<br>
<br>
