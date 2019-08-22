
var CatchError = CatchError || function(){};

CatchError.prototype.helper = {
    
     getClientInfo: function () {
          let clientInfo =
          {
               browser: navigator.userAgent,
               user_session: ''
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


CatchError.prototype.selectMsg = function(what)
{
     let retObj = {};
     //console.log(what); 
     if(what instanceof ErrorEvent)
     {
          retObj.whatMsg = what.message || '';
          retObj.lineMsg = what.lineno || '';
     }else if(what instanceof Event){
          retObj.whatMsg = what.type || '';
          retObj.lineMsg = what.target.outerHTML || '';
     }
     //console.log(retObj);
     return retObj;
}

CatchError.prototype.pushError = function(message)
{
     //console.log(message);
     if(!message) return;
     let errorMsg = this.selectMsg(message);
     let errorObj = {
          'clientInfo': this.helper.getClientInfo(),
          'logged_date': this.helper.getDateTime(),
          'location': location.pathname,
          'message': errorMsg.whatMsg || errorMsg.lineMsg || '',
          'line': errorMsg.lineMsg || ''
     }
     console.log(errorObj);
     //console.log(JSON.stringify(errorObj));
     let logUrl = 'http://localhost:8080/log';

     postRequest(logUrl, errorObj);
     return errorObj;
}

CatchError.prototype.pushErrorAjax = function (message, loc) 
{
     let errorObj = {
          'clientInfo': this.helper.getClientInfo(),
          'logged_date': this.helper.getDateTime(),
          'location': location.pathname,
          'message': message.statusText || 'NULL',
          'type': 'ajax'
     }
     console.log(errorObj);
     
     let ajaxLogUrl = 'http://localhost:8080/ajaxError';
     postRequest(ajaxLogUrl, errorObj);
   
     return errorObj;
     
    // console.log(JSON.stringify(errorObj));
}

function postRequest(url, data)
{
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify(data),
		contentType: 'application/json',
		error: function (jqXHR) {
			console.log(jqXHR);
		}
	});

}



var Catcher = Catcher || new CatchError();


/*

window.onerror = function (what, where, line, error) {
//     catchError.pushError(what, where, line);
};

*/



window.addEventListener('error', function(error){
     // script error. -> https://sentry.io/answers/javascript-script-error/
     Catcher.pushError(error);
},true);




