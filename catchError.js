



let CatchError = function(){};


CatchError.prototype.helper = {
    
     getClientInfo: function () {
          let clientInfo =
          {
               browser: navigator.userAgent,
               session: ''
          }
          return clientInfo;
     },
     getDateTime: function () {
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let day = now.getDate();
          let hour = now.getHours();
          let minute = now.getMinutes();
          let second = now.getSeconds();
          if (month.toString().length == 1) {
               month = '0' + month;
          }
          if (day.toString().length == 1) {
               day = '0' + day;
          }
          if (hour.toString().length == 1) {
               hour = '0' + hour;
          }
          if (minute.toString().length == 1) {
               minute = '0' + minute;
          }
          if (second.toString().length == 1) {
               second = '0' + second;
          }
          let dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
          return dateTime;
     }
}


CatchError.prototype.imgError = function(what)
{
     let whatMsg, lineMsg;

     if(what instanceof ErrorEvent)
     {
          console.log(what);
     }else if(what instanceof Event){
          return what.target.outerHTML;
          console.log(what.target);
     }

     return what;
}

CatchError.prototype.pushError = function(what, where, line)
{
     let errorObj = {
          'who': this.helper.getClientInfo(),
          'when': this.helper.getDateTime(),
          'where': where || location.href,
          'what': this.imgError(what) || '',
          'line': line || ''
     }
     //console.log(errorObj);
     //console.log(JSON.stringify(errorObj));
}

CatchError.prototype.pushErrorAjax = function (what, where) 
{
     let errorObj = {
          'who': this.helper.getClientInfo(),
          'when': this.helper.getDateTime(),
          'where': where || location.href,
          'what': what,
          'type': 'ajax'
     }
     console.log(errorObj);
     console.log(JSON.stringify(errorObj));
}



let catchError = new CatchError();


window.onerror = function (what, where, line, error) {
     // script error. -> https://sentry.io/answers/javascript-script-error/
//     catchError.pushError(what, where, line);
};

window.addEventListener('error', function(what, where, line, error){
     catchError.pushError(what, where, line);
},false);

let imgEl = document.getElementsByTagName('img');
/*
imgEl.forEach(function(i){
     console.log(i.onerror);
})
*/





