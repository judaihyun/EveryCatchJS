/**
 * 
 */

var uPrivacy = uPrivacy || {};



var uPrivacy = function (form, callback, _bypass, exceptEl) {

	var IP_VALUE = 'www.smc.seoul.kr/manage',
		URL_VALUE = 'www.smc.seoul.kr/manage';
	
	console.log('url : ' + URL_VALUE + ', ip : ' + IP_VALUE);
	console.log('bypass : ' + _bypass);

	if (arguments == 0) {
		console.log('인자가 정의되지 않았습니다.');
		return -1;
	}

	if (typeof form === 'undefined' || !form) {
		console.log('form이 정의되지 않았습니다.');
		return -1;
	}

	if (!HTMLFormElement.prototype.isPrototypeOf(form)) {
		console.log('FormElement가 아닙니다.');
		return -1;
	}

	if (typeof callback === 'undefined' || !callback) {
		console.log('callback이 정의되지 않았습니다.');
		return -1;
	}

	var bypass = typeof _bypass === 'undefined' ? false : _bypass;
	if (bypass) return callback

	if (typeof exceptEl !== 'undefined') {
		if (!(exceptEl instanceof Array)) {
			console.log('exceptEl이 array가 아닙니다.');
			return -1;
		}

		for (var idx = 0; idx < exceptEl.length; ++idx) {
			if (typeof exceptEl[idx] !== 'string') {
				console.log('exceptEl 요소는 string이어야 합니다.');
				return -1;
			}
		}
	}


	var checkForm = form;
	var hostIp = document.createElement('input');
	var hostUrl = document.createElement('input');
	hostIp.setAttribute('type', 'hidden');
	hostIp.setAttribute('name', 'hostIp');
	hostIp.setAttribute('value', IP_VALUE);
	hostUrl.setAttribute('type', 'hidden');
	hostUrl.setAttribute('name', 'hostUrl');
	hostUrl.setAttribute('value', URL_VALUE);
	checkForm.appendChild(hostIp);
	checkForm.appendChild(hostUrl);
	


	function submitForm(value) {

	    if ( document.getElementById("ir1") ) {
		    oEditors.getById["ir1"].exec("UPDATE_IR_FIELD", []);
		    document.getElementById("boardDesc").value = document.getElementById("ir1").value;
	    }
		if ( document.getElementById("ir2") ) {
			oEditors.getById["ir2"].exec("UPDATE_IR_FIELD", []);
			document.getElementById("boardText5").value = document.getElementById("ir2").value;
		}	

		disableEl(checkForm, exceptEl);

		// Create an FormData object
		var datas = new FormData(checkForm);
		console.log(checkForm.file_list);

		$.ajax({
			type: "post",
			enctype: 'multipart/form-data',
			//url: 'http://115.84.164.73:5500/UPServer/',
			data: datas,
			crossDomain: true,
			contentType: false,
			processData: false,
			success: function (data) {
				console.log(data.trim());
				if(validContent(data)){
					submit(value);
					return;
				}
				if(value)
				{
					checkForm.filename[0].value = '';
				}
				return -2;
			},
			error: function (jqXHR) {
			
			}
		});
	}
	

	function errorHandler(msg)
	{
		console.log(jqXHR);
		if(typeof detect !== 'undefined')
		{
			detect.pushErrorAjax(jqXHR);
		}
		submit(value);
	}

	function disableEl(_checkForm, _exceptEl) {
		if (typeof _exceptEl === 'undefined') return false;

		_exceptEl.forEach(function (i, idx) {
			var temp = _checkForm[i];
			if (temp) {
				temp.setAttribute('disabled', true);
			}
		})
		return true;
	}

	function enableEl(_checkForm, _exceptEl) {

		if (typeof _exceptEl === 'undefined') return false;
		_exceptEl.forEach(function (i, idx) {
			var temp = _checkForm[i];
			if (temp) {
				temp.setAttribute('disabled', false);
			}
		})
		return true;
	}



	function validContent(json) {
		var responsObj = JSON.parse(json);
		var privacyObj = responsObj.privacy;
		var detectStr = privacyObj[0].privContent.split(',');

		/*
		   privType 
		   1 : 주민번호
		   2 : 카드번호
		   3 : 여권번호
		   4 : 운전면허번호
		   5 : 휴대폰 번호
		   6 : 일반 전화번호G
		   7 : 이메일
		   8 : 건강보험번호
		   9 : 계좌번호
		   10 : 금칙어
		*/

		if (privacyObj[0].isPriv === "1") {
			alert(detectStr + " 이 노출되었습니다. \n(문의 언론홍보실 02-2180-7750)");
			console.log('개인정보 포함.');
			return false;
		}
		return true;
	}
	
	function submit(value)
	{
		enableEl(checkForm);
		callback(value);
	}

	function convertName(_checkForm) {
		for (var i = 0; i < _checkForm.length; ++i) {
			if (_checkForm[i].nodeType === 1 && _checkForm[i].type === 'file')
				_checkForm[i].name = 'replyFile';
		}
	}



	return submitForm;

}


