/* 
 * @Author: liaowl
 */
/**
 * 客户端原生方法调用页面js方法的对象
 */
NativeCallJs = {};

$(document).ready(function() {
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(Recipe);

});

/**
 * 主业务 
 */
function Recipe() {

	//代表启动参数
	var prescriptionInitJson;
	//代表当前业务数据
	var isRemote = false; //是否是远程处方
	var isRemoteReadOnly = false; //查看远程处方
	var prescriptionId = ''; //远程处方ID
	var prescriptionJson; //本地处方JSON
	//获取初始数据	
	var data = APP.getLocationParameter('data', undefined);
	if (data) {
		prescriptionInitJson = APP.str2Json(data);
		prescriptionId = prescriptionInitJson.prescriptionNo;
		prescriptionJson = prescriptionInitJson.prescription;
		if(prescriptionInitJson.readOnly){
			if(prescriptionInitJson.readOnly === 'true'){
				isRemoteReadOnly = true;
			}else if(prescriptionInitJson.readOnly === 'false'){
				isRemoteReadOnly = false;
			}else{
				isRemoteReadOnly = prescriptionInitJson.readOnly;
			}
        }
        if(prescriptionInitJson.bReadOnly){
            isRemoteReadOnly = prescriptionInitJson.bReadOnly;
        }
		if (!isRemoteReadOnly) isRemoteReadOnly = false;
		if (prescriptionId) isRemote = true;
	} else {
		//		prescriptionId = 'BAAC1160123143803336';//中药
		prescriptionId = '08C6B160602202432015'; //西药
//		prescriptionId = '85BE1160607202311486';//DTC
		isRemote = true;
		isRemoteReadOnly = false;
	}

	//初始化UI
	$(".headBack.fl").click(function() {
		APP.finishH5();
	});
	$(".lefeBtn.fl").click(function() {
		APP.finishH5();
	});

	if (isRemote) { //如果是远程处方，则从接口查询处方数据
		getRemotePrescription();
	} else { //本地处方，则从传递的参数获取处方数据
		displayRemoteTitle(prescriptionJson); //标题栏
		displayRemoteHead();
		displayRemoteBody();
		displayRemoteTail(); //处方签尾部
		displayRemoteDoor(); //悬浮按钮
	}
	
	NativeCallJs.refreshData = function(data){
		if(!isRemote){//如果是远程处方
			return;
		}
		if(data.orderNo && prescriptionJson.orderNo && prescriptionJson.orderNo != data.orderNo){
			return;
		}
		getRemotePrescription();
	}

	//获取远程处方数据
	function getRemotePrescription() {
		//订单类型
		var reqJSON = {
			"prescriptionId": prescriptionId
		};
		APP.getData("/hrs/servlet/getPrescriptionDetail", reqJSON, function(data) {
			if (data.result == '0') {
				prescriptionJson = data.prescription;
				if(prescriptionJson.orderNo){
					APP.resetOrderTimeOut("", prescriptionJson.orderNo, 
						prescriptionJson.orderType, prescriptionJson.status);
				}
				displayRemoteTitle(prescriptionJson); //标题栏
				displayRemoteHead();
				displayRemoteBody();
				displayRemoteTail(); //处方签尾部
				displayRemoteDoor(); //悬浮按钮
			}
		}, true);
	}

	//远程受理订单
	function getRemoteAcceptPrescription() {
		APP.checkMedicalWorkerSign(function(rspData) {
			if (rspData.result && rspData.result.signInfo) {
				var signInfo = rspData.result.signInfo; //签名
				//确定按钮回调函数
				var bodyData = {
					orderNo: prescriptionJson.orderNo,
					flag: '2',
					medicineManAccount: APP.userInfo.userAccount,
					medicineManSign: signInfo
				}
				APP.getData('/hrs/servlet/acceptPrescriptionOrder', bodyData, function(data) {
					console.log("显示头部-受理: " + JSON.stringify(data));
					if (data.code == '1') { //受理成功
						APP.showToast("受理成功");
					} else if (data.code == '2') { //已受理
						APP.showToast('受理失败，订单已经被其他药师受理');
						APP.finishH5();
					} else if (data.code == '3') { //已取消
						APP.showToast('受理失败，订单已经被取消');
					} else if (data.code == '4') { //当前医师或药师已经有正在处理的订单，无法再受理此订单
						APP.showToast('受理失败，一次只能处理一个订单');
					} else {
						APP.showToast('受理失败，未知错误');
					}
					APP.notifyOrdersChange({orderNo:prescriptionJson.orderNo});
				}, true);
			}
		})
	}

	//远程操作订单
	function getRemoteChangePrescription(action) {
		//确定按钮回调函数
		var bodyData = {
			orderNo: prescriptionJson.orderNo,
			flag: action
		}
		APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
			console.log("显示头部-操作订单: " + JSON.stringify(data));
			if (data.result == "0") {
				if (data.code == "0") {
					APP.showToast("操作成功");
					APP.notifyOrdersChange({orderNo:prescriptionJson.orderNo});
					APP.finishH5();
				} else {
					APP.showToast("审核失败，订单已经被取消");
					APP.notifyOrdersChange({orderNo:prescriptionJson.orderNo});
					APP.finishH5();
				}
			} else {
				APP.showToast("订单操作失败, " + data.reason);
			}
		});
	}

	/**
	 * 显示处方头部
	 */
	function displayRemoteTitle(detail) {
		if (isRemoteReadOnly || !isRemote) { //如果本地，或者只读，都不可操作
			return;
		}
		var $title = $(".pd12.clearfix");
		$title.children(".handle.fr").remove();
		if (detail.status == OrderState.STATE_4_DC_OK) {
			var $accept = $('<a href="javascript:;" class="handle fr">受理</a>');
			$accept.click(function() {
				APP.showConfirmDialog("提示", "是否受理该订单", function() {
					getRemoteAcceptPrescription();
				});
			});
			$title.append($accept);
		} else if (detail.status == OrderState.STATE_6_PHRA_DEAL || detail.status == OrderState.STATE_8_DC_OK_REMAKE) {
			var $refuse = $('<a href="javascript:;" class="handle fr">拒绝申请</a>');
			$refuse.click(function() {
				var req = {
					name: 'refuse_application.html',
					jsonData: {
						orderNo: prescriptionJson.orderNo
					}
				}
				APP.requestH5ForData(req);
			});
			var $ok = $('<a href="javascript:;" class="handle fr">审核通过</a>');
			$ok.click(function() {
				APP.showConfirmDialog("提示", "是否确定审核通过该处方", function() {
					getRemoteChangePrescription("4");
				});
			});
			$title.append($ok);
			$title.append($refuse);
		}

	}

	/**
	 * 显示处方签头部信息
	 */
	function displayRemoteHead() {
		$(".no").html('NO.' + prescriptionJson.prescriptionNo + ' <span>普通处方</span>');
		$(".clinicName").html(prescriptionJson.prescriptionHead + '<span id="clinickImg"></span>');
		if(prescriptionJson.bllx){
			if(prescriptionJson.bllx == "1"){
				$("#blNoName").html("住院号");
			}else if(prescriptionJson.bllx == "2"){
				$("#blNoName").html("门诊号");
			}
		}
		$("#blNo").html(prescriptionJson.blNo);
		$("#blKs").html(prescriptionJson.blDepartment);
		$("#blBed").html(prescriptionJson.bedNo);
		$("#blName").html(prescriptionJson.patientName);
		$("#blSex").html(prescriptionJson.patientSex == '1' ? "男" : "女");
		$("#blAge").html(prescriptionJson.patientAge + prescriptionJson.patientAgeUnit);
		$("#blZDinfo").html(prescriptionJson.diagnoseDetail);
		$("#rpCount").html(prescriptionJson.drugCount);
		if (prescriptionJson.medicineManChecked && prescriptionJson.medicineManChecked == '1') {
			$("#clinickImg").show();
			$("#clinickImg").css('background-image', 'url('+prescriptionJson.hosCachet+')');
		} else {
			$("#clinickImg").hide();
		}
	}

	/**
	 * 显示处方签尾部
	 */
	function displayRemoteTail() {
		$('.endtime').html(prescriptionJson.creattime);
		/**
		 * 显示签名
		 * @param {Object} vid
		 * @param {Object} sign
		 */
		function showSignUI(vid, sign) {
			$("#" + vid).append("<img src='" + sign + "'/>")
			$("#" + vid + " img").click(function() {
				console.log("click");
				var img = {
					url: sign,
					urlSub: ""
				}
				var arr = new Array();
				arr[0] = img;
				var p = {
					index: 0,
					type: 'image',
					files: arr
				};
				APP.getViewFile('viewFile', p);
			});
		}
		$("#docImg").children("img").remove();
		$("#phrImg").children("img").remove();
		//签名
		showSignUI('docImg', prescriptionJson.doctorSign);
		//药师签名
		if (prescriptionJson.medicineManChecked &&
			prescriptionJson.medicineManChecked == '1' &&
			prescriptionJson.medicineManSign) {
			showSignUI('phrImg', prescriptionJson.medicineManSign);
		}
		//中药金额
		$("#price").html(prescriptionJson.totalMoney);
	}

	/**
	 * 显示悬浮窗口，跳转到聊天，订单详情
	 */
	function displayRemoteDoor() {
		//聊天按钮
		if (isRemoteReadOnly || !isRemote || prescriptionJson.status == OrderState.STATE_4_DC_OK ||
			OrderState.isEndState(prescriptionJson.status)) {
			console.log("关闭聊天");
			$('.contact').hide();
		} else {
			console.log("开启聊天");
			$('.contact').show();
			$('.contact').unbind("click"); 
			$('.contact').click(function() {
				APP.chatWithSomebody(prescriptionJson.doctorAccount, prescriptionJson.doctorName,
					prescriptionJson.doctorImgUrl, prescriptionJson.orderType, prescriptionJson.status, prescriptionJson.orderNo,
					function() {});
			});
		}
		//订单详情按钮
		if(isRemoteReadOnly || !isRemote){
			$(".other").hide();
		}else{
			$(".other").show();
			$('.other').unbind("click"); 
			$(".other").click(function() {
			var req = {
				name: "order_details.html",
				jsonData: {
					orderNo: prescriptionJson.orderNo,
					readOnly: "true"
				}
			};
			APP.requestH5ForData(req, function() {});
		});
		}
	}

	/**
	 * 显示远程处方主体
	 */
	function displayRemoteBody() {
		var type = prescriptionJson.orderType;
		if (OrderType.TYPE_DRUGSTORE_ASSIST == type) {
			displayRemoteXiyao();
		} else if (OrderType.TYPE_DTC == type) {
			displayRemoteDTC();
		} else if (OrderType.TYPE_DRUGSTORE == type) {
			displayRemoteNJdirect();
		} else {
			displayRemoteZhongyao();
		}
	}

	/**
	 * 远程西药
	 */
	function displayRemoteXiyao() {
		console.log("西药");
		var druglist = prescriptionJson.drugList;
		var $druglist = $(".Rpinfos ul");
		$druglist.children("li").remove();
		if (druglist) {
			for (var i = 0; i < druglist.length; i++) {
				var drug = druglist[i];
				var preName = drug.universalName == null ? drug.drugName : drug.universalName;
				var drugCount = drug.count + (drug.countUnit ? drug.countUnit : "");
				$druglist.append('<li><div class="drugName">' + (i + 1) + ' ' + preName + '(' + drug.drugName + ')</div><div class="drugDescription"><span>(' + drug.norms + '）*' + drugCount + '</span><span>' + drug.useage + '</span><span>' + drug.dosage + '</span></div></li>');
			}
		}
	}

	/**
	 * 显示远程中药
	 */
	function displayRemoteZhongyao() {
		console.log("中药");
		var $table = $("#drugTable");
		$table.html('');
		$table.append('<tr><th width="60%">药品名称</th><th width="20%">数量</th><th width="20%">单位</th></tr>');
		var list = prescriptionJson.drugList;
		if (list) {
			for (var i = 0; i < list.length; i++) {
				var drug = list[i];
				var preName = drug.universalName == null ? drug.drugName : drug.universalName;
				$table.append('<tr><td>' + preName + '(' + drug.drugName + ')</td><td>' + drug.count + '</td><td>' + drug.countUnit + '</td></tr>');
			}
		}

		$(".zy_yongfa").html('<br/>' + prescriptionJson.useDrugAttention);
	}

	/**
	 * 显示远程DTC处方
	 */
	function displayRemoteDTC() {
		console.log("西药DTC");
		var $table = $('.recipe_content');
		$table.children('.drugInfo').remove();
		var list = prescriptionJson.drugList;
		if (list) {
			for (var i = 0; i < list.length; i++) {
				var drug = list[i];
				var preName = drug.universalName == null ? drug.drugName : drug.universalName;
				var drugCount = drug.count + (drug.countUnit ? drug.countUnit : "");
				$table.append('<div class="drugInfo"> ' +
					'<span class="drugSpan">名称：<span class="mingcheng">' + preName + '(' + drug.drugName + ')</span></span>' +
					'<span class="drugSpan">规格：<span class="guige">' + drug.norms + '</span></span>' +
					'<span class="drugSpan">用法：<span class="yongfa">' + drug.useage + '</span></span>' +
					'<span class="drugSpan">用量：<span class="yongliang">' + drug.dosage + '</span></span>' +
					'<span class="drugSpan">总量：<span class="zongliang">' + drugCount + '</span></span></div>');
			}
		}
	}

	//判断页面
	function isUrlNameContains(tag) {
		var url = window.location.pathname;
		return url.indexOf(tag) > 0;
	}
	
}

