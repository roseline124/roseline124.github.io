---
layout: post
title:  "[R] 랜덤 팀 배정하는 함수 / R로 마음 전하기"
date: 2019-03-20 22:53:59
author: Roseline Song
categories: Data-Analytics
tags: R 함수
cover: "/assets/DataAnalysis.gif"
---



### 교수님이 내주신 개인 과제 

<br>

R로 무작위 팀을 배정하는 함수를 만들었다. 사실 python으로 GUI 실행 프로그램으로 만들었는데, R로 해오라고 하셔서 둘째 주에 같은 프로그램을 R로 새로 만들었다... 새로운 언어지만 직접 프로그램을 만드니까 더 빠르게 배울 수 있는 것 같다. 스스로 복습하기 위해 다시 정리해봤다.

​
1. **구글 R 가이드라인** 준수하여 작성 
<br>

2. **description** : 팀장을 입력하고 한양대 출석부 파일(xls, xlsx 포맷)을 작업 디렉토리 안에 넣으면 알아서 팀 배정을 해준다. (only 한양대 출석부만 됨!) 자세한 것은 함수 초반의 주석 부분을 읽는다. 
<br>

3. **전체 코드** : 아래에 코드를 설명하겠다.  

<br>
{% highlight python %}
R.andom.team <- function(fileName, leaders, times=1) {
  # @Roseline Song 2019
  # Assigns teams randomly from attendance file.
  # 
  # Args:
  #   fileName: file must be '.xls' or '.xlsx' format and below working directory
  #   leaders : vector of leaders' name for assigning teams 
  #   times : How many times the teams will be shuffled?
  #
  # Returns: 
  #   Data frame of team randomly assigned 
  library(readxl)
  
  # Get filePath 
  wd_path <- getwd()
  filePath <- paste(wd_path,"/", fileName, sep="")  
  
  tryCatch(raw_df <- read_excel(filePath, na="", skip=11, col_names=FALSE), 
           error=function(e) print("파일이 작업 폴더 안에 있는지, 
           또는 확장자를 확인해주세요."),
           warning=function(w) print("warning! warning!"),
           finully=NULL)
  
  # Indexing
  df <- raw_df[, c(4,6,7)]
  df <- na.omit(df)  
  
  # Rename columns
  colnames(df) <- c("major", "id", "name")
  print(df)
  
  # Devide groups into two groups(leaders, mates)
  l_df <- df[df$name %in% leaders, ]
  m_df <- df[!df$name %in% leaders, ]
  
  # Assign team numbers to leaders
  team_num <- seq(1,length(leaders))
  l_df["team"] <- team_num 
  
  # Random shuffle mates
  for(n in seq(times)){
    m_df <- m_df[sample(nrow(m_df)), ]
  } 

  # Assign team numbers to mates 
  rep_num <- rep(team_num, (round(nrow(m_df)/length(team_num)))+1)
  m_df["team"] <- rep_num[1:nrow(m_df)] 
  
  # Row bind leaders_group and mates_group
  rand_teams <- rbind(l_df, m_df)
  
  ########## Show result ##########  
  require(dplyr)
  
  # Slicing id : 2014047538 -> 14
  rand_teams["id"]<- unlist(mutate( (floor(rand_teams["id"]/1e+06)) %% 2000 ))  
  
  # Change string to integer
  tmp <- rand_teams
  tmp$major[!(tmp$major=="광고홍보학과")] <- 1
  tmp$major[tmp$major=="광고홍보학과"] <- 0
  tmp$major <- as.numeric(tmp$major)
  
  # Show team result
  rand_teams <- rand_teams[order(rand_teams$team),]
  
  print("랜덤 팀")  
  for( i in team_num){
    print(filter(rand_teams, team==i))
  }
  
  # Mean of id by team
  print("팀별 평균 학번")
  print(aggregate(rand_teams["id"], by=rand_teams["team"], mean ))
  
  # Other majors in each team 
  print("팀별 타과생 수")
  print(aggregate(tmp["major"], by=tmp["team"], sum)) 
  
  return(rand_teams)  
}

leaders <- c("홍길동","동길홍", "윤동길", "윤길동")
R.andom.team("R_study/students.xls",leaders)
{% endhighlight %}

<br>

<hr>

<br>

### 코드 설명

<br>


**1. 파일 경로 확인**

<br>

{% highlight python %}
R.andom.team <- function(fileName, leaders, times=1) {
  # @Hyunji Song 2019
  library(readxl)
  
  # Get filePath 
  wd_path <- getwd()
  filePath <- paste(wd_path,"/", fileName, sep="")  
  
  tryCatch(raw_df <- read_excel(filePath, na="", skip=11, col_names=FALSE), 
           error=function(e) print("파일이 작업 폴더 안에 있는지, 
           또는 확장자를 확인해주세요."),
           warning=function(w) print("warning! warning!"),
           finully=NULL)

{% endhighlight %}

<br>

함수 초반 부분이다. 사용자 편의를 위해 작업 폴더 밑에 있는 출석부 파일의 이름만 적으면 되도록했다. 

- **getwd()** : 작업 폴더 경로를 알아낸다.

- **paste()** : 문자열을 붙이는 함수. 작업 폴더 경로와 사용자가 입력한 파일 이름을 붙여서 파일 전체 경로를 만든다.

- **tryCatch()** : 에러 핸들링. xls, xlsx 포맷이 아니거나 파일이 작업 폴더 안에 없다면 error 메시지가 뜬다.


<br>

**2. 데이터 다듬기**

<br>

{% highlight python %}
 # Indexing
  df <- raw_df[, c(4,6,7)]
  df <- na.omit(df)  
  
  # Rename columns
  colnames(df) <- c("major", "id", "name")
  print(df)
{% endhighlight %}

<br>

한양대 출석부 파일에는 한양대 로고 이미지도 있고, 행간마다 결측값들이 존재한다. 데이터를 다듬기 위해 필요한 열(학과, 학번, 이름)만 골라내고, **na.omit()**으로 결측값을 제거했다. 

**colnames()**를 쓰면 컬럼 이름에 원하는 이름을 넣을 수 있다. 



<br>

**4. 팀장 그룹, 팀원 그룹 나누기 + 팀원 그룹 랜덤으로 섞기.**

<br>
{% highlight python %}

# Devide groups into two groups(leaders, mates)
  l_df <- df[df$name %in% leaders, ]
  m_df <- df[!df$name %in% leaders, ]
  
  # Assign team numbers to leaders
  team_num <- seq(1,length(leaders))
  l_df["team"] <- team_num 
  
  # Random shuffle mates
  for(n in seq(times)){
    m_df <- m_df[sample(nrow(m_df)), ]
  } 
{% endhighlight %}

팀장에게 팀원을 한 명씩 할당하는 그림을 생각했다. 그래서 한 반을 두 개의 그룹으로 쪼개고, 팀장에게는 팀 번호를 부여했다. 팀원은 무작위 배정을 위해 팀 번호를 부여하기 전 파이썬의 random.shuffle()과 비슷한 역할을 하는 **sample()함수**를 활용했다.

교수님이 주신 피드백대로 함수 호출 시 **shuffle의 횟수를 times라는 파라미터로 전달할 수 있게끔 수정**했다.​

<br>

**4. 팀원 할당하기**

<br>
{% highlight python %}

 # Assign team numbers to mates 
  rep_num <- rep(team_num, (round(nrow(m_df)/length(team_num)))+1)
  m_df["team"] <- rep_num[1:nrow(m_df)] 
  
  # Row bind leaders_group and mates_group
  rand_teams <- rbind(l_df, m_df)
{% endhighlight %}

3에서 팀장에게 각각 부여된 팀 번호가 무작위로 섞인 팀원 그룹에게 순서대로 할당된다. ex) 1,2,3,4 / 1,2,3,4 / ... 

**rep(반복할 시퀀스, 반복 횟수)함수**를 쓰면 시퀀스를 반복해서 나열할 수 있다. 그리고 **rbind()**로 팀장 그룹과 팀원 그룹을 다시 하나로 합쳐준다.


<br>

**5. 결과 보여주기**

<br>
{% highlight python %}

########## Show result ##########  
  require(dplyr)
  
  # Slicing id : 2014047538 -> 14
  rand_teams["id"]<- unlist(mutate( (floor(rand_teams["id"]/1e+06)) %% 2000 ))  
  
  # Change string to integer
  tmp <- rand_teams
  tmp$major[!(tmp$major=="광고홍보학과")] <- 1
  tmp$major[tmp$major=="광고홍보학과"] <- 0
  tmp$major <- as.numeric(tmp$major)
  
  # Show team result
  rand_teams <- rand_teams[order(rand_teams$team),]
  
  print("랜덤 팀")  
  for( i in team_num){
    print(filter(rand_teams, team==i))
  }
  
  # Mean of id by team
  print("팀별 평균 학번")
  print(aggregate(rand_teams["id"], by=rand_teams["team"], mean ))
  
  # Other majors in each team 
  print("팀별 타과생 수")
  print(aggregate(tmp["major"], by=tmp["team"], sum)) 
  
  return(rand_teams)  
}
{% endhighlight %}
<br>


함수의 핵심 로직은 4번에서 끝났고, 5번부터는 console에 데이터를 보여주는 것이다. **팀마다의 공정성을 고려해 팀별 평균 학번, 팀별 타과생 수**를 볼 수 있게 했다. 사실 팀별 학번이나 타과생 수에 조건을 주어서 다시 한 번 랜덤 배정을 하는 방법을 생각해봤는데, 어떻게 할 지 방법이 떠오르지 않았다. 

지금도 그닥 좋은 수가 생각나지 않는다. 혹시 좋은 생각이 있다면 알려주시면 좋을 것 같습니다.

<br>
<br>

<hr>
​​
<br>

### ​자매품 : R로 마음 전하기 

<br>

팍팍한 시대에 생각지도 못한 방법으로 내 마음을 전해보자. 


<br>
{% highlight python %}
str_len <- function(string) {
  s <- unlist(strsplit(string,""))
  return(length(s))  
}

R.love.u <- function(message) {
  dat<- data.frame(t=seq(0, 2*pi, by=0.1) )
  xhrt <- function(t) 16*sin(t)^3
  yhrt <- function(t) 12*cos(t)-5*cos(2*t)-2*cos(3*t)-cos(4*t)
  dat$y=yhrt(dat$t)
  dat$x=xhrt(dat$t)
  with(dat, plot(x,y, type="l"))
  with(dat, polygon(x,y, col="pink"))
  
  if (str_len(message) < 20) {
    font_size <- 2.0
  } else if(str_len(message) < 40) {
    font_size <- 1.5 
  } else {
    font_size <- 1
  }
  text(0, 0, message, adj=c(0.5,0), cex=font_size)
}

R.love.u("R Love You")
 ​
{% endhighlight %}
<br>


<img src="https://postfiles.pstatic.net/MjAxOTAzMjBfMTY3/MDAxNTUzMDkyNjU4NDk0.xIhKlhGX4oHB8zKQ5vG1utvPUOr2aggdQow9jc7Gt00g.rZ7KMw_3rcD-FBkpBYb6UIAsm_bBSCs10-ONgPVI3fUg.PNG.guseod24/Rplot.png?type=w966" title="R loves U">