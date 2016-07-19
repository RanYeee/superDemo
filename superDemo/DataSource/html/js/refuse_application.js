/**
 * 页面加载完执行
 */
$(document).ready(function() {
	//必须先初初始化APP的基本信息
	//订单号
	var orderNo = '';
	var flag = '';
	APP.init(function() {
		var dataJsonStr = APP.getLocationParameter('data', '{"orderNo":"08C6B160610155045218"}');
		console.log('get parameter->data:' + dataJsonStr);
		var dataJson = APP.str2Json(dataJsonStr);
		orderNo = dataJson.orderNo; //从json数据中获取订单号
		flag = dataJson.flag;

		if (!flag) {
			//flag,标志是医师拒绝申请还是药师拒绝申请，1：医师拒绝开处方申请 2：药师对处方审核不通过
			if (APP.userInfo.userType == UserType.DZCF_DOCTOR) {
				flag = '1';
			}
			if (APP.userInfo.userType == UserType.DZCF_MEDICINEMAN) {
				flag = '2';
			}
			//flag,标志是医师拒绝申请还是药师拒绝申请，1：医师拒绝开处方申请 2：药师对处方审核不通过
		}

		var info = "编辑"
		if (flag == '1' || flag == '2') {
			info = '拒绝申请';
		} else if (flag == '6') {
			info = '终止协助';
		}
		$('#opt_title').html(info);
	});

	/**
	 * "返回按钮"点击事件
	 */
	$('#opt_title').bind('click', function() {
		APP.finishH5();
	});

	/**
	 * 提交按钮事件
	 */
	$('#commit_btn').bind('click', function() {
		//拒绝理由
		var refuseReason = $('#refuseReason').val();
		refuseReason = $.trim(refuseReason);
		if (!refuseReason) {
			APP.showToast('请输入拒绝理由');
			return;
		}
		var doctorRefuse = '';
		var medicineManRefuse = '';
		//flag,标志是医师拒绝申请还是药师拒绝申请，1：医师拒绝开处方申请 2：药师对处方审核不通过
		if(flag=='1' || flag =='6'){
			doctorRefuse=refuseReason;
		}else{
			medicineManRefuse=refuseReason;
		}
		saveData(orderNo,flag,doctorRefuse,medicineManRefuse);

	});
	/**
	 * 保存数据
	 * @param {Object} orderNo
	 * @param {Object} flag
	 * @param {Object} doctorRefuse
	 * @param {Object} medicineManRefuse
	 */
	function saveData(orderNo,flag,doctorRefuse,medicineManRefuse){
			//调用接口
			var bodyData = {
				orderNo: orderNo,
				flag: flag,
				doctorRefuse: doctorRefuse,
				medicineManRefuse: medicineManRefuse
			}
			APP.getData('/hrs/servlet/operatePrescriptionOrder', bodyData, function(data) {
				if (data.code == '0') { //成功
					APP.showToast('操作成功');
				} else if (data.code == '1') { //订单被取消，不能继续操作
					APP.showToast('订单已经被取消');
				}
				APP.notifyOrdersChange({orderNo:orderNo});
				APP.finishH5();
			}, true);
	}


	/**
	 * 诊断输入框输入内容变化触发事件
	 */
	$('#refuseReason').bind('input', function() {
		var LenMax = 150; //长度限制
		var refuseReason = $('#refuseReason').val();
		refuseReason = $.trim(refuseReason);
		var len = refuseReason.length;
		//超出限制的长度，则截断
		if (len > LenMax) {
			refuseReason = refuseReason.substring(0, LenMax);
			$('#refuseReason').val(refuseReason);
			len = refuseReason.length;
		}
		//console.log('诊断输入框输入内容长度：'+len);
		$('#refuseReason_words').html(len);
	});
});