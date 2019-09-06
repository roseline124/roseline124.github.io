---
layout: post
title:  "[오늘의 공부] 19.09.06 | 개발 툴 - 다중 터미널 tmux"
date: 2019-09-06 23:15:00
author: Roseline Song
categories: Daily-Study
tags: 기록 공부
cover: "/assets/dailystudy2.jpg"
---

<br>

### tmux 
tmux : 다중 터미널로 개발하기

📔 레퍼런스
- [tmux 관련 용어들](https://seulcode.tistory.com/144)

**1. 설치**

```shell
brew install tmux
```

<br>
<br>

**2. 설정**

<br>

```shell
// config
vim ~/.tmux.conf

// reload
tmux source ~/.tmux.conf
```

<br>
<br>

**3. 플러그인**

- 설치

    // 패키지 매니저 설치 
    brew install TPM
    
    // 플러그인 목록 작성
    vim ~/.tmux.conf
    
    // <prefix> + I로 설치 

<br>
<br>

<hr>

<br>

### Tmuxinator

tmuxinator : 세션 관리

📔레퍼런스 

- [tmuxinator로 tmux 세션 관리](https://blog.outsider.ne.kr/1167#recentTrackbacks)
- [tmuxinator sample.yml](https://github.com/tmuxinator/tmuxinator/blob/master/spec/fixtures/sample.yml)
- ruby 버전관리 레퍼런스 : [루비 버전 업데이트](https://pie001.github.io/entry/blog/0017/), [rbenv 설치](https://rorlab.gitbooks.io/railsguidebook/content/contents/rbenv.html)

<br>
<br>


**1. ruby 설치 (2.4.6 이상이어야 tmuxinator 설치 가능)**

- 기본 ruby 2.3.7로는 x 
- 이 상태로 `gem install tmuxinator` 하니까 permission error 남.

<br>
<br>

**2. rbenv 설치 (버전 관리 용도)**

- ruby-build : version 설치 / rbenv 설치 시 함께 설치 된다. (mac OS 인 경우)

<br>

```shell
brew update
brew install rbenv
rbenv install -l // 버전 리스트 확인 
```

<br>
<br>

**3. ruby 2.6.4 설치**

<br>

```shell
rbenv install 2.6.4
rbenv rehash // 새로운 환경을 재설정하는 옵션으로 새로 루비를 설치하거나 루비 젬을 설치한 다음 반드시 실행
rbenv global 2.6.4 // global, local, shell 옵션으로 관리 
ruby -v // ruby 버전 확인

// .zshrc(zsh 사용 경우) 또는 .bash_profiles 에 추가 // 매번 터미널 켤 때마다, 버전 지정해줄 필요 없도록.
eval "$(rbenv init -)"

// vim ~/.zshrc
// source ~/.zshrc
```

<br>
<br>

**4. tmuxinator 설치**

```shell
gem install tmuxinator
```

<br>
<br>

**5. yaml 설정 파일 만들기**

<br>

```shell
tmuxinator new PROJECT_NAME
```

<br>

그럼 두근두근... specup.yml 파일을 만들어보자!
-3-... 에러

<br>

<img src="/assets/images/190906_01.png">


<br>
<br>

- ~/.bash_profiles 나 ~/.zshrc에 에디터, 셸 config 추가

<br>

```shell
vim ~/.zshrc // export EDITOR='mvim' 추가
source ~/.zshrc
```

<br>

- 짠!

<img src="/assets/images/190906_02.png">

<br>

6. .yml 파일 작성

`tmuxinator start PROJECT_NAME` 명령어만 입력하면 tmux 세션을 yml에 설정해둔 옵션으로 자동으로 실행한다. 


<br>

```shell
tmuxinator list // project list 확인
tmuxinator new test
```

<br>
<br>
