

var ErrorDetector = ErrorDetector || {};


ErrorDetector = (function () {
    'use strict'

	function pushError(what, where, line)
	{
		var errorObj = {
			'who' : getClientInfo(),
			'when' : getDateTime(),
			'where' : where || location.href,
			'what' : what || '',
			'line' : line || ''
		}
		console.log(errorObj);
	}

	function pushErrorAjax(what, where)
	{
		var errorObj = {
			'who' : getClientInfo(),
			'when' : getDateTime(),
			'where' : where || location.href,
			'what' : what,
			'type' : 'ajax'
		}
		console.log(errorObj);
	}

	function getClientInfo()
	{
		var clientInfo = 
		{
			browser : navigator.userAgent,
			session : ''
		}
		return clientInfo;
	}

	function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }


	return {
		pushError : pushError,
		pushErrorAjax : pushErrorAjax
	}


})();



window.onerror = function (what, where, line, error){
	// script error. -> https://sentry.io/answers/javascript-script-error/
    this.console.log(`${what}, ${where}, ${line}, ${error}`);
    
var getStackTrace = function() {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
  };
  
    //console.log(getStackTrace());
    this.console.trace();
    ErrorDetector.pushError(what, where, line);
};


(function monitorEvents(element) {
    var events = [];
    var log = function(e) { 

        console.log(e);
    };
  
    for(var i in element) {
         console.log(i);
      if(i.startsWith("on")) events.push(i.substr(2));
    }
    events.forEach(function(eventName) {
      element.addEventListener(eventName, (e)=>console.log(e));
    });
})(window)