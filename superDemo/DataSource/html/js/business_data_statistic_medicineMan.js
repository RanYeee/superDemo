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
	$('.rightLi ul li').click(function(){
		$(this).css('color','#65d0e4').siblings().css('color','#000');
		var value = $(this).text();
		var val=$(this).attr('val');
		$(this).parent().prev('span').text(value);
		$(this).parent().prev('span').attr('val',val);
		if($(this).parent().parent().attr('id')=='orderType_menu'){//订单类型下拉列表项点击
			//重新生成数据
			getDatas('2');
		}else if($(this).parent().parent().attr('id')=='hosdrug_menu'){//药店/门诊下拉列表项点击
			//重新生成数据
			getDatas('3');
		}
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
		var orderType = $('#orderType').attr('val');
		var drugstoreId=$('#hosdrug_name').attr('val');
		var reqJSON = {
			startDate: startDate,
			endDate: endDate,
			orderType: orderType,
			drugstoreId:drugstoreId,
			hospitalId:''
		};
		APP.getData('/hrs/servlet/getDzcfBusinessStatisticsByMedicineMan',reqJSON,function(data){
			if (data.result == '0') {
				var list=data.list;
				if(list){
					if(orderType==OrderType.TYPE_DRUGSTORE_ASSIST || orderType ==OrderType.TYPE_DTC){//申请开处方类型/dtc订单
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
									+'			<td><span>销售员取消</span></td>'
									+'			<td><span>'+obj.qxdlCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>药师处理超时</span></td>'
									+'			<td><span>'+obj.clcsCount+'</span></td>'
									+'			<td><span>医师修改处方超时</span></td>'
									+'			<td><span>'+obj.xgcfcsCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>取药超时</span></td>'
									+'			<td><span>'+obj.qycsCount+'</span></td>'
									+'			<td><span>订单成功</span></td>'
									+'			<td><span>'+obj.ddcgCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>审核通过</span></td>'
									+'			<td ><span>'+obj.shtgCount+'</span></td>'
									+'			<td><span></span></td>'
									+'			<td ><span></span></td>'
									+'		</tr>'
									+'	</table>'
									+'</div>';
						}
						$('#data_list').html(html);
					}else if(orderType==OrderType.TYPE_DRUGSTORE){//到店处方-申请审处方
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
									+'			<td><span>销售员取消</span></td>'
									+'			<td><span>'+obj.qxdlCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>药师处理超时</span></td>'
									+'			<td><span>'+obj.clcsCount+'</span></td>'
									+'			<td><span>药师审核不通过</span></td>'
									+'			<td><span>'+obj.shbtgCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>订单成功</span></td>'
									+'			<td><span>'+obj.ddcgCount+'</span></td>'
									+'			<td><span>审核通过</span></td>'
									+'			<td><span>'+obj.shtgCount+'</span></td>'
									+'		</tr>'
									+'	</table>'
									+'</div>';
						}
						$('#data_list').html(html);
					}else if(orderType==OrderType.TYPE_OUTPATIENT || orderType==OrderType.TYPE_OUTPATIENT_ASSIST){//模式c,结算处方/申请协助
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
									+'			<td><span>医师取消</span></td>'
									+'			<td><span>'+obj.qxdlCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>药师处理超时</span></td>'
									+'			<td><span>'+obj.clcsCount+'</span></td>'
									+'			<td><span>医师修改处方超时</span></td>'
									+'			<td><span>'+obj.xgcfcsCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>结算超时</span></td>'
									+'			<td><span>'+obj.jscsCount+'</span></td>'
									+'			<td><span>订单成功</span></td>'
									+'			<td><span>'+obj.ddcgCount+'</span></td>'
									+'		</tr>'
									+'		<tr>'
									+'			<td><span>审核通过</span></td>'
									+'			<td ><span>'+obj.shtgCount+'</span></td>'
									+'			<td><span></span></td>'
									+'			<td ><span></span></td>'
									+'		</tr>'
									+'	</table>'
									+'</div>';
						}
						$('#data_list').html(html);
					}
					
				}
			}
		},true);
	}else if(opt=='2'){
		//查询医生关联的药店/门诊列表
		var type='1';//查询数据类型(默认是1)，1：查询关联的药店列表 2查询关联的医院/门诊列表
		var orderType = $('#orderType').attr('val');
		/*if('1'==OrderType.getOrderSource(orderType)){
			type='1';
		}else if('2'==OrderType.getOrderSource(orderType)){
			type='2';
		}*/
		var reqJSON = {
			type: type//查询数据类型(默认是1)，1：查询关联的药店列表 2查询关联的医院/门诊列表
		}; 
		APP.getData('/hrs/servlet/getPhyPharDrugStores',reqJSON,function(data){
			if (data.result == '0') {
				var hosDrugList=data.list;
				if(hosDrugList){
					hosdrug_name
					if(type=='1'){
						$('#hosdrug_name').html('药店');
					}else if(type=='2'){
						$('#hosdrug_name').html('门诊');
					}
					var m_html='';
					for(var i=0;i<hosDrugList.length;i++){
						if(type=='1'){
							m_html+='<li val="'+hosDrugList[i].drugStoreId+'">'+hosDrugList[i].drugStoreName+'</li>';
						}else if(type=='2'){
							m_html+='<li val="'+hosDrugList[i].hospitalId+'">'+hosDrugList[i].hospitalName+'</li>';
						}
					}
					$('#hosdrug_menu_list').html(m_html);
					//查询渲染点击事件
					$('.rightLi ul li').unbind("click"); //移除click
					$('.rightLi ul li').click(function(){
						$(this).css('color','#65d0e4').siblings().css('color','#000');
						var value = $(this).text();
						var val=$(this).attr('val');
						$(this).parent().prev('span').text(value);
						$(this).parent().prev('span').attr('val',val);
						if($(this).parent().parent().attr('id')=='orderType_menu'){//订单类型下拉列表项点击
							//重新生成数据
							getDatas('2');
						}else if($(this).parent().parent().attr('id')=='hosdrug_menu'){//药店/门诊下拉列表项点击
							//重新生成数据
							getDatas('3');
						}
					});
					//执行一遍getData('1');获取一遍数据
					getDatas('1');
				}
			}
		});
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