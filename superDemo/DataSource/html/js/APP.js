/**
 * 封装获取服务器数据或与App原生方法交互的通用方法
 */
APP = {
	doc: document,
	win: window,
	ua: window.navigator.userAgent,
	token: '201607071124043511266', //pc端调试默认的token
	//当前登录的用户信息
	userInfo: {
		userName: 'sdfs', //用户姓名
		userAccount: '2016yishi2', //用户
		userType: '20', //用户类型
		/**
		 * 判断用户是否是药店销售员
		 */
		isDrugStoreSalesMan: function() {
			return this.userType == UserType.DZCF_SALESMAN;
		},
		/**
		 * 判断用户是否是门诊医生
		 */
		isHospitalDoctor: function() {
			return this.userType == UserType.DZCF_DOCTOR;
		},
		/**
		 * 是否是药师
		 */
		isMedicineMan: function(){
			return this.userType == UserType.DZCF_MEDICINEMAN;
		}
	},
	//当前用户权限
	userPermissionInfo: {
		sqkcfPermission: true,//申请开处方权限（药店模式）
        sqscfPermission: true,//申请审处方权限（药店模式）
        kcfPermission: false,//开处方权限（门诊模式）
        xzkcfPermission: true,//申请协助开处方权限（门诊模式）
        xzbrkcfPermission: true,//协助别的医师开处方的权限（门诊模式）
        yskcfPermission: true,//医师开处方权限（药店模式）
        ysscfPermission: false,//药师审核处方的权限
        kcfDtcPermission: true,//DTC模式申请权限
        hasDutyDrugStores: false,//药师或医师关联了药店
        hasDutyHospitals: false,//药师或医师关联了门诊/医院
        tjsfDtcPermission:false//dtc订单提交审方的权限
	},
	//当前用户所属药店信息（当前用户是销售员获取）
	drugStoreInfo: {
		drugStoreId: '146493524976ba80057b21a346eb95c7', //药店id
		drugStoreName: '', //药店名称
		drugStoreAdress: '', //药店地址
		drugStorePhone: '', //药店电话
		drugStorePassState: '' //药店工作人员所属药店密码的状态，0,启用、1,未启用
	},
	//当前用户所属医院/门诊信息（当前用户是医生获取）
	hospitalInfo: {
		hospitalId: '', //医师所属门诊id
		hospitalName: '', //医师所属门诊名称
		hosCachet: '', //医师所属门诊公章图片路径
		prescriptionHead: '' //医师所属门诊抬头
	},
	/**
	 * 初始化用户公用信息信息
	 * @param {Object} callBack 由于调用Native方法是异步的方法，所以在init方法完成之后调用回调函数执行业务逻辑
	 */
	init: function(callBack) {
		//调用原生方法获取当前用户登录及所属药店/医院等信息
		if (this.isAndroid() || this.isIos()) {
			console.log('调用native方法获取登录用户的基本信息 权限等信息...');
			RainbowBridge.callMethod('UserModular', 'getUserInfo', null, function(json) {
				console.info("###回调函数");
				var data = json.result;
				APP.userInfo.userAccount = data.userInfo.userAccount;
				APP.userInfo.userName = data.userInfo.userName;
				APP.userInfo.userType = data.userInfo.userType;
				APP.drugStoreInfo.drugStoreId = data.drugStoreInfo.drugStoreId;
				APP.drugStoreInfo.drugStoreName = data.drugStoreInfo.drugStoreName;
				APP.drugStoreInfo.drugStoreAdress = data.drugStoreInfo.drugStoreAdress;
				APP.drugStoreInfo.drugStorePassState = '1';
				APP.hospitalInfo.hospitalId = data.hospitalInfo.hospitalId;
				APP.hospitalInfo.hospitalName = data.hospitalInfo.hospitalName;
				APP.hospitalInfo.hosCachet = data.hospitalInfo.hosCachet;
				APP.hospitalInfo.prescriptionHead = data.hospitalInfo.prescriptionHead;
				APP.userPermissionInfo.sqkcfPermission = data.userPermissionInfo.sqkcfPermission;//申请开处方权限（药店模式）
				APP.userPermissionInfo.sqscfPermission = data.userPermissionInfo.sqscfPermission;
				APP.userPermissionInfo.kcfPermission = data.userPermissionInfo.kcfPermission;
				APP.userPermissionInfo.xzkcfPermission = data.userPermissionInfo.xzkcfPermission;
				APP.userPermissionInfo.xzbrkcfPermission = data.userPermissionInfo.xzbrkcfPermission;
				APP.userPermissionInfo.yskcfPermission = data.userPermissionInfo.yskcfPermission;
				APP.userPermissionInfo.ysscfPermission = data.userPermissionInfo.ysscfPermission;
				APP.userPermissionInfo.kcfDtcPermission = data.userPermissionInfo.kcfDtcPermission;
				APP.userPermissionInfo.hasDutyDrugStores = data.userPermissionInfo.hasDutyDrugStores;
				APP.userPermissionInfo.hasDutyHospitals = data.userPermissionInfo.hasDutyHospitals;
				APP.userPermissionInfo.tjsfDtcPermission=data.userPermissionInfo.tjsfDtcPermission;

				console.info('初始化用户信息：' + APP.json2Str(APP.userInfo));
				console.info('初始化用户所属的药店信息：' + APP.json2Str(APP.drugStoreInfo));
				console.info('初始化用户所属的医院门诊信息：' + APP.json2Str(APP.hospitalInfo));
				console.info('初始化用户权限：' + APP.json2Str(APP.userPermissionInfo));
				callBack(); //
			});
		} else {
			/*//pc端测试
			this.userInfo.userAccount = '2016yishi2';
			this.userInfo.userName = '抢我帐号是傻瓜';
			this.userInfo.userType = '20';
			//pc端测试
			APP.drugStoreInfo.drugStoreId = '146493524976ba80057b21a346eb95c7';
			APP.drugStoreInfo.drugStoreName = '';
			APP.drugStoreInfo.drugStoreAdress = '';
			APP.drugStoreInfo.drugStorePassState = '1';
			APP.hospitalInfo.hospitalId = '14410733084965db23b70825430b82f7';
			APP.hospitalInfo.hospitalName = '强森测试门诊部01';
			APP.hospitalInfo.hosCachet = 'http://121.8.131.228:8090/upload/images/20150907/201509071000051661305.gif';
			APP.hospitalInfo.prescriptionHead = '强森测试门诊部01';*/
			console.info('初始化用户信息：' + this.json2Str(this.userInfo));
			console.info('初始化用户所属的药店信息：' + this.json2Str(this.drugStoreInfo));
			console.info('初始化用户所属的医院门诊信息：' + this.json2Str(this.hospitalInfo));
			console.info('初始化用户用户权限：' + this.json2Str(this.u));
			callBack();
		}
	},
	
	isRoleDrugstore: function(){
		return this.userInfo.userType == UserType.DZCF_SALESMAN;
	},
	isRoleDoctor: function(){
		return this.userInfo.userType == UserType.DZCF_DOCTOR;
	},
	isRolePhraMan: function(){
		return this.userInfo.userType == UserType.DZCF_MEDICINEMAN;
	},
	/**
	 * 获取服务器接口的数据
	 * @param {Object} address，如/hrs/servlet/findDiagnoseList
	 * @param {Object} bodyData 请求body数据,json数据，如
	 *	{
	 *   	"pageSize": 10,
	 *  	"orderTypes": "(3,4)",
	 *  	"orderStatus": "(1,13)",
	 *  	"pageNum": 1
	 * 	} 
	 * @param {Object} callback_success 请求成功时回调函数
	 * @param {Object} showLoadingDialog 界面是否显示加载提示
	 * @param {Object} callback_timeout 网络请求超时回调函数
	 */
	getData: function(address, bodyData, callback_success, showLoadingDialog,callback_timeout) {
		console.log('getData showLoadingDialog:' + showLoadingDialog);
		if (showLoadingDialog) {
					APP.showLoadingDialog();
		}
		if (this.isAndroid() || this.isIos()) {
			//##################嵌入客户端时的处理方式
			//---------调用native方法得到完成的请求的uri
			//js桥传递的参数，json数据
			var parameters = {
				uri: address,
			}
			RainbowBridge.callMethod('SysModular', 'getCompleteUrl', parameters, function(data) {
				var fullUrl = data.result.url; //原生方法返回的完整的路径，字符串
				var token = data.result.token; //原生方法返回的完整，字符串
				console.info('token:' + token);
				console.info('body:' + APP.json2Str(bodyData));
				var reqData = APP.genHttpReqData(token, bodyData); //封装请求参数，结果是json
				reqData = APP.json2Str(reqData); //json 转str
				console.log('reqData:' + reqData);
				//为了防止get请求中文乱码，对数据进行uri编码，默认采用UTF-8编码
				reqData = encodeURIComponent(reqData);
				//封装完整的请求的url地址,str参数放请求的json数据
				fullUrl = fullUrl + '?str=' + reqData + '&r=' + new Date().getTime();
				console.log('jsonp get请求fullUrl:' + fullUrl);
				//以下发出js请求
				var ajaxQ=null;
				ajaxQ=$.ajax({
					type: "get",
					url: fullUrl,
					timeout: 10000,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					//jsonpCallback: "success_jsonpCallback",
					success: function(data) {
						console.log("result: " + APP.json2Str(data));
						if (data && data.result) {
							if (data.result == '0') { //获取数据成功
								callback_success(data);
							} else {
								var errerTips = '服务器处理错误，请稍后再试';
								//token异常
								if (data.result == "002" || data.result == "003") {
									APP.refreshAppToken(); //刷新token
									errerTips = data.reason;
								}
								//
								APP.showHttpErrer(errerTips);
							}

						}
					},
					complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
						console.log('$^$ ajax jsonp complete status:'+status);
						if (showLoadingDialog) {
							APP.dismissLoadingDialog();
						}
						if(status == 'success'){
							//请求成功
						}else{
							if (status == 'timeout') { //超时,status还有success,error等值的情况
								APP.showHttpErrer('网络请求超时，请稍后再试');
								if(callback_timeout){
									callback_timeout(status);
								}
							} else if (status == 'error') {
								APP.showHttpErrer('服务器处理错误，请稍后再试');
							} 
							//由于jsonp的script标签不能正确获取到网络超时/404等网络请求错误,所以需要手动终止script的网络请求
							//幸亏jquery新版本提供了终止请求的方法
							ajaxQ.abort();
							console.log('$^$ ajax jsonp complete 终止请求:'+fullUrl);
						}　
					}
				});
			});

		} else {
			//#################pc端调试的处理方式
			var fullUrl = this.genFullUrl(address);
			var token = this.token;
			console.info('token:' + token);
			var reqData = APP.genHttpReqData(token, bodyData); //封装请求参数，结果是json
			reqData = APP.json2Str(reqData); //json 转str
			console.log('reqData:' + reqData);
			//为了防止get请求中文乱码，对数据进行uri编码，默认采用UTF-8编码
			reqData = encodeURIComponent(reqData);
			//封装完整的请求的url地址,str参数放请求的json数据
			fullUrl = fullUrl + '?str=' + reqData + '&r=' + new Date().getTime();
			console.log('jsonp get请求fullUrl:' + fullUrl);
			//以下发出js请求
			var ajaxQ=null;
			ajaxQ=$.ajax({
				type: "get",
				url: fullUrl,
				timeout: 10000,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				//jsonpCallback: "success_jsonpCallback",
				success: function(data) {
					console.log("result: " + APP.json2Str(data));
					if (data && data.result) {
						if (data.result == '0') { //获取数据成功
							callback_success(data);
						} else {
							var errerTips = '网络请求发生错误，请稍后再试';
							//token异常
							if (data.result == "002" || data.result == "003") {
								APP.refreshAppToken(); //刷新token
								errerTips = data.reason;
							}
							//
							APP.showHttpErrer(errerTips);
						}

					}
				},
				complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
					console.log('$^$ ajax jsonp complete status:'+status);
					if (showLoadingDialog) {
						APP.dismissLoadingDialog();
					}
					if(status == 'success'){
						//请求成功
					}else{
						if (status == 'timeout') { //超时,status还有success,error等值的情况
						APP.showHttpErrer('网络请求超时，请稍后再试');
						} else if (status == 'error') {
							APP.showHttpErrer('网络请求发生错误，请稍后再试');
						} 
						//由于jsonp的script标签不能正确获取到网络超时/404等网络请求错误,所以需要手动终止script的网络请求
						//幸亏jquery新版本提供了终止请求的方法
						ajaxQ.abort();
						console.log('$^$ ajax jsonp complete 终止请求:'+fullUrl);
					}
				}
			});

		}

	},

	//添加图片
	getViewFile: function(methods, parameters) {
		//添加图片 choosePhoto
		//预览图片 previewPhoto
		//通用对话框 showConfirmDialog
		var respData = '';
		console.info('getViewFile parameters#########:' + APP.json2Str(parameters)+',methods:'+methods);

		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', methods, parameters, function() {

			});
		} else {}

	},

	/**
	 * 生成http请求的数据包
	 * @param {Object} token 从native方法得到的token
	 * @param {Object} bodyData body的数据 json数据
	 */
	genHttpReqData: function(token, bodyData) {
		var header = {
			token: token,
			time_stamp: new Date().format("yyyyMMddHHmmss")
		}
		var data = {
			header: header,
			body: bodyData
		};
		return　 data;
	},
	/**
	 * 封装完整的http请求地址
	 * @param {Object} endpoid 接口，如/hrs/servlet/findDiagnoseList
	 */
	genFullUrl: function(endpoint) {
		//pc端测试
		var fullUrl = 'http://121.8.131.228:8090' + endpoint;
		return fullUrl;
	},
	/**
	 * 刷新app的token；调用app原生方法
	 */
	refreshAppToken: function() {
		if (this.isAndroid() || this.isIos()) {
			console.log('调用native方法刷新app的token...');
			RainbowBridge.callMethod('SysModular', 'notifyTokenExpire', {}, function() {});
		} else {
			//pc端测试
			console.log("refreshAppToken...." );
		}
	},
	/**
	 * 显示http请求错误（请求超时、网络异常等）
	 * @param {Object} errer
	 */
	showHttpErrer: function(errer) {
		if (this.isAndroid() || this.isIos()) {
			console.log('调用native方法显示http请求错误...');
			this.showToast(errer);
		} else {
			//pc端测试
			console.log("showHttpErrer: " + errer);
		}
	},
	/**
	 * 字符串转成json
	 * @param {Object} str
	 */
	str2Json: function(str) {
		if (str && typeof str === 'string') {
			try {
				return JSON.parse(str);
			} catch (e) {
				return {
					status: {
						code: 1,
						msg: 'str2Json parse error!'
					}
				};
			}
		} else {
			return str || {};
		}
	},
	/**
	 * json转成字符串
	 * @param {Object} param
	 */
	json2Str: function(param) {
		if (param && typeof param === 'object') {
			return JSON.stringify(param);
		} else {
			return param || '';
		}
	},
	/**
	 * 判断浏览器是否是android系统的浏览器
	 */
	isAndroid: function() {
		var tmp = this.ua.toLowerCase();
		var android = tmp.indexOf("android") > -1;
		return !!android;
	},
	/**
	 * 判断浏览器是否是ios系统的浏览器
	 */
	isIos: function() {
		var tmp = this.ua.toLowerCase();
        console.log('isIos ua:'+tmp);
		var ios = tmp.indexOf("iphone") > -1 || tmp.indexOf("ipod") > -1 || tmp.indexOf("ipad") > -1 || tmp.indexOf("ios") > -1;
		return !!ios;
	},
	/**
	 * 获取当前html页面路径的附带的请求参数 
	 * @param {Object} paramskey
	 * @param {Object} defvalue
	 */
	getLocationParameter: function(paramskey, defvalue) {
		var reg = new RegExp("(^|&)" + paramskey + "=([^&]*)(&|$)");
		console.log('getLocationParameter,window.location.search:'+window.location.search);
		var search=window.location.search;//url参数串,如?data={}..
		if(search){
			//将+替换成空格
			search=search.replace(/\+/g," ");
		}
		console.log('将+替换成空格后参数串:'+search);
		var q = decodeURI(search);
		var r = q.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return defvalue;
	},
	/**
	 * 重新加载H5界面
	 */
	refreshLocation: function() {
		console.log('重新加载H5界面............');
		location.href = location.href;
	},
	/**
	 * 调用native方法显示提示信息
	 * @param {Object} msg
	 */
	showToast: function(msg) {
		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'showToast', {
				'msg': msg
			}, function() {});
		} else {
			//pc端测试
			console.log("showToast: " + msg);
		}

	},
	/**
	 * 调用nativa方法 单纯显示一个对话框，显示“正在加载...”不可以取消，由JS调用取消
	 */
	showLoadingDialog: function() {
		if (this.isAndroid()||this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'showLoadingDialog', {}, function() {});
		} else {
			//pc端测试
			console.log("showLoadingDialog....");
		}

	},
	/**
	 * 确认对话框(提供2个选择，确定，取消)
	 * @param {Object} title 确认对话框的标题
	 * @param {Object} msg 确认对话框的信息栏
	 * @param {Object} okCallBack "确定"回调函数
	 * @param {Object} canCallBack "取消"回调函数
	 */
	showConfirmDialog: function(title, msg, okCallBack, canCelBack) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				title: title,
				msg: msg
			}
			RainbowBridge.callMethod('SysModular', 'showConfirmDialog', reqData, function(rspData) {
				if (rspData.result && rspData.result.confirm) {
					var confirm = rspData.result.confirm;
					if (confirm) {
						if (okCallBack) {
							okCallBack();
						}
					} else {
						if (canCelBack) {
							canCelBack();
						}
					}
				}
			});
		} else {
			//pc端测试
			console.log("showConfirmDialog....");
			//直接ok
			okCallBack();
		}
	},
	/**
	 * 选择对话框(单选/多选)
	 * @param {Object} type
	 * @param {Object} title single/multiple 单选/多选
	 * @param {Object} items [{name:'aa',tag:'xx'}]
	 * @param {Object} okCallBack
	 * @param {Object} canCelBack
	 */
	showChoiceDialog: function(type, title, items, okCallBack, canCelBack) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				title: title,
				type: type,
				arr: items
			}
			RainbowBridge.callMethod('SysModular', 'showChoiceDialog', reqData, function(rspData) {
				console.log("选择对话框(单选/多选)showChoiceDialog结果:" + APP.json2Str(rspData));
				var confirm = rspData.result.confirm;
				if (confirm) {
					var resultItems = rspData.result.arr;
					if (okCallBack) {
						okCallBack(resultItems);
					}
				} else {
					if (canCelBack) {
						canCelBack();
					}
				}
			});
		} else {
			//pc端测试
			console.log("showChoiceDialog....");
		}
	},
	
	/**
	 * 请求另一个H5界面
	 * @param {Object} reqData
	 * @param {Object} callback
	 */
	requestH5ForData:function(reqData, callback){
		RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
			if(callback){
				callback(data);
			}
		});
	},
	
	/**
	 * 结束当前H5界面，并且不需要返回结果
	 * @param {Object} animation 表示关闭当前界面时是否需要界面切换动画效果，true表示需要，false表示不需要；
	 * 默认为true;(ios需要关注此参数的值，android不需要)
	 */
	finishH5: function(animation) {
		if(animation==undefined){
			animation=true;//默认为true
		}
		var paramters={
			animation:animation
		}
		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'finishH5', paramters, function() {});
		} else {
			//pc端测试
			console.log("finishH5....");
		}

	},
	/**
	 * 结束当前H5界面，并且需要返回结果
	 */
	finishH5WithData: function(html_name, jsonData, callback) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				name: html_name,
				jsonData: jsonData
			}
			RainbowBridge.callMethod('SysModular', 'finishH5WithData', reqData, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("finishH5WithData....");
		}

	},
	/**
	 * 获取医务工作者的签名
	 */
	checkMedicalWorkerSign: function(callback) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {}
			RainbowBridge.callMethod('UserModular', 'checkMedicalWorkerSign', reqData, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("checkMedicalWorkerSign....");
		}
	},
	/**
	 * 获取医师或药师自己的签名,如果没有设置签名则跳转到设置签名界面
	 * 如果已经有签名,返回签名
	 * @param {Object} callback
	 */
	getMyseftSign: function(callback) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {}
			RainbowBridge.callMethod('UserModular', 'checkMedicalWorkerSign', reqData, function(rspData) {
				if (rspData.result && rspData.result.signInfo) {
					var signInfo = rspData.result.signInfo; //医生的签名
					if (callback) {
						callback(signInfo);
					}
				}
				
			});
		} else {
			//pc端测试
			console.log("checkMedicalWorkerSign....");
		}
	},
	/**
	 * 延迟订单超时时间设置
	 * @param {Object} doctorAccount 医师或药师账号
	 * @param {Object} orderNo 订单号
	 * @param {Object} orderType 订单类型
	 * @param {Object} orderState 订单状态
	 * @param {Object} callback 回调函数
	 */
	resetOrderTimeOut: function(doctorAccount, orderNo, orderType, orderState, callback) {
		console.log('延迟订单超时时间设置<|>doctorAccount<|>' + doctorAccount + '<|>orderNo<|>' + orderNo + '<|>orderType<|>' + orderType + '<|>orderState<|>' + orderState);
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				doctorAccount: doctorAccount,
				orderNo: orderNo,
				orderType: orderType,
				orderState: orderState
			}
			RainbowBridge.callMethod('SysModular', 'resetOrderTimeOut', reqData, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("resetOrderTimeOut....");
		}

	},
	/**
	 * 打开聊天界面
	 * @param {Object} toAccount 聊天对方的用户账号
	 * @param {Object} name 聊天对方的用户姓名
	 * @param {Object} avator 聊天对方的用户头像地址
	 * @param {Object} orderType 订单类型
	 * @param {Object} orderState 订单状态
	 * @param {Object} orderNo 订单编号
	 * @patam {Object} prescriptionId 处方签id
	 * @patam {Object} drugStoreId 药店id
	 * @patam {Object} drugStoreName 药店名称
	 * @param {Object} callback 回调函数
	 */
	chatWithSomebody: function(toAccount, name, avator, orderType, orderState, orderNo, prescriptionId ,drugStoreId,drugStoreName,callback) {
		console.log('打开聊天界面<|>toAccount<|>' + toAccount + '<|>name<|>' + name + '<|>avator<|>' + avator + '<|>orderType<|>' + orderType 
		+ '<|>orderState<|>' + orderState + '<|>orderNo<|>' + orderNo+'<|>drugStoreId<|>'+drugStoreId+'<|>drugStoreName<|>'+drugStoreName);
		var avatorImg='';//对方头像
		if(avator){
			avatorImg=avator;
		}
		if(!prescriptionId){
			prescriptionId='';
		}
		if (this.isAndroid() || this.isIos()) {
				var reqData={
					jid:toAccount,
					name:name,
					avator:avatorImg,
					orderType:orderType,
					orderState:orderState,
					orderId:orderNo,
					prescriptionId:prescriptionId,
					prescriptionData:{
					    drugStoreId:drugStoreId,
					    drugStoreName:drugStoreName
					}
				};
				RainbowBridge.callMethod('UserModular', 'chatWithSomebody', reqData, function(rspData) {
					if(callback){
						callback(rspData);
					}
				});
		} else {
			//pc端测试
			console.log("chatWithSomebody....");
		}

	},
	/**
	 * 调用Native方式发订单显示UI刷新通知
	 * @param {Object} parameters json数据,包含订单号等信息
	 */
	notifyOrdersChange: function(parameters) {
		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'notifyOrdersChange', parameters, function() {});
		} else {
			//pc端测试
			console.log("notifyOrdersChange....");
		}

	},
	/**
	 * 调用nativa方法 销毁加载对话框
	 * @param {Object} msg
	 */
	dismissLoadingDialog: function() {
		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'dismissLoadingDialog', {}, function() {});
		} else {
			//pc端测试
			console.log("dismissLoadingDialog....");
		}

	},
	/**
	 * 选择时间日期
	 * @param {Object} desc
	 * @param {Object} callback
	 */
	chooseDate: function(desc, callback) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				timeDesc: desc
			};
			RainbowBridge.callMethod('SysModular', 'chooseDate', reqData, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("chooseDate....");
		}
	},
	/**
	 * 选择地址
	 * @param {Object} level 地址级数，可不传，不传默认3,类似：1代表只选省，2代表同时选省/市, 3代表省/市/(区/县)
	 * @param {Object} callback
	 */
	chooseAddress: function(level, callback) {
		if (this.isAndroid() || this.isIos()) {
			var reqData = {
				level: level
			};
			RainbowBridge.callMethod('SysModular', 'chooseAddress', reqData, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("chooseAddress....");
		}
	},
	
	/**
	 * 获取APK信息
	 * @param {Object} callback
	 */
	getAppVersion: function(callback) {
		if (this.isAndroid() || this.isIos()) {
			RainbowBridge.callMethod('SysModular', 'getAppVersion', null, function(rspData) {
				if (callback) {
					callback(rspData);
				}
			});
		} else {
			//pc端测试
			console.log("getAppVersion....");
		}
	},
	
	/**
	 * 判断是否为数据
	 * @param {Object} val
	 */
	isNumber:function(val){
		var result=false;
		if(val){
			var z= /^[0-9]*$/;//正则
			if(z.test(val)){
			   result=true;
			}
		}
		return result;
	},
	/**
	 * 判断是否为合法的身份证号
	 * @param {Object} val
	 */
	isValidIdCard:function(val){
		var result=false;
		if(val){
			//新建普通实例
			var Validator = new IDValidator();
			//验证号码是否合法，合法返回true，不合法返回false
			result=Validator.isValid(val);
		}
		return result;
	},
	/**
	 * 生成一个18位的身份证号
	 */
	make18IdCard:function(){
		//新建普通实例
		var Validator = new IDValidator();
		//验证号码是否合法，合法返回true，不合法返回false
		var code=Validator.makeID();
		return code;
	},
	/**
	 * 判断是否是有效的手机号
	 * @param {Object} val
	 */
	isValidMobile:function(val){
		if(val){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
			if(myreg.test(val)) 
			{ 
			   return true;
			} 
		}
		return false;
	},
	/**
	 * 限制输入域的长度,超过长度不准输入
	 * @param {Object} inputFieldId
	 * @param {Object} lenLimit
	 * @param {validateFun} validateFun自定义格式验证方法
	 */
	limitInputFieldLength:function(inputFieldId,lenLimit,validateFun){
		$('#'+inputFieldId).bind('input',function(){
			var val=$('#'+inputFieldId).val();
			val=$.trim(val);
			var len=val.length;
			//如果有自定义格式验证方法,则先判断格式是否正确
			if(validateFun){
				var r=validateFun(val);
				//console.log('^^^^^^:'+r);
				if(!r){
					var len=val.length;
					if(len>0){
						val=val.substring(0,len-1);
						$('#'+inputFieldId).val(val);
						return;
					}
				}
			}
			//超出限制的长度，则截断
			if(len>lenLimit){
				val=val.substring(0,lenLimit);
				$('#'+inputFieldId).val(val);
			}
		});
	}

}

/**
 * 日期格式化
 * @param {Object} format
 */
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"H+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

/**
 * 日期计算
 * @param {Object} strInterval  对哪个单位进行加减
 * @param {Object} Number  加减量是多少
 	
 	addDate(y, -2);//代表 对年位-2， 获得2年前的日期
  
 */
Date.prototype.addDate = function(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
		case 's': //秒
			return new Date(Date.parse(dtTmp) + (1000 * Number));
		case 'm': //分钟
			return new Date(Date.parse(dtTmp) + (60000 * Number));
		case 'h': //小时
			return new Date(Date.parse(dtTmp) + (3600000 * Number));
		case 'd': //天数
			return new Date(Date.parse(dtTmp) + (86400000 * Number));
		case 'w': //周数
			return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
		case 'M': //月
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		case 'y': //年
			return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
	}
}

/**
 * 字符串比较
 * @param {Object} prefix
 */
String.prototype.startWith = function(prefix) {
	return this.slice(0, prefix.length) === prefix;
};


/**
 * 字符串包含
 * @param {Object} prefix
 */
String.prototype.contains = function(str) {
	return this.indexOf(str) >= 0;
};