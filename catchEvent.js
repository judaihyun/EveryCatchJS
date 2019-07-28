


let CatchEvent = function () {
    'use strict'

    let defautOpt = {
        /* DOM event list
        https://developer.mozilla.org/ko/docs/Web/Events
        https://www.w3schools.com/jsref/dom_obj_event.asp
        */
        eventObj: [
            'abort', 'load',/*'error'*/
            'online', 'offline',  // Note: The ononline and onoffline events are only supported in Firefox and Internet Explorer version 8 to 10.
            'contextmenu', // mouse event
            // 'focus','blur',  // focus event
            'open', 'message', 'error', 'close',  // webSocket event
            'reset', 'submit',   // form event
            'fullscrennchange', 'fullscreenerror', 'resize', 'scroll',  // view event
            'cut', 'copy', 'paste',  //clipboard event
            'keydown', 'keypress', 'keyup',  // keyboard event
            //'mouseenter','mouseover','mousemove','mouseleave','mouseout',  // mouse event
            // 'mousedown','mouseup','auxclick',
            'click', 'dblclick', 'contextmenu', 'select',  // mouse event
            'pointerlockchange', 'pointerlockerror',  // mouse event
            //'dragstart','drag','dragend','dragenter','dragover','dragleave','drop',  // drag event
        ],
        resource: ['abort', 'load', 'error'],  // resource event]
        mouse: ['mouseenter', 'mouseover', 'mousemove', 'mouseleave', 'mouseout',  // mouse event
            'mousedown', 'mouseup', 'auxclick', 'click', 'dbclick', 'contextmenu', 'select',
            'pointerlocakchange', 'pointerlockerror']

    };



    let parent = this.helper;


    function _userEvent() {
        let data = [];

        return {
            setEvent: function (event) {
                let eventArray = {
                    'who': parent.getClientInfo(),
                    'when': parent.getDateTime(),
                    'where': location.href,
                    events: ''
                };
                eventArray.events = event;
                data.push(eventArray);
            },
            getEvent: function () { return data; }
        }
    };

    let userEvent = _userEvent();


    let handler = {
        mouseHandler: function (e) {
            console.warn('mouseHandler');
            console.log(e.target);
            userEvent.setEvent(e.target);
        },
        resourceHandler: function (e) {
            console.warn('resourceHandler');
            console.log(e.target);
        }
    }

    function _bindEvent() {
        let events = [];
        let log = function (e) {
            console.log(e);
        };

        console.log('-------to attach event---------');
        defautOpt.eventObj.forEach(i => {
            //console.log(i);
            events.push(i);
        });
        console.log(this);
        console.log('-------------------------------');
        events.forEach(function (evt) {
            if (defautOpt.resource.includes(evt)) {
                window.addEventListener(evt, handler.resourceHandler);
            } else if (defautOpt.mouse.includes(evt)) {
                window.addEventListener(evt, handler.mouseHandler);
            }
        });
    };

    return {
        bindEvent : _bindEvent,
        userEvent
    }

}

CatchEvent.prototype = Object.create(CatchError.prototype);

let myCatch = new CatchEvent();

myCatch.bindEvent();


document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('showEvent').addEventListener('click', function () {
        console.log(myCatch.userEvent.getEvent());
    }, false);

}, false);


