/* 
 * @Author: liangjie
 */
//###########全局变量
//订单关键字段变量
//记录整个订单详情的数据
var orderData=null;
//订单号
var orderNo = null;
//订单类型
var orderType = null;
//订单状态
var status = null;
//医生账号
var doctorAccount = '';
//处方id,如果医生开过处方则有值
var prescriptionId = '';
//处方数据，如果医生开过处方则有值
var prescriptionData = {
		drugList: new Array(), //药品列表数据
		drugCount: '', //挤数
		totalMoney: '', //
		diagnoseDetail: '', //诊断信息
		useDrugAttention: '', //用药注意事项
		drugStoreId: '', //药店id
		drugStoreName: '', //药店名称
}
//###########全局变量end

$(document).ready(function() {
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(function() {
		//生成页面的数据
		genPageData();
		/**
		 * "返回按钮"点击事件
		 */
		$('#opt_title').bind('click', function() {
			APP.finishH5();
		});
		//--------------------------------------------------------------------------
	});

});
/**
 * 生成整个界面的数据
 */
function genPageData() {
	var dataJsonStr = APP.getLocationParameter('data', '{"orderNo":"85BE1160530141034809","msgTime":"今天 10:39","msgContent":"订单已取消"}');
	console.log('get parameter->data:' + dataJsonStr);
	var dataJson = APP.str2Json(dataJsonStr);
	orderNo = dataJson.orderNo; //从json数据中获取订单号
	console.log("orderNo:"+orderNo);
	var msgTime=dataJson.msgTime;//从json数据中获取消息的时间
	var msgContent=dataJson.msgContent;//从json数据中获取消息的内容
	//订单类型
	var reqJSON = {
		orderNo: orderNo
	};
	APP.getData("/hrs/servlet/getPrescriptionOrderInfoServlet", reqJSON, function(data) {
		if (data.result == '0') {
			//记录订单关键字段-------
			orderData=data;
			orderNo = data.orderNo;
			orderType = data.orderType;
			status = data.status;
			$('#mesgTime').html(msgTime);
			$('#orderNo').html(orderNo);//订单号
			$('#patient_name').html(data.name);//病人姓名
			var sex=data.sex;//性别
			if('1'==sex){
				$('#patient_sex').html('男');
			}else if('2'==sex){
				$('#patient_sex').html('女');
			}
			//病人电话号码
			var telphone=data.telphone;
			if(telphone){
				$('#telphone').html(telphone);
				$('#telphone_s').show();
			}else{
				$('#telphone_s').hide();
			}
			//订单时间
			$('#createTime').html(data.createTime);
			//消息内容
			$('#msgContent').html(msgContent);
			//主诉
			$('#mainSuit').html(data.mainSuit);
			//渲染图片区域信息
			initPics(data);
			//渲染语音消息区域 的显示隐藏
			initVoiceArea(data);
			
		} else {
			//未能获取成功的数据
		}
		/**
		 * 渲染图片区域信息
		 * @param {Object} order
		 */
		function initPics(order){
			//封装订单已经选择的图片列表
			var imgArr=new Array();
			if(orderData.picture1Path){
				var img={
					url:orderData.picture1Path,//主URL
					urlSub:orderData.picture1Thumpath,//副URL  兼容 图片有 缩略图的情况
					desc:''//文件描述，兼容 音频有时间描述
				};
				imgArr.push(img);
			}
			if(orderData.picture2Path){
				var img={
					url:orderData.picture2Path,//主URL
					urlSub:orderData.picture2Thumpath,//副URL  兼容 图片有 缩略图的情况
					desc:''//文件描述，兼容 音频有时间描述
				};
				imgArr.push(img);
			}
			if(orderData.picture3Path){
				var img={
					url:orderData.picture3Path,//主URL
					urlSub:orderData.picture3Thumpath,//副URL  兼容 图片有 缩略图的情况
					desc:''//文件描述，兼容 音频有时间描述
				};
				imgArr.push(img);
			}
			if(orderData.picture4Path){
				var img={
					url:orderData.picture4Path,//主URL
					urlSub:orderData.picture4Thumpath,//副URL  兼容 图片有 缩略图的情况
					desc:''//文件描述，兼容 音频有时间描述
				};
				imgArr.push(img);
			}
			if(orderData.picture5Path){
				var img={
					url:orderData.picture5Path,//主URL
					urlSub:orderData.picture5Thumpath,//副URL  兼容 图片有 缩略图的情况
					desc:''//文件描述，兼容 音频有时间描述
				};
				imgArr.push(img);
			}
			var imageData={
				files:imgArr
			}
			console.log('界面初始化是，图片：'+APP.json2Str(imageData));
			if(imageData.files.length>0){
				//显示图片
				listselfImage(imageData);
			}
		}
		/**
		 * 渲染语音消息区域 的显示隐藏
		 */
		function initVoiceArea(order) {
			if (orderType == OrderType.TYPE_DRUGSTORE) { //申请审处方-南京模式,隐藏区域
				$('#mainSuit_title').html('图片');
				$('#voice_area').hide();
			} else { //其他类型，则显示
				$('#mainSuit_title').html('主诉');
				//封装订单的语音列表
				var voicePathArr=new Array();
				if(order.voice1Path){
					voicePathArr.push(order.voice1Path);
				}
				if(order.voice2Path){
					voicePathArr.push(order.voice2Path);
				}
				if(order.voice3Path){
					voicePathArr.push(order.voice3Path);
				}
				if(order.voice4Path){
					voicePathArr.push(order.voice4Path);
				}
				if(order.voice5Path){
					voicePathArr.push(order.voice5Path);
				}
				var vDataList=getVoiceListData(voicePathArr);
				var vData={
					files:vDataList
				};
				if(vData.files.length>0){
					listselfAudio(vData)
				}
				$('#voice_area').show();
			}
		}
		/**
		 * 获取语音列表的数据
		 * @param {Object} voicePathArr
		 */
		function getVoiceListData(voicePathArr){
			var resultArr=new Array();
			for(var i=0;i<voicePathArr.length;i++){
				var path=voicePathArr[i];
				var voiceArr=path.split(';');
				var url=voiceArr[0];var time='0';
				if(voiceArr.length>1){
					time=voiceArr[1];
				}
				var voice={
					url:url,//主URL
					urlSub:'',//副URL  兼容 图片有 缩略图的情况
					desc:time//文件描述，兼容 音频有时间描述
				};
				resultArr.push(voice);
			}
			return resultArr;
		}
		//显示图片列表
		function listselfImage(json) {
			var html = "";
			console.info(JSON.stringify(json))
			for (var key in json.files) { //第一层循环取到各个list 
				html += '<li class="liImage"><a href="javascript:;"><img class="uploaded_img" src="' + json.files[key].urlSub + '"  picturePath="' + json.files[key].url + '"  pictureThumpath="' + json.files[key].urlSub + '"/></a></li>';
			}
			$('#listImg').html(html);
		}
		//预览图片
		$("#listImg").on("click", "li", function() {
			var method = 'viewFile';
			var firstIndex = $(this).index();
			//获取img下的元素
			var alts = [];
			$("#listImg li").each(function(index) {
				var url = $(this).children('a').children('img').attr('src');
				var files = {
					url: url,
					urlSub: "",
					desc: ""

				}
				alts[index] = files;
			});
			var type ='image' ;
			//浏览图片的参数
			var params = {
				index: firstIndex,
				files: alts,
				type: type
			}
			APP.getViewFile(method, params);
		});
		//显示音频列表
		function listselfAudio(json) {
			var html = "";
			for (var key in json.files) { //第一层循环取到各个list 
				html += '<li class="liImage"><a href="javascript:;" class="voice_bg  uploaded_voice" abc="' + json.files[key].url + '" time="' + json.files[key].desc + '"> </a><span class="miao">' + json.files[key].desc + '</span></li>';
			}
			$('#listAudio').html(html);
		}
		//预览音频
		$("#listAudio").on("click", "li", function() {
			var method = 'viewFile';
			var firstIndex = $(this).index() ;
			//获取img下的元素
			var alts = [];
			$("#listAudio li").each(function(index) {
				var url = $(this).children('a').attr('abc');
				var desc = $(this).children('span').text().replace(/[^0-9]/ig, "");
				var files = {
					url: url,
					urlSub: "",
					desc: desc
				}
				alts[index] = files;
			});
			var type ='audio' ;
			//浏览图片的参数
			var params = {
				index: firstIndex,
				files: alts,
				type: type
			}
			APP.getViewFile(method, params);
		});
		//订单号点击，跳转至订单详情界面
		$('#orderNo_btn').click(function(){
			//界面传递数据
			var reqData = {
				name: 'order_details.html',
				jsonData: {
					readOnly: 'true', 
					orderNo: orderNo
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData);
		});
		
	},true);
}
/**
 * 客户端原生方法调用页面js方法的对象
 */
NativeCallJs = {
	/**
	 * 刷新界面数据
	 */
	refreshData: function() {
		console.log('刷新界面数据.........');
	}
}