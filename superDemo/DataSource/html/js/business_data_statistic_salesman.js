/* 
 * @Author: liangjie
 */
//###########全局变量
//###########全局变量end

$(document).ready(function() {
	
	$('.rightLi').click(function(){
		if ($(this).find('ul').css('display')=='none') {
			$(this).find('ul').css('display','block')
			$(this).children('span').css('background-image','url(images/ic_up_white.png)');
		}else{
			$(this).find('ul').css('display','none')
			$(this).children('span').css('background-image','url(images/ic_down_white.png)');
		}
		if($(this).siblings('.rightLi').find('ul').css('display')=='block'){
			$(this).siblings('.rightLi').find('ul').css('display','none');
			$(this).siblings('.rightLi').children('span').css('background-image','url(images/ic_down_white.png)');
		}
	});
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(function() {
		//根据用户权限生成可统计的订单类型列表
		genOrderTypeMenuList();
		//渲染下拉列表的点击事件
		initMenuListClick();
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
 * 根据用户权限生成可统计的订单类型列表
 */
function genOrderTypeMenuList(){
	var html='';
	if(APP.userPermissionInfo.sqkcfPermission){//申请开处方权限（药店模式  A）
		html+='<li val="1">申请开处方</li>';
	}
	if(APP.userPermissionInfo.sqscfPermission){//申请审处方权限（药店模式 A）
		html+='<li val="2">申请审处方</li>';
		
	}
	if(APP.userPermissionInfo.tjsfDtcPermission){//dtc订单提交审方的权限（药店销售员或药店管理员具有到店模式的权限才拥有此权限
		html+='<li val="6">到院处方</li>';
	}
	
	$('#orderTypeList').html(html);
	//获取订单类型列表的第一个，并放置到默认的选择的菜单中
	$('#orderTypeList li').each(function(){
		var i=$(this).index();
		if(i==0){//第一个li代表的订单类型放置到默认中
			var defaultType=$(this).attr('val');
			var defaultName=$(this).html();
			$('#orderType').html(defaultName);
			$('#orderType').attr('val',defaultType);
			//关联医院或药店的下拉列表是否显示
			if(defaultType=='3'){//协助开处方
				$('#hosdrug_menu').show();
			}else if(defaultType=='1'){//申请开处方
				$('#hosdrug_menu').show();
			}else{
				$('#hosdrug_menu').hide();
			}
		}
	});
}

/**
 * 渲染下拉列表的点击事件
 */
function initMenuListClick(){
	$('.rightLi ul li').unbind("click"); //移除click
	$('.rightLi ul li').click(function(){
		$(this).css('color','#65d0e4').siblings().css('color','#000');
		var value = $(this).text();
		var val=$(this).attr('val');
		$(this).parent().prev('span').text(value);
		$(this).parent().prev('span').attr('val',val);
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
}
/**
 * 获取数据
 */
function getDatas() {
	var startDate = $('#startDate').html();
	var endDate = $('#endDate').html();
	var orderType = $('#orderType').attr('val');
	//订单类型
	var reqJSON = {
		startDate: startDate,
		endDate: endDate,
		orderType: orderType
	};
	APP.getData("/hrs/servlet/getPrescriptionOrderStatisticsByDrugStore", reqJSON, function(data) {
		if (data.result == '0') {
			var obj=data.obj;
			if(orderType==OrderType.TYPE_DRUGSTORE_ASSIST){//申请开处方类型
				var html=''
					+'<tr>'
					+'	<td colspan="3"><span>提交申请<span style="float: right;">'+obj.totalCount+'</span></span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>医师拒绝开处方</span></td>'
					+'	<td><span id="">'+obj.ysjjkcfCount+'</span></td>'
					+'	<td><span>销售员取消</span></td>'
					+'	<td><span>'+obj.ssyqsddCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>申请开处方超时</span></td>'
					+'	<td><span>'+obj.sqkcfcsCount+'</span></td>'
					+'	<td><span>医师处理超时</span></td>'
					+'	<td><span>'+obj.yisclcsCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>申请审处方超时</span></td>'
					+'	<td><span>'+obj.sqscfcsCount+'</span></td>'
					+'	<td><span>药师处理超时</span></td>'
					+'	<td><span>'+obj.yaosclcsCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>取药超时</span></td>'
					+'	<td><span>'+obj.qycsCount+'</span></td>'
					+'	<td><span>订单成功</span></td>'
					+'	<td><span>'+obj.ddcgCount+'</span></td>'
					+'</tr>';
					$('#data_table').html(html);
			}else if(orderType==OrderType.TYPE_DRUGSTORE){//申请审处方类型
				var html=''
					+'<tr>'
					+'	<td colspan="3"><span>提交申请<span style="float: right;">'+obj.totalCount+'</span></span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>销售员取消</span></td>'
					+'	<td><span id="">'+obj.ssyqsddCount+'</span></td>'
					+'	<td><span>申请审处方超时</span></td>'
					+'	<td><span>'+obj.sqscfcsCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>药师处理超时</span></td>'
					+'	<td><span>'+obj.yaosclcsCount+'</span></td>'
					+'	<td><span>药师审核不通过</span></td>'
					+'	<td><span>'+obj.ysshbtgCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>订单成功</span></td>'
					+'	<td colspan="3"><span>'+obj.ddcgCount+'</span></td>'
					+'</tr>';
					$('#data_table').html(html);
			}else if(orderType==OrderType.TYPE_DTC){//到院处方
				var html=''
					+'<tr>'
					+'	<td colspan="3"><span>销售员已处理<span style="float: right;">'+obj.totalCount+'</span></span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>销售员取消</span></td>'
					+'	<td><span id="">'+obj.ssyqsddCount+'</span></td>'
					+'	<td><span>申请审处方超时</span></td>'
					+'	<td><span>'+obj.sqscfcsCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>药师处理超时</span></td>'
					+'	<td><span>'+obj.yaosclcsCount+'</span></td>'
					+'	<td><span>医师修改处方超时</span></td>'
					+'	<td><span>'+obj.yisclcsCount+'</span></td>'
					+'</tr>'
					+'<tr>'
					+'	<td><span>取药超时</span></td>'
					+'	<td><span>'+obj.qycsCount+'</span></td>'
					+'	<td><span>订单成功</span></td>'
					+'	<td><span>'+obj.ddcgCount+'</span></td>'
					+'</tr>';
					$('#data_table').html(html);
			}
			
			
			
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