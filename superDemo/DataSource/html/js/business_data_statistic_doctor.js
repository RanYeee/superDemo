/* 
 * @Author: liangjie
 */
//###########全局变量
//###########全局变量end

$(document).ready(function() {
	
	$('.rightLi').click(function(){
		console.log('.rightLi click');
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
	if(APP.userPermissionInfo.yskcfPermission){//医师开处方权限（药店模式 A）
		html+='<li val="1">申请开处方</li>';
	}
	if(APP.userPermissionInfo.xzbrkcfPermission){//协助别的医师开处方的权限（门诊模式 C 强森）
		html+='<li val="3">协助开处方</li>';
		
	}
	if(APP.userPermissionInfo.kcfDtcPermission){//开到院处方权限（门诊dtc模式-到院处方）
		html+='<li val="4">到院处方</li>';
	}
	if(APP.userPermissionInfo.kcfPermission || APP.userPermissionInfo.xzkcfPermission){//申请协助开处方权限（门诊模式 C 强森）/协助别的医师开处方的权限（门诊模式 C 强森）
		html+='<li val="2">结算处方</li>';
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
	$('.rightLi ul li').click(function(event){
		console.log('.rightLi ul li click');
		if($(this).parent().css('display')=='block'){
			$(this).parent().css('display','none');
			$(this).parent().parent().children('span').css('background-image','url(images/ic_down.png)');
		}
		$(this).css('color','#65d0e4').siblings().css('color','#000');
		var value = $(this).text();
		var val=$(this).attr('val');
		$(this).parent().prev('span').text(value);
		$(this).parent().prev('span').attr('val',val);
		if($(this).parent().parent().attr('id')=='orderType_menu'){//订单类型下拉列表项点击
			//重新生成数据
			getDatas('2');
			if(val=='3'){//协助开处方
				$('#hosdrug_menu').show();
			}else if(val=='1'){//申请开处方
				$('#hosdrug_menu').show();
			}else{
				$('#hosdrug_menu').hide();
			}
		}else if($(this).parent().parent().attr('id')=='hosdrug_menu'){//药店/门诊下拉列表项点击
			//重新生成数据
			getDatas('3');
		}
		event.stopPropagation();//阻止事件往上冒泡
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
	//默认先查询一个月时间的数据，得根据订单类型查询关联的药店列表
	getDatas('2');
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
                getDatas('1');
            });
		});
	});
}

/**
 * 获取数据
 * @param {Object} opt 操作：1日期改变 2订单类型改变 3药店/门诊改变
 */
function getDatas(opt) {
	console.log('---获取数据--opt:'+opt);
	if(opt=='1' || opt=='3'){
		var startDate = $('#startDate').html();
		var endDate = $('#endDate').html();
		var type = $('#orderType').attr('val');
		var drugstoreId='';
		var hospitalId='';
		if(type=='3'){
			hospitalId=$('#hosdrug_name').attr('val');
		}else if(type=='1'){
			drugstoreId=$('#hosdrug_name').attr('val');
		}
		var reqJSON = {
			startDate: startDate,
			endDate: endDate,
			type: type,
			drugstoreId:drugstoreId,
			hospitalId:hospitalId
		};
		APP.getData('/hrs/servlet/getDzcfBusinessStatisticsByDoc',reqJSON,function(data){
			if (data.result == '0') {
				if(type=='1'){//申请开处方
					var list=data.list;
					var html='';
					for(var i=0;i<list.length;i++){
						var obj=list[i];
						html+=''
								+'<div class="all">'
								+'<h3>'+obj.drugStoreName+'</h3>'
								+'<div class="form clearfix">'
								+'	<table width="100%;">'
								+'		<tr>'
								+'			<td><span>已受理</span></td>'
								+'			<td><span>'+obj.yslCount+'</span></td>'
								+'			<td><span>已开处方</span></td>'
								+'			<td><span>'+obj.ykcfCount+'</span></td>'
								+'		</tr>'
								+'		<tr>'
								+'			<td><span>拒绝开处方</span></td>'
								+'			<td><span>'+obj.jjkcfCount+'</span></td>'
								+'			<td><span>处理超时</span></td>'
								+'			<td><span>'+obj.clcsCount+'</span></td>'
								+'		</tr>'
								+'		<tr>'
								+'			<td><span>取消订单</span></td>'
								+'			<td><span>'+obj.qxddCount+'</span></td>'
								+'			<td><span>修改处方</span></td>'
								+'			<td><span>'+obj.xgcfCount+'</span></td>'
								+'		</tr>'
								+'		<tr>'
								+'			<td><span>订单成功</span></td>'
								+'			<td ><span>'+obj.ddcgCount+'</span></td>'
								+'			<td><span></span></td>'
								+'			<td ><span></span></td>'
								+'		</tr>'
								+'	</table>'
								+'</div>';
					}
					$('#data_list').html(html);
				}else if(type=='3'){//协助开处方
					var list=data.list;
					var html='';
					for(var i=0;i<list.length;i++){
						var obj=list[i];
						html+=''
								+'<div class="all">'
								+'<h3>'+obj.hosName+'</h3>'
								+'<div class="form clearfix">'
								+'	<table width="100%;">'
								+'		<tr>'
								+'			<td><span>受理协助</span></td>'
								+'			<td><span>'+obj.total+'</span></td>'
								+'			<td><span>协助超时</span></td>'
								+'			<td><span>'+obj.xzcsCount+'</span></td>'
								+'		</tr>'
								+'		<tr>'
								+'			<td><span>终止协助</span></td>'
								+'			<td><span>'+obj.xzzzCount+'</span></td>'
								+'			<td><span>协助完成</span></td>'
								+'			<td><span>'+obj.xzwcCount+'</span></td>'
								+'		</tr>'
								+'	</table>'
								+'</div>';
					}
					$('#data_list').html(html);
				}else if(type=='2'){//结算处方
					var html='';
					var obj=data.obj;
					html+=''
							+'<div class="all">'
							+'<div class="form clearfix">'
							+'	<table width="100%;">'
							+'		<tr>'
							+'			<td><span>申请协助超时</span></td>'
							+'			<td><span>'+obj.sqxzcsCount+'</span></td>'
							+'			<td><span>协助中超时</span></td>'
							+'			<td><span>'+obj.xzcsCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>申请审处方超时</span></td>'
							+'			<td><span>'+obj.sqscfcsCount+'</span></td>'
							+'			<td><span>药师处理超时</span></td>'
							+'			<td><span>'+obj.ysclcsCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>修改处方超时</span></td>'
							+'			<td><span>'+obj.xgcfcsCount+'</span></td>'
							+'			<td><span>结算超时</span></td>'
							+'			<td><span>'+obj.jscsCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>取消订单</span></td>'
							+'			<td><span>'+obj.qxddCount+'</span></td>'
							+'			<td><span>订单成功</span></td>'
							+'			<td><span>'+obj.ddcgCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>请求协助</span></td>'
							+'			<td ><span>'+obj.qqxzCount+'</span></td>'
							+'			<td><span></span></td>'
							+'			<td ><span></span></td>'
							+'		</tr>'
							+'	</table>'
							+'</div>';
					$('#data_list').html(html);
				}else if(type=='4'){//到院处方
					var html='';
					var obj=data.obj;
					html+=''
							+'<div class="all">'
							+'<div class="form clearfix">'
							+'	<table width="100%;">'
							+'		<tr>'
							+'			<td><span>已开处方</span></td>'
							+'			<td><span>'+obj.ykcfCount+'</span></td>'
							+'			<td><span>订单处理中</span></td>'
							+'			<td><span>'+obj.xsywclCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>销售员未处理超时</span></td>'
							+'			<td><span>'+obj.xsywclcsCount+'</span></td>'
							+'			<td><span>销售员取消订单</span></td>'
							+'			<td><span>'+obj.xsyqxCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>申请审处方超时</span></td>'
							+'			<td><span>'+obj.sqscfcsCount+'</span></td>'
							+'			<td><span>医师修改处方超时</span></td>'
							+'			<td><span>'+obj.ysxgcfCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>药师处理超时</span></td>'
							+'			<td><span>'+obj.ysclcsCount+'</span></td>'
							+'			<td><span>取药超时</span></td>'
							+'			<td><span>'+obj.qycsCount+'</span></td>'
							+'		</tr>'
							+'		<tr>'
							+'			<td><span>订单成功</span></td>'
							+'			<td ><span>'+obj.ddcgCount+'</span></td>'
							+'			<td><span></span></td>'
							+'			<td ><span></span></td>'
							+'		</tr>'
							+'	</table>'
							+'</div>';
					$('#data_list').html(html);
				}
				
			}
		},true);
	}else if(opt=='2'){
		//查询医生关联的药店/门诊列表
		var type='';//查询数据类型(默认是1)，1：查询关联的药店列表 2查询关联的医院/门诊列表
		var orderType = $('#orderType').attr('val');
		if(orderType=='3'){//协助开处方
			type='2';
		}else if(orderType=='1'){//申请开处方
			type='1';
		}
		if(type){
			var reqJSON = {
				type: type//查询数据类型(默认是1)，1：查询关联的药店列表 2查询关联的医院/门诊列表
			}; 
			APP.getData('/hrs/servlet/getPhyPharDrugStores',reqJSON,function(data){
				if (data.result == '0') {
					var hosDrugList=data.list;
					if(hosDrugList){
						if(type=='1'){
							$('#hosdrug_name').html('全部');
						}else if(type=='2'){
							$('#hosdrug_name').html('全部');
						}
						var m_html='';
						m_html+='<li val="">全部</li>';
						for(var i=0;i<hosDrugList.length;i++){
							
							if(type=='1'){
								m_html+='<li val="'+hosDrugList[i].drugStoreId+'">'+hosDrugList[i].drugStoreName+'</li>';
							}else if(type=='2'){
								m_html+='<li val="'+hosDrugList[i].hospitalId+'">'+hosDrugList[i].hospitalName+'</li>';
							}
						}
						$('#hosdrug_menu_list').html(m_html);
						//重新渲染下拉菜单的点击事件
						initMenuListClick();
						//执行一遍getData('1');获取一遍数据
						getDatas('1');
					}
				}
			});
		}else{
			getDatas('1');
		}
		
	}
	
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