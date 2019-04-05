---
layout: post
title:  "[딥러닝] 가중치 갱신 방법과 Epoch- SGD, 배치(Batch), 미니 배치(Mini Batch)"
date: 2019-03-30 13:54:00
author: Roseline Song
categories: Data-Analytics
tags: 딥러닝
cover: "/assets/dailystudy.jpg"
sitemap : 
changefreq : week
---

### 3가지 가중치 갱신 방법

가중치 갱신 방법으로 SGD, Batch, Mini Batch 3가지 등이 있다. 

<br>
<br>


### SGD (Stochastic Gradient Descent)

확률론적 경사하강법 SGD는 학습할 때마다 가중치를 갱신한다. **전체 학습 데이터가 N개면 가중치를 N번 갱신**한다. 학습할 때마다 신경망 성능이 들쑥날쑥 변하면서 정답에 가까워지기 때문에 '무작위적'으로 보여서 확률론적 경사하강법이라고 한다. 이전에 델타 규칙에서 학습 시키고 다시 가중치를 갱신했었는데, 이 방법이 SGD이다. 이름만 어려울 뿐이다.  

<br>

**SGD의 가중치 갱신값**

<br>

{% highlight python %}

Δω = αδx

{% endhighlight %}

<br>


<br>
<br>

### Batch 

배치 방식은 전체 학습 데이터를 모두 학습한 후 가중치를 갱신한다. 즉, 1번만 가중치를 갱신한다. 단점은 가중치 갱신값의 평균을 계산하는데 시간이 많이들고, 가중치 갱신도 느리다. 학습에 오랜시간이 걸린다. 
<br>

**Batch의 가중치 갱신값**

Δω(k)는 K번째 학습 데이터의 가중치 갱신값이고, N은 학습 데이터의 총 개수이다. 평균 가중치 갱신값을 구해 가중치를 갱신하므로 **학습 데이터마다의 가중치 갱신값을 구해 N으로 나누고 이 값으로 가중치를 갱신**한다.


<br>

{% highlight python %}

Δω = 1/N ∑(k=1, N) Δω(k)

{% endhighlight %}

<br>

<br>
<br>

### Mini Batch 

미니 배치는 SGD와 배치를 섞은 것이다. 전체 데이터를 N 등분하여 각각의 학습 데이터를 배치 방식으로 학습 시킨다. 일부 학습 데이터의 가중치 갱신값을 계산한 후, 이 값들의 평균으로 가중치 갱신한다. 만약 학습 데이터가 100개고, 배치 하나를 20으로 잡았으면 총 5번의 가중치 갱신이 필요하다. 

<br>
<br>

### Epoch 

<br>

<img src="/assets/images/190330_deep5.jpg" style="width:400px;">

<br>

위에서 학습시키고, 가중치를 갱신하는 일련의 과정을 epoch라고 본다. 위의 사진에 나오는 한 번의 과정이 Epoch 하나에 해당한다. 배치와 미니배치의 경우 가중치를 몇 번 갱신하느냐로 보면 된다.

- SGD는 학습데이터 1개마다 가중치 갱신하므로 전체 학습데이터가 N개면 Epoch가 N번

- 배치는 딱 1번만 하기 때문에 Epoch가 1번

- 미니배치는 어떻게 묶느냐에 따라 다르기 때문에 Epoch는 그때그때 다르다. 

<br>
<br>

