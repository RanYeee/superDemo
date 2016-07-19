/* 
 * @Author: liangjie
 */
//######页面全局变量
//订单类型
$("label").attr('data-role', 'none');
$("input").attr('data-role', 'none');
$("select").attr('data-role', 'none');
$("textarea").attr('data-role', 'none');

var orderType = '';
var imageType = 'image';
var audioType = 'audio';
var LiMITNUM = 5; //添加语言和图片的限制
//全局变量，自选药品列表，数组数据
var selfDrugList = new Array();
//全局变量，开处方选择的处方数据数据
var prescriptionData = {
	drugList: new Array(), //药品列表数据
	drugCount: '', //挤数
	totalMoney: '', //
	diagnoseDetail: '', //诊断信息
	useDrugAttention: '', //用药注意事项
	drugStoreId: '', //药店id
	drugStoreName: '' //药店名称
}
//全局变量，记录模式B订单选择的收获地址信息
var receiverAddress=null;
//全局标量，医院默认收获地址
var hospitalDefaultAddress=null;
//从参数中获取订单数据，如果有，则表示是重新提交订单的操作过来的界面
var orderData=null;
$(document).ready(function() {
	$('.ui-loader').remove();
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

	// 点击高血压糖尿病是选项弹出底部框

	popUpBox(".hyper", ".hypertension", "patient_gxyLevel"); // 点击高血压是选项弹出底部框
	popUpBox(".diabe", ".diabetes", "patient_tnbType"); // 点击糖尿病是选项弹出底部框
	/**
	 * 高血压或糖尿病  选择是触发弹出层选择
	 * @param {Object} par1 高血压选项还是糖尿病选项
	 * @param {Object} par2 弹出层div
	 * @param {Object} hiddenInputId 选择的值放置的隐藏域
	 */
	function popUpBox(par1, par2, hiddenInputId) {

		var myButtom = $(par2).height();
		$(par2).css("bottom", -myButtom);
		$(".div01_pr").css("display", "none"); // 控制描述病情一开始隐藏
		// 点击用法
		$(par1).click(function() {
			$('html').css('overflow','hidden');//锁屏,页面不能滚动
			$(".cover").css("display", "block")
			$(par2).animate({
				"bottom": 0
			}, 300);
		});

		// 点击遮罩层
		$(".cover").click(function() {
			if ($(".par ul").hasClass('active')) {
				$(this).css("display", "block");
			} else {
				$('html').css('overflow','auto');  //释放锁屏
				$(this).css("display", "none");
				$(par2).animate({
					"bottom": -myButtom
				}, 300);
				//$(par1).removeClass('check_on');
				//$(par1).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').addClass("check_on")
			};

		});
		// 选择弹出框列表选项
		var $myLi = $(par2).children("ul").children("li")
		$myLi.click(function() {
			$(par2).animate({
				"bottom": -myButtom
			}, 300);
			$(".cover").css("display", "none");
			$('html').css('overflow','auto');  //释放锁屏

			var $myLiText = $(this).text();
			var $myText = $(par1).parents(".lab_mar").siblings(".div01_pr").children('.pr_text');
			$myText.parent().css("display", "block");
			$myText.text($myLiText);
			//获取li中v的值,并设置到相应的隐藏域中
			var val = $(this).attr('v');
			$('#' + hiddenInputId).val(val);

		});
		/**
		 * "关闭"按钮点击事件
		 */
		$('.shut_down').click(function(){
			$(par2).animate({
				"bottom": -myButtom
			}, 300);
			$(".cover").css("display", "none");
			$('html').css('overflow','auto');  //释放锁屏
		});

	};
	clicNo(".hyper_no"); // 点击高血压否选项
	clicNo(".diabe_no"); // 点击点击糖尿病否选项
	/**
	 * 高血压或糖尿病  否 或  未知选择  隐藏已选择的高血压或糖尿病级别数据
	 * @param {Object} par
	 */
	function clicNo(par) {
		$(par).click(function() {
			$(this).parents(".lab_mar").siblings(".div01_pr").css("display", "none");
		})
	}

	//点击单选改变图标背景色
	$(".rad_incon").click(function() {
		//获取节点的id
		var hasTsrqClass=$(this).hasClass('patient_tsrq_incon')
		//console.log('############hasTsrqClass:'+hasTsrqClass);
		//如果是特殊人群的选项点击，如果病人性别是男性或病人是婴儿，则不能选择特殊人群
		if(hasTsrqClass){
			//性别
			var patientSex = $("input[name='patient_sex']:checked").val();
			console.info("patient_sex:" + patientSex);
			if(patientSex && '1'==patientSex){
				return;
			}
			//是否是婴儿人群
			var patientYerq = $("input[name='patient_yerq']:checked").val();
			console.info("patientYerq:" + patientYerq);
			if(patientYerq && '1'==patientYerq){
				return;
			}
		}
		$(this).addClass("check_on");
		$(this).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').removeClass("check_on");
	});
	//特殊人群radio点击事件，如果病人性别是男性或病人是婴儿，则特殊人群选项必须是“否”
	$('.patient_tsrq').click(function(){
		//性别
		var patientSex = $("input[name='patient_sex']:checked").val();
		console.info("patient_sex:" + patientSex);
		//是否是婴儿人群
		var patientYerq = $("input[name='patient_yerq']:checked").val();
		console.info("patientYerq:" + patientYerq);
		if((patientSex && '1'==patientSex) || (patientYerq && '1'==patientYerq)){
			console.log('特殊人群不能选......................');
			/*$('#patient_tsrq_1').removeAttr('checked');
			$('#patient_tsrq_1').attr('checked', 'checked');
			$('#patient_tsrq_2').removeAttr('checked');
			$('#patient_tsrq_3').removeAttr('checked');
			$('#patient_tsrq_4').removeAttr('checked');*/
		}
	});
	//病人性别选择事件，如果病人性别是男性，则特殊人群选项必须是“否”
	$('.patient_sex').click(function(){
		//性别
		var patientSex = $("input[name='patient_sex']:checked").val();
		if(patientSex && '1'==patientSex){
			$('.patient_tsrq_incon').removeClass("check_on");
			$('#patient_tsrq_1_incon').addClass("check_on");
		}
	});
	//病人婴儿人群选择事件，如果婴儿，则特殊人群选项必须是“否”
	$('.patient_yerq').click(function(){
		//是否是婴儿人群
		var patientYerq = $("input[name='patient_yerq']:checked").val();
		console.info("patientYerq:" + patientYerq);
		if(patientYerq && '1'==patientYerq){
			$('.patient_tsrq_incon').removeClass("check_on");
			$('#patient_tsrq_1_incon').addClass("check_on");
		}
	});
	// 点击判断是否是婴儿
	$(".sui").click(function(event) {
		$(".nianLing_text").text("岁");
	});
	$(".yue").click(function(event) {
		$(".nianLing_text").text("个月");
	});

	$(".guomin").css("display", "none"); // 一开始隐藏过敏史
	$(".specialDiseases").css("display", "none"); // 一开始隐藏疾病

	// 点击判断是否有过敏史/或者特殊疾病
	shuoMing(".allergy_no", ".guomin", ".allergy_yes");
	shuoMing(".specialDiseases_no", ".specialDiseases", ".specialDiseases_yue");

	function shuoMing(a, b, c) {
		$(a).click(function(event) {
			$(b).css("display", "none");
		});
		$(c).click(function(event) {
			$(b).css("display", "block");
		});
	};
	////////////////////////////////////////// 订单详情-点击药品详情切换内容效果
	var g = 1;
	$(".pe_info_drug").click(function() {
		// alert("ok");
		if (g == 1) {
			$(".drugDes").css("display", "block");
			$(".drugH2").addClass('changeBg');
			g = 0;
		} else if (g == 0) {
			$(".drugDes").css("display", "none");
			$(".drugH2").removeClass('changeBg');
			g = 1;
		}
	});
	////////////////////////////////////////// 订单详情-点击药品详情切换内容效果  end 
	// 点击指定药品,切换背景图
	/*$(".add_i").find('i').click(function(e) {
		$(this).toggleClass('check_i');
		$(".drugs_a").toggleClass('a_hide');
	});*/
	// 对上传图片位置的控制
	$(".liImage>a img").each(function() {
		if ($(this).height() <= $(this).width()) {
			$(this).css('margin-top', '0px');
		} else {
			var mar_top = 0.5 * ($(this).height() - $(this).width());
			$(this).css('margin-top', -mar_top);
		}
	});
	//限制药物过敏史输入长度
	APP.limitInputFieldLength('patient_ywgmsName',30);
	//限制其它特殊疾病输入长度
	APP.limitInputFieldLength('patient_qttsjb_name',30);
	//姓名长度不能大于10
	APP.limitInputFieldLength('patient_name',10);
	//身份证号长度限制
	APP.limitInputFieldLength('patient_idCardNo',18);
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(function() {
		var dataJsonStr = APP.getLocationParameter('data', '{"orderType":"3"}');
		console.log('get parameter->data:' + dataJsonStr);
		var dataJson = APP.str2Json(dataJsonStr);
		orderType = dataJson.orderType; //从json数据中获取订单类型
		console.log('get orderType:' + orderType);
		//从参数中获取订单数据，如果有，则表示是重新提交订单的操作过来的界面
		orderData=dataJson.orderData;
		console.log('get orderData:' + APP.json2Str(orderData));
		if(orderData){//如果有订单数据，则是重新提交操作引导过来的界面
			if(orderData.orderedDrugList){
				selfDrugList=orderData.orderedDrugList;//记录自选药品到全局变量
			}
			//处方数据
			prescriptionData.drugCount = orderData.drugCount;
			prescriptionData.totalMoney = orderData.totalMoney;
			prescriptionData.diagnoseDetail = orderData.diagnoseDetail;
			prescriptionData.useDrugAttention = orderData.useDrugAttention;
			prescriptionData.drugStoreId = orderData.drugStoreId;
			prescriptionData.drugStoreName = orderData.drugstoreName;
			prescriptionData.drugList=orderData.druginfo;//处方药品数据
			//收货地址信息
			receiverAddress={};
			receiverAddress.id=orderData.receiverId;
			receiverAddress.userName=orderData.receiverName;
			receiverAddress.mobile=orderData.receiverPhone;
			
			
		}
		//渲染订单信息的数据
		initOrderInfo(orderType,orderData);
		//渲染标题的数据
		initTitle(orderType);
		//渲染订单进度信息区域
		initOrderProgress();
		if(orderData){//如果有订单数据，则是重新提交操作引导过来的界面
			var p=orderData;
			var patient=new Patient(p.patientId, p.idCardNo, p.name, p.sex, p.age, p.ageUnit, p.yerq, p.telphone, p.ywgms, p.ywgmsName, 
										p.tsrq, p.tsrqType, p.ggnbq,p.sgnbq, p.gxybs, p.gxybsLevel, p.tnbs, p.tnbsType, p.xzbs, p.qttsjb, p.qttsjbName,
										p.bllx, p.getDrugWay, p.blNo, p.blDepartment, p.bedNo);
			genPatientPageData(patient);
		}
		/**
		 * 病人姓名输入框事件处理
		 * 根据姓名搜索出以前的病人，然后可以选择以前的病人
		 */
		initPatientName();
		//渲染主诉区域的显示隐藏
		initPatientMainSuitArea();
		//渲染图片信息区域的显示隐藏
		initPicsArea();
		//渲染语音消息区域 的显示隐藏
		initVoiceArea();
		//渲染自带药品区域 的显示隐藏
		initselfDrugsArea();
		//渲染病历类型区域
		initBllxArea();
		//渲染自选药品的数据
		NativeCallJS.initSelfDrugList(selfDrugList);
		//渲染处方信息区域
		initPrescriptionArea();
		//渲染地址信息区域
		initAddressArea();
		/**
		 * 病历类型,医院/门诊的点击事件
		 */
		$('.bllx_incon').click(function(){
			//判断点击的住院还是门诊
			var _id=$(this).attr('id');
			if('bllx_zy_incon'==_id){//住院
				//alert('住院');
				$('#blNo_name').html('住院号');
				//$('#blNo').val('');
				$('#blNo').attr('placeholder','请在此处输入住院号');
				$('#blDepartment_div').show();
				$('#bedNo_div').show();
			}else if('bllx_mz_incon'==_id){
				$('#blNo_name').html('门诊号');
				$('#blNo').attr('placeholder','请在此处输入门诊号');
				//$('#blNo').val('');
				$('#blDepartment_div').hide();
				$('#bedNo_div').hide();
			}
		});
		/**
		 * 取药类型，到店自取/配送的点击事件
		 */
		$('.getDrugWay_incon').click(function(){
			//判断点击的住院还是门诊
			var _id=$(this).attr('id');
			//只有dtc模式的订单才需要设置配送地址的显示及隐藏
			if(orderType==OrderType.TYPE_DTC){
				if('getDrugWay_ddzq'==_id){//到店自取
					$('#dtc_ps_address_area').hide();
				}else if('getDrugWay_ps'==_id){//配送
					//查询医生所属医院默认的配送地址
					var bodyParameters = {
						brMobile: ''//病人手机号为空，表示需要查询的是医院的默认地址
					}
					APP.getData('/hrs/servlet/getBrReceiverInfosByDzcfDoc', bodyParameters, function(data) {
						if (data.result == '0') {
							if (data.list) {
								var addressList = data.list;
								if (addressList.length > 0) {
									var addr = addressList[0];
									$('#deliveryUserName').val(addr.userName);
									$('#deliveryPhone').val(addr.mobile);
									$('#deliveryAddress').html(addr.areaInfo);
									$('#deliveryDetailAddr').val(addr.address);
								}
							}
						}
					});
					
					
					$('#dtc_ps_address_area').show();
				}
			}
		});
		//配送地址 dtc模式,更换地址选择按钮
		$('#dtc_ps_address_btn').click(function(){
			APP.chooseAddress(3,function(rspData){
				console.log('地址选择返回数据:'+APP.json2Str(rspData));
				if(rspData && rspData.status && rspData.status.code==0){
					//正确获取地址
					var ads=rspData.result;
					var provinceName=ads.province.name;//省
					var cityName=ads.city.name;//市
					var countyName=ads.county.name;//区
					$('#deliveryAddress').html(provinceName+cityName+countyName);
				}
			});
		});
		//如果有图片的话就显示
		//initselfPic();
		/**
		 * 添加图片按钮点击事件 
		 */
		$('#add_pic_btn').click(function() {
			//console.log('调用native方法选择图片...');
			var param = 'chooseFile';
			//先获取有多少张图片
			var tol = LiMITNUM - $("#listImg li").length;
			var type = imageType;
			buildaddFile(param, tol, type);
		});

		/**
		 * 添加音频按钮点击事件
		 */
		$('#add_audio_btn').click(function() {
			//console.log('调用native方法开始录音...');
			var param = 'chooseFile';
			var tol = LiMITNUM - $("#listAudio li").length;
			var type = audioType;
			buildaddFile(param, tol, type);
		});

		//添加图片和音频的时候统一处理
		function buildaddFile(param, tol, type) {
			result = {
				max: tol,
				type: type
			}
			NativeCallJS.getAddOrTouchFile(param, result, function(json) {
				if (json == '') {
					APP.showHttpErrer('响应值为空');
				} else {
					if (type == imageType) {
						listselfImage(json, param); //显示图片
					}

					if (type == audioType) {
						listselfAudio(json, param); //显示音频
					}

				}
			});
		}

		//自选药品按钮的选择与否的触发时间
		$('#self_drugs_check').click(function() {
			var cl = $('#self_drugs_check').attr("class");
			if (cl) {
				$('#self_drugs_check').attr('class', '');
				$('#select_drugs_btn').hide();
				$('#hasDrug').val('0');
			} else {

				$('#self_drugs_check').attr('class', 'check_i');
				$('#select_drugs_btn').show();
				$('#hasDrug').val('1');
			}
		});

		/**
		 * "返回按钮"点击事件
		 */
		$('#opt_title').bind('click', function() {
			APP.finishH5();
		});
		/**
		 * ”提交“按钮点击事件
		 */
		$('#commit_btn').click(function() {
			NativeCallJS.orderCommit();

		});

		/**
		 * 渲染订单进度信息区域
		 */
		function initOrderProgress() {
			var temp = '';
			if (orderType == OrderType.TYPE_DRUGSTORE_ASSIST) { //申请开处方-南京模式
				temp = '<li><span class="incons incons_on"></span><br/><span class="span02">待受理</span></li><li><span class="incons"></span><br/><span class="span02">开处方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">审核处方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">等待取药</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">订单成功</span><div class="line"></li>';
			} else if (orderType == OrderType.TYPE_DRUGSTORE) { //申请审处方-南京模式
				temp = '<li><span class="incons incons_on"></span><br/><span class="span02">待受理</span></li><li><span class="incons"></span><br/><span class="span02">审核处方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">订单成功</span><div class="line"></li>';
			} else if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST) { //开处方&申请协助-强森模式
				temp = '<li><span class="incons incons_on"></span><br/><span class="span02">开处方</span></li><li><span class="incons"></span><br/><span class="span02">审核处方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">待结算</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">待发货</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">待收货</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">订单成功</span><div class="line"></li>';
			}else if(orderType == OrderType.TYPE_DTC){//dtc订单
				temp = '<li><span class="incons incons_on"></span><br/><span class="span02">开处方</span></li><li><span class="incons"></span><br/><span class="span02">申请审方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">审核处方</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">等待取药</span><div class="line"></li><li><span class="incons"></span><br/><span class="span02">订单成功</span><div class="line"></li>';
			}
			$('#order_progress').html(temp);
		}
		/**
		 * 病人姓名输入框事件处理
		 * 根据姓名搜索出以前的病人，然后可以选择以前的病人
		 */
		function initPatientName() {
			///////////////// 点击姓名输入姓名弹出姓名信息
			$("#patient_name").bind('input', function() {
				inpName();
			});
			//记录查询到的病人列表标量
			var patientList = new Array();
			//病人姓名输入框变化
			function inpName() {
				var name = $('#patient_name').val();
				if (!name) {
					$(".drop_down_selection").css("display", "none");
				} else {
					//模糊查询病人的数据
					var bodyData = {
						name: name
					}
					APP.getData('/hrs/servlet/findAllPatientList', bodyData, function(data) {
						if (data.list) {
							patientList = data.list;
							var tempHtml = '';
							if (patientList.length > 0) { //查询到匹配的病人
								for (var i = 0; i < patientList.length; i++) {
									var patient = patientList[i];
									var sexName = '';
									if (patient.sex == '1') {
										sexName = '男';
									} else if (patient.sex == '2') {
										sexName = '女';
									}
									var ageUnit = patient.ageUnit;
									if ('月' == ageUnit) {
										ageUnit = '个' + ageUnit;
									}
									tempHtml += '<li index="' + i + '"><span class="span_neme">' + patient.name + '</span><span class="gender">' + sexName + '</span><span><i>' + patient.age + '</i><em>' + ageUnit + '</em></span></li>';
								}
								$('#patient_list').html(tempHtml);
								$(".drop_down_selection").css("display", "block");
								$('.cover_all').css("display", "block");
								$(".drop_down_selection ul li").click(function(event) {
									$(".drop_down_selection").hide();
									$('.cover_all').hide();
									var _index=$(this).attr('index');
									var p=patientList[_index];//选择的病人
									var patient=new Patient(p.id, p.idCardNo, p.name, p.sex, p.age, p.ageUnit, p.yerq, p.telphone, p.ywgms, p.ywgmsName, 
										p.tsrq, p.tsrqType, p.ggnbq,p.sgnbq, p.gxybs, p.gxybsLevel, p.tnbs, p.tnbsType, p.xzbs, p.qttsjb, p.qttsjbName,
										p.bllx, p.getDrugWay, p.blNo, p.blDepartment, p.bedNo);
									//生成病人信息的页面的数据
									genPatientPageData(patient);
								});
							}
						}
					});

				}
			}

			// 点击空白处
			$('.cover_all').click(function(event) {
				$(".drop_down_selection").hide();
				$(this).hide();
			});
		}

		/**
		 * 渲染标题的数据
		 */
		function initTitle() {
			var orderTypeName = OrderType.getOrderTypeName(orderType);
			var orderTypeInt = parseInt(orderType);
			var orderTypeName = '';
			switch (orderTypeInt) {
				case 1:
					orderTypeName = '申请开处方';
					break;
				case 2:
					orderTypeName = '申请审处方';
					break;
				case 3:
					orderTypeName = '开处方';
					break;
				case 4:
					orderTypeName = '申请协助';
					break;
				case 6:
					orderTypeName = '开处方';
					break;
				default:
					break;
			}
			$('#opt_title').html(orderTypeName);
		}
		/**
		 * 渲染订单信息模块的数据
		 */
		function initOrderInfo(orderType,order) {
			$('#order_time_span').html(new Date().format("yyyy-MM-dd HH:mm:ss"));
			console.log('initOrderInfo:' + APP.userInfo.userName + ',' + APP.drugStoreInfo.drugStoreName)
				//药店销售员-申请开处方/申请审处方
			if (orderType == OrderType.TYPE_DRUGSTORE_ASSIST || orderType == OrderType.TYPE_DRUGSTORE) {
				var temp = '<p>状态：<span>待受理</span></p>' + '<p>药店：<span>' + APP.drugStoreInfo.drugStoreName + '</span></p>' + '<p>销售人员：<span>' + APP.userInfo.userName + '</span></p>';
				$('#order_info_source').html(temp);
			}
			//门诊医生
			if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_DTC) {
				var temp = '<p>状态：<span>开处方</span></p>' + '<p>医院：<span>' + APP.hospitalInfo.hospitalName + '</span></p>' + '<p>医生：<span>' + APP.userInfo.userName + '</span></p>';
				$('#order_info_source').html(temp);
			}

		}
		/**
		 * 渲染主诉区域的显示隐藏
		 */
		function initPatientMainSuitArea() {
			if (orderType == OrderType.TYPE_DRUGSTORE) { //申请审处方-南京模式,隐藏区域
				$('#patient_mainSuit_title').html('图片上传');
				$('#patient_mainSuit').hide();
			} else { //其他类型，则显示
				if(orderData){
					if(orderData.mainSuit){
						$('#patient_mainSuit').val(orderData.mainSuit);
					}
				}
				$('#patient_mainSuit_title').html('主诉');
				$('#patient_mainSuit').show();
			}
		}
		/**
		 * 渲染图片信息区域的显示隐藏
		 */
		function initPicsArea() {
			if(orderData){//重新提交订单操作
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
					listselfImage(imageData, 'chooseFile');
				}
			}
			$('#pics_area').show();
		}
		/**
		 * 渲染语音消息区域 的显示隐藏
		 */
		function initVoiceArea() {
			if (orderType == OrderType.TYPE_DRUGSTORE) { //申请审处方-南京模式,隐藏区域
				$('#voice_area').hide();
			} else { //其他类型，则显示
				if(orderData){//重新提交订单操作
					//封装订单的语音列表
					var voicePathArr=new Array();
					if(orderData.voice1Path){
						voicePathArr.push(orderData.voice1Path);
					}
					if(orderData.voice2Path){
						voicePathArr.push(orderData.voice2Path);
					}
					if(orderData.voice3Path){
						voicePathArr.push(orderData.voice3Path);
					}
					if(orderData.voice4Path){
						voicePathArr.push(orderData.voice4Path);
					}
					if(orderData.voice5Path){
						voicePathArr.push(orderData.voice5Path);
					}
					var vDataList=getVoiceListData(voicePathArr);
					var vData={
						files:vDataList
					};
					if(vData.files.length>0){
						listselfAudio(vData, 'chooseFile')
					}
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
		
		/**
		 * 渲染自带药品区域 的显示隐藏
		 */
		function initselfDrugsArea() {
			if (orderType == OrderType.TYPE_DRUGSTORE_ASSIST) { //只有模式A-申请开处方才显示自带药品区域
				if(orderData){//如果有订单数据，表示重新提交
					if(orderData.hasDrug==1){
						//自带药品勾上
						$('#self_drugs_check').attr('class', 'check_i');
						$('#select_drugs_btn').show();
						$('#hasDrug').val('1');
					}
				}
				$('#self_drugs_area').show();
			} else { //其他类型，则隐藏
				$('#self_drugs_area').hide();
			}
		}
		/**
		 * 渲染病历类型区域
		 */
		function initBllxArea() {
			//模式B/C才有病历类型区域
			if (orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_DTC) {
				$('#bllx_area').show();
				if(orderType == OrderType.TYPE_DTC){//dtc订单才需要显示“取药方式”
					$('#getDrugWay_area').show();
				}else{
					$('#getDrugWay_area').hide();
				}
			} else { //其他类型，则显示
				$('#bllx_area').hide();
			}
		}
		/**
		 * 渲染处方区域
		 */
		function initPrescriptionArea() {
			//模式B/C才有处方区域
			if (orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_DTC) {
				if(prescriptionData.drugList.length>0){
					$('#rescription_no_opened').hide();
					if(orderType == OrderType.TYPE_DTC){
						$('#view_prescription_title').html('点击查看处方详情');
					}else{
						$('#view_prescription_title').html('点击查看处方笺');
					}
					$('#rescription_opened').show(); //显示已开处方的标志
				}
				$('#prescription_area').show();
			} else { //其他类型，则隐藏
				$('#prescription_area').hide();
			}
		}
		/**
		 * 渲染地址信息区域
		 */
		function initAddressArea() {
			//只有模式b(强森模式)才有地址信息
			if (orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_OUTPATIENT) {
				$('#address_area').show();
				if(orderData){//重新提交订单
					//收货地址信息
					$('#address_id').val(orderData.receiverId);
					$('#address_name').html(orderData.receiverName);
					$('#address_phone').html(orderData.receiverPhone);
					$('#address_detail').html(orderData.receiverAddress);
				}else{//新开订单，查询出医院默认的配送地址
					//查询获取病人地址列表接口
					var bodyParameters = {
						brMobile: ''//病人手机号为空，表示需要查询的是医院的默认地址
					}
					APP.getData('/hrs/servlet/getBrReceiverInfosByDzcfDoc', bodyParameters, function(data) {
						if (data.result == '0') {
							if (data.list) {
								var addressList = data.list;
								if (addressList.length > 0) {
									var addr = addressList[0];
									hospitalDefaultAddress=addr;//记录医院默认的收货地址
									$('#address_id').val(addr.id);
									$('#address_name').html(addr.userName);
									$('#address_phone').html(addr.mobile);
									$('#address_detail').html(addr.areaInfo + addr.address);
								}
							}
						}
					});
				}
			} else { //其他类型，则隐藏
				$('#address_area').hide();
			}
		}
		/**
		 * 生成病人信息的页面的数据
		 * @param {Object} patient
		 */
		function genPatientPageData(patient) {
			console.log("生成病人信息的页面的数据："+APP.json2Str(patient));
			if(patient.id){
				$('#patient_id').val(patient.id);
			}
			//姓名
			if(patient.name){
				$('#patient_name').val(patient.name);
			}
			//性别
			if(patient.sex=='1'){//男
				$('.patient_sex_incon').removeClass('check_on');
				$('#patient_sex_1_incon').addClass('check_on');
				$('#patient_sex_2').removeAttr('checked');
				$('#patient_sex_1').attr('checked', 'checked');
			}else if(patient.sex=='2'){//女
				$('.patient_sex_incon').removeClass('check_on');
				$('#patient_sex_2_incon').addClass('check_on');
				$('#patient_sex_1').removeAttr('checked');
				$('#patient_sex_2').attr('checked', 'checked');
			}
			//是否是婴儿
			if(patient.yerq=='0'){
				$('.patient_yerq_incon').removeClass('check_on');
				$('#patient_yerq_1_incon').addClass('check_on');
				$('#patient_yerq_2').removeAttr('checked');
				$('#patient_yerq_1').attr('checked', 'checked');
			}else if(patient.yerq=='1'){
				$('.patient_yerq_incon').removeClass('check_on');
				$('#patient_yerq_2_incon').addClass('check_on');
				$('#patient_yerq_1').removeAttr('checked');
				$('#patient_yerq_2').attr('checked', 'checked');
			}
			//年龄
			$('.nianLing_text').html(patient.ageUnit);
			if(patient.age){
				$('#patient_age').val(patient.age);
			}
			//身份证号
			if(patient.idCardNo){
				$('#patient_idCardNo').val(patient.idCardNo);
			}
			//电话号码
			$('#patient_telphone').val(patient.telphone);
			//药物过敏史
			if(patient.ywgms=='0'){
				$('.patient_ywgms_incon').removeClass('check_on');
				$('#patient_ywgms_1_incon').addClass('check_on');
				$('#patient_ywgms_2').removeAttr('checked');
				$('#patient_ywgms_1').attr('checked', 'checked');
				$('.guomin').hide();
			}else if(patient.ywgms=='1'){
				$('.patient_ywgms_incon').removeClass('check_on');
				$('#patient_ywgms_2_incon').addClass('check_on');
				$('#patient_ywgms_1').removeAttr('checked');
				$('#patient_ywgms_2').attr('checked', 'checked');
				$('.guomin').show();
				$('#patient_ywgmsName').val(patient.ywgmsName);
			}
			//特殊人群
			if(patient.tsrq=='0'){
				$('.patient_tsrq_incon').removeClass('check_on');
				$('#patient_tsrq_1_incon').addClass('check_on');
				$('#patient_tsrq_2').removeAttr('checked');
				$('#patient_tsrq_3').removeAttr('checked');
				$('#patient_tsrq_4').removeAttr('checked');
				$('#patient_tsrq_1').attr('checked','checked');
			}else if(patient.tsrq=='1'){
				$('.patient_tsrq_incon').removeClass('check_on');
				$('#patient_tsrq_1').removeAttr('checked');
				$('#patient_tsrq_2').removeAttr('checked');
				$('#patient_tsrq_3').removeAttr('checked');
				$('#patient_tsrq_4').removeAttr('checked');
				if(patient.tsrqType=='1'){//孕妇
					$('#patient_tsrq_2_incon').addClass('check_on');
					$('#patient_tsrq_2').attr('checked','checked');
				}else if(patient.tsrqType=='2'){//产妇
					$('#patient_tsrq_3_incon').addClass('check_on');
					$('#patient_tsrq_3').attr('checked','checked');
				}else if(patient.tsrqType=='3'){//哺乳期妇女
					$('#patient_tsrq_4_incon').addClass('check_on');
					$('#patient_tsrq_4').attr('checked','checked');
				}
			}
			//肝功能不全
			if(patient.ggnbq=='0'){
				$('.patient_ggnbq_incon').removeClass('check_on');
				$('#patient_ggnbq_1_incon').addClass('check_on');
				$('#patient_ggnbq_2').removeAttr('checked');
				$('#patient_ggnbq_1').attr('checked', 'checked');
			}else if(patient.ggnbq=='1'){
				$('.patient_ggnbq_incon').removeClass('check_on');
				$('#patient_ggnbq_2_incon').addClass('check_on');
				$('#patient_ggnbq_1').removeAttr('checked');
				$('#patient_ggnbq_2').attr('checked', 'checked');
			}
			//肾功能不全
			if(patient.sgnbq=='0'){
				$('.patient_sgnbq_incon').removeClass('check_on');
				$('#patient_sgnbq_1_incon').addClass('check_on');
				$('#patient_sgnbq_2').removeAttr('checked');
				$('#patient_sgnbq_1').attr('checked','checked');
			}else if(patient.sgnbq=='1'){
				$('.patient_sgnbq_incon').removeClass('check_on');
				$('#patient_sgnbq_2_incon').addClass('check_on');
				$('#patient_sgnbq_1').removeAttr('checked');
				$('#patient_sgnbq_2').attr('checked','checked');
			}
			//高血压病史
			if(patient.gxybs=='-1'){
				$('.patient_gxybs_incon').removeClass('check_on');
				$('#patient_gxybs_0_incon').addClass('check_on');
				$('#patient_gxyLevel').val('');
				$('#patient_gxyLevel_area').hide();
				$('#patient_gxyLevel_tips').html('');
			}else if(patient.gxybs=='0'){
				$('.patient_gxybs_incon').removeClass('check_on');
				$('#patient_gxybs_1_incon').addClass('check_on');
				$('#patient_gxyLevel').val('');
				$('#patient_gxyLevel_area').hide();
				$('#patient_gxyLevel_tips').html('');
			}else if(patient.gxybs=='1'){
				$('.patient_gxybs_incon').removeClass('check_on');
				$('#patient_gxybs_2_incon').addClass('check_on');
				$('#patient_gxyLevel').val(patient.gxybsLevel);
				if(patient.gxybsLevel){
					$('#patient_gxyLevel_area').show();
					$('#patient_gxyLevel_tips').html(getGxybsLevelName(patient.gxybsLevel));
				}
			}
			//糖尿病史
			if(patient.tnbs=='-1'){
				$('.patient_tnbs_incon').removeClass('check_on');
				$('#patient_tnbs_0_incon').addClass('check_on');
				$('#patient_tnbType').val('');
				$('#patient_tnbType_area').hide();
				$('#patient_tnbType_tips').html('');
			}else if(patient.tnbs=='0'){
				$('.patient_tnbs_incon').removeClass('check_on');
				$('#patient_tnbs_1_incon').addClass('check_on');
				$('#patient_tnbType').val('');
				$('#patient_tnbType_area').hide();
				$('#patient_tnbType_tips').html('');
			}else if(patient.tnbs=='1'){
				$('.patient_tnbs_incon').removeClass('check_on');
				$('#patient_tnbs_2_incon').addClass('check_on');
				$('#patient_tnbType').val(patient.tnbsType);
				if(patient.tnbsType){
					$('#patient_tnbType_area').show();
					$('#patient_tnbType_tips').html(getTnbsTypeName(patient.tnbsType));
				}
			}
			//心脏病史
			if(patient.xzbs=='0'){
				$('.patient_xzbs_incon').removeClass('check_on');
				$('#patient_xzbs_1_incon').addClass('check_on');
				$('#patient_xzbs_2').removeAttr('checked');
				$('#patient_xzbs_1').attr('checked','checked');
			}else if(patient.xzbs=='1'){
				$('.patient_xzbs_incon').removeClass('check_on');
				$('#patient_xzbs_2_incon').addClass('check_on');
				$('#patient_xzbs_1').removeAttr('checked');
				$('#patient_xzbs_2').attr('checked','checked');
			}
			//其他特殊疾病
			if(patient.qttsjb=='0'){
				$('.patient_qttsjb_incon').removeClass('check_on');
				$('#patient_qttsjb_1_incon').addClass('check_on');
				$('#patient_qttsjb_2').removeAttr('checked');
				$('#patient_qttsjb_1').attr('checked','checked');
				$('#patient_qttsjb_name').val('');
				$('.specialDiseases').hide();
			}else if(patient.qttsjb=='1'){
				$('.patient_qttsjb_incon').removeClass('check_on');
				$('#patient_qttsjb_2_incon').addClass('check_on');
				$('#patient_qttsjb_1').removeAttr('checked');
				$('#patient_qttsjb_2').attr('checked','checked');
				$('#patient_qttsjb_name').val(patient.qttsjbName);
				$('.specialDiseases').show();
			}
			/**
			 * 获取高血压级别名称
			 * @param {Object} gxybsLevel 高血压级别
			 */
			function getGxybsLevelName(gxybsLevel){
				var _name='';
				if(gxybsLevel){
					gxybsLevel=parseInt(gxybsLevel);
					switch (gxybsLevel){
						case 1:
							_name='一级高血压 ';
							break;
						case 2:
							_name='二级高血压 ';
							break;
						case 3:
							_name='三级高血压 ';
							break;
						default:
							break;
					}
				}
				return _name;
			}
			//住院信息
			if(patient.bllx=='1'){//住院
				$('.bllx_incon').removeClass('check_on');
				$('#bllx_zy_incon').addClass('check_on');
				$('#blNo_name').html('住院号');
				$('#blNo').val(patient.blNo);//病历号
				$('#blDepartment').val(patient.blDepartment);
				$('#blDepartment_div').show();//科室号显示
				$('#bedNo').val(patient.bedNo);
				$('#bedNo_div').show();//病床号显示
			}else if(patient.bllx=='2'){//门诊
				$('.bllx_incon').removeClass('check_on');
				$('#bllx_mz_incon').addClass('check_on');
				$('#blNo_name').html('门诊号');
				$('#blNo').val(patient.blNo);//病历号
				$('#blDepartment').val('');
				$('#blDepartment_div').hide();//科室号隐藏
				$('#bedNo').val('');
				$('#bedNo_div').hide();//病床号隐藏
			}
			//取药方式
			if(patient.getDrugWay=='1'){//到店取药
				$('.getDrugWay_incon').removeClass('check_on');
				$('#getDrugWay_ddzq').addClass('check_on');
				$('#dtc_ps_address_area').hide();
			}else if(patient.getDrugWay=='2'){//配送
				$('.getDrugWay_incon').removeClass('check_on');
				$('#getDrugWay_ps').addClass('check_on');
				//如果是dtc订单，才显示配送地址区域
				if(orderType==OrderType.TYPE_DTC){
					$('#dtc_ps_address_area').show();
				}else{
					$('#dtc_ps_address_area').hide();
				}
				
			}
			/**
			 * 获取糖尿病类别名称
			 * @param {Object} tnbsType
			 */
			function getTnbsTypeName(tnbsType){
				var _name='';
				if(tnbsType){
					tnbsType=parseInt(tnbsType);
					switch (tnbsType){
						case 1:
							_name='1型糖尿病';
							break;
						case 2:
							_name='2型糖尿病';
							break;
						case 3:
							_name='妊娠糖尿病';
							break;
						case 4:
							_name='继发性糖尿病';
							break;
						case 5:
							_name='其他特殊类型糖尿病';
							break;
						default:
							break;
					}
				}
				return _name;
			}
		}

		var v_Result = false;
		//预览图片
		$("#listImg").on("click", "li", function() {
			v_Result = false;
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
			var type = imageType;
			buildClickFile(firstIndex, alts, method, type);
		});
		//预览音频
		$("#listAudio").on("click", "li", function() {
			v_Result = false;
			var method = 'viewFile';
			var firstIndex = $(this).index();
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
			var type = audioType;
			buildClickFile(firstIndex, alts, method, type);
		});

		//点击文件（图片和音频）时候的统一组装
		function buildClickFile(firstIndex, alts, method, type) {
			var parameters = {
				index: firstIndex,
				files: alts,
				type: type
			}
			if (!v_Result) {
				APP.getViewFile(method, parameters);
			}
			v_Result = false;
		}
		//显示图片
		function listselfImage(json, str) {
			var html = "";
			console.info(JSON.stringify(json))
			if (json.files.length >= LiMITNUM) { //
				$('#addImg').hide();
			} else {
				$('#addImg').show();
			}
			tol = $("#listImg  li").length;
			for (var key in json.files) { //第一层循环取到各个list 
				++tol;
				if (tol > LiMITNUM) {
					$('#addImg').hide();
				} else {
					html += '<li class="liImage"><a href="javascript:;"><img class="uploaded_img" src="' + json.files[key].urlSub + '"  picturePath="' + json.files[key].url + '"  pictureThumpath="' + json.files[key].urlSub + '"/></a></li>';
				}
			}
			if (str == 'chooseFile') {
				$('#listImg').append(html);
			}
			if (tol >= LiMITNUM) {
				$('#addImg').hide();
			}
			$('#pics_area  .note').html('注：您当前可添加' + (LiMITNUM - tol >= 0 ? LiMITNUM - tol : 0) + '张照片');
		}
		//显示音频
		function listselfAudio(json, str) {
			var html = "";
			if (json.files.length >= LiMITNUM) { //
				$('#addAudio').hide();
			} else {
				$('#addAudio').show();
			}
			tol = $("#listAudio li").length;
			for (var key in json.files) { //第一层循环取到各个list 
				++tol;
				if (tol > LiMITNUM) {
					$('#addAudio').hide();
				} else {
					html += '<li class="liImage"><a href="javascript:;" class="voice_bg  uploaded_voice" abc="' + json.files[key].url + '" time="' + json.files[key].desc + '"> </a><span class="miao">' + json.files[key].desc + '</span></li>';
				}
			}
			if (str == 'chooseFile') {
				$('#listAudio').append(html);
			}
			if (tol >= LiMITNUM) {
				$('#addAudio').hide();
			}
			$('#voice_area  .note').html('注：您当前可添加' + (LiMITNUM - tol >= 0 ? LiMITNUM - tol : 0) + '个语音消息');
		}
		//这个值是因为点击和长按有冲突所以没有进入长按前走点击 进入长按后不走点击
		//长按事件 这个只是moblie包
		$("#listImg").on("taphold", "li", function() {
			v_Result = true;
			var param = 'showConfirmDialog';
			var indexnum = $(this).index() + 1;
			var title = '删除图片';
			var msg = '确定要删除第个' + indexnum + '图片吗？';
			buildShowConfirmDialog(title, msg, param, indexnum, $(this));
		});
		$("#listAudio").on("taphold", "li", function() {
			v_Result = true;
			var param = 'showConfirmDialog';
			var indexnum = $(this).index() + 1;
			var title = '删除音频';
			var msg = '确定要删除第个' + indexnum + '音频吗？';
			buildShowConfirmDialog(title, msg, param, indexnum, $(this));
		});
		//统一处理音频和图片长按模式
		function buildShowConfirmDialog(title, msg, param, indexnum, obj) {
			var result = {
				title: title,
				msg: msg
			}
			NativeCallJS.getAddOrTouchFile(param, result, function(json) {
				console.info('长按图片/音频' + JSON.stringify(json)); //判断删除数据库
				if (json.confirm) {
					console.info('第' + indexnum + '数据删除成功!');
					obj.remove();

					if ($("#listImg li").length < LiMITNUM) {
						var tol = $("#listImg li").length;
						$('#addImg').show();
						$('#pics_area  .note').html('注：您当前可添加' + (LiMITNUM - tol >= 0 ? LiMITNUM - tol : 0) + '张照片');

					}
					if ($("#listAudio li").length < LiMITNUM) {
						var tol = $("#listAudio li").length;
						$('#addAudio').show();
						$('#voice_area  .note').html('注：您当前可添加' + (LiMITNUM - tol >= 0 ? LiMITNUM - tol : 0) + '个语音消息');

					}
					//重新给相关图片和音频排序
				}
			});
		}
		//自带药品跳转至选择药品界面
		$('#select_drugs_btn').on('click', function() {
			if (APP.isAndroid() || APP.isIos()) {
				//界面传递数据
				var reqData = {
					name: 'choose_drugs.html',
					jsonData: {
						drugList: selfDrugList //把当前界面中已选择的药品列表信息数据传递到选药界面
					}
				};
				RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
					console.log('自选药品界面返回给开单界面的数据：' + APP.json2Str(data));
					//获取药品数据
					if (data.result.jsonData.drugList) {
						var drugList = data.result.jsonData.drugList;
						//在全局变量中保存自选药品的数据
						selfDrugList = drugList;
						//显示已选择的自带药品
						NativeCallJS.initSelfDrugList(selfDrugList);
					}
				});
			} else {
				//pc测试
				document.location.href = "choose_drugs.html";
			}
		});

		//开处方按钮，点击事件跳转至开处方界面
		$('#open_presscription_btn').on('click', function() {
			if (APP.isAndroid() || APP.isIos()) {
				var htmlName = '';
				if (orderType == OrderType.TYPE_DTC) { //DTC订单，开西药界面
					htmlName = 'open_prescription_xiyao.html'
				} else if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST) { //模式B订单，开中药界面
					htmlName = 'open_prescription_zhongyao.html';
				}
				//界面传递数据
				var reqData = {
					name: htmlName,
					jsonData: {
						opt: '0', //操作类型 0表示只返回处方数据
						orderNo: '', //订单编号，开单时还没有处方编号
						orderType: orderType,
						prescriptionId: '',
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
						if (prescriptionData.drugList.length > 0) {
							$('#rescription_no_opened').hide();
							$('#rescription_opened').show(); //显示已开处方的标志
						}
					}
				});
			} else {
				//pc测试
				document.location.href = "choose_drugs.html";
			}
		});
		//点击“查看处方签”按钮事件
		$('#view_prescription').on('click', function() {
			if (APP.isAndroid() || APP.isIos()) {
				//主诉
				var mainSuit=$('#mainSuit').val();
				//病人姓名
				var patientName = $('#patient_name').val();
				patientName = $.trim(patientName);
				//性别
				var patientSex = $("input[name='patient_sex']:checked").val();
				//年龄
				var patientAge = $("#patient_age").val();
				patientAge = $.trim(patientAge);
				//是否是婴儿人群
				var patientYerq = $("input[name='patient_yerq']:checked").val();
				var patientAgeUnit = ''; //年龄单位
				if ('0' == patientYerq) {
					patientAgeUnit = '岁';
				} else {
					patientAgeUnit = '月';
				}
				//由于字段名的不一致，需要将字段名添加一个useage字段，药品用法
				var prescriptionDrugList=prescriptionData.drugList;
				if(prescriptionDrugList){
					for(var i=0;i<prescriptionDrugList.length;i++){
						prescriptionDrugList[i].useage=prescriptionDrugList[i].usage;
						if(!prescriptionDrugList[i].unit){
							prescriptionDrugList[i].countUnit='';
						}else{
							prescriptionDrugList[i].countUnit=prescriptionDrugList[i].unit;
						}
					}
				}
						//病历类型,1 住院 2门诊
				var bllx = '';
				//病历号（住院号或门诊号)
				var blNo = '';
				//医院科室
				var blDepartment = '';
				//病床号
				var bedNo = '';
				//模式B/C才有病历信息等字段
				bllx = $("input[name='bllx']:checked").val();
				//获取病历类型
				var checkedBllx=$('.bllx_incon.check_on');
				bllx=$(checkedBllx).attr('val');
				if ('1' == bllx) { //住院
					blNo = $('#blNo').val();
					blNo = $.trim(blNo);
					blDepartment = $('#blDepartment').val();
					blDepartment = $.trim(blDepartment);
					bedNo = $('#bedNo').val();
					bedNo = $.trim(bedNo);
				} else if ('2' == bllx) { //门诊
					blNo = $('#blNo').val();
					blNo = $.trim(blNo);
				}
				//界面传递数据
				var htmlName='recipe_information_xiyao.html';
				if(orderType==OrderType.TYPE_DTC){
					htmlName='recipe_information_dtc.html';
				}else if(orderType==OrderType.TYPE_DRUGSTORE_ASSIST){
					htmlName='recipe_information_xiyao.html';
				}else if(orderType==OrderType.TYPE_OUTPATIENT || orderType==OrderType.TYPE_OUTPATIENT_ASSIST){
					htmlName='recipe_information_zhongyao.html';
				}
				var reqData = {
					name: htmlName,
					jsonData: {
						isLocal: true, //表示是本地预览处方签
						prescription: {
					        diagnoseDetail: prescriptionData.diagnoseDetail,
					        doctorAccount: APP.userInfo.userAccount,
					        doctorName: APP.userInfo.userName,
					        doctorSign: '',
					        drugCount: prescriptionData.drugCount,
					        drugList: prescriptionDrugList,//药品列表
					        drugstoreName: "",
					        hosCachet: APP.hospitalInfo.hosCachet,
					        hospitalName: APP.hospitalInfo.hospitalName,
					        mainSuit: mainSuit,
					        medicineManAccount: "",
					        medicineManChecked: "0",
					        medicineManSign: "",
					        orderNo: "",
					        orderType: orderType,
					        patientAge: patientAge,
					        patientAgeUnit: patientAgeUnit,
					        patientName: patientName,
					        patientSex: patientSex,
					        patientTelphone: "",
					        prescriptionHead: APP.hospitalInfo.prescriptionHead,
					        prescriptionId: "",
					        prescriptionNo: "",
					        totalMoney: prescriptionData.totalMoney,
					        useDrugAttention: prescriptionData.useDrugAttention,
					        bllx:bllx,
					        blNo:blNo,
					        blDepartment:blDepartment,
					        bedNo:bedNo
				    	}
					}
				};
				RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
					
				});
				
				
			} else {
				console.log('查看处方签.....');
			}
		});
		/**
		 * 选择地址按钮点击事件
		 */
		$('#select_address_btn').click(function() {
			if (APP.isAndroid() || APP.isIos()) {
				var patientTelphone = $('#patient_telphone').val();
				patientTelphone = $.trim(patientTelphone);
				//界面传递数据
				var reqData = {
					name: 'address_picker',
					jsonData: {
						phone: patientTelphone, //病人电话号码
						addressOutpaint: hospitalDefaultAddress, //默认的门诊地址
						addressChoosed: receiverAddress //最近一次选择的地址，首次为空
					}
				};
				RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(data) {
					console.log('选择收货人地址界面返回的数据：' + APP.json2Str(data));
					if(data.result.jsonData){
						receiverAddress=data.result.jsonData;//记录到全局变量
						$('#address_id').val(receiverAddress.id);
						$('#address_phone').html(receiverAddress.mobile);
						$('#address_name').html(receiverAddress.userName);
						$('#address_detail').html(receiverAddress.areaInfo+receiverAddress.address);
					}

				});
			} else {
				//pc测试
				console.log('选择地址........');
			}
		});

	});
});
//----------------------------------------
/**
 * 客户端原生方法调用页面js方法的对象
 */
NativeCallJS = {
	/**
	 * 订单提交
	 */
	orderCommit: function() {
		//病人id
		var patientId=$('#patient_id').val();
		//病人姓名
		var patientName = $('#patient_name').val();
		patientName = $.trim(patientName);
		console.info("patientName:" + patientName);
		if (!patientName) {
			APP.showToast('请输入用户姓名');
			return;
		}
		var patientNameLen=patientName.length;
		if(patientNameLen>10){
			APP.showToast('用户姓名长度不能超过10');
			return;
		}
		//性别
		var patientSex = $("input[name='patient_sex']:checked").val();
		console.info("patient_sex:" + patientSex);
		if (!patientSex) {
			APP.showToast('请选择性别');
			return;
		}
		//是否是婴儿人群
		var patientYerq = $("input[name='patient_yerq']:checked").val();
		if(!patientYerq){
			APP.showToast('请选择是否婴儿人群');
			return;
		}
		console.info("patientYerq:" + patientYerq);
		//年龄
		var patientAge = $("#patient_age").val();
		console.info("patientAge:" + patientAge);
		patientAge = $.trim(patientAge);
		if (!patientAge) {
			APP.showToast('请输入年龄');
			return;
		}
		if(!APP.isNumber(patientAge)){
			APP.showToast('年龄必须是数字');
			return;
		}
		if('1'==patientYerq){//病人是婴儿
			if(parseInt(patientAge)>36){
				APP.showToast('婴儿年龄不能大于36个月');
				return;
			}
		}else{
			if(parseInt(patientAge)<3 || parseInt(patientAge)>200){
				APP.showToast('年龄不能小于3岁或大于200岁');
				return;
			}
		}
		var patientAgeUnit = ''; //年龄单位
		if ('0' == patientYerq) {
			patientAgeUnit = '岁';
		} else {
			patientAgeUnit = '月';
		}
		console.info("patientAgeUnit:" + patientAgeUnit);

		if (isNaN(patientAge)) {
			APP.showToast('年龄必须是数字');
			return;
		}
		//身份证号
		var patientIdCardNo = $('#patient_idCardNo').val();
		patientIdCardNo = $.trim(patientIdCardNo);
		console.log("patientIdCardNo:" + patientIdCardNo);
		if(patientIdCardNo){
			if(!APP.isValidIdCard(patientIdCardNo)){
				APP.showToast('身份证号的格式不正确');
				return;
			}
		}
		//联系电话
		var patientTelphone = $('#patient_telphone').val();
		patientTelphone = $.trim(patientTelphone);
		console.log("patientTelphone:" + patientTelphone);
		if(patientTelphone){
			if(!APP.isValidMobile(patientTelphone)){
				APP.showToast('联系电话的格式不正确');
				return;
			}
		}
		//药物过敏史
		var patientYwgms = $("input[name='patient_ywgms']:checked").val();
		console.log("patientYwgms:" + patientYwgms);
		if(!patientYwgms){
			APP.showToast('请选择是否有药物过敏史');
			return;
		}
		//药物过敏史名称
		var patientYwgmsName = $('#patient_ywgmsName').val();
		patientYwgmsName = $.trim(patientYwgmsName);
		if ('0' == patientYwgms) {
			patientYwgmsName = '';
		} else {
			if (!patientYwgmsName) {
				APP.showToast('请输入药物过敏史');
				return;
			}
			if(patientYwgmsName.length>30){
				APP.showToast('药物过敏史不能多于30字');
				return;
			}
		}
		console.log("patientYwgmsName:" + patientYwgmsName);
		//是否特殊人群&特殊人群种类
		var patientTsrq = '';
		var patientTsrqType = '';
		if(patientSex=='1' || patientYerq=='1'){
			//如果性别是男或是婴儿，则特殊人群必须是否
			patientTsrq='0';
		}else{
			//判断
			var patient_tsrq = $("input[name='patient_tsrq']:checked").val();
			console.log('--------特殊人群选择的值：'+patient_tsrq);
			if (patient_tsrq == '0') {
				patientTsrq = '0';
			} else {
				patientTsrq = '1';
				patientTsrqType = patient_tsrq;
			}
		}
		if(!patientTsrq){
			APP.showToast('请选择是否特殊人群');
			return;
		}
		console.log('patientTsrq:' + patientTsrq + ',patientTsrqType:' + patientTsrqType);
		//是否有肝功能不全
		var patientGgnbq = $("input[name='patient_ggnbq']:checked").val();
		if(!patientGgnbq){
			APP.showToast('请选择是否有肝功能不全');
			return;
		}
		console.log('patientGgnbq:' + patientGgnbq);
		//是否有肾功能不全
		var patientSgnbq = $("input[name='patient_sgnbq']:checked").val();
		if(!patientSgnbq){
			APP.showToast('请选择是否有肾功能不全');
			return;
		}
		console.log('patientSgnbq:' + patientSgnbq);
		//是否有高血压病史&高血压病史等级
		var checkedpatientGxybs=$('.patient_gxybs_incon.check_on');
		var patientGxybs = $(checkedpatientGxybs).attr('val');
		var patientGxybsLeve = '';
		if ('1' == patientGxybs) {
			patientGxybsLeve = $('#patient_gxyLevel').val();
		}
		if(!patientGxybs){
			APP.showToast('请选择是否有高血压病史');
			return;
		}
		console.log('patientGxybs:' + patientGxybs + ',patientGxybsLeve:' + patientGxybsLeve);
		//是否有糖尿病史&糖尿病史类别
		var checkedpatientTnbsbs=$('.patient_tnbs_incon.check_on');
		var patientTnbs = $(checkedpatientTnbsbs).attr('val');
		var patientTnbsType = '';
		if ('1' == patientTnbs) {
			patientTnbsType = $('#patient_tnbType').val();
		}
		if(!patientTnbs){
			APP.showToast('请选择是否有糖尿病史');
			return;
		}
		console.log('patientTnbs:' + patientTnbs + ',patientTnbsType:' + patientTnbsType);
		//是否有心脏病史
		var patientXzbs = $("input[name='patient_xzbs']:checked").val();
		if(!patientXzbs){
			APP.showToast('请选择是否有心脏病史');
			return;
		}
		console.log('patientXzbs:' + patientXzbs);
		//是否有其它特殊疾&其它特殊疾名称
		var patientQttsjb = $("input[name='patient_qttsjb']:checked").val();
		var patientQttsjbName = $('#patient_qttsjb_name').val();
		patientQttsjbName = $.trim(patientQttsjbName);
		if ('0' == patientQttsjb) {
			patientQttsjbName = '';
		} else {
			if (!patientQttsjbName) {
				APP.showToast('请输入其它特殊疾病');
				return;
			}
			if(patientQttsjbName.length>30){
				APP.showToast('其它特殊疾病不能多于30字');
				return;
			}
		}
		if(!patientQttsjb){
			APP.showToast('请选择是否有其他特殊疾病');
			return;
		}
		console.log('patientQttsjb:' + patientQttsjb + ',patientQttsjbName:' + patientQttsjbName);
		//病历类型,1 住院 2门诊
		var bllx = '';
		//取药方式 1到店自取 2配送
		var getDrugWay = '';
		//病历号（住院号或门诊号)
		var blNo = '';
		//医院科室
		var blDepartment = '';
		//病床号
		var bedNo = '';
		//模式B/C才有病历信息等字段
		if (orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_DTC) {
			//获取病历类型
			var checkedBllx=$('.bllx_incon.check_on');
			var bllx=$(checkedBllx).attr('val');
			if(!bllx){
				APP.showToast('请选择病例类型');
				return;
			}
			if ('1' == bllx) { //住院
				blNo = $('#blNo').val();
				blNo = $.trim(blNo);
				blDepartment = $('#blDepartment').val();
				blDepartment = $.trim(blDepartment);
				bedNo = $('#bedNo').val();
				bedNo = $.trim(bedNo);
				if(blNo && blNo.length>20){
					APP.showToast('住院号不能多于20字！');
					return;
				}
				if(blDepartment && blDepartment.length>30){
					APP.showToast('科室信息不能多于30字！');
					return;
				}
				if(bedNo && bedNo.length>20){
					APP.showToast('病床号不能多于20字！');
					return;
				}
			} else if ('2' == bllx) { //门诊
				blNo = $('#blNo').val();
				blNo = $.trim(blNo);
				if(blNo.length>20){
					APP.showToast('门诊号不能多于20字！');
					return;
				}
			}
			//获取取药方式
			//Dtc订单，取药方式选项才生效
			if(orderType == OrderType.TYPE_DTC){
				var checkedGetDrugWay=$('.getDrugWay_incon.check_on');
				getDrugWay=$(checkedGetDrugWay).attr('val');
				if(!getDrugWay){
					APP.showToast('请选择取药方式');
					return;
				}
			}
			
		}
		console.log('bllx:' + bllx + ',getDrugWay:' + getDrugWay + ',blNo:' + blNo + ',blDepartment:' + blDepartment + ',bedNo:' + bedNo);
		//收货信息
		var receiverId='';
		//收货人姓名
		var receiverName = '';
		//收货人电话号码
		var receiverPhone = '';
		//收货人地址
		var receiverAddress = '';
		//如果是dtc订单,而且取药方式是“配送”，获取界面选择的地址
		if (orderType == OrderType.TYPE_DTC && getDrugWay=='2' ) {
			var addr= $('#deliveryAddress').html();//省市区地址
			addr=$.trim(addr);
			if(!addr){
				APP.showToast('请填写配送地址');
				return;
			}
			//收货人姓名
			receiverName = $('#deliveryUserName').val();
			receiverName=$.trim(receiverName);
			if(!receiverName){
				APP.showToast('请填写联系人信息');
				return;
			}
			if(receiverName &&  receiverName.length>20){
				APP.showToast('联系人不能大于20字');
				return;
			}
			//收货人电话号码
			receiverPhone = $('#deliveryPhone').val();
			receiverPhone=$.trim(receiverPhone);
			if(!receiverPhone){
				APP.showToast('请填写联系电话');
				return;
			}
			if(receiverPhone &&  !APP.isValidMobile(receiverPhone)){
				APP.showToast('联系电话手机号码格式不正确');
				return;
			}
			var detailAddr=$('#deliveryDetailAddr').val();
			detailAddr=$.trim(detailAddr);
			if(!detailAddr){
				APP.showToast('请填写详细地址信息');
				return;
			}
			if(detailAddr &&  detailAddr.length>50){
				APP.showToast('详细地址不能大于50字');
				return;
			}
			//收货人地址
			receiverAddress = $('#deliveryAddress').html()+$('#deliveryDetailAddr').val();
		}
		//主诉
		var patientMainSuit = $('#patient_mainSuit').val();
		patientMainSuit = $.trim(patientMainSuit);
		console.log('patientMainSuit:' + patientMainSuit);
		if(patientMainSuit){
			if(patientMainSuit.length>300){
				APP.showToast('主诉不能大于300字');
				return;
			}
		}
		//是否选择自带药品标志
		var hasDrug = $('#hasDrug').val();
		console.log('hasDrug:' + hasDrug);
		if ('1' == hasDrug) {
			if (!selfDrugList || selfDrugList.length < 1) {
				APP.showToast('请选择自带的药品');
				return;
			}
		}
		//图片参数
		var picture1Path = '';
		var picture1Thumpath = '';
		var picture2Path = '';
		var picture2Thumpath = '';
		var picture3Path = '';
		var picture3Thumpath = '';
		var picture4Path = '';
		var picture4Thumpath = '';
		var picture5Path = '';
		var picture5Thumpath = '';

		//获取上传的图片的地址列表
		var uploadedImgList = $('.uploaded_img');
		var picCount = uploadedImgList.length;
		console.info('上传图片的个数：' + picCount);
		if (picCount > 0) {
			picture1Path = $(uploadedImgList[0]).attr('picturePath');
			picture1Thumpath = $(uploadedImgList[0]).attr('pictureThumpath');
		}
		if (picCount > 1) {
			picture2Path = $(uploadedImgList[1]).attr('picturePath');
			picture2Thumpath = $(uploadedImgList[1]).attr('pictureThumpath');
		}
		if (picCount > 2) {
			picture3Path = $(uploadedImgList[2]).attr('picturePath');
			picture3Thumpath = $(uploadedImgList[2]).attr('pictureThumpath');
		}
		if (picCount > 3) {
			picture4Path = $(uploadedImgList[3]).attr('picturePath');
			picture4Thumpath = $(uploadedImgList[3]).attr('pictureThumpath');
		}
		if (picCount > 4) {
			picture5Path = $(uploadedImgList[4]).attr('picturePath');
			picture5Thumpath = $(uploadedImgList[4]).attr('pictureThumpath');
		}
		console.info('图片地址,picture1Path:' + picture1Path + ',picture1Thumpath:' + picture1Thumpath);
		console.info('图片地址,picture2Path:' + picture2Path + ',picture2Thumpath:' + picture2Thumpath);
		console.info('图片地址,picture3Path:' + picture3Path + ',picture3Thumpath:' + picture3Thumpath);
		console.info('图片地址,picture4Path:' + picture4Path + ',picture4Thumpath:' + picture4Thumpath);
		console.info('图片地址,picture5Path:' + picture5Path + ',picture5Thumpath:' + picture5Thumpath);
		//语音参数
		var voice1Path = '';
		var voice2Path = '';
		var voice3Path = '';
		var voice4Path = '';
		var voice5Path = '';
		//获取上传的语音地址列表
		var uploadedVoiceList = $('.uploaded_voice');
		var voiceCount = uploadedVoiceList.length;
		if (voiceCount > 0) {
			voice1Path = $(uploadedVoiceList[0]).attr('abc') + ';' + $(uploadedVoiceList[0]).attr('time');
		}
		if (voiceCount > 1) {
			voice2Path = $(uploadedVoiceList[1]).attr('abc') + ';' + $(uploadedVoiceList[1]).attr('time');
		}
		if (voiceCount > 2) {
			voice3Path = $(uploadedVoiceList[2]).attr('abc') + ';' + $(uploadedVoiceList[2]).attr('time');
		}
		if (voiceCount > 3) {
			voice4Path = $(uploadedVoiceList[3]).attr('abc') + ';' + $(uploadedVoiceList[3]).attr('time');
		}
		if (voiceCount > 4) {
			voice5Path = $(uploadedVoiceList[4]).attr('abc') + ';' + $(uploadedVoiceList[4]).attr('time');
		}
		console.info('语音地址,voice1Path:' + voice1Path);
		console.info('语音地址,voice2Path:' + voice2Path);
		console.info('语音地址,voice3Path:' + voice3Path);
		console.info('语音地址,voice4Path:' + voice4Path);
		console.info('语音地址,voice5Path:' + voice5Path);
		//模式A-申请审处方，至少需要一张图片
		if (orderType == OrderType.TYPE_DRUGSTORE) {
			if (!picture1Path) {
				APP.showToast('请添加图片来描述原处方情况');
				return;
			}
		} else { //其他模式，主诉、图片、语音三种必须有之中
			if (!patientMainSuit && !picture1Path && !voice1Path) {
				APP.showToast('请添加图片来描述原处方情况');
				return;
			}

		}
		//判断该类型的订单是否一定要开好处方
		//dtc订单和结算订单需要先开处方
		if (orderType == OrderType.TYPE_DTC || orderType == OrderType.TYPE_OUTPATIENT) {
			if (prescriptionData.drugList.length < 1) { //未开好处方
				APP.showToast('处方信息不能为空');
				return;
			}
		}
		//如果是DTC订单，则需要传递选择的药店id参数
		var drugStoreId = '';
		if (orderType == OrderType.TYPE_DTC) {
			drugStoreId = prescriptionData.drugStoreId;
		}
	
		//如果是模式B的订单，则需要有收货人地址
		if (orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_OUTPATIENT) {
			//收货人姓名
			receiverName = $('#address_name').html();
			//收货人电话号码
			receiverPhone = $('#address_phone').html();
			//收货人地址
			receiverAddress = $('#address_detail').html();
			//收货人id
			receiverId = $('#address_id').val();
			console.info('收货人地址：' + receiverName + '-' + receiverPhone + '-' + receiverAddress + '-' + receiverId);
			if (!receiverId) {
				APP.showToast('请先选择收货人地址');
				return;
			}
		}
		//封装请求参数
		var bodyParameters = null;
		if (orderType == OrderType.TYPE_DRUGSTORE_ASSIST) {
			//申请开处方类型-南京模式
			bodyParameters = {
					salesmanAccount: APP.userInfo.userAccount, //销售员账号
					salesmanName: APP.userInfo.userName, //销售员姓名
					patientId: patientId, //病人id
					IDCardNo: patientIdCardNo, //病人身份证号
					name: patientName, //病人姓名
					sex: patientSex, //病人性别
					age: patientAge, //病人年龄
					ageUnit: patientAgeUnit, //病人年龄单位
					telphone: patientTelphone, //病人联系电话
					mainSuit: patientMainSuit, //主诉
					ywgms: patientYwgms, //是否有药物过敏史：0无 1有
					ywgmsName: patientYwgmsName, //药物过敏史名称（ywgms为1时有值）
					tsrq: patientTsrq, //是否是特殊人群：0否 1是
					tsrqType: patientTsrqType, //特殊人群种类：1孕妇 2产妇 3哺乳期妇女（tsrq为1时有值）
					ggnbq: patientGgnbq, //是否有肝功能不全:0否 1是
					sgnbq: patientSgnbq, //是否有肾功能不全：0否 1是
					gxybs: patientGxybs, //是否有高血压病史：0否 1是
					gxybsSzyVal: '0', //高血压病史的值-舒张压,默认0
					gxybsSsyVal: '0', //高血压病史的值-收缩压,默认0
					gxybsLevel: patientGxybsLeve, //高血压病史等级：1 一级高血压 2 二级高血压 3 三级高血压
					tnbs: patientTnbs, //是否有糖尿病史：0否 1是
					tnbsType: patientTnbsType, //糖尿病史类别
					xzbs: patientXzbs, //是否有心脏病史：0否 1是
					qttsjb: patientQttsjb, //是否有其他特殊疾病：0否 1是
					qttsjbName: patientQttsjbName, //其他特殊疾病名称（qttsjb为1时有值）
					yerq: patientYerq, //是否是婴儿人群（36个月以内）:0否 1是
					picture1Path: picture1Path, //图片1路径
					picture1Thumpath: picture1Thumpath, //图片1缩略图路径
					picture2Path: picture2Path, //图片2路径
					picture2Thumpath: picture2Thumpath, //图片2缩略图路径
					picture3Path: picture3Path, //图片3路径
					picture3Thumpath: picture3Thumpath, //图片3缩略图路径
					picture4Path: picture4Path, //图片4路径
					picture4Thumpath: picture4Thumpath, //图片4缩略图路径
					picture5Path: picture5Path, //图片5路径
					picture5Thumpath: picture5Thumpath, //图片5缩略图路径
					voice1Path: voice1Path, //语音信息1路径
					voice2Path: voice2Path, //语音信息1路径
					voice3Path: voice3Path, //语音信息1路径
					voice4Path: voice4Path, //语音信息1路径
					voice5Path: voice5Path, //语音信息1路径
					hasDrug: hasDrug, //是否指定药品:0否 1是
					drugList: selfDrugList //自带药品
				}
				//#######发送接口数据
			APP.getData('/hrs/servlet/savePrescriptionOrder', bodyParameters, function(data) {
				if (data.result == '0') {
					APP.showToast('提交成功！');
					//通知订单状态变化
					APP.notifyOrdersChange({});
					//结束activity
					APP.finishH5WithData('create_order.html',{});
				}
			},true,function(){
				//网络超时，回调函数
				APP.finishH5();//结束当前界面
			});
		} else if (orderType == OrderType.TYPE_DRUGSTORE) {
			//申请审处方类型-南京模式
			bodyParameters = {
					patientId: patientId, //病人id
					IDCardNo: patientIdCardNo, //病人身份证号
					name: patientName, //病人姓名
					sex: patientSex, //病人性别
					age: patientAge, //病人年龄
					ageUnit: patientAgeUnit, //病人年龄单位
					telphone: patientTelphone, //病人联系电话
					mainSuit: patientMainSuit, //主诉
					ywgms: patientYwgms, //是否有药物过敏史：0无 1有
					ywgmsName: patientYwgmsName, //药物过敏史名称（ywgms为1时有值）
					tsrq: patientTsrq, //是否是特殊人群：0否 1是
					tsrqType: patientTsrqType, //特殊人群种类：1孕妇 2产妇 3哺乳期妇女（tsrq为1时有值）
					ggnbq: patientGgnbq, //是否有肝功能不全:0否 1是
					sgnbq: patientSgnbq, //是否有肾功能不全：0否 1是
					gxybs: patientGxybs, //是否有高血压病史：0否 1是
					gxybsSzyVal: '0', //高血压病史的值-舒张压,默认0
					gxybsSsyVal: '0', //高血压病史的值-收缩压,默认0
					gxybsLevel: patientGxybsLeve, //高血压病史等级：1 一级高血压 2 二级高血压 3 三级高血压
					tnbs: patientTnbs, //是否有糖尿病史：0否 1是
					tnbsType: patientTnbsType, //糖尿病史类别
					xzbs: patientXzbs, //是否有心脏病史：0否 1是
					qttsjb: patientQttsjb, //是否有其他特殊疾病：0否 1是
					qttsjbName: patientQttsjbName, //其他特殊疾病名称（qttsjb为1时有值）
					yerq: patientYerq, //是否是婴儿人群（36个月以内）:0否 1是
					picture1Path: picture1Path, //图片1路径
					picture1Thumpath: picture1Thumpath, //图片1缩略图路径
					picture2Path: picture2Path, //图片2路径
					picture2Thumpath: picture2Thumpath, //图片2缩略图路径
					picture3Path: picture3Path, //图片3路径
					picture3Thumpath: picture3Thumpath, //图片3缩略图路径
					picture4Path: picture4Path, //图片4路径
					picture4Thumpath: picture4Thumpath, //图片4缩略图路径
					picture5Path: picture5Path, //图片5路径
					picture5Thumpath: picture5Thumpath, //图片5缩略图路径
					voice1Path: voice1Path, //语音信息1路径
					voice2Path: voice2Path, //语音信息1路径
					voice3Path: voice3Path, //语音信息1路径
					voice4Path: voice4Path, //语音信息1路径
					voice5Path: voice5Path //语音信息1路径
				}
				//#######发送接口数据
			APP.getData('/hrs/servlet/saveSimplePrescriptionOrder', bodyParameters, function(data) {
				if (data.result == '0') {
					APP.showToast('提交成功！');
					//通知订单状态变化
					APP.notifyOrdersChange({});
					//结束activity
					APP.finishH5WithData('create_order.html',{});
				}
			},true,function(){
				//网络超时，回调函数
				APP.finishH5();//结束当前界面
			});

		} else if (orderType == OrderType.TYPE_OUTPATIENT || orderType == OrderType.TYPE_OUTPATIENT_ASSIST || orderType == OrderType.TYPE_DTC) { //模式B/C调用统一提交接口
			//先判断医生是否有签名，如果没有签名则直接跳转到用户签名设置界面
			APP.checkMedicalWorkerSign(function(rspData) {
				console.info('判断医师或药师是否有签名结果：' + APP.json2Str(rspData));
				if (rspData.result && rspData.result.signInfo) {
					var signInfo = rspData.result.signInfo; //医生的签名
					bodyParameters = {
						orderType: orderType, //订单类型
						drugStoreId: drugStoreId, //模式B(到院处方模式，开处方时选择的药店id)，其他模式不不要传此参数
						patientId: patientId, //病人id
						IDCardNo: patientIdCardNo, //病人身份证号
						name: patientName, //病人姓名
						sex: patientSex, //病人性别
						age: patientAge, //病人年龄
						ageUnit: patientAgeUnit, //病人年龄单位
						telphone: patientTelphone, //病人联系电话
						mainSuit: patientMainSuit, //主诉
						ywgms: patientYwgms, //是否有药物过敏史：0无 1有
						ywgmsName: patientYwgmsName, //药物过敏史名称（ywgms为1时有值）
						tsrq: patientTsrq, //是否是特殊人群：0否 1是
						tsrqType: patientTsrqType, //特殊人群种类：1孕妇 2产妇 3哺乳期妇女（tsrq为1时有值）
						ggnbq: patientGgnbq, //是否有肝功能不全:0否 1是
						sgnbq: patientSgnbq, //是否有肾功能不全：0否 1是
						gxybs: patientGxybs, //是否有高血压病史：0否 1是
						gxybsSzyVal: '0', //高血压病史的值-舒张压,默认0
						gxybsSsyVal: '0', //高血压病史的值-收缩压,默认0
						gxybsLevel: patientGxybsLeve, //高血压病史等级：1 一级高血压 2 二级高血压 3 三级高血压
						tnbs: patientTnbs, //是否有糖尿病史：0否 1是
						tnbsType: patientTnbsType, //糖尿病史类别
						xzbs: patientXzbs, //是否有心脏病史：0否 1是
						qttsjb: patientQttsjb, //是否有其他特殊疾病：0否 1是
						qttsjbName: patientQttsjbName, //其他特殊疾病名称（qttsjb为1时有值）
						yerq: patientYerq, //是否是婴儿人群（36个月以内）:0否 1是
						bllx: bllx, //病历类型,1 住院 2门诊
						getDrugWay: getDrugWay, //取药方式 1到店自取 2配送
						blNo: blNo, //病历号（住院号或门诊号)
						blDepartment: blDepartment, //医院科室
						bedNo: bedNo, //病床号
						picture1Path: picture1Path, //图片1路径
						picture1Thumpath: picture1Thumpath, //图片1缩略图路径
						picture2Path: picture2Path, //图片2路径
						picture2Thumpath: picture2Thumpath, //图片2缩略图路径
						picture3Path: picture3Path, //图片3路径
						picture3Thumpath: picture3Thumpath, //图片3缩略图路径
						picture4Path: picture4Path, //图片4路径
						picture4Thumpath: picture4Thumpath, //图片4缩略图路径
						picture5Path: picture5Path, //图片5路径
						picture5Thumpath: picture5Thumpath, //图片5缩略图路径
						voice1Path: voice1Path, //语音信息1路径
						voice2Path: voice2Path, //语音信息1路径
						voice3Path: voice3Path, //语音信息1路径
						voice4Path: voice4Path, //语音信息1路径
						voice5Path: voice5Path, //语音信息1路径
						doctorSign: signInfo, //医生签名
						diagnoseDetail: prescriptionData.diagnoseDetail, //临床诊断
						useDrugAttention: prescriptionData.useDrugAttention, //用药注意事项
						receiverName: receiverName, //收货人姓名
						receiverPhone: receiverPhone, //收货人电话号码
						receiverAddress: receiverAddress, //收货人地址
						receiverId: receiverId, //收货人地址id
						drugCount: prescriptionData.drugCount, //药品的付数
						drugList: prescriptionData.drugList //处方的药品列表
					}
					console.log('医生开单提交的数据：' + APP.json2Str(bodyParameters));
					//#######发送接口数据
					APP.getData('/hrs/servlet/saveKcfPrescriptionOrder', bodyParameters, function(data) {
						if (data.result == '0') {
							APP.showToast('提交成功！');
							//通知订单状态变化
							APP.notifyOrdersChange({});
							//结束activity
							APP.finishH5WithData('create_order.html',{});
						}
					},true,function(){
						//网络超时，回调函数
						APP.finishH5();//结束当前界面
					});
				}
			});

		}

	},
	/**
	 * 自选药品选择后页面展示数据
	 * @param {Object} data
	 */
	initSelfDrugList: function(data) {
		//数据
		//data = '[{"drugHouseId":"1459500819728c54383bd6684884b909","drugName":"测试4","universalName":"测试4","norms":"无误","usage":"外用","dosage":"2次/天  1粒","count":"2","patientUsed":"1"},{"drugHouseId":"145379632160c489c4cfa28348f6ae0b","drugName":"测试药品导入1","universalName":"ddddddddd","norms":"2747446.0","usage":"口服","dosage":"1次/天1粒","count":"1","patientUsed":"0"}]';
		console.log('native方法返回的选择药品后的数据：' + data);
		var drugList = APP.str2Json(data);
		$('#drug_list').html(''); //先清除以前的记录
		if (drugList && drugList.length > 0) {
			for (var i = 0; i < drugList.length; i++) {
				var drug = drugList[i];
				var drug_html = '';
				drug_html += '<div class="drug">';
				drug_html += '    <div class="drug_table">';
				drug_html += '        <div class="drugs_b_out">';
				drug_html += '            <div class="name">' + drug.drugName + '（' + drug.universalName + '）</div>';
				drug_html += '            <div class="name_b">规格：' + drug.norms + '</div>';
				drug_html += '        </div>';
				drug_html += '    </div>';
				drug_html += '    <table>';
				drug_html += '        <tbody>';
				drug_html += '            <tr>';
				drug_html += '                <td>';
				drug_html += '                    <div class="heZi">';
				drug_html += '                        <div class="biaoZhu">用法：</div>';
				drug_html += '                        <div class="way">' + drug.usage + '</div>';
				drug_html += '                    </div>';
				drug_html += '                </td>';
				drug_html += '                <td>';
				drug_html += '                    <div class="heZi">';
				drug_html += '                        <div class="biaoZhu">用量：</div>';
				drug_html += '                        <div class="way usageNumber">' + drug.dosage + '</div>';
				drug_html += '                    </div>';
				drug_html += '                </td>';
				drug_html += '                <td>';
				drug_html += '                    <div class="heZi">';
				drug_html += '                        <div class="biaoZhu">数量：</div>';
				drug_html += '                        <div class="way"><span>' + drug.count + '</span></div>';
				drug_html += '                    </div>';
				drug_html += '                </td>';
				drug_html += '            </tr>';
				drug_html += '        </tbody>';
				drug_html += '    </table>';
				drug_html += '    <div class="info_list">';
				drug_html += '        <div class="list_left_drugs">是否使用过该药（必选）：</div>';
				drug_html += '        <div class="inp_box">';
				drug_html += '            <label class="lab_mar">';
				drug_html += '                <div class="rad_out">';
				if (drug.patientUsed == '1') {
					drug_html += '                    <span class="rad_incon check_on"></span>';
				} else {
					drug_html += '                    <span class="rad_incon "></span>';
				}
				drug_html += '                    <input type="radio" name="radio1" class="rad_check">是';
				drug_html += '                </div>';
				drug_html += '            </label>';
				drug_html += '            <label class="lab_mar">';
				drug_html += '                <div class="rad_out">';
				if (drug.patientUsed == '0') {
					drug_html += '                    <span class="rad_incon check_on"></span>';
				} else {
					drug_html += '                    <span class="rad_incon "></span>';
				}
				drug_html += '                    <input type="radio" name="radio1" class="rad_check">否';
				drug_html += '                </div>';
				drug_html += '            </label>';
				drug_html += '        </div>';
				drug_html += '    </div>';
				drug_html += '</div>';
				$('#drug_list').append(drug_html);

			}
		}
	},
	//添加或者长按图片
	getAddOrTouchFile: function(methods, parameters, callback_success) {

		console.info('parameters#########' + APP.json2Str(parameters));
		if (methods == 'chooseFile') { //选择图片
			if (APP.isAndroid() || APP.isIos()) {
				RainbowBridge.callMethod('SysModular', methods, parameters, function(json) {
					if (json.status.code == 0) {
						callback_success(json.result);
					}
				});
			} else {
				respData = {
					files: [{

						url: "http://121.8.131.228:8090/upload/images/20151218/201512181838211081808.jpg",
						urlSub: "http://121.8.131.228:8090/upload/images/20151218/201512181838211081808.jpg",
						desc: "6"

					}]
				}
				callback_success(respData);
			}
		}

		if (methods == 'showConfirmDialog') { //长按弹出对话框
			if (APP.isAndroid() || APP.isIos()) {
				RainbowBridge.callMethod('SysModular', methods, parameters, function(json) {
					if (json.status.code == 0) {
						callback_success(json.result);
					}
				});
			} else {
				respData = {
					confirm: true,
				}
				callback_success(respData);
			}
		}
	}

}