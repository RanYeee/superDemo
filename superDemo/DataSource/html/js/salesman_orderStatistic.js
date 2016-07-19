/* 
 * @Author: liangjie
 */

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
	APP.init();
	//渲染订单信息的数据
	var startDate = '';
	var endDate = '';
	var orderType = '';
	var drugstoreId = '';
	var reqJSON = {"startDate":startDate,
					"endDate":endDate,
					"orderType":orderType,
					"userAccount":"njyds02"};
	var URL = "/hrs/servlet/getPrescriptionOrderStatisticsByDrugStore";
	if(APP.userInfo.userType == OrderState.DZCF_SALESMAN){//销售员
		URL = "/hrs/servlet/getPrescriptionOrderStatisticsByDrugStore";
		reqJSON = {"startDate":startDate,
					"endDate":endDate,
					"orderType":orderType};
	}else if(APP.userInfo.userType == OrderState.DZCF_DOCTOR){//医师
		URL = "/hrs/servlet/getPrescriptionOrderStatisticsByDoc";
		reqJSON = {"startDate":startDate,
					"endDate":endDate,
					"orderType":orderType,
					"drugstoreId":drugstoreId};
	}else if(APP.userInfo.userType == OrderState.DZCF_MEDICINEMAN){//药师
		URL = "/hrs/servlet/getDzcfBusinessStatisticsByMedicineMan";
		reqJSON = {"startDate":startDate,
					"endDate":endDate,
					"orderType":orderType,
					"drugstoreId":drugstoreId};
	}
	
	APP.getData(URL,reqJSON,function(data){
		setValues(data);
	});
	/**
	 * 下拉框点击触发的事件
	 */
	$('.ordersType').click(function(){
		 var  orderType = $(this).attr('value'); 
		 var startDate = $("#startDate").text();
		 var endDate = $("#endDate").text();
		 var reqJSON = {"orderType":orderType,
		 				"startDate":startDate,
		 				"endDate":endDate,
		 				"userAccount":"njyds02"};
		 var reqURL = "/hrs/servlet/getPrescriptionOrderStatisticsByDrugStore";
		 APP.getData(reqURL,reqJSON,function(data){
			setValues(data);			
		 });
	});
	/**
	 * 起始时间点击触发的事件
	 */
	$('#startDate').click(function(){
		 alert($("#startDate").text());
	});
	/**
	 * 结束时间点击触发的事件
	 */
	$('#endDate').click(function(){
		 alert($("#endDate").text());
	});
});
/**
 * 填充数据
 */
function setValues(data){
	$("#tjsq").html(data.obj.totalCount);
	$("#ycysjjkcf").html(data.obj.ysjjkcfCount+"<br>("+data.obj.ysjjkcfCountPercent+")");
	$("#mzysqxdd").html(data.obj.ssyqsddCount+"<br>("+data.obj.ssyqsddCountPercent+")");
	$("#sqkcfcs").html(data.obj.sqkcfcsCount+"<br>("+data.obj.sqkcfcsCountPercent+")");
	$("#ycysclcs").html(data.obj.yisclcsCount+"<br>("+data.obj.yisclcsCountPercent+")");
	$("#sqcfcs").html(data.obj.sqscfcsCount+"<br>("+data.obj.sqscfcsCountPercent+")");
	$("#ysclcs").html(data.obj.yaosclcsCount+"<br>("+data.obj.yaosclcsCountPercent+")");
	$("#ysshbtg").html(data.obj.ysshbtgCount+"<br>("+data.obj.ysshbtgCountPercent+")");
	$("#jscs").html(data.obj.qycsCount+"<br>("+data.obj.qycsCountPercent+")");
	$("#ddcg").html(data.obj.ddcgCount+"<br>("+data.obj.ddcgCountPercent+")");
}
