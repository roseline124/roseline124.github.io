---
layout: post
title:  "[R] 서울시 치킨 데이터 - read.csv 한글 깨짐 오류 해결, 움직이는 그래프 그리기"
date: 2019-03-22 22:53:59
author: Roseline Song
categories: Data-Analytics
tags: R data 
cover: "/assets/DataAnalysis.gif"
---

<br>

데이터 로드, 가공, 그래프 그리기에 관한 포스트다. 
분석에 관한 내용은 이후 포스트에서 올릴 예정이다. 이 포스트에서 유의미한 통계는 아니지만 어떻게 한글 데이터를 불러오고 가공하고 그래프를 그리는지 확인할 수 있다.

### chicken 데이터 불러오기

[SK의 빅데이터 허브](https://www.bigdatahub.co.kr/index.do)에 가면 이런 자료들이 많다. 서울시 치킨집 또는 배달 통화건수 데이터들은 달마다 올라온다. 하지만 이 데이터만으로는 부족하고 다른 인구통계학적 데이터가 같이 가미되면 좋을 것 같다.

이전에 R로 랜덤 팀 배정하는 프로그램을 만들 때 csv 파일 한글이 계속 깨져서 포기하고 엑셀 포맷만 다뤘는데, 드디어 방법을 찾아냈다. (보통 원인은 MAC과 윈도우에서 파일을 주고 받을 때 생긴다. 인코딩 방법이 달라서.)

<br>

{% highlight python %}
library(tidyverse)
library(plotly)
library(COUNT)

df <- read.csv('dataset/chicken.csv', 
               header=T,
               fileEncoding = 'euc-kr',
               encoding = 'utf-8') 

{% endhighlight %}

<br>
<br>


1. Error1 

read.csv() 함수를 쓰면서 겪었던 에러 문제를 먼저 말해보겠다.

<pre><code>

'dataset/chicken.csv 에서 readTableHeader에 의하여 발견된 완성되지 않은 마지막 라인입니다

</code></pre>

**해결** 

파일 마지막 셀에 스페이스를 넣어 마지막 라인을 넣어준다. 

이때 주의할 게 그냥 저장하면 **유니코드 텍스트**로 저장되어서 다시 csv 파일을 열 때 모든 컬럼 내용이 하나의 컬럼으로 합쳐지는 경우가 있다. 그럴 때는 **다른 이름으로 저장해서 csv(쉼표로 분리, utf-8)로 저장**한다.


2. Error2 

<pre><code>

Error in make.names(col.names, unique = TRUE) :
  invalid multibyte string at '~'

</code></pre>

**해결**

맨 위 코드처럼 read.csv에 아래 옵션을 추가한다.

<pre><code>

fileEncoding = "euc-kr",
encoding = 'utf-8' 

</code></pre>


### chicken 데이터 가공하기 

**컬럼 이름**

가공할 필요성을 못느껴 일단 놔두었다. 

<br>

{% highlight python %}

names(df) # 컬럼 이름들 확인

{% endhighlight %}

<br>
<br>


**기준일 -> '연, 월, 일'로 바꾸기**

2019년 1월 한 달 데이터라 연과 월은 모두 같다. 연, 월, 일로 분리시키고 싶었는데 이 데이터의 기준일 같은 경우 '-'나 '/'처럼 구분자가 없어서(ex. 190101) 어떻게 분리해야 하나 싶었다. 고민하다가 [스택오버플로우](https://stackoverflow.com/questions/36406650/date-split-in-r)에서 좋은 방법을 발견 했다. 



<br>

{% highlight python %}

date <- as.Date(as.character(df$기준일), format = "%Y%m%d")
lt <- unclass(as.POSIXlt(date))
df[, c("날짜", "연", "월", "일")] <- with(lt, 
                                data.frame(날짜 = date
                                , 연 = year + 1900
                                , 월 = mon + 1
                                , 일 = mday))

{% endhighlight %}


**또 다른 방법 : 기준일을 주별로 나누기**

조교님이 알려주신 방법인데, gapminder 데이터셋처럼 3일 ~ 4일 별로 날짜 데이터를 다시 가공하고 싶다면 아래 코드처럼 하면 된다. 

`myTable()` 함수를 쓰려면 library(COUNT)를 import 해야한다. 아마 빌트인 라이브러리라 설치는 따로 필요없을 것이다. 

<br>

{% highlight python %}

df$date <- cut(df$기준일, seq(20190101,20190131,7),right = F)

levels(df$date) <- c("w1","w2","w3","w4")
myTable(df$date)

df$re.date <- cut(df$기준일, 
                  br=c(20190100,20190106,20190113,20190120,20190127,20190132),
                  labels=c("w1","w2","w3","w4","w5"))

myTable(df$re.date)
df$re.date

head(df)

{% endhighlight %}

<br>
<br>


**컬럼 인덱싱**

이 데이터는 모두 서울시의 치킨집 통화건에 관한 데이터이다. 따라서 '업종' 컬럼의 '치킨', 도시 컬럼의 '서울' 데이터 같은 경우는 필요가 없다. 필요한 데이터만 골라내기 위해 `cbind()`로 **컬럼을 선택**해 묶어주었다. cbind를 쓰면 **컬럼 순서도 바꿀 수 있다**. 

<br>

{% highlight python %}

df2 <- cbind(df[,11:13], df[,2:4], df[,6:7], df[9])

head(df)
head(df2)

{% endhighlight %}

<br>


**남녀 -> 숫자로**

`str(df)`로 확인해보면 데이터 **타입이 factor**로 되어있는 컬럼들이 있다. 이런 컬럼들은 factor() 함수로 **레벨을 새로 지정해줄 필요없이 levels를 다시 지정**해주면 된다. 

<br>

{% highlight python %}

levels(df2$성별) <- c(1, 0)

{% endhighlight %}

<br>
<br>

**gapminder**

데이터를 새로 추가해야하지만, 움직이는 그래프가 보고 싶어서 gapminder 데이터셋 예시를 보고 그려봤다. 

[움직이는 그래프](https://roseline124.github.io/assets/files/chicken_gap.html) 확인

<br>


<img src="https://postfiles.pstatic.net/MjAxOTAzMjNfMTc1/MDAxNTUzMjgyNTY2OTY0.Q9BL7YLKR9QOyuHeqzHSmpFpYYVYDrzFPEwkch0mn6wg.BghagvtSk1TL3Wd_Ik6l2Zk74ljH4lrJk7Sjk7U0M_gg.PNG.guseod24/Rplot.png?type=w966">


<br>

{% highlight python %}

p <- df2 %>%
  plot_ly(
    x = ~연령대, 
    y = ~통화건수, 
    color = ~시군구, 
    frame = ~일, 
    type = 'scatter',
    mode = 'markers'
  ) 

ggplotly(p)

{% endhighlight %}

<br>
<br>

