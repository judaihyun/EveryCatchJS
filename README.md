# EveryCatchJS
none


- to survey 

1. web usage analysis
: 현재 활성화 사용자 수
: 메뉴 클릭 수

2. Logger on/off

3. 중복 log 제거.






to do 


- 최초 페이지 로드, 이동, 리프레시에 따른 현재 페이지 저장.
- 이벤트에 따른 분류를 두고, 그에 분류에 맞는 함수를 만들어야 할 듯





output

- pushError 

{
    "clientInfo" : 
    { 
        "browser":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        "session":""
    },
    "date" : "2019/07/28 19:22:47", 
    "location" : "file:///C:/Users/judai/Documents/EveryCatchJS/index.html",
    "message" : "Uncaught ReferenceError: uPrivSubmit is not defined",
    "line" : 72
}


- pushErrorAjax

{
    "clientInfo" : 
    {
        "browser" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        "session" : ""
    },
    "date" : "2019/07/28 19:25:03",
    "location" : "file:///C:/Users/judai/Documents/EveryCatchJS/index.html",
    "message" : 
    {
        "readyState":0,"status":0,"statusText":"error"
    },
    "type":"ajax"
}




- selectMsg(what)

ErrorEvent : {
    type:'error',
    target: img
}