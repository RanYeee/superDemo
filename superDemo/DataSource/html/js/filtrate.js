/*
 * {
 * 	 timeStart
 * 	 timeEnd
 * 	 orderType
 * 	 orderState
 *   orderClose
 * }
 * 
 * @Author: liaowl
 */
$(document).ready(function() {
	APP.init(Filtrale);

});

function Filtrale() {
	var allType = [];
	allType.push({
		id: "type1",
		name: "全部",
		filter: ""
	});
	allType.push({
		id: "type2",
		name: "申请开处方",
		filter: formatQueryParmas(OrderType.TYPE_DRUGSTORE_ASSIST)
	});
	allType.push({
		id: "type3",
		name: "申请审处方",
		filter: formatQueryParmas(OrderType.TYPE_DRUGSTORE)

	});
	allType.push({
		id: "type4",
		name: "协助开处方",
		filter: formatQueryParmas(OrderType.TYPE_ASSIST_OTHERS_EPORDER)
	});
	allType.push({
		id: "type5",
		name: "结算处方",
		filter: formatQueryParmas(OrderType.TYPE_OUTPATIENT)
	});
	allType.push({
		id: "type6",
		name: "申请协助",
		filter: formatQueryParmas(OrderType.TYPE_OUTPATIENT_ASSIST)
	});
	allType.push({
		id: "type7",
		name: "到院处方",
		filter: formatQueryParmas(OrderType.TYPE_DTC)
	});

	var allState = [];
	allState.push({
		id: "state1",
		name: "全部",
		filter: ""
	});
	allState.push({
		id: "state2",
		name: "待处理",
		filter: formatQueryParmas(1)
	});
	allState.push({
		id: "state3",
		name: "开处方",
		filter: formatQueryParmas(3, 7, 20)
	});
	allState.push({
		id: "state4",
		name: "申请审方",
		filter: formatQueryParmas(20)
	});
	allState.push({
		id: "state5",
		name: "审核处方",
		filter: formatQueryParmas(4, 6, 8)
	});
	allState.push({
		id: "state6",
		name: "等待取药",
		filter: formatQueryParmas(9)
	});
	allState.push({
		id: "state7",
		name: "待结算",
		filter: formatQueryParmas(17)
	});
	allState.push({
		id: "state8",
		name: "待发货",
		filter: formatQueryParmas(18)
	});
	allState.push({
		id: "state9",
		name: "待收货",
		filter: formatQueryParmas(19)
	});
	allState.push({
		id: "state10",
		name: "订单成功",
		filter: formatQueryParmas(10)
	});
	allState.push({
		id: "state11",
		name: "订单关闭",
		filter: formatQueryParmas(5, 12, 2, 11)
	});
	allState.push({
		id: "state12",
		name: "待协助",
		filter: formatQueryParmas(13)
	});
	allState.push({
		id: "state13",
		name: "协助中",
		filter: formatQueryParmas(14)
	});
	allState.push({
		id: "state14",
		name: "协助终止",
		filter: formatQueryParmas(15)
	});
	allState.push({
		id: "state15",
		name: "协助完成",
		filter: formatQueryParmas(16)
	});
	//type=
	allState.push({
		id: "state16",
		name: "协助中",
		filter: "1"
	});
	allState.push({
		id: "state17",
		name: "协助终止",
		filter: "3"
	});
	allState.push({
		id: "state18",
		name: "协助完成",
		filter: "2"
	});

	var allClose = []
	allClose.push({
		id: "close1",
		name: "全部",
		filter: ""
	});
	allClose.push({
		id: "close2",
		name: "订单超时",
		filter: "1"
	});
	allClose.push({
		id: "close3",
		name: "订单取消",
		filter: "2"
	});
	allClose.push({
		id: "close4",
		name: "医师拒绝申请",
		filter: "3"
	});
	allClose.push({
		id: "close5",
		name: "药师拒绝申请",
		filter: "4"
	});

	/**
	 * 初始化类型数组
	 */
	function initType() {
		var arr = [];
		arr.push(allType[0]);
		if(APP.userPermissionInfo.sqkcfPermission || APP.userPermissionInfo.yskcfPermission 
			|| APP.userPermissionInfo.ysscfPermission){
			arr.push(allType[1]);//申请开处方
		}
		if(APP.userPermissionInfo.sqscfPermission || APP.userPermissionInfo.ysscfPermission){
			arr.push(allType[2]);//申请审处方
		}
		if(APP.userPermissionInfo.xzbrkcfPermission){
			arr.push(allType[3]);//协助开处方
		}
		if(APP.userPermissionInfo.kcfPermission || APP.userPermissionInfo.ysscfPermission){
			arr.push(allType[4]);//结算处方
		}
		if(APP.userPermissionInfo.xzkcfPermission || APP.userPermissionInfo.ysscfPermission){
			arr.push(allType[5]);//申请协助
		}
		if(APP.userPermissionInfo.kcfDtcPermission || APP.userPermissionInfo.ysscfPermission ||
			APP.userInfo.isDrugStoreSalesMan()){
				arr.push(allType[6]);//到院处方
		};
		return arr;
	}

	/**
	 * 初始化状态数组
	 * @param {Object} typeItem
	 */
	function initState(typeItem) {
		var arr = [];
		arr.push(allState[0]);
		if (typeItem.filter.contains(OrderType.TYPE_DTC)) {
			arr.push(allState[2]);
			arr.push(allState[3]);
			arr.push(allState[4]);
			arr.push(allState[5]);
			arr.push(allState[9]);
			arr.push(allState[10]);
		} else if (typeItem.filter.contains(OrderType.TYPE_ASSIST_OTHERS_EPORDER)) {
			arr.push(allState[15]);
			arr.push(allState[16]);
			arr.push(allState[17]);
		} else if (typeItem.filter.contains(OrderType.TYPE_DRUGSTORE)) {
			arr.push(allState[1]);
			arr.push(allState[4]);
			arr.push(allState[9]);
			arr.push(allState[10]);
		} else if (typeItem.filter.contains(OrderType.TYPE_DRUGSTORE_ASSIST)) {
			arr.push(allState[1]);
			arr.push(allState[2]);
			arr.push(allState[4]);
			arr.push(allState[5]);
			arr.push(allState[9]);
			arr.push(allState[10]);
		} else if (typeItem.filter.contains(OrderType.TYPE_OUTPATIENT)) {
			arr.push(allState[2]);
			arr.push(allState[4]);
			arr.push(allState[6]);
			arr.push(allState[7]);
			arr.push(allState[8]);
			arr.push(allState[9]);
			arr.push(allState[10]);
		} else if (typeItem.filter.contains(OrderType.TYPE_OUTPATIENT_ASSIST)) {
			arr.push(allState[2]);
			arr.push(allState[6]);
			arr.push(allState[7]);
			arr.push(allState[8]);
			arr.push(allState[11]);
			arr.push(allState[12]);
			arr.push(allState[13]);
			arr.push(allState[14]);
			arr.push(allState[9]);
			arr.push(allState[10]);
		}
		return arr;
	}

	/**
	 * 初始化关闭数组
	 * @param {Object} typeItem
	 */
	function initClose(typeItem) {
		var arr = [];
		arr.push(allClose[0]);
		arr.push(allClose[1]);
		arr.push(allClose[2]);
		if (typeItem.filter.contains(OrderType.TYPE_DRUGSTORE_ASSIST)) arr.push(allClose[3]);
		if (typeItem.filter.contains(OrderType.TYPE_DRUGSTORE)) arr.push(allClose[4]);
		return arr;
	}

	/**
	 * 根据JSON初始化
	 * @param {Object} init
	 */
	function initData(init) {
		mStartTime = init.start;
		mEndTime = init.end;
		if (init.typeId) {
			mTypeItem = chooseItem(typeArr, init.typeId);
			stateArr = initState(mTypeItem);
		}
		if (init.stateId) {
			mStateItem = chooseItem(stateArr, init.stateId);
		}
		if (init.closeId) {
			closeArr = initClose(mTypeItem);
			mCloseItem = chooseItem(closeArr, init.closeId);
		}
	}

	var mStartTime = new Date().addDate('M', -1).format("yyyy-MM-dd");
	var mEndTime = new Date().format("yyyy-MM-dd");
	var typeArr = initType();
	var stateArr;
	var closeArr;
	var mTypeItem;
	var mStateItem;
	var mCloseItem;

	var data = APP.getLocationParameter('data', undefined);
	if (data) {
		var init = APP.str2Json(data);
		initData(init);
	}
	//	else{
	////		{"start":"2016-05-04","end":"2016-06-04","type":"3","typeId":"type5","state":"(5,12,2,11)","stateId":"state11","close":"1","closeId":"close2"}
	//		var init = {
	//			start:'2015-05-01',
	//			end:'2015-10-01',
	//			typeId:'type5',
	//			stateId:'state11',
	//			closeId:'close2'
	//		}
	//		initData(init);
	//	}
	if (!mTypeItem) mTypeItem = typeArr[0];
	if (!stateArr) stateArr = initState(mTypeItem);
	if (!mStateItem) mStateItem = stateArr[0];

	refreshTimeUI(mStartTime, mEndTime);
	$('#closeCase').addClass('none');
	$('.headBack.fl').click(function() {
		APP.finishH5();
	});

	$('.fr').click(function() {
		var mStartTemp;
		var mEndTemp;
		APP.chooseDate("选择开始时间", function(rspData) {
			if (rspData.result && rspData.result.timeStr) {
				mStartTemp = rspData.result.timeStr;
				APP.chooseDate("选择结束时间", function(rspData) {
					if (rspData.result && rspData.result.timeStr) {
						mEndTemp = rspData.result.timeStr;
						console.log("检验时间有效性, " + mStartTemp + " | " + mEndTemp);
						if (checkTimeRule(mStartTemp, mEndTemp)) {
							mStartTime = mStartTemp;
							mEndTime = mEndTemp;
							refreshTimeUI(mStartTime, mEndTime);
						}
					}
				});
			}
		});
	})

	//初始化类型选择面板
	initChoosePanel($("#typePanel"), typeArr, mTypeItem, chooseTypeView);
	initChoosePanel($("#statePanel"), stateArr, mStateItem, chooseStateView);
	if (mCloseItem) initChoosePanel($("#closePanel"), closeArr, mCloseItem, chooseCloseView)
	if (!mCloseItem) {
		$("#closeRoot").hide();
		$("#closePanel").html("");
	}
	$("#resetFilter").click(chooseResetAll);
	$("#okFilter").click(chooseOK);
	/**
	 * 初始化选择面板
	 * @param {Object} $choosePanel
	 * @param {Object} itemArr
	 * @param {Object} itemChoosed
	 * @param {Object} click
	 */
	function initChoosePanel($choosePanel, itemArr, itemChoosed, click) {
		$choosePanel.html("");
		for (var i = 0; i < itemArr.length; i++) {
			var item = itemArr[i];
			$choosePanel.append($('<li></li>').attr('id', item.id)
				.html(item.name)
				.click(click)); //设置点击事件
		}
		if (itemChoosed) {
			$('#' + itemChoosed.id).addClass('active');
		}
	}

	//获取点击事件回调，拿到 对应被点击元素的ID
	function chooseTypeView() {
		var $e = $(this);
		var id = $e.attr('id');
		if (mTypeItem && mTypeItem.id == id) {
			return;
		}
		if (mTypeItem && mTypeItem.id != id) {
			$('#' + mTypeItem.id).removeClass('active');
		}
		mTypeItem = chooseItem(allType, id);
		$e.addClass('active')
			//重新初始化状态面板
		stateArr = initState(mTypeItem);
		mStateItem = stateArr[0];
		initChoosePanel($("#statePanel"), stateArr, mStateItem, chooseStateView);
		//重新初始化关闭面板
		$("#closeRoot").hide();
		$("#closePanel").html("");
		mCloseItem = undefined;
	}

	function chooseStateView() {
		var $e = $(this);
		var id = $e.attr('id');
		if (mStateItem && mStateItem.id == id) {
			return;
		}
		if (mStateItem && mStateItem.id != id) {
			$('#' + mStateItem.id).removeClass('active');
		}
		mStateItem = chooseItem(allState, id);
		$e.addClass('active');
		//重新初始化关闭面板
		if (mStateItem.name == "订单关闭") {
			$("#closeRoot").show();
			closeArr = initClose(mTypeItem);
			mCloseItem = closeArr[0];
			initChoosePanel($("#closePanel"), closeArr, mCloseItem, chooseCloseView)
		} else {
			$("#closeRoot").hide();
			$("#closePanel").html("");
			mCloseItem = undefined;
		}

	}

	function chooseCloseView() {
		var $e = $(this);
		var id = $e.attr('id');
		if (mCloseItem && mCloseItem.id == id) {
			return;
		}
		if (mCloseItem && mCloseItem.id != id) {
			$('#' + mCloseItem.id).removeClass('active');
		}
		mCloseItem = chooseItem(allClose, id);
		$e.addClass('active')
	}

	/**
	 * 根据id查询数组
	 * @param {Object} arr
	 * @param {Object} id
	 */
	function chooseItem(arr, id) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id == id) {
				return arr[i];
			}
		}
		return undefined;
	}

	/**
	 * 重置
	 */
	function chooseResetAll() {
		mStartTime = new Date().addDate('M', -1).format("yyyy-MM-dd");
		mEndTime = new Date().format("yyyy-MM-dd");
		refreshTimeUI(mStartTime, mEndTime);
		$("#" + typeArr[0].id).trigger("click");
	}

	/**
	 * 获取结果
	 */
	function chooseOK() {
		var result = {};
		result['start'] = mStartTime;
		result['end'] = mEndTime;
		result['type'] = mTypeItem.filter;
		result['typeId'] = mTypeItem.id;
		result['state'] = mStateItem.filter;
		result['stateId'] = mStateItem.id;
		if (mCloseItem) {
			result['close'] = mCloseItem.filter;
			result['closeId'] = mCloseItem.id;
		}
		console.log(JSON.stringify(result));
		APP.finishH5WithData("filtrate.html", result, function() {});
	}

	/**
	 * 验证时间合法性
	 * @param {Object} start
	 * @param {Object} end
	 */
	function checkTimeRule(start, end) {
		console.log("检验时间有效性, " + start + " | " + end);
		var datestart = new Date(start.replace(/-/g, "/"));
		var dateend = new Date(end.replace(/-/g, "/"));
		if (dateend < datestart) {
			APP.showToast("开始时间不能早于结束时间")
			return false;
		}
		return true;
	}

	/**
	 * 更新时间UI
	 * @param {Object} start
	 * @param {Object} end
	 */
	function refreshTimeUI(start, end) {
		$('.starttime').html(start);
		$('.endtime').html(end);
	}

	/**
	 * 格式化参数
	 * @param {Object} arr
	 */
	function formatQueryParmas() {
		var result = "";
		if (arguments.length > 0) {
			result += "(";
			for (var i = 0; i < arguments.length; i++) {
				result += "'" + arguments[i] + "'";
				if (i < arguments.length - 1) {
					result += ",";
				}
			}
			result += ")";
		}
		return result;
	}
}