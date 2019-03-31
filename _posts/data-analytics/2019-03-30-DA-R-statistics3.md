---
layout: post
title:  "[통계학#3] Z-Test - 가설 검증 분석 기법"
date: 2019-03-30 23:46:59
author: Roseline Song
categories: Data-Analytics
tags: R 데이터 랜덤팀배정 함수 과제 강의
cover: "/assets/DataAnalysis.gif"
---

※ 강의 데이터 애널리틱스를 듣고 정리한 내용입니다.

<br>


z-test는 두 집단의 평균비교를 통한 가설을 검증하는 분석기법을 말한다. 원칙적으로 모집단의 표준편차를 알고 있는 경우에 z-test를 사용하며, 표준편차를 모를 경우 t-test를 사용한다. 그러나 표본의 크기가 30보다 크다면 ‘중심극한정리(Central Limit Theorem)’에 의해서 정규분포를 따른다고 보고 모집단의 표준편차를 모를지라도 z-test를 사용할 수 있다.

### Z-Test 공식




### Central Limit Theorem

Z-test는 모집단의 표준편차를 알아야 한다. 하지만 우리는 모집단의 표준편차를 모르므로 '정규 분포'임을 전제로 한다.

만약 정규 분포를 보이지 않을 때는 '비모수 통계'를 사용한다. 