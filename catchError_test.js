
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
            expect(catchError.pushError(i)).toBeUndefined();
        })
    })

    describe('function test', function()
    {

        var evt = new Event('error', {
            error : new Error('AAAHHHH'),
            message : 'A monkey is throwing bananas at me!',
            lineno : 402,
            filename : 'closet.html',
            target : 'test'
        });
        var imgEl = document.createElement('img');
        Object.defineProperty(evt, 'target', {writable: false, value: imgEl});

        it('test', ()=>{
            //console.log(evt);
            catchError.imgError(evt);
            //var temp = catchError.imgError()
        })

    });
});
  


