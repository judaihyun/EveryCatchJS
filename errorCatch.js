

let ErrorCatch;


ErrorCatch = function(){};


ErrorCatch.prototype.helper = {
    
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


ErrorCatch.prototype.pushError = function(what, where, line)
{
     let errorObj = {
          'who': this.helper.getClientInfo(),
          'when': this.helper.getDateTime(),
          'where': where || location.href,
          'what': what || '',
          'line': line || ''
     }
     console.log(errorObj);
}

ErrorCatch.prototype.pushErrorAjax = function (what, where) 
{
     let errorObj = {
          'who': this.helper.getClientInfo(),
          'when': this.helper.getDateTime(),
          'where': where || location.href,
          'what': what,
          'type': 'ajax'
     }
     console.log(errorObj);
}


let detect = new ErrorCatch();


window.onerror = function (what, where, line, error) {
     // script error. -> https://sentry.io/answers/javascript-script-error/
     detect.pushError(what, where, line);
};





