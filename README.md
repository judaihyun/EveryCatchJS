# catchErrorJS


- to study
1. 현재 페이지 활성화 사용자 수
- 최초 페이지 로드, 이동, 리프레시에 따른 현재 페이지 저장.
-> js측에서 위를 위한 ajax func를 새로 만들어서,, 현재 페이지명과 현재 readyState상태, unload등의 이벤트 함수로 값을 push,
서버측에서는 이를 통하여 표출
2. 메뉴 클릭 수
- 어떠한 페이지가 클릭되었는지
-> page 변경 이벤트를 push, 혹은 pageload 이벤트를 캐치하여 push
3. 특정 로그 제외 처리(백단에서 js모듈쪽으로 값도 던져줘야함. 후순위)
- db에서 ..
-> 특정 로그 문자열로써 제외 시켜야 함. 가장 좋은 건 클라이언트측에서 해당 로그를 denied하여 push자체를 안되게 해야겠지만, 서버측에서 표출만 막아주는 간단한 방법도 있음.
4. Logger on/off
- 백단에서 단순 클릭으로 처리해줌이 맞는듯, 특정 페이지만 처리하는 것도 강구.
-> 전체를 off는 간단. 특정 페이지의 경우 off할 페이지명을 
5. 어떠한 환경에도 include만으로 동작(서버없이, CORS해결)하고 충돌, 오작동이 없어야 함. 오류가 있더라도 기존의 프론트로직이 동작하는데 있어서 절대 문제가 없어야함.
6. 에러 발생 시 어떠한 상태였는지, resource 완전 로드 후인지,전인지.
-> document.readyState 로...
7. ReferenceError 등에 따른 에러 레벨 정의 필요 (추후 모니터링에서 사용)


- 보강해야할 부분.
1. 




output

- pushError 

{
    "clientInfo" : 
    { 
        "browser":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        "session":""
    },
    "loggedDate" : "2019/07/28 19:22:47",  // error time by client-side
    "location" : "file:///C:/Users/judai/Documents/EveryCatchJS/index.html",
    "message" : "Uncaught ReferenceError: uPrivSubmit is not defined",
    "line" : 72,
    'readyState': document.readyState       
}


- pushErrorAjax

{
    "clientInfo" : 
    {
        "browser" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        "session" : ""
    },
    "loggedDate" : "2019/07/28 19:25:03",
    "location" : "file:///C:/Users/judai/Documents/EveryCatchJS/index.html",
    "message" : 
    {
        statusText
    },
    "type":"ajax",
    'readyState': document.readyState       
}





#catchEventJS

to do 

- 이벤트에 따른 분류를 두고, 그에 분류에 맞는 함수를 만들어야 할 듯



