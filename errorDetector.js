

let ErrorDetector;


ErrorDetector = (function () {
    'use strict'

     let defautOpt = {
          /* DOM event list
          https://developer.mozilla.org/ko/docs/Web/Events
          https://www.w3schools.com/jsref/dom_obj_event.asp
          */
         eventObj : [
                    'abort','load',/*'error'*/
                    'online','offline',  // Note: The ononline and onoffline events are only supported in Firefox and Internet Explorer version 8 to 10.
                    'contextmenu', // mouse event
                   // 'focus','blur',  // focus event
                    'open','message','error','close',  // webSocket event
                    'reset','submit',   // form event
                    'fullscrennchange','fullscreenerror','resize','scroll',  // view event
                    'cut','copy','paste',  //clipboard event
                    'keydown','keypress','keyup',  // keyboard event
                    //'mouseenter','mouseover','mousemove','mouseleave','mouseout',  // mouse event
                   // 'mousedown','mouseup','auxclick',
                    'click','dblclick', 'contextmenu','select',  // mouse event
                    'pointerlockchange','pointerlockerror',  // mouse event
                    //'dragstart','drag','dragend','dragenter','dragover','dragleave','drop',  // drag event
               ],
          resource : ['abort','load','error'],  // resource event]
          mouse : ['mouseenter','mouseover','mousemove','mouseleave','mouseout',  // mouse event
                   'mousedown','mouseup','auxclick','click','dbclick','contextmenu','select',
                   'pointerlocakchange','pointerlockerror']


     }

  
     let handler = _userEvent();

     function mouseHandler(e)
     {
          console.warn('mouseHandler');
          console.log(e.target);
          handler.setEvent(e.target);
     }

     function resourceHandler(e)
     {
          console.warn('resourceHandler');
          console.log(e.target);
     }

     function _userEvent(eventData)
     {
          let data = [];
 


          return {
               setEvent : function(event)
               {
                    //userEvent.eventArray.push(event);
                    let eventArray = {
                         'who' : getClientInfo(),
                         'when' : getDateTime(),
                         'where' : location.href,
                         events : ''
                    };
                    eventArray.events = event;
                    data.push(eventArray);
               },
               getEvent : function(){return data;}
          }
     }

     function _pushError(what, where, line)
	{
		let errorObj = {
			'who' : getClientInfo(),
			'when' : getDateTime(),
			'where' : where || location.href,
			'what' : what || '',
			'line' : line || ''
          }
		console.log(errorObj);
	}

	function _pushErrorAjax(what, where)
	{
		let errorObj = {
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
		let clientInfo = 
		{
			browser : navigator.userAgent,
			session : ''
		}
		return clientInfo;
	}

	function getDateTime() {
        let now     = new Date(); 
        let year    = now.getFullYear();
        let month   = now.getMonth()+1; 
        let day     = now.getDate();
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds(); 
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
        let dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
     }

     function _eventTracking(topElement) {
          let events = [];
          let log = function(e) { 
               console.log(e);
          };

          console.log('-------to attach event---------');
          defautOpt.eventObj.forEach(i =>{
               console.log(i);
               events.push(i);
          });
          console.log('-------------------------------');

          events.forEach(function(evt) {
               if(defautOpt.resource.includes(evt))
               {
                    topElement.addEventListener(evt, resourceHandler);
               }else if(defautOpt.mouse.includes(evt))
               {
                    topElement.addEventListener(evt, mouseHandler);
               }
          });
     }

   

	return {
		pushError : _pushError,
          pushErrorAjax : _pushErrorAjax,
          eventTracking : _eventTracking,
          pushUserEvent : _userEvent,
          getEvent : handler.getEvent
	}

})();

let detector = ErrorDetector;

detector.eventTracking(window);

document.addEventListener('DOMContentLoaded', function(){

     document.getElementById('showEvent').addEventListener('click', function(){
          console.log(detector.getEvent());
     },false);

},false);



window.onerror = function (what, where, line, error){
	// script error. -> https://sentry.io/answers/javascript-script-error/
     ErrorDetector.pushError(what, where, line);
};


