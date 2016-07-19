/* 
 * @Author: liangjie
 */
//###########全局变量
//###########全局变量end

$(document).ready(function() {
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(function() {
		//渲染订单类型状态下拉选择列表
		initOrderTypeMenuList();
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
 * 渲染订单类型状态下拉选择列表
 */
function initOrderTypeMenuList(){
	
	var html='';
	html+='<li val="">全部</li>';
	if(APP.userInfo.userType==UserType.DZCF_SALESMAN){
		//销售员
		if(APP.userPermissionInfo.sqkcfPermission){//申请开处方权限（药店模式  A）
			html+='<li val="1">申请开处方</li>';
		}
		if(APP.userPermissionInfo.sqscfPermission){//申请审处方权限（药店模式 A）
			html+='<li val="2">申请审处方</li>';
			
		}
		if(APP.userPermissionInfo.tjsfDtcPermission){//dtc订单提交审方的权限（药店
			html+='<li val="6" id="order_menu_6">到院处方</li>';
		}
	}else if(APP.userInfo.userType==UserType.DZCF_DOCTOR){
		//医师
		if(APP.userPermissionInfo.yskcfPermission){//医师开处方权限（药店模式 A）
			html+='<li val="1">申请开处方</li>';
		}
		if(APP.userPermissionInfo.xzbrkcfPermission){//协助别的医师开处方的权限（门诊模式 C 强森）
			html+='<li val="5">协助开处方</li>';
		}
		if(APP.userPermissionInfo.kcfPermission || APP.userPermissionInfo.xzkcfPermission){// 结算模式 协助模式
			html+='<li val="3">结算处方</li>';
		}
		if(APP.userPermissionInfo.kcfDtcPermission ){//开到院处方权限（门诊dtc模式-到院处方）
			html+='<li val="6" id="order_menu_6">到院处方</li>';
		}
	}
	$('.drugstoreSelect').html(html);
	//菜单点击事件
	$('.rightLi').click(function() {
		var _thisId=$(this).attr('id');
		console.log('_thisId:'+_thisId);
		//如果是院内院外下下拉列表点击
		/*if('hospitalIn_menu'==_thisId){
			//已选择的订单类型
			var orderType = $('#orderType').attr('val');
			if('6'!=orderType){
				//如果不是到院处方，则无法选择
				return;
			}
		}*/
		
		if ($(this).find('ul').css('display') == 'none') {
			$(this).find('ul').css('display', 'block')
			$(this).children('span').css('background-image', 'url(images/ic_up.png)');
		} else {
			$(this).find('ul').css('display', 'none')
			$(this).children('span').css('background-image', 'url(images/ic_down.png)');
		}
		if ($(this).siblings('.rightLi').find('ul').css('display') == 'block') {
			$(this).siblings('.rightLi').find('ul').css('display', 'none');
			$(this).siblings('.rightLi').children('span').css('background-image', 'url(images/ic_down.png)');
		}
	});
	//列表下拉框项点击事件
	$('.rightLi ul li').click(function() {
		$(this).css('color', '#65d0e4').siblings().css('color', '#000');
		var value = $(this).text();
		var val = $(this).attr('val'); //li 的val属性
		$(this).parent().prev('span').text(value);
		$(this).parent().prev('span').attr('val', val);
		console.log('val:'+val);
		var _orderType_id=$(this).parent().parent().attr('id');
		/*if(_orderType_id=='order_menu'){
			//订单类型-到院处方类型选择
			if(val!='6'){
				$('#hospitalIn').html('全部');
				$('#hospitalIn').attr('val','');
			}
		}*/
		//重新生成数据
		getDatas();
	});
}
/**
 * 生成整个界面的数据
 */
function genPageData() {
	var dataJsonStr = APP.getLocationParameter('data', '{}');
	console.log('get parameter->data:' + dataJsonStr);
	var date1 = new Date().addDate('M', -1).format('yyyy-MM-dd');
	console.log('上个月的今天的日期：' + date1);
	var date2 = new Date().format('yyyy-MM-dd');
	console.log('今天日期：' + date2);
	var dataJson = APP.str2Json(dataJsonStr);
	$('#startDate').html(date1);
	$('#endDate').html(date2);
	//默认先查询一个月时间的数据
	getDatas();

	//时间选择按钮
	$('#date_choose').click(function() {
	    //开始日期时间选择
		APP.chooseDate('选择开始时间', function(rspData) {
			console.log('开始日期选择结果：' + APP.json2Str(rspData));
			$('#startDate').html(rspData.result.timeStr);//选择的日期
			 //结束日期时间选择
            APP.chooseDate('选择结束时间', function(rspData) {
                console.log('结束日期选择结果：' + APP.json2Str(rspData));
                $('#endDate').html(rspData.result.timeStr);//选择的日期
                //时间选择完毕，重新获取数据
                getDatas();
            });
		});
	});
	/**
	 * 查看明细按钮点击事件
	 */
	$('#view_details').click(function(){
		var startDate = $('#startDate').html();
		var endDate = $('#endDate').html();
		var orderType = $('#orderType').attr('val');
		//var hospitalIn = $('#hospitalIn').attr('val');
		var hospitalIn='';//院内院外标志
		if(orderType=='6'){
			hospitalIn='2';//到院处方，只统计院内处方订单的数据
		}
		//界面传递数据
		var reqData = {
			name: 'order_data_detail',
			jsonData: {
				startDate: startDate,
				endDate: endDate,
				orderType: orderType,
				hospitalIn: hospitalIn
			}
		};
		RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
			
		});
	});
}
/**
 * 获取数据
 */
function getDatas() {
	var startDate = $('#startDate').html();
	var endDate = $('#endDate').html();
	var orderType = $('#orderType').attr('val');
	//var hospitalIn = $('#hospitalIn').attr('val');
	var hospitalIn='';//院内院外标志
	if(orderType=='6'){
		hospitalIn='2';//到院处方，只统计院内处方订单的数据
	}
	//订单类型
	var reqJSON = {
		startDate: startDate,
		endDate: endDate,
		orderType: orderType,
		hospitalIn: hospitalIn/////#######
	};
	APP.getData("/hrs/servlet/getDzcfOrderMoneyDatasByDoc", reqJSON, function(data) {
		if (data.result == '0') {
			var obj = data.obj;
			var html = '<tr><td>统计对象</td><td>订单个数</td><td>成交金额</td></tr>';
			html += '<tr><td>' + obj.doctorName + '</td><td>' + obj.rowCount + '</td><td>' + obj.totalMoney + '</td></tr>';
			$('#dataList').html(html);

		} else {
			//未能获取成功的数据
		}

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