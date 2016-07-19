/* 
 * @Author: liangjie
 */

$(document).ready(function() {
	var a = null;
	var b = null;
	var hh = "口服";
	var myButtom = $(".Instructions").height();
	var useAmountHeight = $(".useAmount").height();
	$(".Instructions").css("bottom", -myButtom);
	$(".useAmount").css("bottom", -useAmountHeight);

	// ///////////////////////////////////////////////点击用法
	$(".clickWay").click(function() {
		a = $(this);
		$(".cover").css("display", "block");
		$(".Instructions").animate({
			"bottom": 0
		}, 300);
	});
	// 点击用法的遮罩层
	$(".cover").click(function() {
		// alert("2次");            
		$(".Instructions").animate({
			"bottom": -myButtom
		}, 300);
		$(this).css("display", "none");

	});
	//用法点击确定,获取单选框文本内容
	$(".sur").click(function(event) {
		//获取用法选择randio的值
		var usage = $("input[name='usage']:checked").val();
		console.log('选择用法：' + usage);
		if ('其他' == usage) {
			//其他用法输入框的值
			var otherUsage = $('#otherUsage').val();
			otherUsage = $.trim(otherUsage);
			console.log('otherUsage：' + otherUsage);
			if (!otherUsage) {
				console.log('请输入具体的用法名称！');
				APP.showToast('请输入具体的用法名称！');
				return;
			} else {
				usage = otherUsage;

			}
		}
		$(".cover").css("display", "none");
		$(".Instructions").animate({
			"bottom": -myButtom
		}, 300);
		$(a).text(usage);
	});
	// 点击取消,获取单选框文本内容
	$("#cancel_Instr").click(function(event) {
		$(".cover").css("display", "none");
		$(".Instructions").animate({
			"bottom": -myButtom
		}, 300);
		$(a).text("");
	});
	/////////////////////////////////////////////////////////点击用量//////////
	// 点击用量
	$(".usageNumber").click(function() {
		b = $(this);
		$(".cover_useAmount").css("display", "block");
		$(".useAmount").animate({
			"bottom": 0
		}, 300);
	});

	// 点击用量遮罩层
	$(".cover_useAmount").click(function() {
		if ($(".par ul").hasClass("active")) {
			// alert("yes");
			$(this).css("display", "block");
		} else {
			// alert("no")
			$(".useAmount").animate({
				"bottom": -useAmountHeight
			}, 300);
			$(this).css("display", "none");
		};
	});
	// 点击用量弹出框，单位列表消失
	$(".useAmount").click(function() {
		$(".par ul").removeClass("active");
	});
	// 点击删除药品
	$(".deleteDrug_au").click(function() {
		$(this).parents("tr").remove();
	});

	/**
	 * 用量选择“确定”点击事件
	 */
	$('#dosage_sure_btn').click(function() {
		//获取用量选择randio的值
		var dosage = $("input[name='dosage']:checked").val();
		console.log('选择用法：' + dosage);
		if ('其他' == dosage) {
			//其他用法输入框的值
			var otherDosage = $('#otherDosage').val();
			otherDosage = $.trim(otherDosage);
			console.log('otherDosage：' + otherDosage);
			if (!otherDosage) {
				//alert('请输入具体的用量名称！');
				console.log('请输入具体的用量名称！');
				APP.showToast('请输入具体的用量名称!');
				return;
			} else {
				dosage = otherDosage + '次/天';
			}
		}
		console.log("最终的用量：" + dosage);
		//获取频次的值
		var frequency = $('#_frequency').val();
		frequency = $.trim(frequency);
		if (!frequency) {
			//alert('请输入频次');
			console.log('请输入频次！');
			APP.showToast('请输入频次！');
			return;
		}
		console.log("frequency:" + frequency);
		//获取频次的单位
		var frequencyUnit = $('#frequency_unit').html();
		frequencyUnit = $.trim(frequencyUnit);
		if ('' == frequencyUnit || '单位' == frequencyUnit) {
			// alert('请选择频次的单位');
			console.log('请选择频次的单位');
			APP.showToast('请选择频次的单位！');
			return;
		}
		console.log("frequencyUnit:" + frequencyUnit);

		$(b).html(dosage + frequency + frequencyUnit);
		//
		$(".cover_useAmount").css("display", "none");
		$(".useAmount").animate({
			"bottom": -useAmountHeight
		}, 300);

	});
	// 用量弹出层中点击“取消”按钮
	$("#dosage_cancel_btn").click(function(event) {
		$(".cover_useAmount").css("display", "none");
		$(".useAmount").animate({
			"bottom": -useAmountHeight
		}, 300);
	});
	// 点击取消,获取单选框文本内容
	$("#cancel_useAmount").click(function(event) {
		$(".cover_useAmount").css("display", "none");
		$(".useAmount").animate({
			"bottom": -useAmountHeight
		}, 300);
		$(b).text("");
	});

	// 点击单选改变弹出框单选多选图标背景图片
	$(".rad_incon").click(function() {
		$(this).addClass("check_on");
		$(this).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').removeClass("check_on");
	});
	// 点击删除药品
	$(".deleteDrug").click(function() {
		$(this).parents(".drug").remove();
	});

	// 点击选择单位

	$(".otherUsage_right").click(function() {
		$(".par ul").addClass('active');
		return false;
	});

	$(".par ul li").click(function() {
		var liText = $(this).text();
		$(".par ul").removeClass('active')
		$(".otherUsage_right").text(liText);
	});

	// 搜索框筛选出药品效果
	$(".myInp").focus(function(event) {
		$(this).css({
			"background-image": "none",
			"padding-left": ".05rem"
		});
	});
	// $(".myInp").blur(function(event) {
	//     $(this).css({"background":"#fff url(images/ic_sarch_nor.png) .1rem center no-repeat","padding-left":".3rem"});
	//     $(this).css("background-size",".16rem .16rem");
	//     $(this).val("");
	//     $(".deIcon").css("display","none");
	// });
	// 点击搜索药品列表消失
	$(".sou_bo_list tr").click(function(event) {
		$(".sou_bo_list").css("display", "none");
	});

	/**
	 * 判断选择的药品是否已经在已开的药品列表中
	 * @param {Object} drugHouseId
	 */
	function checkDrugRepeat(drugHouseId) {
		//获取药品的数据
		var drugDivList = $("#drug_list .drug");
		for (var i = 0; i < drugDivList.length; i++) {
			var dhID = $(drugDivList[i]).find('._drug_id').val(); //药品id
			if (drugHouseId == dhID) {
				return true;
			}
		}
		return false;
	}
	/**
	 * 生成一行药品的数据信息
	 * @param {Object} drugHouseId 药品id
	 * @param {Object} drugName 药品名称
	 * @param {Object} universalName  药品通用名
	 * @param {Object} norms 药品规则
	 * @param {Object} usage 用法
	 * @param {Object} dosage 用量
	 * @param {Object} count 数量
	 * @param {Object} patientUsed 病人是否使用过该药
	 * @param {Object} price 单价
	 * @param {Object} unit 单位
	 */
	function appendDrugHtml(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed, price, unit) {
		//先把占位空间去掉
		//$('.dataForm .blank_div').remove();
		//如果没有价格，则默认是0
		if (!price) {
			price = 0;
		}
		//对价格做四舍五入保留两位小数显示
		price=Math.round(price*100)/100;
		var drug_html = '';
		drug_html += '<tr class="drug">'
		drug_html += '<input type="hidden" class="_drug_id" value="' + drugHouseId + '"/>';
		drug_html += '<input type="hidden" class="_drug_name" value="' + drugName + '"/>';
		drug_html += '<input type="hidden" class="_drug_universalName" value="' + universalName + '"/>';
		drug_html += '<input type="hidden" class="_drug_norms" value="' + norms + '"/>';
		drug_html += '<input type="hidden" class="_drug_unit" value="' + unit + '"/>';
		drug_html += '<input type="hidden" class="_drug_price" value="' + price + '"/>';
		drug_html += '<input type="hidden" class="_drug_unit" value="' + unit + '"/>';

		drug_html += '  <td>' + drugName + '</td>';
		drug_html += '  <td><input type="number" value="' + count + '" class="num _drug_count"/></td>';
		drug_html += '  <td>' + unit + '</td>';
		drug_html += '  <td><span>' + price + '</span><div class="deleteDrug_au"></div></td>';
		drug_html += '</tr>';

		$('#drug_list').append(drug_html);
		//药品数量输入框发生变化时事件
		$('._drug_count').unbind("change"); //移除change
		$("._drug_count").change(function() {
			genTotalMoney(); //计算总价
		});
		// 点击删除药品
		$('.deleteDrug_au').unbind("click"); //移除change
		$(".deleteDrug_au").click(function() {
			$(this).parents("tr").remove();
			//重新计算总价
			genTotalMoney();
		});
		//重新计算总价
		genTotalMoney();
	}
	/**
	 * 计算总价
	 */
	function genTotalMoney() {
		var drugCount = $('#drugCount').val(); //药品挤数
		drugCount = $.trim(drugCount);
		if (!drugCount || isNaN(drugCount)) {
			$('#totalMoney').html('0');
			return;
		}
		drugCount = parseInt(drugCount); //转成int
		if (drugCount > 0) {
			//获取药品的数据
			var drugDivList = $("#drug_list .drug");
			if (drugDivList.length > 0) {
				var totalMoney = 0;
				for (var i = 0; i < drugDivList.length; i++) {
					var price = $(drugDivList[i]).find('._drug_price').val(); //药品价格
					var count = $(drugDivList[i]).find('._drug_count').val(); //药品数量
					count = parseInt(count);
					price = parseFloat(price);
					totalMoney += count * price;
				}
				totalMoney = totalMoney * drugCount;
				//对总价做四舍五入保留两位小数显示
				totalMoney=Math.round(totalMoney*100)/100;
				$('#totalMoney').html(totalMoney);
			} else {
				$('#totalMoney').html('0');
			}
		} else {
			$('#totalMoney').html('0');
		}

	}

	//必须先初初始化APP的基本信息
	APP.init(function() {
		var opt = ''; //操作类型，0不在处方界面保存数据，只将处方数据返回 1直接在处方界面保存数据
		var orderType = ''; //订单类型
		var orderNo = ''; //订单号
		var prescriptionId = ''; //处方id
		var status='';//订单状态
		//获取url带过来的数据
		var dataJsonStr = APP.getLocationParameter('data', '{}');
		console.log('get parameter->data:' + dataJsonStr);
		//获取从上一个界面带过来的药品数据
		var dataJson = APP.str2Json(dataJsonStr);
		//从参数中操作类型
		if (dataJson.opt) {
			opt = dataJson.opt;
		}
		//从参数中获取订单类型
		if (dataJson.orderType) {
			orderType = dataJson.orderType;
		}
		//从参数中获取订单号
		if (dataJson.orderNo) {
			orderNo = dataJson.orderNo;
		}
		//从参数中获取处方id
		if (dataJson.prescriptionId) {
			prescriptionId = dataJson.prescriptionId;
		}
		//从参数中获取订单状态
		if (dataJson.status) {
			status = dataJson.status;
		}
		if (prescriptionId) { //如果处方id,表示修改处方
			var prescriptionData = dataJson.prescriptionData; //通过参数传递的订单数据
			//调用获取处方信息接口获取处方数据
			var bodyData = {
				prescriptionId: prescriptionId
			}
			APP.getData('/hrs/servlet/getPrescriptionDetail', bodyData, function(data) {
				//处方数据
				var prescription = data.prescription;
				if (prescription) {
					if (prescription.drugList) {
						for (var i = 0; i < prescription.drugList.length; i++) {
							var _drug = prescription.drugList[i];
							var drug = new Drug(_drug.drugHouseId, _drug.drugName, _drug.universalName, _drug.norms, _drug.useage,
								_drug.dosage, _drug.count, _drug.patientUsed, _drug.price, _drug.countUnit); //构造药品对象
							//渲染药品行
							appendDrugHtml(drug.drugHouseId, drug.drugName, drug.universalName,
								drug.norms, drug.usage, drug.dosage, drug.count, drug.patientUsed, drug.price, drug.unit);
						}
					}
					//挤数
					if (prescription.drugCount) {
						$('#drugCount').val(prescription.drugCount);
					}
					//诊断
					if (prescription.diagnoseDetail) {
						$('#diagnoseDetail').val(prescription.diagnoseDetail);
					}
					//用药注意事项
					if (prescription.useDrugAttention) {
						$('#useDrugAttention').val(prescription.useDrugAttention);
					}

				}
			}, true);
		} else { //没有处方id,表示新开处方
			//处方药品数据,如果存在
			if (dataJson.prescriptionData) {
				var prescriptionData = dataJson.prescriptionData;
				var drugList = new Array();
				if (prescriptionData.drugList) {
					drugList = prescriptionData.drugList;
				}
				//挤数
				if (prescriptionData.drugCount) {
					$('#drugCount').val(prescriptionData.drugCount);
				}
				//诊断
				if (prescriptionData.diagnoseDetail) {
					$('#diagnoseDetail').val(prescriptionData.diagnoseDetail);
				}
				//用药注意事项
				if (prescriptionData.useDrugAttention) {
					$('#useDrugAttention').val(prescriptionData.useDrugAttention);
				}

				//初始化已经上个界面已经选择的药品数据
				for (var i = 0; i < drugList.length; i++) {
					var drug = drugList[i];
					appendDrugHtml(drug.drugHouseId, drug.drugName, drug.universalName,
						drug.norms, drug.usage, drug.dosage, drug.count, drug.patientUsed, drug.price, drug.unit);
				}
			}
		}

		/**
		 * 诊断库点击事件，跳转至选择诊断库界面
		 */
		$('#zhenduanku_btn').click(function() {
			var reqData = {
				name: 'diagnose_picker', //目标H5页面的名称
				jsonData: {} //H5之间业务JSON,字段任意
			};
			RainbowBridge.callMethod('SysModular', 'requestH5ForData', reqData, function(rspData) {
				console.log('诊断库界面返回的数据：' + APP.json2Str(rspData));
				if (rspData.result && rspData.result.jsonData) {
					var name = rspData.result.jsonData.name;
					var dd = $('#diagnoseDetail').val();
					dd = $.trim(dd);
					if (dd) {
						$('#diagnoseDetail').val(dd + ',' + name);
					} else {
						$('#diagnoseDetail').val(name);
					}
					//诊断信息长度限制
					diagnoseDetailLenLimit();
				}
			});
		});
		/**
		 * 诊断输入框输入内容变化触发事件
		 */
		$('#diagnoseDetail').bind('input',function(){
			diagnoseDetailLenLimit();
		});
		/**
		 * 诊断信息长度限制
		 */
		function  diagnoseDetailLenLimit(){
			var LenMax=100;//长度限制
			var diagnoseDetail=$('#diagnoseDetail').val();
			diagnoseDetail=$.trim(diagnoseDetail);
			var len=diagnoseDetail.length;
			//超出限制的长度，则截断
			if(len>LenMax){
				diagnoseDetail=diagnoseDetail.substring(0,LenMax);
				$('#diagnoseDetail').val(diagnoseDetail);
				len=diagnoseDetail.length;
			}
			//console.log('诊断输入框输入内容长度：'+len);
			$('#diagnoseDetail_words').html(len);
		}
		/**
		 * 注意事项输入内容变化触发事件
		 */
		$('#useDrugAttention').bind('input',function(){
			var LenMax=100;
			var useDrugAttention=$('#useDrugAttention').val();
			useDrugAttention=$.trim(useDrugAttention);
			var len=useDrugAttention.length;
			//超出限制的长度，则截断
			if(len>LenMax){
				useDrugAttention=useDrugAttention.substring(0,LenMax);
				$('#useDrugAttention').val(useDrugAttention);
				len=useDrugAttention.length;
			}
			//console.log('诊断输入框输入内容长度：'+len);
			$('#useDrugAttention_words').html(len);
		});
		/**
		 * 输入框内容变化触发搜索请求
		 */
		$(".myInp").bind('input', function() {
			inp();
		});
		//挤数输入框发生变化时事件
		$("#drugCount").on('change', function() {
			genTotalMoney(); //计算总价
		});

		/**
		 * 搜索框内容变化触发的搜索方法
		 */
		function inp() {
			if ($(".myInp").val() === "") {
				// alert("no");
				$(".deIcon").css("display", "none");
				$(".sou_bo_list").css("display", "none");
			} else {
				// alert("yes");
				$(".deIcon").css("display", "block");
				//$(".sou_bo_list").css("display","block");
				$('#drug_table').html('');
				//模糊搜索药品信息
				var searchKey = $(".myInp").val();
				//接口请求参数
				var bodyData = {
					searchKey: searchKey,
					drugStoreId: ''
				};
				//获取接口数据
				APP.getData('/hrs/servlet/getDrugHouseListServlet', bodyData, function(data) {
					if ('0' == data.result) {
						$('#drug_table').html('');
						$(".sou_bo_list").css("display", "block");
						if (data.list && data.list.length > 0) {
							var drugList = data.list;
							for (var i = 0; i < drugList.length; i++) {
								var drug = drugList[i];
								var tr = ' <tr index="' + i + '" ><td>' + drugList[i].drugName + '</td><td>' + drugList[i].unit + '</td></tr>';
								$('#drug_table').append(tr);
							}
							//tr得点击事件
							$('#drug_table tr').click(function() {
								//隐藏搜索结果的层
								$(".sou_bo_list").css("display", "none");
								//---------------------------------------------------
								var dataIndex = $(this).attr('index'); //选择的药品对应数据列表drugList的索引
								var drug = drugList[dataIndex];
								var drugHouseId = drug.id; //药品id
								var drugName = drug.drugName; //药品名
								var universalName = drug.universalName; //药品通用名
								var norms = drug.norms; //药品规格
								var usage = drug.usage; //药品默认的用法
								var dosage = drug.description; //药品默认的用量
								var count = 1; //数量默认是1
								var patientUsed = '0'; //病人是否用过，默认是0
								var price = drug.price; //单价，string
								var unit = drug.unit; //单位
								//先判断药品是否在列表中
								if (!checkDrugRepeat(drugHouseId)) {
									//添加一行数据线束
									appendDrugHtml(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed, price, unit);
								} else {
									APP.showToast('已选择该药品！');
								}

								//-----------------------------------------------------------
							});
						}
					} else {

					}
				});

			}
			// 点击删除的图标
			$(".deIcon").click(function() {
				$(".myInp").css({
					"background": "#fff url(images/ic_sarch_nor.png) .1rem center no-repeat",
					"padding-left": ".3rem"
				});
				$(".myInp").css("background-size", ".16rem .16rem");
				$(this).css("display", "none");
				$(".myInp").val('');
				$(".sou_bo_list").css("display", "none");
			});
		}
		/**
		 * 确定按钮点击触发的方法
		 */
		$('#commit_btn').click(function() {
			//获取药品的数据
			var drugDivList = $("#drug_list .drug");
			console.log('药品数量->:' + drugDivList.length);
			if (drugDivList.length < 1) {
				APP.showToast('请选择您需要的药品');
				return;
			}
			var dataErrer = false; //数据是否完整
			var drugArray = new Array();　 //药品数组
			for (var i = 0; i < drugDivList.length; i++) {
				var drugHouseId = $(drugDivList[i]).find('._drug_id').val(); //药品id
				var drugName = $(drugDivList[i]).find('._drug_name').val(); //药品名称
				var universalName = $(drugDivList[i]).find('._drug_universalName').val(); //药品通用名
				var norms = $(drugDivList[i]).find('._drug_norms').val(); //药品规格
				var price = $(drugDivList[i]).find('._drug_price').val(); //药品价格
				var unit = $(drugDivList[i]).find('._drug_unit').val(); //药品单位
				var usage = ''; //用法
				var dosage = ''; //用量
				var count = $(drugDivList[i]).find('._drug_count').val(); //数量 
				count = $.trim(count);
				var patientUsed = '0'; //病人是否使用过
				if (!count) {
					dataErrer = true;
				}
				//patientUsed需要转出int格式
				if (patientUsed) {
					patientUsed = parseInt(patientUsed);
				} else {
					patientUsed = 0;
				}
				//json格式的对象
				var drug = new Drug(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed, price, unit);
				drugArray.push(drug);
			}
			if (dataErrer) {
				APP.showToast('请填写完整的处方药品信息');
				return;
			}
			console.log('开好的药品：' + APP.json2Str(drugArray));
			//获取药品的挤数
			var drugCount = $('#drugCount').val();
			drugCount = $.trim(drugCount);
			if (!drugCount) {
				APP.showToast('请填写挤数');
				return;
			}
			console.log('药品挤数：' + drugCount);
			//重新计算总价
			genTotalMoney();
			var totalMoney = $('#totalMoney').html();
			totalMoney = $.trim(totalMoney);
			if (!totalMoney) {
				totalMoney = '0';
			}
			console.log('药品总价：' + totalMoney);
			//诊断
			var diagnoseDetail = $('#diagnoseDetail').val();
			diagnoseDetail = $.trim(diagnoseDetail);
			if (!diagnoseDetail) {
				APP.showToast('请输入临床诊断信息');
				return;
			}
			//用药注意事项
			var useDrugAttention = $('#useDrugAttention').val();
			useDrugAttention = $.trim(useDrugAttention);
			if (!useDrugAttention) {
				APP.showToast('请输入用药注意事项');
				return;
			}
			console.log('diagnoseDetail：' + diagnoseDetail + ',useDrugAttention:' + useDrugAttention);
			//结束当前界面,并将数据返回
			//根据操作类型决定将数据返回还是在界面保存处方数据
			if (opt == '0') { //将数据返回
				var jsonData = {
					drugList: drugArray,
					drugCount: drugCount,
					totalMoney: totalMoney,
					diagnoseDetail: diagnoseDetail,
					useDrugAttention: useDrugAttention,
					drugStoreId: '',
					drugStoreName: ''
				}
				APP.finishH5WithData('open_prescription_zhongyao.html', jsonData);
			} else if (opt == '1') { ////直接在处方界面保存数据
				//先判断医师有没有签名
				APP.checkMedicalWorkerSign(function(rspData) {
					if (rspData.result && rspData.result.signInfo) {
						var signInfo = rspData.result.signInfo; //签名
						var bodyData = {
							id: prescriptionId, //处方id
							orderNo: orderNo, //订单号
							doctorSign: signInfo, //医生签名
							diagnoseDetail: diagnoseDetail, //诊断
							useDrugAttention: useDrugAttention, //注意事项
							drugCount: drugCount, //药品挤数,西药,默认是1
							drugList: drugArray //药品列表数据

						}
						APP.getData('/hrs/servlet/savePrescription', bodyData, function(data) {
							if ('0' == data.result) {
								var code = data.code;
								//判断是否需要发单显示UI刷新通知,如果是申请协助类型的订单,而且订单状态是“协助中“的状态,则不需发送
								var notifyChange=true;
								if(orderType==OrderType.TYPE_OUTPATIENT_ASSIST && status==OrderState.STATE_14_ASSIT_ING){
									notifyChange=false;
								}
								if ('0' == code) {
									APP.showToast('处方信息保存成功');
									APP.finishH5();
								} else if ('1' == code) {
									APP.showToast('订单已经被取消,无法完成操作');
									APP.finishH5();
								} else if ('2' == code) {
									APP.showToast('订单协助终止，无法完成操作');
									APP.finishH5();
								}
								if(notifyChange){
									APP.notifyOrdersChange({orderNo:orderNo}); //发订单显示UI刷新通知
								}
							}
						}, true);
					}
				});
			}

		});
		//返回上一个界面按钮点击事件
		$('#back_btn').click(function() {
			APP.finishH5();
		});
		//##################延迟订单超时时间设置
		//如果有订单号,先获取订单状态等关键信息
		if(orderNo){
			var bodyData = {
				orderNo: orderNo
			}
			APP.getData('/hrs/servlet/getDzcfOrderHelpStatus',bodyData,function(data){
				if ('0' == data.result) {
					//延迟订单超时时间设置
					APP.resetOrderTimeOut(APP.userInfo.userAccount, orderNo, data.orderType, data.status);
				}
			});
		}
	});

});