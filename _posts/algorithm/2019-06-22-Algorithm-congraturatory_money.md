---
layout: post
title:  "[Python] 축의금 계산 프로그램 (CLI)"
date: 2019-06-22 17:30:59
author: Roseline Song
categories: Algorithm
tags: 알고리즘 python 
cover: "/assets/dailystudy.jpg"
---

### 축의금 계산 프로그램 (Python)

팀플을 하다가 친구가 축의금 계산하는 표를 알려줬다. 프로그램으로 만들면 재밌을 것 같아서 만들었다. 

직접 해봤는데 꽤 그럴 듯한 금액들이 나온다 ㅋㅋ 

<br>

<img src="/assets/images/190622_program.png">

<br>
<br>

<hr>

<br>

### 코드 설명 

**Question 클래스 만들기**

ask() 메서드로 질문을 하고 유저로부터 answer를 받는다. answer가 Yes면 self.Y_next에 저장된 다음 Question 객체로, No면 self.N_next에 저장된 다음 Question 객체로 이동한다. 

<br>

```python
class Question :
    extra = 0 
    def __init__(self, Y_cost, N_cost, question) :
        self.Y_cost = Y_cost
        self.N_cost = N_cost
        self.question = question
    
    def link_next(self,Y_next, N_next) : 
        self.Y_next = Y_next
        self.N_next = N_next
        
    def ask(self):
        while True : 
            self.answer = input(f"{self.question} (Y/N)").upper()
            
            if self.answer == "Y" :
                Question.extra += self.Y_cost
                return self.Y_next
            elif self.answer == "N" :
                Question.extra += self.N_cost
                return self.N_next
            else : 
                print("'Y' 또는 'N'으로 입력해주세요")
```

<br>
<br>

**Question 객체 생성 및 초기화**

Yes일 때 추가할 축의금, No일 때 뺄 축의금, 질문 순서로 인자를 전달한다. 

<br>

```python
Q1 = Question(1, 0, "최근 1년 간 청첩장이 아닌 이유로 만난 적이 있다.")  
Q2 = Question(1, 0, "청첩장을 직접 받았다.")  
Q3 = Question(-1, 0, "청첩장을 모바일로 받았다.")
Q4 = Question(0, 0, "인연을 맺은 지 5년 이상이다.")  
Q5 = Question(0, 0, "직장 동료다.") 
Q6 = Question(0, 0, "SNS 친구다.")  
Q7 = Question(1, 0, "자주 보는 사이다.")  
Q8 = Question(-2, 0, "이번이 재혼이다.")  
Q9 = Question(2, 0, "식장이 호텔이다.")  
Q10 = Question(-2, 0, "그로부터 상처를 받은 적이 있다.")  
Q11 = Question(-1, 0, "결혼 성수기다. ") 
Q12 = Question(-1, 0, "식장이 지방이다.") #  -> 봉투만 전해도 OK
Q13 = Question(2, 0, "나도 2년 안에 결혼할 예정이다.") # -> 필참
Q14 = Question(1, 0, "액수를 정했는데 뭔가 불안하다.") # -> 봉투만 전해도 OK
```

<br>
<br>

**Question 객체 잇기**

Yes일 때 다음으로 넘어갈 Question 객체, No일 때 다음으로 넘어갈 Question 객체를 link_next() 메서드의 인자로 전달한다. 마지막 12~14번 질문은 결과를 저장. 

<br>

```python
Q1.link_next(Q2, Q3)
Q2.link_next(Q5, Q3)
Q3.link_next(Q6, Q5)
Q4.link_next(Q7, Q9)
Q5.link_next(Q7, Q4)
Q6.link_next(Q11, Q5)
Q7.link_next(Q8, Q9)
Q8.link_next(Q10, Q11)
Q9.link_next(Q13, Q12)
Q10.link_next(Q12, Q11)
Q11.link_next(Q9, Q13)
Q12.link_next("봉투만 전해도 OK", Q13)
Q13.link_next("필참", Q14)
Q14.link_next("필참", "봉투만 전해도 OK")
```

<br>
<br>

**Main 로직**

next_Q에 저장된 객체의 ask()메서드로 묻고, 다시 next_Q에 새로운 Question 객체를 저장한다. Q12~14를 통해 나온 결과("필참" or "봉투만 전해도 OK")가 나올 때까지 이 과정을 while문으로 반복한다. 

<br>

```python
next_Q = Q1.ask()
while ((next_Q != "필참") & (next_Q != "봉투만 전해도 OK")):
    next_Q = next_Q.ask()

congraturatory_money += Question.extra

print("=============================================")
print(f"내야할 돈은 {congraturatory_money}만 원!")
print(next_Q)
print("=============================================")
```

<br>
<br>

<hr>

<br>

### 전체 코드 

다음 노드로 이동하며 질문을 잇는다.

<br>

```python
# 축의금 
congraturatory_money = 5

class Question :
    extra = 0 
    def __init__(self, Y_cost, N_cost, question) :
        self.Y_cost = Y_cost
        self.N_cost = N_cost
        self.question = question
    
    def link_next(self,Y_next, N_next) : 
        self.Y_next = Y_next
        self.N_next = N_next
        
    def ask(self):
        while True : 
            self.answer = input(f"{self.question} (Y/N)").upper()
            
            if self.answer == "Y" :
                Question.extra += self.Y_cost
                return self.Y_next
            elif self.answer == "N" :
                Question.extra += self.N_cost
                return self.N_next
            else : 
                print("'Y' 또는 'N'으로 입력해주세요")
                
Q1 = Question(1, 0, "최근 1년 간 청첩장이 아닌 이유로 만난 적이 있다.")  
Q2 = Question(1, 0, "청첩장을 직접 받았다.")  
Q3 = Question(-1, 0, "청첩장을 모바일로 받았다.")
Q4 = Question(0, 0, "인연을 맺은 지 5년 이상이다.")  
Q5 = Question(0, 0, "직장 동료다.") 
Q6 = Question(0, 0, "SNS 친구다.")  
Q7 = Question(1, 0, "자주 보는 사이다.")  
Q8 = Question(-2, 0, "이번이 재혼이다.")  
Q9 = Question(2, 0, "식장이 호텔이다.")  
Q10 = Question(-2, 0, "그로부터 상처를 받은 적이 있다.")  
Q11 = Question(-1, 0, "결혼 성수기다. ") 
Q12 = Question(-1, 0, "식장이 지방이다.") #  -> 봉투만 전해도 OK
Q13 = Question(2, 0, "나도 2년 안에 결혼할 예정이다.") # -> 필참
Q14 = Question(1, 0, "액수를 정했는데 뭔가 불안하다.") # -> 봉투만 전해도 OK

Q1.link_next(Q2, Q3)
Q2.link_next(Q5, Q3)
Q3.link_next(Q6, Q5)
Q4.link_next(Q7, Q9)
Q5.link_next(Q7, Q4)
Q6.link_next(Q11, Q5)
Q7.link_next(Q8, Q9)
Q8.link_next(Q10, Q11)
Q9.link_next(Q13, Q12)
Q10.link_next(Q12, Q11)
Q11.link_next(Q9, Q13)
Q12.link_next("봉투만 전해도 OK", Q13)
Q13.link_next("필참", Q14)
Q14.link_next("필참", "봉투만 전해도 OK")

next_Q = Q1.ask()
while ((next_Q != "필참") & (next_Q != "봉투만 전해도 OK")):
    next_Q = next_Q.ask()

congraturatory_money += Question.extra

print("=============================================")
print(f"내야할 돈은 {congraturatory_money}만 원!")
print(next_Q)
print("=============================================")
```

<br>
<br>