
describe('init Test', function() {
   
    var errorTemplate = {};

    errorTemplate.imgNotFound = '{"who":{"browser":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36","session":""},"when":"2019/08/11 22:23:15","location":"file:test.html","message":"error","line":"<img src=localhosts//test.jpg\"}';
    var temp = JSON.parse(errorTemplate.imgNotFound);

    var errorEvt = new ErrorEvent('nose', {
        error : new Error('AAAHHHH'),
        message : 'A monkey is throwing bananas at me!',
        lineno : 402,
        filename : 'closet.html'
    });
   
    beforeEach(()=>{

    })

    it('pushError()의 arg가 null, undefined이면 아무것도 안한다',function()
    {
        var badArgs = [ undefined, null ];
        badArgs.forEach(i => {
            expect(Catcher.pushError(i)).toBeUndefined();
        })
    })

    describe('function test', function()
    {

        var evt = new Event('error', {
            error : new Error('AAAHHHH'),
            message : 'error',
            lineno : 402,
            filename : 'Catcher.html',
        });
        var errorEvt = new ErrorEvent('error',{
            message : 'Uncaught SyntaxError',
            lineno : 41,
            filename : 'Catcher.html'
        });

        
        /*
            net::ERR_FILE_NOT_FOUND
        */
        it('selectMsg() <- EVENT 객체일 때 whatMsg는 type, lineMsg는 outerHtml', ()=>{
            var imgEl = document.createElement('img');
            imgEl.setAttribute('src','localhost/test.png');
            Object.defineProperty(evt, 'target', {writable: false, value: imgEl});

            expect(Catcher.selectMsg(evt)).toEqual(jasmine.objectContaining({
                whatMsg: 'error', lineMsg: '<img src="localhost/test.png">'
            }))
        })

        it('selectMsg() <- ErrorEvent 객체일 때 whatMsg는 에러메시지, lineMsg는 해당 에러 line 번호', ()=>{
            expect(Catcher.selectMsg(errorEvt)).toEqual(jasmine.objectContaining({
                whatMsg: 'Uncaught SyntaxError', lineMsg: 41
            }))
        })

        it('pushError() <- EVENT 객체일 때 line는 outerHtml, message는 "error" ', ()=>{
        
            expect(Catcher.pushError(evt)).toEqual(jasmine.objectContaining({
                line: '<img src="localhost/test.png">',
                message: 'error'
            }))
        })

        it('pushError() <- ErrorEvent 객체일 때 message는 에러메시지, line는 해당 에러 line 번호', ()=>{
            expect(Catcher.pushError(errorEvt)).toEqual(jasmine.objectContaining({
                message: 'Uncaught SyntaxError',
                line: 41
            }))
        })
        

    });
});


  


