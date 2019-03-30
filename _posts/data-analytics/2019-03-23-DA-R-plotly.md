---
layout: post
title:  "[R] plotly 시작하기 / 자동으로 setwd() 실행하기"
date: 2019-03-23 22:53:59
author: Roseline Song
categories: Data-Analytics
tags: R data 
cover: "/assets/DataAnalysis.gif"
---


### Plotly 계정 생성 

온라인에서 그래프를 만들어 공유하려면 plotly 계정이 있어야 한다. api_create() 함수를 쓸 게 아니라면 ggplotly() 함수로 로컬에서 이미지를 추출하는 것만으로도 충분하다.

<br>


**1. 계정 만들기**

[plotly 계정 생성](https://plot.ly/api_signup) 페이지에서 계정을 생성한다. settings 페이지에서 API 키를 받아 확인한다. 이제 이 키를 .Rprofile에 넣어줘야 한다. 

<br>
<br>


### .Rprofile 파일 

`.Rprofile`은 R이 시작하고, 종료하는 순간에 특정 명령을 자동으로 실행하게 한다. 하지만 먼저 `.Rprofile` 파일의 존재를 R이 인식하게 하려면 **Rprofile.site에 작업디렉토리를 설정**해야 한다. 

<br>
<br>


### Rprofile.site 파일 수정

이 파일은 R이 기본으로 갖고 있는 파일이다. setwd() 함수로 Rprofile을 생성할 작업 폴더 위치를 알려주자. 

- Rprofile.site 파일 경로 : `C:\Program Files\R\R-3.5.2\etc` 보통 programfiles - R - R-3.5.x - etc 폴더에 Rprofile.site가 존재한다. 

- Rprofile.site 파일에 아래처럼 `setwd("폴더 경로")` 명령어를 추가해 원하는 경로를 저장한다. 

<br>

{% highlight python %}

setwd('C:/Users/roseline/R')

{% endhighlight %}

<br>

- 이렇게 하면 매번 setwd()를 설정하지 않아도 자동으로 작업 디렉토리를 설정해준다. 확인은 R스튜디오나 에디터에서 `getwd()` 함수를 실행해보면 된다.


<br>
<br>

### .Rprofile 파일 생성 

[공식 문서](https://www.statmethods.net/interface/customizing.html)를 참고해 작성한다. 

- 위에서 설정한 working directory(작업 폴더) 안에 `.Rprofile` 이라는 이름으로 파일 하나를 생성한다.  

- 코드 에디터(R 스튜디오, VS 코드 등)로 파일을 작성한다. 

- 공식 문서의 코드를 참고하면 이렇다 

<br>


{% highlight python %}

# Sample Rprofile.site file


# Things you might want to change
# options(papersize="a4")
# options(editor="notepad")
# options(pager="internal")


# R interactive prompt
# options(prompt="> ")
# options(continue="+ ")


# to prefer Compiled HTML
# help options(chmhelp=TRUE)
# to prefer HTML help
options(htmlhelp=TRUE)


# General options
options(tab.width = 2)
options(width = 130)
options(graphics.record=TRUE)


.First <- function(){
  library(Hmisc)
  library(R2HTML)
    # 여기에 api key 입력 
  cat("\nWelcome at", date(), "\n")
}


.Last <- function(){
  cat("\nGoodbye at ", date(), "\n")
}

{% endhighlight %}

<br>

- First 함수의 코드 블록에 명령을 적으면 R이 시작할 때 명령어가 실행된다. Last 함수 안 코드 블록은 종료할 때 실행된다. 

- First 함수 코드 블록의 API Key 입력 부분에 아래 코드를 추가한다.

<br>

{% highlight python %}

Sys.setenv("plotly_username"="plotly 아이디")
Sys.setenv("plotly_api_key"="API 키")

{% endhighlight %}

<br>
<br>



### 확인 

api_create() 함수가 잘 동작하는지 확인해보자. 
아래 코드는 [plotly - getting started](https://plot.ly/r/getting-started/) 페이지에 있는 예시이다.

<br>

{% highlight python %}

library(tidyverse) 
library(plotly) #install.packages("plotly")로 패키지 추가
library(gapminder)

gapminder$year
p <- gapminder %>%
  plot_ly(
    x = ~gdpPercap, 
    y = ~lifeExp, 
    size = ~pop, 
    color = ~continent, 
    frame = ~year, 
    text = ~country, 
    hoverinfo = "text",
    type = 'scatter',
    mode = 'markers'
  ) %>%
  layout(
    xaxis = list(
      type = "log"
    )
  )

# Create a shareable link to your chart
# Set up API credentials: https://plot.ly/r/getting-started
chart_link = api_create(p, filename="animations-mulitple-trace")
chart_link

{% endhighlight %}

<br>
<br>
