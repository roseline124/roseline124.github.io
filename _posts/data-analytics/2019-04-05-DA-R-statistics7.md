---
layout: post
title:  "[통계학#7] 단측 검정과 양측 검정, p-value, 분산추론"
date: 2019-04-05 23:55:59
author: Roseline Song
categories: Data-Analytics
tags: R 통계학 강의
cover: "/assets/DataAnalysis.gif"
---

※ K-Mooc 통계학 / 전공 데이터 애널리틱스 강의를 듣고 정리한 내용입니다.

<br>
<br>

### 단측검정과 양측검정

귀무가설 $$μ=μ_0$$에 대해 3가지 형태의 대립가설이 가능하다. 

**대립가설 3가지**

- $$μ > μ_0$$ (단측 검정, one-sided) 
- $$μ < μ_0$$ (단측 검정, one-sided)
- $$μ ≠ μ_0$$ (양측 검정, two-sided)

<br>

<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/assets/images/190405_Rplot.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/assets/images/190405_Rplot01.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/assets/images/190405_Rplot02.png" class="d-block w-100" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<br>
<br>

<hr>

<br>

### 유의확률(P-Value)

주어진 검정통계량을 기각시키기 위한 제 1종 오류의 최소값. P-Value가 작을 수록 귀무가설을 기각할 수 있는 정당성이 커진다.

유의수준 $$α$$에서 

- 귀무가설이 기각되려면 $$p-value < α$$
- 귀무가설이 채택되려면 $$p-value > α$$

<br>

P-Value는 통계가 유의미한지 알려주는 지표가 되기도 한다. P-Value가 작을 수록 내가 내린 결론이 유의미해진다. 

- $$0.05 < p-value < 0.1$$ -> 유의하다 
- $$0.1 < p-value < 0.05$$ -> 매우 유의하다 
- $$p-value < 0.01$$ -> 매우 강력하게 유의


<br>
<br>

<hr>

<br>

### 분산추론 

**점 추정치**

<br>

$$E(s^2) = σ^2$$ (불편추정치)


<br>
<br>

**모분산에 대한 추론**

$$W = (n-1)s^2 / σ^2$$

<br>

W는 정규분포라는 가정 하에 자유도가 n-1인 카이제곱 분포를 따른다. 자유도가 n-1 즉, 제약식 조건 하나를 빼는 이유는 '표본평균'이 주어져야 표준오차를 계산을 할 수 있기 때문이다. 

$$s^2 = \frac{1}{n-1} Σ(X_i - \bar{X}^2)$$


<br>
<br>
