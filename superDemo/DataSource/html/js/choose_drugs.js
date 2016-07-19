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
		//获取用法的选择
		var usage='';
		$('.usage_option').each(function(){
			if($(this).hasClass('check_on')){
				//如果选项已经选择
				usage=$(this).attr('val');//获取选择的值
			}
		});
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

	/**
	 * 用量选择“确定”点击事件
	 */
	$('#dosage_sure_btn').click(function() {
		//获取用量选择
		var dosage='';
		$('.dosage_option').each(function(){
			if($(this).hasClass('check_on')){
				//如果选项已经选择
				dosage=$(this).attr('val');//获取选择的值
			}
		});
		console.log('选择频次：' + dosage);
		if ('其他' == dosage) {
			//其他用法输入框的值
			var otherDosage = $('#otherDosage').val();
			otherDosage = $.trim(otherDosage);
			console.log('otherDosage：' + otherDosage);
			if (!otherDosage) {
				//alert('请输入具体的用量名称！');
				console.log('请输入具体的频次！');
				APP.showToast('请输入具体的频次!');
				return;
			} else {
				if(!APP.isNumber(otherDosage)){
					APP.showToast('频次必须是数字！');
					return;
				}
				if(parseInt(otherDosage)<1){
					APP.showToast('频次必须必须大于0！');
					return;
				}
				dosage = otherDosage + '次/天';
			}
		}
		console.log("最终的频次：" + dosage);
		//获取频次的值
		var frequency = $('#_frequency').val();
		frequency = $.trim(frequency);
		if (!frequency) {
			//alert('请输入频次');
			console.log('请输入每次用量！');
			APP.showToast('请输入每次用量！');
			return;
		}else{
			if(!APP.isNumber(frequency)){
				APP.showToast('每次用量必须是数字！');
				return;
			}
			if(parseInt(frequency)<1){
				APP.showToast('每次用量必须大于0！');
				return;
			}
		}
		console.log("frequency:" + frequency);
		//获取频次的单位
		var frequencyUnit = $('#frequency_unit').html();
		frequencyUnit = $.trim(frequencyUnit);
		if ('' == frequencyUnit || '单位' == frequencyUnit) {
			// alert('请选择频次的单位');
			console.log('请选择每次用量的单位');
			APP.showToast('请选择每次用量的单位！');
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
	 */
	function appendDrugHtml(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed) {
		var drug_html = '';
		drug_html += '<div class="drug">';
		drug_html += '<input type="hidden" class="_drug_id" value="' + drugHouseId + '"/>';
		drug_html += '<input type="hidden" class="_drug_name" value="' + drugName + '"/>';
		drug_html += '<input type="hidden" class="_drug_universalName" value="' + universalName + '"/>';
		drug_html += '<input type="hidden" class="_drug_norms" value="' + norms + '"/>';
		drug_html += '<div class="drug_table">';
		drug_html += '    <div class="drugs_b_out">';
		drug_html += '        <div class="name">' + drugName + '(' + universalName + ')</div>';
		drug_html += '            <div class="name_b">规格：' + norms + '</div>';
		drug_html += '        </div>';
		drug_html += '    </div>';
		drug_html += '    <table class="drugs_table_con">';
		drug_html += '        <tbody>';
		drug_html += '            <tr>';
		drug_html += '                <td>';
		drug_html += '                    <div class="heZi">';
		drug_html += '                        <div class="biaoZhu">用法：</div>';
		drug_html += '                        <div class="way clickWay">' + usage + '</div>';
		drug_html += '                    </div>';
		drug_html += '                </td>';
		drug_html += '                <td>';
		drug_html += '                    <div class="heZi">';
		drug_html += '                        <div class="biaoZhu">用量：</div>';
		drug_html += '                        <div class="way usageNumber">' + dosage + '</div>';
		drug_html += '                    </div>';
		drug_html += '                </td>';
		drug_html += '                <td>';
		drug_html += '                    <div class="heZi">';
		drug_html += '                        <div class="biaoZhu">数量：</div>';
		drug_html += '                        <div class="way"><input type="number" value="' + count + '" class="_drug_count" /></div>';
		drug_html += '                    </div>';
		drug_html += '                </td>';
		drug_html += '            </tr>';
		drug_html += '        </tbody>';
		drug_html += '    </table>';
		drug_html += '    <div class="info_list">';
		drug_html += '        <div class="list_left">是否使用过该药（必选）：</div>';
		drug_html += '        <div class="inp_box">';
		drug_html += '            <label class="lab_mar">';
		drug_html += '                <div class="rad_out">';

		if (patientUsed == 1) {
			drug_html += '                    <span class="rad_incon check_on" ></span>';
			drug_html += '                    <input type="radio" name="rad_check_' + drugHouseId + '" class="rad_check patientUsed" value="1" checked="checked">是';
		} else {
			drug_html += '                    <span class="rad_incon" ></span>';
			drug_html += '                    <input type="radio" name="rad_check_' + drugHouseId + '" class="rad_check patientUsed" value="1">是';
		}

		drug_html += '                </div>';
		drug_html += '            </label>';
		drug_html += '            <label class="lab_mar">';
		drug_html += '                <div class="rad_out">';

		if (patientUsed == 1) {
			drug_html += '                    <span class="rad_incon" ></span>';
			drug_html += '                    <input type="radio" name="rad_check_' + drugHouseId + '" class="rad_check patientUsed" value="0">否';
		} else {
			drug_html += '                    <span class="rad_incon check_on" ></span>';
			drug_html += '                    <input type="radio" name="rad_check_' + drugHouseId + '" class="rad_check patientUsed" value="0" checked="checked">否';
		}

		drug_html += '                </div>';
		drug_html += '            </label>';
		drug_html += '        </div>';
		drug_html += '    </div>  ';
		drug_html += '    <div class="deleteDrug"></div>  ';
		drug_html += '</div>';

		$('#drug_list').append(drug_html);

		//重新绑定“用法”点击框的事件
		$('.clickWay').unbind("click"); //移除click
		$(".clickWay").click(function() {
			a = $(this);
			$(".cover").css("display", "block");
			$(".Instructions").animate({
				"bottom": 0
			}, 300);
		});
		// 重新绑定“用量”点击框的事件
		$('.usageNumber').unbind("click"); //移除click
		$(".usageNumber").click(function() {
			b = $(this);
			$(".cover_useAmount").css("display", "block");
			$(".useAmount").animate({
				"bottom": 0
			}, 300);
		});

		//重新绑定删除的事件
		$('.deleteDrug').unbind("click"); //移除click
		$(".deleteDrug").click(function() {
			$(this).parents(".drug").remove();
		});
		// 重新绑定删除的事件点击“是否使用该药”单选多选图标背景图片
		$('.rad_incon').unbind("click"); //移除click
		$(".rad_incon").click(function() {
			$(this).addClass("check_on");
			$(this).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').removeClass("check_on");
		});
	}

	//必须先初初始化APP的基本信息
	APP.init(function() {
		//获取url带过来的数据
		var dataJsonStr = APP.getLocationParameter('data', '{}');
		console.log('get parameter->data:' + dataJsonStr);
		//获取从上一个界面带过来的药品数据
		var dataJson = APP.str2Json(dataJsonStr);
		var drugList = new Array();
		if (dataJson.drugList) {
			drugList = dataJson.drugList;
		}
		//初始化已经上个界面已经选择的药品数据
		for (var i = 0; i < drugList.length; i++) {
			var drug = drugList[i];
			appendDrugHtml(drug.drugHouseId, drug.drugName, drug.universalName, drug.norms, drug.usage, drug.dosage, drug.count, drug.patientUsed)
		}
		/**
		 * 输入框内容变化触发搜索请求
		 */
		$(".myInp").bind('input', function() {
			inp();
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
					drugStoreId: APP.drugStoreInfo.drugStoreId
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
								var tr = ' <tr index="' + i + '" ><td>' + drugList[i].drugName + '</td><td>' + drugList[i].norms + '</td><td>' + drugList[i].manufacturer + '</td></tr>';
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
								//先判断药品是否在列表中
								if (!checkDrugRepeat(drugHouseId)) {
									//添加一行数据线束
									appendDrugHtml(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed);
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
				var usage = $(drugDivList[i]).find('.clickWay').html(); //用法
				var dosage = $(drugDivList[i]).find('.usageNumber').html(); //用量
				var count = $(drugDivList[i]).find('._drug_count').val(); //数量 
				count = $.trim(count);
				var patientUsed = $(drugDivList[i]).find(".patientUsed:checked").val(); //病人是否使用过
				
				if(!usage){
					APP.showToast('请填写药品用法');
					return;
				}
				if(!dosage){
					APP.showToast('请填写药品用量');
					return;
				}
				//验证用量,用量为0时不能提交
				var dosageFloat=parseFloat(dosage);
				if(dosageFloat==0){
					APP.showToast('药品用量不能为0');
					return;
				}
				if(!count){
					APP.showToast('请填写药品数量');
					return;
				}
				if(!APP.isNumber(count)){
					APP.showToast('药品数量必须是数字');
					return;
				}
				//patientUsed需要转出int格式
				if(patientUsed){
					patientUsed=parseInt(patientUsed);
				}else{
					patientUsed=0;
				}
				//json格式的对象
				var drugJson = {
					drugHouseId: drugHouseId,
					drugName: drugName,
					universalName: universalName,
					norms: norms,
					usage: usage,
					dosage: dosage,
					count: count,
					patientUsed: patientUsed
				}
				drugArray.push(drugJson);
			}
			
			console.log('开好的药品：' + APP.json2Str(drugArray));
			//结束当前界面,并将数据返回
			var jsonData = {
				drugList: drugArray
			}
			APP.finishH5WithData('choose_drugs.html', jsonData);

		});
		//返回上一个界面按钮点击事件
		$('#back_btn').click(function() {
			APP.finishH5();
		});

	});

});