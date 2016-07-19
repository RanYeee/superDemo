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
//订单详情界面是否只读
var readOnly=false;
//###########全局变量end

$(document).ready(function() {

	var k = 1;
	//点击订单详情
	$(".h2Out").click(function() {

		if (k == 1) {
			$(".slet_p").css("display", "block");
			$(".h2Out .apph2").css("background", "url(images/ic_up.png) right center no-repeat");
			$(".h2Out .apph2").css("background-size", ".15rem .10rem");
			k = 0;

		} else if (k == 0) {
			$(".slet_p").css("display", "none");
			$(".h2Out .apph2").css("background", "url(images/ic_up_blue.png) right center no-repeat");
			$(".h2Out .apph2").css("background-size", ".09rem .14rem");
			k = 1;
		}
	});

	// 点击病人信息
	var j = 1;
	$(".pe_info").click(function() {

		if (j == 1) {
			$(".info_out").css("display", "none");
			$(".pe_info p").css("background", "url(images/ic_up_blue.png) right center no-repeat");
			$(".pe_info p").css("background-size", ".09rem .14rem");
			j = 0;

		} else if (j == 0) {
			$(".info_out").css("display", "block");
			$(".pe_info p").css("background", "url(images/ic_up.png) right center no-repeat");
			$(".pe_info p").css("background-size", ".15rem .10rem");
			j = 1;
		}
	});

	// 点击弹出底框

	var myHeight = $(".ul_b").height();
	$(".ul_b").css("bottom", -myHeight);
	$(".h_b_p").click(function() {
		$(".cover").css("display", "block");
		$(".ul_b").animate({
			bottom: "0px"
		}, 300); //底部弹出框动画

	});

	$(".cover").click(function() {
		$(".cover").css("display", "none");
		$(".ul_b").animate({
			bottom: "myHeight"
		}, 400); //底部弹出框动画
	});
	// 选择弹出框选项
	$(".ul_b ul li").click(function() {
		$(".ul_b").css("display", "none");
		$(".cover").css("display", "none");

		var $myLiText = $(this).text();
		$(".pr_text").text($myLiText);
		$(".div01_pr").css("display", "block");
	});
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
	var dataJsonStr = APP.getLocationParameter('data', '{"orderNo":"85be1160706141850975","readOnly":"false"}');
	console.log('get parameter->data:' + dataJsonStr);
	var dataJson = APP.str2Json(dataJsonStr);
	orderNo = dataJson.orderNo; //从json数据中获取订单号
	//界面是否只读
	if(dataJson.readOnly){
		var rl=dataJson.readOnly;
		if('true'==rl){
			readOnly=true;
		}else{
			readOnly=false;
		}
	}
	
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
			if (data.doctorAccount) {
				doctorAccount = data.doctorAccount;
			}
			prescriptionId = data.prescriptionId;
			prescriptionData.drugCount = data.drugCount;
			prescriptionData.totalMoney = data.totalMoney;
			prescriptionData.diagnoseDetail = data.diagnoseDetail;
			prescriptionData.useDrugAttention = data.useDrugAttention;
			prescriptionData.drugStoreId = data.drugStoreId;
			prescriptionData.drugStoreName = data.drugstoreName;
			//-----------------------------------------------------------------
			//判断当前用户是否可以查看此订单的详情
			//如果不可以查看订单状态，则finish当前界面
			checkOrderVaild(data);
			//判断模式C 申请协助的订单  协助中状态时跳到协助聊天界面
			checkDocHelpOrder2Chat(data);
			//渲染订单信息模块的数据
			initOrderInfos(data);
			//渲染“取消订单”按钮的事件
			initCancelBtn(data);
			//延迟订单超时时间设置
			APP.resetOrderTimeOut(doctorAccount, orderNo, orderType, status);
			//渲染“受理”按钮的事件，医师或药师受理订单
			initAcceptBtn(data);
			//渲染“开处方”按钮的事件
			initOpenPrescriptionBtn(data);
			//渲染“提交审方”按钮的事件
			initDrugstoreCheckinBtn(data)
				//渲染“拒绝申请”按钮的事件
			initRefuseApplyBtn(data);
			//渲染医师提交给药师审核按钮的事件
			initDoctorCommitCheckBtn(data);
			//渲染打印处方按钮的事件
			initPrintBtn(data);
			//渲染协助终止之后重新申请协助 按钮的事件
			initAnewHelpBtn(data);
			//渲染“重新提交”按钮的事件
			initAnewCommitBtn(data);
			//渲染自带药品区域
			initZDYP(data);
			//渲染处方区域
			initViewPrescriptionArea(data);
 			//渲染医生信息区域数据，dtc订单才看到
			initDoctorInfoArea(data);
			//渲染条形码区域数据，dtc订单才看到
			initBarCodeArea(data);
			//染收货信息，模式C订单才看到
			initReceiverInfoArea(data);
		 	//选药用药注意事项区域，模式C订单才看到
		    initUseDrugAttentionArea(data);
			//渲染“联系病人”按钮
			initContactPatientBtn(data);
			//渲染“联系医师”按钮
 			initContactDoctorbtn(data);
 			//渲染“联系药师”按钮
 			initContactMedicineManbtn(data);
 			//渲染“查看药品”按钮
			initViewDrugsBtn(data);
 			//渲染订单进程
 			initOrderProcess(data);
 			//渲染“确认收货”按钮的事件
 			initConfirmReceiptBtn(data);
 			//渲染协助信息(只有申请协助模式才可以看得到)
 			initHelpDocInfo(data);
			$("#useName").html(data.name);
			if (data.sex == '1') {
				$("#genderDiv").html("男");
			} else if (data.sex == '2') {
				$("#genderDiv").html("女");
			}
			if(data.yerq=='1'){
				$('#yerq').html('是');
			}else{
				$('#yerq').html('否');
			}
			$("#ageDiv").html(data.age + data.ageUnit);
			$("#sfzhDiv").html(data.idCardNo);
			$("#phoneDiv").html(data.telphone);
			if (data.ywgms == '1') {
				$("#ywgmsDiv").html(data.ywgmsName);
			} else if (data.ywgms == '0') {
				$("#ywgmsDiv").html("无");
			}
			if (data.tsrq == '1') {
				switch (data.tsrqType) {
					case '1':
						$("#tsrqDiv").html("孕妇");
						break;
					case '2':
						$("#tsrqDiv").html("产妇");
						break;
					case '3':
						$("#tsrqDiv").html("哺乳期妇女");
						break;
				}
			} else if (data.tsrq == '0') {
				$("#tsrqDiv").html("否");
			}
			if (data.ggnbq == '1') {
				$("#ggnDiv").html("是");
			} else if (data.ggnbq == '0') {
				$("#ggnDiv").html("否");
			}
			if (data.sgnbq == '1') {
				$("#sgnDiv").html("是");
			} else if (data.sgnbq == '0') {
				$("#sgnDiv").html("否");
			}
			if (data.gxybs == '1') {
				if(data.gxybsLevel){
					switch (data.gxybsLevel) {
					case '1':
						$("#gxybsDiv").html("一级高血压");
						break;
					case '2':
						$("#gxybsDiv").html("二级高血压");
						break;
					case '3':
						$("#gxybsDiv").html("三级高血压");
						break;
					}
				}else{
					$("#gxybsDiv").html("是");
				}
				
			} else if (data.gxybs == '0') {
				$("#gxybsDiv").html("否");
			}else if (data.gxybs == '-1') {
				$("#gxybsDiv").html("未知");
			}
			if (data.tnbs == '1') {
				if(data.tnbsType){
					switch (data.tnbsType) {
						case '1':
							$("#tnbsDiv").html("1型糖尿病");
							break;
						case '2':
							$("#tnbsDiv").html("2型糖尿病");
							break;
						case '3':
							$("#tnbsDiv").html("妊娠糖尿病");
							break;
						case '4':
							$("#tnbsDiv").html("继发性糖尿病");
							break;
						case '5':
							$("#tnbsDiv").html("其他特殊类型糖尿病");
							break;
					}
				}else{
					$("#tnbsDiv").html("是");
				}
				
			} else if (data.tnbs == '0') {
				$("#tnbsDiv").html("否");
			}else if (data.tnbs == '-1') {
				$("#tnbsDiv").html("未知");
			}
			if (data.xzbs == '1') {
				$("#xzbsDiv").html("是");
			} else if (data.xzbs == '0') {
				$("#xzbsDiv").html("否");
			}
			if (data.qttsjb == '1') {
				$("#tsjbDiv").html(data.qttsjbName);
			} else if (data.qttsjb == '0') {
				$("#tsjbDiv").html("否");
			}
			if(data.mainSuit != ''){
				$("#zsDiv").html(data.mainSuit);
			}else{
				$("#zsDiv").html("<p>无</p>");
			}
			//病历类型区域显示或隐藏
			if(data.orderType==OrderType.TYPE_OUTPATIENT || data.orderType==OrderType.TYPE_OUTPATIENT_ASSIST
			  || data.orderType==OrderType.TYPE_DTC){
			  	$('#bllx_area').show();
			  	var bllxName='';//病历类型名称
			  	if(data.bllx=='1'){
			  		bllxName='住院';
			  		$('#blNo_name').html("住院号");
			  		$('#blNo').html(data.blNo?data.blNo:'无');
			  		$('#blDepartment_div').show();
			  		$('#blDepartment').html(data.blDepartment?data.blDepartment:'无');
			  		$('#bedNo_div').show();
			  		$('#bedNo').html(data.bedNo?data.bedNo:'无');
			  	}else if(data.bllx=='2'){
			  		$('#blNo_name').html("门诊号");
			  		bllxName='门诊';
			  		$('#blNo').html(data.blNo?data.blNo:'无');
			  		$('#blDepartment_div').hide();
			  		$('#bedNo_div').hide();
			  	}
			  	$('#bllxDiv').html(bllxName);
			  	//dtc订单才可以显示取药方式
			  	if(data.orderType==OrderType.TYPE_DTC){
			  		//取药方式
				  	var getDrugWayName='';
				  	if(data.getDrugWay=='1'){
				  		getDrugWayName='到店自取';
				  	}else if(data.getDrugWay=='2'){
				  		getDrugWayName='配送';
				  	}
				  	$('#getDrugWay').html(getDrugWayName);
			  		$('#getDrugWay_area').show();
			  	}else{
			  		$('#getDrugWay_area').hide();
			  	}
			  
			  	$('#deliver_addr').html(data.receiverAddress);//配送地址
			  	$('#deliver_userName').html(data.receiverName);//联系人
			  	$('#deliver_phone').html(data.receiverPhone);//联系电话
			  	if(data.orderType==OrderType.TYPE_DTC){
			  		$('#dtc_ps_address_area').show();
			  	}else{
			  		$('#dtc_ps_address_area').hide();
			  	}
			  	
			  	$('#bllx_area').show();
			 }else{
			 	$('#bllx_area').hide();
			 }
			
			
			//加载图片信息
			var pics = [];
			var picHtml = '<div class="myImg_bg"><span>图片</span></div>';
			if(data.picture1Path != '' && data.picture1Path != null){
				var imgObj = new Object();
				imgObj.url = data.picture1Path;
				imgObj.urlSub = '';
				imgObj.desc = '';
				var pic1 = buildFileHtml('image',data.picture1Path,0);
				pics.push(imgObj);	
				picHtml += pic1;
			}
			if(data.picture2Path != '' && data.picture2Path != null){
				var imgObj = new Object();
				imgObj.url = data.picture2Path;
				imgObj.urlSub = '';
				imgObj.desc = '';				
				var pic2 = buildFileHtml('image',data.picture2Path,1);
				pics.push(imgObj);	
				picHtml += pic2;
			}
			if(data.picture3Path != '' && data.picture3Path != null){
				var imgObj = new Object();
				imgObj.url = data.picture3Path;
				imgObj.urlSub = '';
				imgObj.desc = '';	
				var pic3 = buildFileHtml('image',data.picture3Path,2);
				pics.push(imgObj);	
				picHtml += pic3;		
			}
			if(data.picture4Path != '' && data.picture4Path != null){
				var imgObj = new Object();
				imgObj.url = data.picture4Path;
				imgObj.urlSub = '';
				imgObj.desc = '';	
				var pic4 = buildFileHtml('image',data.picture4Path,3);
				pics.push(imgObj);	
				picHtml += pic4;			
			}
			if(data.picture5Path != '' && data.picture5Path != null){
				var imgObj = new Object();
				imgObj.url = data.picture5Path;
				imgObj.urlSub = '';
				imgObj.desc = '';	
				var pic5 = buildFileHtml('image',data.picture5Path,4);
				pics.push(imgObj);	
				picHtml += pic5;			
			}
			$("#picUL").html(picHtml);
			
			$("#picUL li a img").click(function(){
				thisid = $(this).attr("id");
				var thisNum = thisid.substring(thisid.length-1,thisid.length);
				viewFile("image",pics,thisNum);
			});
			if(data.orderType == '2'){
				$("#ycyyDIV").attr("hidden","hidden");
			}else{
				//加载语音信息
				var voices = [];
				var voiceHtml = '<div class="myImg_bg yuYin"><span>语音</span></div>';
				if(data.voice1Path != null && data.voice1Path != ""){
					var vos1 = data.voice1Path.split(";");
					var vo1 = buildFileHtml('voice',vos1[1],0);
					var voicObj = new Object();
					voicObj.url = vos1[0];
					voicObj.urlSub = '';
					voicObj.desc = vos1[1];
					voices.push(voicObj);
					voiceHtml += vo1;
				}
				if(data.voice2Path != null && data.voice2Path != ""){
					var vos2 = data.voice2Path.split(";");
					var vo2 = buildFileHtml('voice',vos2[1],1);
					var voicObj = new Object();
					voicObj.url = vos2[0];
					voicObj.urlSub = '';
					voicObj.desc = vos2[1];			
					voices.push(voicObj);
					voiceHtml += vo2;
				}
				if(data.voice3Path != null && data.voice3Path != ""){
					var vos3 = data.voice3Path.split(";");
					var vo3 = buildFileHtml('voice',vos3[1],2);
					var voicObj = new Object();
					voicObj.url = vos3[0];
					voicObj.urlSub = '';
					voicObj.desc = vos3[1];			
					voices.push(voicObj);	
					voiceHtml += vo3;
				}
				if(data.voice4Path != null && data.voice4Path != ""){
					var vos4 = data.voice4Path.split(";");
					var vo4 = buildFileHtml('voice',vos4[1],3);
					var voicObj = new Object();
					voicObj.url = vos4[0];
					voicObj.urlSub = '';
					voicObj.desc = vos4[1];				
					voices.push(voicObj);	
					voiceHtml += vo4;
				}
				if(data.voice5Path != null && data.voice5Path != ""){
					var vos5 = data.voice5Path.split(";");
					var vo5 = buildFileHtml('voice',vos5[1],4);
					var voicObj = new Object();
					voicObj.url = vos5[0];
					voicObj.urlSub = '';
					voicObj.desc = vos5[1];				
					voices.push(voicObj);	
					voiceHtml += vo5;
				}
				$("#voiceUL").html(voiceHtml);
				$("#voiceUL li a").click(function(){
					var thisid = $(this).attr("id");
					var thisNum = thisid.substring(thisid.length-1,thisid.length);
					viewFile("audio",voices,thisNum);
				});
			}
			$("#useName").html(data.name);
			
		} else {
			//未能获取成功的数据
		}

	}, true);
}
/**
 * 初始化协助信息
 * @param {Object} data
 */
function initHelpDocInfo(data){
	var helpTarget='-1';//0协助订单创建者 1协助方 -1其他 
	if(data.orderType == '4'){
		if(APP.userInfo.userAccount==data.doctorAccount){
			helpTarget='0';
		}else {
			for(var i = 0;i<data.orderHelpMapList.length;i++){
				if(APP.userInfo.userAccount==data.orderHelpMapList[i].helpDoctorAccount){
					//是协助方
					helpTarget='1';
					break;
				}
			}
		}
	}
	console.log('判断是否显示协助信息,helpTarget:'+helpTarget);
	
	if('-1'!=helpTarget){//强森申请协助,只有订单创建者或协助方医生才能看到协助信息记录
		var helpDocInfos = '';
		var listSize=0;
		for(var i = 0;i<data.orderHelpMapList.length;i++){//遍历协助列表
			//协助方，只能看到自己的协助记录，不能看到别人的协助记录
			if(helpTarget=='1'){
				if(APP.userInfo.userAccount!=data.orderHelpMapList[i].helpDoctorAccount){
					continue;
				}
			}
			var helpRemark = "";
			var helpRemarkName = "";
			if(data.orderHelpMapList[i].remark != "null" && data.orderHelpMapList[i].remark != null){
				helpRemark = data.orderHelpMapList[i].remark;
			}else{
				helpRemark = "无";
			}
			if(data.orderHelpMapList[i].remarkName != "null" && data.orderHelpMapList[i].remarkName != null){
				helpRemarkName = data.orderHelpMapList[i].remarkName;
			}else{
				helpRemarkName = "无";
			}
			helpDocInfos += "<p>协助时间：<span id='helpTime"+i+"'>"+
				data.orderHelpMapList[i].createTime+"</span></p>";
			helpDocInfos += "<p>协助医生：<span id='helpDocName"+i+"'>"+
				data.orderHelpMapList[i].helpDoctorName+"</span></p>";
			helpDocInfos += "<p>所在医院：<span id='helpDocHos"+i+"'>"+
				data.orderHelpMapList[i].helpDoctorHosName+"</span></p>";
			helpDocInfos += "<p>终止者：<span id='helpDocHos"+i+"'>"+
				helpRemarkName + "</span></p>";
			helpDocInfos += "<p>终止理由：<span id='helpDescription"+i+"'><font color='red'>"+
				helpRemark+"</font></span></p>";
			if(i>0){
	         	helpDocInfos += "<p></p>";
			}
			++listSize;
		}
		var helpDocInfosDiv='<div>无</div>';
		if(listSize>0){
			helpDocInfosDiv='<div>'+helpDocInfos+'</div>';
		}
		$("#helpDiv").html(helpDocInfosDiv);
	}else{//非强生申请协助的时候隐藏该模块
		$("#helpDocInfo").attr("hidden","hidden");
	}
}
/**
 * 抽象出来的创建图像和语音的html
 * @param {Object} fileType	文件类型
 * @param {Object} fileUrl	为图片时是URL,为语音时是语音时间长度
 * @param {Object} num		文件当前的位置
 */
function buildFileHtml(fileType,fileUrl,num){
	var fileHtml = '';
	if(fileType == 'image'){//图片
		fileHtml = 	'<li class="liImage">' +
						'<a href="javascript:;">' +
							'<img id="img'+num+'" src="'+fileUrl+'" alt="图片'+(num+1)+'" />'+
						"</a>"+
					"</li>";
	}else if(fileType == 'voice'){//声音
		fileHtml = '<li class="liImage">' +
						'<a id="voice'+num+'" href="javascript:;" class="voice_bg">' +
							'<span class="miao">'+fileUrl+'″</span>'+
						'</a>'+
					'</li>';
	}
	return fileHtml;
}
/**
 * 渲染自带药品下拉 
 * @param {Object} data
 */
function initZDYP(data){
	if(data == '' || data == null){
		$("#zdyp_area").attr("hidden","hidden");
	}else{
		var drugs = data.orderedDrugList; 
			if(drugs != ''){
				console.log("drugs长度："+drugs.length);
				for(var d = 0;d<drugs.length;d++){
								//0：未使用过 1使用过
								var sfsy = '';
								if(drugs[d].patientUsed == 0){
			                        	sfsy = "未使用过"
			                        }else{
			                        	sfsy = "使用过"
			                        }
								var drug = "<div>"+
			                        "<h3>"+(d+1)+"、"+drugs[d].drugName+"</h3>"+
			                        "<p>用法：<span>"+drugs[d].usage+"</span></p>"+
			                        "<p>用量：<span>"+drugs[d].dosage+"</span></p>"+
			                        "<p>数量：<span>"+drugs[d].count+"</span></p>"+
			                        "<p>是否使用过该药：<span class='color'>"+sfsy+"</span></p>"+
			                    "</div>";
					$("#drugLists").html(drug);
				}
			}else{
				$("#zdyp_area").attr("hidden","hidden");
			}
	}
}
/**
 * 判断当前用户是否可以查看此订单的详情
 * 如果不可以查看订单状态，则finish当前界面
 * @param {Object} order
 */
function checkOrderVaild(order) {
	var isFinish = false;
	//情况1：模式A申请开处方订单，如果订单状态是医师处理中而且当前用户是医生，但是当前用户不是受理订单的医生
	if (order.orderType == OrderType.TYPE_DRUGSTORE_ASSIST && order.status == OrderState.STATE_3_DC_DEAL) {
		if (UserType.DZCF_DOCTOR == APP.userInfo.userType && APP.userInfo.userAccount != order.doctorAccount) {
			isFinish = true;
		}
	}
	//情况2：模式C 申请协助订单，如果订单状态是协助中中而且当期的用户是医生，但是当前用户不是受理协助订单的医生
	if (order.orderType == OrderType.TYPE_OUTPATIENT_ASSIST && order.status == OrderState.STATE_14_ASSIT_ING) {
		if (UserType.DZCF_DOCTOR == APP.userInfo.userType) {
			if(APP.userInfo.userAccount!=order.doctorAccount && APP.userInfo.userAccount != order.helpDoctorAccount){
				//如果当前用户医生，
				isFinish = true;
			}
		}
	}
	//情况3：订单状态是药师受理中而且当前的用户是药师，但是当前用户不是受理协订单的药师
	if (order.status == OrderState.STATE_6_PHRA_DEAL) {
		if (UserType.DZCF_MEDICINEMAN == APP.userInfo.userType && APP.userInfo.userAccount != order.medicineAccount) {
			isFinish = true;
		}
	}
	if (isFinish) {
		APP.finishH5(); //直接结束界面
	}
}
/**
 * 判断模式C 申请协助的订单  协助中状态时跳到协助聊天界面
 * @param {Object} order
 */
function checkDocHelpOrder2Chat(order) {
	if(readOnly){
		return;
	}
	//模式C 申请协助订单，如果订单状态是协助中中而且当期的用户是医生，但是当前用户不是受理协助订单的医生
	if (order.orderType == OrderType.TYPE_OUTPATIENT_ASSIST && order.status == OrderState.STATE_14_ASSIT_ING) {
		//先关闭当前界面
		APP.finishH5(false);
		if (UserType.DZCF_DOCTOR == APP.userInfo.userType) {
			if (APP.userInfo.userAccount == order.doctorAccount) { //当前用户就是开单医生
				//打开与协助方的聊天界面
				APP.chatWithSomebody(order.helpDoctorAccount, order.helpDoctorName, '', order.orderType, order.status
				, order.orderNo,order.prescriptionId,order.drugStoreId,order.drugstoreName);
			} else if (APP.userInfo.userAccount == order.helpDoctorAccount) { //当前用户是协助别人的医生
				//打开开单医生的聊天界面
				var avator='';
				if(order.doctorImgUrl){
					avator=order.doctorImgUrl;
				}
				//打开与协助方的聊天界面
				APP.chatWithSomebody(order.doctorAccount, order.doctorName, avator, order.orderType, order.status, order.orderNo
					,order.prescriptionId,order.drugStoreId,order.drugstoreName );
			}
		}
	}
}
/**
 * 渲染订单信息模块的数据
 */
function initOrderInfos(order) {
	$("#orderNo").html(order.orderNo);
	//查看物流按钮的显示与否
	if(order.logisticsOrderNo){//如果有物流单号
		$('#view_logistics').show();
		$('#view_logistics').unbind("click"); //移除click
		$('#view_logistics').click(function(){
			//查看物流，跳转至新界面
			//界面传递数据
			var reqData = {
				name: 'logistics_viewer',
				jsonData: {
						logisticsCode:order.logisticsCode,
						logisticsName:order.logisticsName,
						logisticsOrderNo:order.logisticsOrderNo
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
			});
		});
	}else{
		$('#view_logistics').hide();
	}
	
	$('#order_time_span').html(order.createTime);
	//订单状态
	var statusInt = parseInt(order.status);
	var statusTitle = ''
	switch (statusInt) {
		case 1:
			statusTitle = '待受理';
			break;
		case 2:
			statusTitle = '订单关闭';
			break;
		case 3:
			statusTitle = '开处方';
			break;
		case 4:
			statusTitle = '等待审核';
			break;
		case 5:
			statusTitle = '订单关闭';
			break;
		case 6:
			statusTitle = '审核处方';
			break;
		case 7:
			statusTitle = '开处方';
			break;
		case 8:
			statusTitle = '核处方';
			break;
		case 9:
			statusTitle = '等待取药';
			break;
		case 10:
			statusTitle = '订单成功';
			break;
		case 11:
			statusTitle = '订单关闭';
			break;
		case 12:
			statusTitle = '订单关闭';
			break;
		case 13:
			statusTitle = '待协助';
			break;
		case 14:
			statusTitle = '协助中';
			break;
		case 15:
			statusTitle = '协助终止';
			break;
		case 16:
			statusTitle = '协助完成';
			break;
		case 17:
			statusTitle = '待结算';
			break;
		case 18:
			statusTitle = '待发货';
			break;
		case 19:
			statusTitle = '待收货';
			break;
		case 20:
			statusTitle = '待提交审方';
			break;
		default:
			break;
	}
	$('#status').html(statusTitle);
	//订单类型
	var orderType = order.orderType;
	if (orderType == OrderType.TYPE_DRUGSTORE || orderType == OrderType.TYPE_DRUGSTORE_ASSIST) {
		//模式A订单
		var temp = '<p>药店：<span>' + order.drugstoreName + '</span></p>' + '<p>销售人员：<span>' + order.salesmanName + '</span></p>';
		$('#order_info_source').html(temp);
	} else if (orderType == OrderType.TYPE_DTC || orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST) {
		//模式B/C订单
		var temp = '<p>医院：<span>' + order.doctorHosName + '</span></p>' + '<p>医生：<span>' + order.doctorName + '</span></p>';
		$('#order_info_source').html(temp);
	}
	

}
/**
 * 渲染“取消订单”按钮的事件
 */
function initCancelBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//根据订单类型判断是否出现取消订单按钮
	if (orderType == OrderType.TYPE_DRUGSTORE_ASSIST) { //申请开处方，模式A
		if (APP.userInfo.userAccount == order.salesmanAccount) {
			//订单状态不是 订单成功/订单取消/订单关闭 状态的  可取消订单
			if (order.status != OrderState.STATE_10_EPORDER_SUCCESS && order.status != OrderState.STATE_11_EPORDER_CANCEL && order.status != OrderState.STATE_2_EPORDER_TIMEOUT && order.status != OrderState.STATE_5_DC_REFUSE_END) {
				isShow = true;
			}
		}
	}
	if (orderType == OrderType.TYPE_DRUGSTORE) { //申请神处方，模式A
		if (APP.userInfo.userAccount == order.salesmanAccount) {
			//订单状态不是 订单成功/订单取消/订单关闭 状态的  可取消订单
			if (order.status != OrderState.STATE_10_EPORDER_SUCCESS && order.status != OrderState.STATE_11_EPORDER_CANCEL && order.status != OrderState.STATE_2_EPORDER_TIMEOUT && order.status != OrderState.STATE_12_PHRA_REFUSE_END) {
				isShow = true;
			}
		}
	}

	if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST) { //模式B订单
		if (APP.userInfo.userAccount == order.doctorAccount) {
			//订单状态不是 订单成功/订单取消/订单关闭 状态的  可取消订单
			if (order.status != OrderState.STATE_10_EPORDER_SUCCESS && order.status != OrderState.STATE_11_EPORDER_CANCEL && order.status != OrderState.STATE_2_EPORDER_TIMEOUT && order.status != OrderState.STATE_18_WAIT_DELIVER_GOODS && order.status != OrderState.STATE_19_WAIT_TAKE_DELIVER_GOODS) {
				isShow = true;
			}
		}
	}
	if (orderType == OrderType.TYPE_DTC) { //DTC订单，由药店销售员取消订单
		if(APP.userInfo.userType==UserType.DZCF_SALESMAN){
			if(order.drugStoreId==APP.drugStoreInfo.drugStoreId){
				if (APP.userInfo.userAccount == order.salesmanAccount) {
					//订单状态不是 订单成功/订单取消/订单关闭 状态的  可取消订单
					if (order.status != OrderState.STATE_10_EPORDER_SUCCESS && order.status != OrderState.STATE_11_EPORDER_CANCEL && order.status != OrderState.STATE_2_EPORDER_TIMEOUT && order.status != OrderState.STATE_18_WAIT_DELIVER_GOODS && order.status != OrderState.STATE_19_WAIT_TAKE_DELIVER_GOODS) {
						isShow = true;
					}
				}else if(order.status==OrderState.STATE_20_WAIT_DRUGSTORE_CHECKIN){
					isShow = true;
				}
			}
		}
	}
	if (isShow) {
		$('#cancel_btn').show();
		$('#cancel_btn').unbind("click"); //移除click
		//“取消订单”按钮点击事件
		$('#cancel_btn').click(function() {
			//如果是DTC订单，则需要选择用户取消还是药店取消选项，其他类型订单不需要选择
			if (orderType == OrderType.TYPE_DTC) {
				//选项
				var items = Array();
				items.push({
					name: '药店取消',
					tag: '1'
				});
				items.push({
					name: '用户取消',
					tag: '2'
				});
				APP.showChoiceDialog('single', '请选择取消原因：', items, function(resultItems) {
					if (resultItems && resultItems.length > 0) {
						var cancelType = resultItems[0].tag; //取消原因
						var bodyData = {
							orderNo: orderNo,
							flag: '3',
							cancelType: cancelType
						}
						APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
							if (data.code == '0') { //取消成功
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							} else if (data.code == '1') { //订单被取消，不能继续操作
								APP.showToast('订单已经被取消');
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							}
						});
					} else {
						console.log('没有确定的选项');
					}
				});
			} else {
				APP.showConfirmDialog('取消订单', '您确定要取消该订单吗？', function() {
					//确定按钮回调函数
					var bodyData = {
						orderNo: orderNo,
						flag: '3'
					}
					APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
						if (data.code == '0') { //取消成功
							APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
						} else if (data.code == '1') { //订单被取消，不能继续操作
							APP.showToast('订单已经被取消');
							APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
						}
					}, true);
				});
			}
		});
	} else {
		$('#cancel_btn').hide();
	}

}
/**
 * 渲染“受理”按钮的事件，医师或药师受理订单
 * @param {Object} order
 */
function initAcceptBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//受理接口的请求的参数
	var flag = ''; //操作标识  1：医师受理2：药师受理 
	var doctorAccount = ''; //医生账号
	var medicineManAccount = ''; //药师账号
	var medicineManSign = ''; //药师签名
	//根据订单状态判断
	if (order.status == OrderState.STATE_1_WAIT_DC) { //1,待医师受理
		//判断当前登录是否是医师
		if (APP.userInfo.userType == UserType.DZCF_DOCTOR) {
			var isShow = true;
			flag = '1';
			doctorAccount = APP.userInfo.userAccount;
		}
	}
	if (order.status == OrderState.STATE_4_DC_OK) { //4,待药师受理
		//判断当前登录是否是药师
		if (APP.userInfo.userType == UserType.DZCF_MEDICINEMAN) {
			var isShow = true;
			flag = '2';
			medicineManAccount = APP.userInfo.userAccount;
		}
	}
	if (order.status == OrderState.STATE_13_WAIT_ASSIT) { //13,待协助
		//判断当前登录是否是医师，而且自己受理不了自己的订单;协助方不能重复协助
		if (APP.userInfo.userType == UserType.DZCF_DOCTOR && APP.userInfo.userAccount != order.doctorAccount) {
			//判断当前用户是否协助过该订单
			var haseHelpIt=false;
			if(order.orderHelpMapList && order.orderHelpMapList.length>0){
				for(var i=0;i<order.orderHelpMapList.length;i++){
					var h=order.orderHelpMapList[i];
					if(APP.userInfo.userAccount==h.helpDoctorAccount){
						haseHelpIt=true;
						break;
					}
				}
			}
			if(!haseHelpIt){//没协助过该订单，才显示受理按钮
				var isShow = true;
			}
			flag = '1';
			doctorAccount = APP.userInfo.userAccount;
		}
	}
	if (isShow) {
		$('#accept_btn').show();
		//“受理”按钮点击事件
		$('#accept_btn').unbind("click"); //移除click
		$('#accept_btn').click(function() {
			APP.checkMedicalWorkerSign(function(rspData) {
				if (rspData.result && rspData.result.signInfo) {
					var signInfo = rspData.result.signInfo; //签名
					if (flag == '2') { //药师受理订单，则需要传药师签名参数
						medicineManSign = signInfo;
					}
					APP.showConfirmDialog('受理订单', '确定受理该订单吗？', function() {
						//确定按钮回调函数
						var bodyData = {
							orderNo: orderNo,
							flag: flag,
							doctorAccount: doctorAccount,
							medicineManAccount: medicineManAccount,
							medicineManSign: medicineManSign
						}
						APP.getData('/hrs/servlet/acceptPrescriptionOrder', bodyData, function(data) {
							if (data.code == '1') { //受理成功
								//如果订单当前的状态是待协助，受理成功之后直接跳到与开单医生的聊天界面
								if (order.status == OrderState.STATE_13_WAIT_ASSIT) {
									console.log('协助受理成功，打开与开单医生的聊天界面');
									APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知

								} else { //否则，刷新界面数据
									APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
								}
							} else if (data.code == '2') { //已受理
								APP.showToast('订单已经被受理');
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							} else if (data.code == '3') { //已取消
								APP.showToast('订单已经被取消');
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							} else if (data.code == '4') { //当前医师或药师已经有正在处理的订单，无法再受理此订单
								APP.showToast('请先处理完已有的订单');
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							} else if (data.code == '5' || data.code == '6') {
								APP.showToast('医生所属的医院无完整的抬头或公章信息');
								APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
							}
						});
					});
				}
			});

		});
	} else {
		$('#accept_btn').hide();
	}
}
/**
 * 渲染“开处方”按钮的事件
 */
function initOpenPrescriptionBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果订单状态是医生开药状态，而且当前登录的用户是接受订单的医生，则可以开处方和修改处方
	if (order.status == OrderState.STATE_3_DC_DEAL) {
		if (APP.userInfo.userAccount == order.doctorAccount) {
			isShow = true;
			$('#open_prescription_btn').html('开处方');
		}
	} else if (order.status == OrderState.STATE_7_PHRA_REFUSE) {
		if (APP.userInfo.userAccount == order.doctorAccount) {
			isShow = true;
			$('#open_prescription_btn').html('修改处方');
		}
	}
	if (isShow) {
		$('#open_prescription_btn').show();
		//“开处方”按钮点击事件，此处是远程医生西药开处方入口
		$('#open_prescription_btn').unbind("click"); //移除click
		$('#open_prescription_btn').click(function() {
			var htmlName = '';
			if (orderType == OrderType.TYPE_DTC || orderType == OrderType.TYPE_DRUGSTORE_ASSIST) { //DTC订单/药店订单，开西药界面
				htmlName = 'open_prescription_xiyao.html'
			} else if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST) { //模式B订单，开中药界面
				htmlName = 'open_prescription_zhongyao.html';
			}
			//界面传递数据
			var reqData = {
				name: htmlName,
				jsonData: {
					opt: '1', //操作  1表示在处方界面直接保存处方数据
					orderNo: orderNo,
					orderType: orderType,
					prescriptionId: prescriptionId,
					prescriptionData: prescriptionData //已选择的处方数据传递到开处方的界面
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
				console.log('开处方界面返回给开单界面的数据：' + APP.json2Str(data));
				if (data.result && data.result.jsonData && data.result.jsonData.drugList) {
					//在全局变量中保存开处方的药品列表数据
					var jsonData = data.result.jsonData;
					prescriptionData.totalMoney = jsonData.totalMoney;
					prescriptionData.drugCount = jsonData.drugCount;
					prescriptionData.diagnoseDetail = jsonData.diagnoseDetail;
					prescriptionData.useDrugAttention = jsonData.useDrugAttention;
					prescriptionData.drugStoreId = jsonData.drugStoreId;
					prescriptionData.drugStoreName = jsonData.drugStoreName;
					prescriptionData.drugList = jsonData.drugList;
					console.info('开处方的数据：' + APP.json2Str(prescriptionData));
				}
			});

		});
	} else {
		$('#open_prescription_btn').hide();
	}

}
/**
 * 查看文件
 * @param {Object} methodName	方法名
 * @param {Object} fileType	文件类型
 * @param {Object} file		文件数组
 * @param {Object} startNo	从哪个文件开始
 */
function viewFile(fileType, file, startNo) {
	var reqData = {
					files:file,
					type:fileType,
					index:startNo
				};
	console.log("requestData======" + "files:" + reqData.files + "||type:" + reqData.fileType + "||index:" + reqData.startNo);
	RainbowBridge.callMethod('SysModular', 'viewFile', reqData,function(){
	});
}
/**
 * 渲染订单信息进程
 * @param {Object} data
 */
function initOrderProcess(data) {
	
	if(data.status == '2' || data.status == '5' || data.status == '11' || data.status == '12'){
		//进来表示都是非正常结束的订单
		console.log("非正常关闭订单,订单状态为："+data.status+"===订单号为："+
						data.orderNo+"===订单类型为："+data.orderType);
		buildDDJC(data,'failed');
	}else{
		//进来则表示都是正常结束或者正在进行中的订单
		console.log("正常关闭或正在进行中的订单,订单状态为："+data.status+"===订单号为："+
						data.orderNo+"===订单类型为："+data.orderType);
		buildDDJC(data,'success');
		
	}
}
/**
 * 创建进程html
 * @param {Object} htmlText	进程显示文本
 * @param {Object} flag	传入的订单的最终状态。success订单成功,failed订单失败
 * @param {Object} defeatIndex	未到达状态下标	flag为success的时候该值不为空
 */
function buildProcessHtml(htmlText,flag,defeatIndex){
	var processHtml = '';
	var processText = htmlText.split(",");
	console.log("订单进程状态：======="+htmlText);
	if(flag == 'success'){
		for(var pt = 0; pt<processText.length ; pt++){
			if(pt <= defeatIndex){//当前下标小于或者等于未到达状态的下标时,显示亮色,否则为暗色
				if(pt == 0){
					processHtml = "<li><span class='incons incons_on'></span><br/><span class='span02'>"+
									processText[pt]+"</span></li>";
				}else{
					processHtml += "<li><span class='incons incons_on'></span><br/><span class='span02'>"+
								processText[pt]+"</span><div class='line line_on'></li>";
				}
			}else{
				if(pt == 0){
					processHtml = "<li><span class='incons'></span><br/><span class='span02'>"+
									processText[pt]+"</span></li>";
				}else{
					processHtml += "<li><span class='incons'></span><br/><span class='span02'>"+
								processText[pt]+"</span><div class='line'></li>";
				}
			}
		}
	}else if(flag == 'failed'){
		for(var pt = 0; pt<processText.length ; pt++){
			if(pt == 0){
				processHtml = "<li><span class='incons incons_on'></span><br/><span class='span02'>"+
								processText[pt]+"</span></li>";
			}else{
				processHtml += "<li><span class='incons incons_on'></span><br/><span class='span02'>"+
							processText[pt]+"</span><div class='line line_on'></li>";
			}
		}
	}
	return processHtml;
}
/**
 * 创建进程文字
 * @param {Object} data
 */
function buildProcessHtmlText(data){
	var processHtmlText = "";
	var process = data.process;
	for(var p = 0;p<process.length;p++){
		if(p == 0){
			processHtmlText = 	"<div>"+
								    "<span>"+process[p].handleTime+"</span><span>"+
								    	process[p].detail+"操作员："+process[p].operatorName+"</span>"+
								"</div>"
		}else{
			processHtmlText += 	"<div>"+
								    "<span>"+process[p].handleTime+"</span><span>"+
								    	process[p].detail+"操作员："+process[p].operatorName+"</span>"+
								"</div>"
		}
	}
	return processHtmlText;
}
/**
 * 抽象出来创建订单进程的方法
 * @param {Object} data	订单数据
 * @param {Object} flag	success:订单成功,failed:订单失败
 */
function buildDDJC(data,flag) {
		var accessIndex = 0;//已经通过的节点下标
//		var failedIndex = 0;//订单失败的节点下标	暂时未用到
		var isFailed = false;//该订单失败的标识
		if(flag == 'failed'){
			var ddjc = data.process;//失败的订单才会用到此变量,该订单的订单进程
			var failedStatus = ddjc[1].orderStatus;//失败的订单才会用到此变量,该订单进程的倒数第二个状态来知道该订单是在哪个节点失败的
			data.status = failedStatus;
			console.log("失败的订单状态：======="+failedStatus);
		}
		console.log("当前的订单状态：======="+data.status);
		if(data.orderType == '1'){//南京开处方
			if(isFailed == false && data.status == '1' || data.status == '3' || data.status == '4'
				|| data.status == '6' || data.status == '7' || data.status == '8'
					|| data.status == '9' || data.status == '10'){//待受理
						
				accessIndex = 0;
				
				if(flag == 'failed'){
					if(data.status == '1'){
						var proHtml = "待受理,订单关闭";
						var process = buildProcessHtml(proHtml,'failed','');
						$("#ddxxjc").html(process);
						isFailed = true;
					}
				}
				if(isFailed == false && data.status == '3' || data.status == '4'
					|| data.status == '6' || data.status == '7' || data.status == '8'
						|| data.status == '9' || data.status == '10'){//开处方
					
					accessIndex = 1;
					if(flag == 'failed'){
						if( data.status == '3' || data.status == '7'){
							var proHtml = "待受理,开处方,订单关闭";
							var process = buildProcessHtml(proHtml,'failed','');
							$("#ddxxjc").html(process);
							isFailed = true;
						}
					}
					if(isFailed == false && data.status == '4' || data.status == '6' || data.status == '9' 
						|| data.status == '8' || data.status == '10'){//审处方
					
						accessIndex = 2;
						if(flag == 'failed'){
							if(data.status == '4' || data.status == '6' || data.status == '8'){
								var proHtml = "待受理,开处方,审核处方,订单关闭";
								var process = buildProcessHtml(proHtml,'failed','');
								$("#ddxxjc").html(process);
								isFailed = true;
							}
						}
						if(isFailed == false && data.status == '9' || data.status == '10'){
							
							accessIndex = 3;
							
							if(flag == 'failed'){
								if( data.status == '9'){
									var proHtml = "待受理,开处方,审核处方,等待取药,订单关闭";
									var process = buildProcessHtml(proHtml,'failed','');
									$("#ddxxjc").html(process);
									isFailed = true;
								}
							}
							if(isFailed == false && data.status == '10'){
								
								accessIndex = 4;
								
							}
						}
					}
				}
				if(flag == 'success'){
					var proHtml = "待受理,开处方,审核处方,等待取药,订单成功";
					var process = buildProcessHtml(proHtml,'success',accessIndex);
					$("#ddxxjc").html(process);
				}
			}
		}else if(data.orderType == '2'){//南京审处方
			accessIndex = 0;
			if(flag == 'failed'){
				var proHtml = "待受理,订单关闭";
				var process = buildProcessHtml(proHtml,'failed','');
				$("#ddxxjc").html(process);
				isFailed = true;
			}
			if(isFailed == false && data.status == '4' || data.status == '6' || data.status == '10'){//申请开处方等待医师受理
						
				accessIndex = 1;
				if(flag == 'failed'){
					if(data.status == '4' || data.status == '6'){
						var proHtml = "待受理,审核处方,订单关闭";
						var process = buildProcessHtml(proHtml,'failed','');
						$("#ddxxjc").html(process);
						isFailed = true;
					}
				}	
//				if(isFailed == false && data.status == '6' || data.status == '10'){//审处方
//				
//					if(flag == 'failed'){
//						if( data.status == '6'){
//							var proHtml = "待受理,审核处方,订单关闭";
//							var process = buildProcessHtml(proHtml,'failed','');
//							$("#ddxxjc").html(process);
//							isFailed = true;
//						}
//					}
					if(isFailed == false && data.status == '10'){
						
						accessIndex = 2;
						
					}
//				}
				if(flag == 'success'){
					var proHtml = "待受理,审核处方,订单成功";
					var process = buildProcessHtml(proHtml,'success',accessIndex);
					$("#ddxxjc").html(process);
				}
			}
		}else if(data.orderType == '3'){//强森开处方
			if(isFailed == false && data.status == '4' ||data.status == '7' || data.status == '3'
				|| data.status == '6' || data.status == '8' || data.status == '10' 
					|| data.status == '17' || data.status == '18' || data.status == '19'){
				accessIndex = 0;
				if(flag == 'failed'){
					if(data.status == '3' ||data.status == '7'){
						var proHtml = "开处方,订单关闭";
						var process = buildProcessHtml(proHtml,'failed','');
						$("#ddxxjc").html(process);
						isFailed = true;
					}
				}
				if(isFailed == false && data.status == '6' || data.status == '8' || data.status == '10' 
					|| data.status == '4' || data.status == '17' || data.status == '18' 
						|| data.status == '19'){
					
					accessIndex = 1;
					if(flag == 'failed'){
						if(data.status == '4' || data.status == '6' || data.status == '8'){
							var proHtml = "开处方,审核处方,订单关闭";
							var process = buildProcessHtml(proHtml,'failed','');
							$("#ddxxjc").html(process);
							isFailed = true;
						}
					}
					if(isFailed == false && data.status == '10' || data.status == '17' 
						|| data.status == '18' || data.status == '19'){
						
						accessIndex = 2;
						if(flag == 'failed'){
							if(data.status == '17'){
								var proHtml = "开处方,审核处方,待结算,订单关闭";
								var process = buildProcessHtml(proHtml,'failed','');
								$("#ddxxjc").html(process);
								isFailed = true;
							}
						}
						if(isFailed == false && data.status == '10' || data.status == '18' 
							|| data.status == '19'){
							
							accessIndex = 3;
							if(flag == 'failed'){
								if(data.status == '18'){
									var proHtml = "开处方,审核处方,待结算,待发货,订单关闭";
									var process = buildProcessHtml(proHtml,'failed','');
									$("#ddxxjc").html(process);
									isFailed = true;
								}
							}
							if(isFailed == false && data.status == '10' || data.status == '19'){
								
								accessIndex = 4;
								if(flag == 'failed'){
									if(data.status == '19'){
										var proHtml = "开处方,审核处方,待结算,待发货,待收货,订单关闭";
										var process = buildProcessHtml(proHtml,'failed','');
										$("#ddxxjc").html(process);
										isFailed = true;
									}
								}
								if(isFailed == false && data.status == '10'){
									
									accessIndex = 5;
									
								}
							}
						}
					}
				}
				if(flag == 'success'){
					var proHtml = "开处方,审核处方,待结算,待发货,待收货,订单成功";
					var process = buildProcessHtml(proHtml,'success',accessIndex);
					$("#ddxxjc").html(process);
				}
			}
		}else if(data.orderType == '4'){//强森协助开处方
			if(isFailed == false && data.status == '6' || data.status == '8' || data.status == '7'  
				|| data.status == '3' ||data.status == '13' || data.status == '14' || data.status == '15' 
					|| data.status == '4' || data.status == '16' || data.status == '10' || data.status == '17' 
						|| data.status == '18' || data.status == '19'){
						
					accessIndex = 0;
					if(flag == 'failed'){
						if(data.status == '7' ||data.status == '13' || data.status == '14' 
							|| data.status == '3' || data.status == '15' || data.status == '16'){
							var proHtml = "开处方,订单关闭";
							var process = buildProcessHtml(proHtml,'failed','');
							$("#ddxxjc").html(process);
							isFailed = true;
						}
					}
				if(isFailed == false && data.status == '6' || data.status == '8' || data.status == '10' 
					|| data.status == '4' || data.status == '17' 
						|| data.status == '18' || data.status == '19'){
					
					accessIndex = 1;
					if(flag == 'failed'){
						if(data.status == '6' || data.status == '8' || data.status == '4'){
							var proHtml = "开处方,审核处方,订单关闭";
							var process = buildProcessHtml(proHtml,'failed','');
							$("#ddxxjc").html(process);
							isFailed = true;
						}
					}
					if(isFailed == false && data.status == '10' || data.status == '17' 
						|| data.status == '18' || data.status == '19'){
						
						accessIndex = 2;
						if(flag == 'failed'){
							if(data.status == '17'){
								var proHtml = "开处方,审核处方,待结算,订单关闭";
								var process = buildProcessHtml(proHtml,'failed','');
								$("#ddxxjc").html(process);
								isFailed = true;
							}
						}
						if(isFailed == false && data.status == '10' || data.status == '18' 
							|| data.status == '19'){
							
							accessIndex = 3;
							if(flag == 'failed'){
								if(data.status == '18'){
									var proHtml = "开处方,审核处方,待结算,待发货,订单关闭";
									var process = buildProcessHtml(proHtml,'failed','');
									$("#ddxxjc").html(process);
									isFailed = true;
								}
							}
							if(isFailed == false && data.status == '10' || data.status == '19'){
								
								accessIndex = 4;
								if(flag == 'failed'){
									if(data.status == '19'){
										var proHtml = "开处方,审核处方,待结算,待发货,待收货,订单关闭";
										var process = buildProcessHtml(proHtml,'failed','');
										$("#ddxxjc").html(process);
										isFailed = true;
									}
								}
								if(data.status == '10'){
									
									accessIndex = 5;
									
								}
							}
						}
					}
				}
				if(flag == 'success'){
					var proHtml = "开处方,审核处方,待结算,待发货,待收货,订单成功";
					var process = buildProcessHtml(proHtml,'success',accessIndex);
					$("#ddxxjc").html(process);
				}
			}
		}else if(data.orderType == '6'){//到院(DTC)处方
			if(isFailed == false && data.status == '4' || data.status == '6' || data.status == '8' || 
				data.status == '7' || data.status == '9' || data.status == '10' || data.status == '20'){
				
				accessIndex = 1;
				if(flag == 'failed'){
					if(data.status == '20'){
						var proHtml = "开处方,申请审方,订单关闭";
						var process = buildProcessHtml(proHtml,'failed','');
						$("#ddxxjc").html(process);
						isFailed = true;
					}
				}
//				if(isFailed == false && data.status == '6' || data.status == '8' || data.status == '7' 
//					|| data.status == '9' || data.status == '10' || data.status == '4'){
//					
//					accessIndex = 1;
//					if(flag == 'failed'){
//						if(data.status == '4'){
//							var proHtml = "开处方,申请审方,订单关闭";
//							var process = buildProcessHtml(proHtml,'failed','');
//							$("#ddxxjc").html(process);
//							isFailed = true;
//						}
//					}
				if(isFailed == false && data.status == '6' || data.status == '8' || data.status == '7' 
					|| data.status == '9' || data.status == '10' || data.status == '4'){
					
					accessIndex = 2;
					if(flag == 'failed'){
						if(data.status == '6' || data.status == '8' || data.status == '7'
							 || data.status == '4'){
							var proHtml = "开处方,申请审方,审核处方,订单关闭";
							var process = buildProcessHtml(proHtml,'failed','');
							$("#ddxxjc").html(process);
							isFailed = true;
						}
					}
					if(isFailed == false && data.status == '9' || data.status == '10'){
						
						accessIndex = 3;
						if(flag == 'failed'){
							if(data.status == '9'){
								var proHtml = "开处方,申请审方,审核处方,等待取药,订单关闭";
								var process = buildProcessHtml(proHtml,'failed','');
								$("#ddxxjc").html(process);
								isFailed = true;
							}
						}
						if(isFailed == false && data.status == '10'){
							
							accessIndex = 4;
							
						}
					}
				}
//				}
			}
			if(flag == 'success'){
				var proHtml = "开处方,申请审方,审核处方,等待取药,订单成功";
				var process = buildProcessHtml(proHtml,'success',accessIndex);	
				$("#ddxxjc").html(process);
			}
		}
		//订单进程详细记录，只有订单创建者和病人用户才能看到
		var ddxxTextShow=false;
		if(UserType.DZCF_USER == APP.userInfo.userType){
			ddxxTextShow=true;
		}else{
			//判断订单来源,1要点 2医院
			var orderSource=OrderType.getOrderSource(data.orderType);
			if('1'==orderSource){
				if(APP.userInfo.userAccount==data.salesmanAccount){
					ddxxTextShow=true;
				}
			}else if('2'==orderSource){
				if(APP.userInfo.userAccount==data.doctorAccount){
					ddxxTextShow=true;
				}
			}
		}
		if(ddxxTextShow){
			$("#ddxxText").show();
			var proText = buildProcessHtmlText(data);
			$("#ddxxText").html(proText);
		}else{
			$("#ddxxText").hide();
		}
		
		
}

/**
 * 渲染“提交审方”按钮的事件
 * @param {Object} order
 */
function initDrugstoreCheckinBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果订单状态是待提交审方状态，订单类型是dtc,而且当前登录的是药店销售员
	if (order.status == OrderState.STATE_20_WAIT_DRUGSTORE_CHECKIN && order.orderType == OrderType.TYPE_DTC) { //20,待提交审方
		//判断当前登录是否是药店销售员
		if (APP.userInfo.userType == UserType.DZCF_SALESMAN) {
			var isShow = true;
		}
	}
	if (isShow) {
		$('#drugstore_checkin_btn').show();
		$('#drugstore_checkin_btn').unbind("click"); //移除click
		$('#drugstore_checkin_btn').click(function() {
			APP.showConfirmDialog('提交审方', '确定申请审核该处方吗？', function() {
				//确定按钮回调函数
				var bodyData = {
					orderNo: orderNo,
					flag: '10'
				}
				APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
					if (data.code == '0') { //成功
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					} else if (data.code == '1') { //订单被取消，不能继续操作
						APP.showToast('订单已经被取消');
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					}
				});
			});
		});
	} else {
		$('#drugstore_checkin_btn').hide();
	}
}
/**
 * 渲染“拒绝申请”按钮的事件
 * @param {Object} order
 */
function initRefuseApplyBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果订单状态医师受理中或药师受理中，则可操作
	if (order.status == OrderState.STATE_3_DC_DEAL) { //3,医师受理中
		if (APP.userInfo.userType == UserType.DZCF_DOCTOR && APP.userInfo.userAccount == order.doctorAccount) {
			var isShow = true;
		}
	}
	if (order.status == OrderState.STATE_6_PHRA_DEAL) { //6,药师受理中
		if (APP.userInfo.userType == UserType.DZCF_MEDICINEMAN && APP.userInfo.userAccount == order.medicineAccount) {
			var isShow = true;
		}
	}
	if (isShow) {
		$('#refuse_apply_btn').show();
		$('#refuse_apply_btn').unbind("click"); //移除click
		$('#refuse_apply_btn').click(function() {
			//界面传递数据
			var reqData = {
				name: 'refuse_application.html',
				jsonData: {
					orderNo: orderNo, //订单编号，开单时还没有处方编号
					orderType: orderType
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
				console.log('拒绝申请界面返回：' + APP.json2Str(data));
			});
		});
	} else {
		$('#refuse_apply_btn').hide();
	}
}
/**
 * 渲染医师提交给药师审核按钮的事件
 * @param {Object} order
 */
function initDoctorCommitCheckBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果订单状态协助完成、订单类型是申请协助、当前登录用户是开单的医生，则可操作
	if (order.status == OrderState.STATE_16_ASSIT_OVER && order.orderType == OrderType.TYPE_OUTPATIENT_ASSIST) {
		if (APP.userInfo.userType == UserType.DZCF_DOCTOR && APP.userInfo.userAccount == order.doctorAccount) {
			var isShow = true;
		}
	}
	if (isShow) {
		$('#doctor_commit_check_btn').show();
		$('#doctor_commit_check_btn').unbind("click"); //移除click
		$('#doctor_commit_check_btn').click(function() {
			APP.showConfirmDialog('申请审核', '您确定要将该订单申请审核吗？', function() {
				//确定按钮回调函数
				var bodyData = {
					orderNo: orderNo,
					flag: '8'
				}
				APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
					if (data.code == '0') { //成功
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
						APP.finishH5(); //结束当前的界面
					} else if (data.code == '1') { //订单被取消，不能继续操作
						APP.showToast('订单已经被取消');
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					}
				});
			});

		});
	} else {
		$('#doctor_commit_check_btn').hide();
	}
}
/**
 * 渲染打印处方按钮的事件
 * @param {Object} order
 */
function initPrintBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果是模式A订单/申请开处方订单、dtc，状态是待取药/成功状态，当前用户是开单销售员，则可打印
	if (order.orderType == OrderType.TYPE_DRUGSTORE_ASSIST || order.orderType == OrderType.TYPE_DTC) {
		if (order.status == OrderState.STATE_9_PHRA_OK || order.status == OrderState.STATE_10_EPORDER_SUCCESS) {
			if (APP.userInfo.userType == UserType.DZCF_SALESMAN && APP.userInfo.userAccount == order.salesmanAccount) {
				var isShow = true;
			}
		}
	}
	if (isShow) {
		$('#print_btn').show();
		$('#print_btn').unbind("click"); //移除click
		$('#print_btn').click(function() {
			var bodyData = {
				orderNo: order.orderNo
			}
			APP.getData('/hrs/servlet/padSaveOrderNoToPt', bodyData, function(data) {
				APP.showToast('打印操作指令成功发出');
				APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
			}, true);
		});
	} else {
		$('#print_btn').hide();
	}
}
/**
 * 渲染协助终止之后重新申请协助 按钮的事件
 * @param {Object} order
 */
function initAnewHelpBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果是申请协助订单，状态是协助终止状态，当前用户是开单医生，则可操作
	if (order.orderType == OrderType.TYPE_OUTPATIENT_ASSIST) {
		if (order.status == OrderState.STATE_15_ASSIT_STOP) {
			if (APP.userInfo.userType == UserType.DZCF_DOCTOR && APP.userInfo.userAccount == order.doctorAccount) {
				var isShow = true;
			}
		}
	}
	if (isShow) {
		$('#anew_help_btn').show();
		$('#anew_help_btn').unbind("click"); //移除click
		$('#anew_help_btn').click(function() {
			var bodyData = {
				orderNo: order.orderNo,
				flag: '9'
			}
			APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
				if (data.code == '0') { //成功
					APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					APP.finishH5(); //结束当前的界面
				} else if (data.code == '1') { //订单被取消，不能继续操作
					APP.showToast('订单已经被取消');
					APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
				}
			}, true);
		});
	} else {
		$('#anew_help_btn').hide();
	}
}
/**
 * 渲染“重新提交”按钮的事件
 * @param {Object} order
 */
function initAnewCommitBtn(order) {
	if(readOnly){
		return;
	}
	//dtc订单，不能重新提交
	if(order.orderType==OrderType.TYPE_DTC){
		return;
	}
	
	var isShow = false;
	//如果订单是成功或取消或超时等订单终止状态，则可操作
	if (order.status == OrderState.STATE_2_EPORDER_TIMEOUT 
		|| order.status == OrderState.STATE_5_DC_REFUSE_END
		|| order.status == OrderState.STATE_10_EPORDER_SUCCESS
		|| order.status == OrderState.STATE_11_EPORDER_CANCEL
		|| order.status == OrderState.STATE_12_PHRA_REFUSE_END) {
		//判断订单来源
		var orderSource=OrderType.getOrderSource(order.orderType);
		console.log('orderSource:'+orderSource);
		if(orderSource=='1'){//来源药店
			if(APP.userInfo.userAccount == order.salesmanAccount){
				var isShow = true;
			}
		}else if(orderSource=='2'){//来源医院
			if(APP.userInfo.userAccount == order.doctorAccount){
				var isShow = true;
			}
		}
	}
	if (isShow) {
		$('#anew_commit_btn').show();
		$('#anew_commit_btn').unbind("click"); //移除click
		$('#anew_commit_btn').click(function() {
			//界面传递数据
			var reqData = {
				name: 'create_order.html',
				jsonData: {
					orderType:orderType,//订单类型
					orderData: orderData //整个订单的数据
				}
			};
			APP.finishH5(false);//直接结束当前界面,先结束界面，再跳转至新界面
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
			});
		});
	} else {
		$('#anew_commit_btn').hide();
	}
}
/**
 * 渲染“确认收货”按钮的事件
 * @param {Object} order
 */
function initConfirmReceiptBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//如果订单是待收货状态，则可操作
	if (order.status == OrderState.STATE_19_WAIT_TAKE_DELIVER_GOODS ) {
		if(APP.userInfo.userType==UserType.DZCF_USER){//用户类型是普通用户
			isShow=true;
		}
	}
	if (isShow) {
		$('#confirm_receipt_btn').show();
		$('#confirm_receipt_btn').unbind("click"); //移除click
		$('#confirm_receipt_btn').click(function() {
			APP.showConfirmDialog('确认收货', '您确定要确认收货吗？', function() {
				//确定按钮回调函数
				var bodyData = {
					orderNo: order.orderNo,
				}
				APP.getData('/hrs/servlet/confirmReceiptOrderServlet', bodyData, function(data) {
					if (data.code == '0') { //成功
						APP.showToast('确认收货成功');
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					} else if (data.code == '1') { //订单被取消，不能继续操作
						APP.showToast('订单已经被取消');
						APP.notifyOrdersChange({orderNo:order.orderNo}); //发订单显示UI刷新通知
					}
				}, true);
				
				
			});
		});
	} else {
		$('#confirm_receipt_btn').hide();
	}
}
/**
 * 渲染“联系病人”按钮
 * @param {Object} order
 */
function initContactPatientBtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//订单是定模式A,申请开处方模式；当前登录用户是受理订单的医生，订单不是终止的状态
	if (order.orderType==OrderType.TYPE_DRUGSTORE_ASSIST) {
		if(APP.userInfo.userAccount==order.doctorAccount){
			if(!OrderState.isEndState(order.status)){//不是终止的状态
				isShow=true;
			}
		}
	}
	if (isShow) {
		$('#contactPatient_btn').show();
		$('#contactPatient_btn').unbind("click"); //移除click
		$('#contactPatient_btn').click(function() {
			//引导到聊天界面
			APP.chatWithSomebody(order.salesmanAccount, order.salesmanName, order.salesmanImgUrl, order.orderType, 
				order.status, order.orderNo, order.prescriptionId,order.drugStoreId,order.drugstoreName);
		});
	} else {
		$('#contactPatient_btn').hide();
	}
}
/**
 * 渲染“联系医师”按钮
 * @param {Object} order
 */
function initContactDoctorbtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//订单是定模式A,申请开处方模式；当前登录用户是开单的药店销售员，医师已经受理了订单，订单不是终止的状态
	if (order.orderType==OrderType.TYPE_DRUGSTORE_ASSIST) {
		if(APP.userInfo.userAccount==order.salesmanAccount && order.doctorAccount){
			if(!OrderState.isEndState(order.status)){//不是终止的状态
				isShow=true;
			}
		}
	}
	if (isShow) {
		$('#contactDoctor_btn').show();
		$('#contactDoctor_btn').unbind("click"); //移除click
		$('#contactDoctor_btn').click(function() {
			//引导到聊天界面
			APP.chatWithSomebody(order.doctorAccount, order.doctorName, order.doctorImgUrl, order.orderType, 
				order.status, order.orderNo, order.prescriptionId,order.drugStoreId,order.drugstoreName);
		});
	} else {
		$('#contactDoctor_btn').hide();
	}
}
/**
 * 渲染“联系医师”按钮
 * @param {Object} order
 */
function initContactMedicineManbtn(order) {
	if(readOnly){
		return;
	}
	var isShow = false;
	//当前登录用户是医师，而且是开处方的医师，药师已经受理了订单，订单不是终止的状态
	if (UserType.DZCF_DOCTOR==APP.userInfo.userType) {
		if(APP.userInfo.userAccount==order.doctorAccount && order.medicineAccount){
			if(!OrderState.isEndState(order.status)){//不是终止的状态
				isShow=true;
			}
		}
	}
	if (isShow) {
		$('#contactMedicineMan_btn').show();
		$('#contactMedicineMan_btn').unbind("click"); //移除click
		$('#contactMedicineMan_btn').click(function() {
			//引导到聊天界面
			APP.chatWithSomebody(order.medicineAccount, order.medicineName, order.medicineImgUrl, order.orderType, 
				order.status, order.orderNo, order.prescriptionId,order.drugStoreId,order.drugstoreName);
		});
	} else {
		$('#contactMedicineMan_btn').hide();
	}
}
/**
 * 渲染“查看药品”按钮
 * @param {Object} order
 */
function initViewDrugsBtn(order) {
	var isShow = false;
	if(order.druginfo && order.druginfo.length>0){
		isShow=true;
	}
	if (isShow) {
		$('#view_drugs_btn').show();
		$('#view_drugs_btn').unbind("click"); //移除click
		$('#view_drugs_btn').click(function() {
			//界面传递数据
			var reqData = {
				name: 'drug_information.html',
				jsonData: {
					orderType: order.orderType, 
					orderNo:order.orderNo,
					druginfo:order.druginfo//药品列表信息
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
				
			});
		});
	} else {
		$('#view_drugs_btn').hide();
	}
}

/**
 * 渲染处方区域
 * @param {Object} order
 */
function initViewPrescriptionArea(order){
	console.log('-----:'+order.prescriptionId);
	//如果是药师用户或者如果是到店处方-申请审处方模式，则不显示此区域
	if(APP.userInfo.userType==UserType.DZCF_MEDICINEMAN || order.orderType==OrderType.TYPE_DRUGSTORE){
		$('#view_prescription_area').hide();
		return;
	}else{
		$('#view_prescription_area').show();
	}
	
	if(order.prescriptionId){
		if(order.orderType==OrderType.TYPE_DTC){
			$('#view_prescription_title').html('点击查看处方笺');
		}else {
			$('#view_prescription_title').html('点击查看处方详情');
		}
		//判断是否有医师拒绝理由
		if(order.doctorRefuse){
			$('#doctorRefuse').html(order.doctorRefuse);
			$('#doctorRefuse_span').show();
		}else{
			$('#doctorRefuse_span').hide();
		}
		$('#has_prescription').show();
		$('#has_no_prescription').hide();
	}else{
		$('#has_prescription').hide();
		$('#has_no_prescription').show();
	}
	//点击“查看处方签”按钮事件
	$('#view_prescription').unbind("click"); //移除click
	$('#view_prescription').on('click', function() {
		if (APP.isAndroid() || APP.isIos()) {
			var htmlName='';
			if(orderType==OrderType.TYPE_DTC){
				htmlName='recipe_information_dtc.html';
			}else if(orderType==OrderType.TYPE_DRUGSTORE_ASSIST){
				htmlName='recipe_information_xiyao.html';
			}else if(orderType==OrderType.TYPE_OUTPATIENT || orderType==OrderType.TYPE_OUTPATIENT_ASSIST){
				htmlName='recipe_information_zhongyao.html';
			}
			//界面传递数据
			var reqData = {
				name: htmlName,
				jsonData: {
					readOnly: true, //只读
					prescriptionNo:order.prescriptionId//处方id
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
				
			});
		}
	});
}
/**
 * 渲染医生信息区域数据，dtc订单才看到
 * @param {Object} order
 */
function initDoctorInfoArea(order){
	if(order.orderType==OrderType.TYPE_DTC){
		$('#doctorName').html(order.doctorName);
		$('#doctorPhone').html(order.doctorPhone);
		$('#doctorPhone_incon').attr('href','tel:'+order.doctorPhone);
		$('#doctor_info_area').show();
		//点击“查看医生信息”按钮事件
		$('#view_doctorinfo').unbind("click"); //移除click
		$('#view_doctorinfo').on('click', function() {
			//界面传递数据
			var reqData = {
				name: 'doctor_information.html',
				jsonData: {
					doctorAccount: order.doctorAccount
				}
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
				
			});
		});
	}else{
		$('#doctor_info_area').hide();
	}
}
/**
 * 渲染条形码区域数据，dtc订单才看到
 * @param {Object} order
 */
function initBarCodeArea(order){
	if(order.orderType==OrderType.TYPE_DTC){
		$('#barCodeUrl').attr('src',order.barCodeUrl);
		$('#barCode_area').show();
		$('#barCodeUrl').unbind("click"); //移除click
		$('#barCodeUrl').click(function(){//预览图片
			var method = 'viewFile';
			var type ='image' ;
			var firstIndex = 0;
			var alts = new Array();
			var files = {
					url: order.barCodeUrl,
					urlSub: "",
					desc: ""
				};
			alts.push(files);
			//浏览图片的参数
			var params = {
				index: firstIndex,
				files: alts,
				type: type
			}
			APP.getViewFile(method, params);
		});
	}else{
		$('#barCode_area').hide();
	}
}
/**
 * 渲染收货信息，模式C订单才看到
 * @param {Object} order
 */
function initReceiverInfoArea(order){
	var isShow=false;
	if(order.orderType==OrderType.TYPE_OUTPATIENT || order.orderType==OrderType.TYPE_OUTPATIENT_ASSIST){
		//药师不能显示，医生和用户可以显示
		if(APP.userInfo.userType==UserType.DZCF_MEDICINEMAN){
			isShow=false;
		}else{
			isShow=true;
		}
	}
	if(isShow){
		$('#receiverName').html(order.receiverName);
		$('#receiverPhone').html(order.receiverPhone);
		$('#receiverAddress').html(order.receiverAddress);
		$('#receiver_info_area').show();
	}else{
		$('#receiver_info_area').hide();
	}
}
/**
 * 选药用药注意事项区域，模式C订单才看到
 * @param {Object} order
 */
function initUseDrugAttentionArea(order){
	if(order.orderType==OrderType.TYPE_OUTPATIENT || order.orderType==OrderType.TYPE_OUTPATIENT_ASSIST){
		$('#useDrugAttention').html(order.useDrugAttention);
		$('#useDrugAttention_area').show();
	}else{
		$('#useDrugAttention_area').hide();
	}
}

/**
 * 客户端原生方法调用页面js方法的对象
 */
NativeCallJs = {
	/**
	 * 刷新界面数据
	 */
	refreshData: function(data) {
		console.log('刷新界面数据.........data:'+APP.json2Str(data));
		//获取订单号
		if(data){
			if(data.orderNo){//如果有订单号，则判断订单号是否匹配，匹配则刷新界面数据
				var oNo=data.orderNo;
				if(orderNo==oNo){
					genPageData();//订单号匹配，则刷新界面数据
				}
			}else{
				genPageData();//无订单号，则刷新界面数据
			}
		}else{
			genPageData();//无订单号，则刷新界面数据
		}
	}
}