/* 
* @Author: liangJie
*/
//全局变量，医生账号
var doctorAccount='';
$(document).ready(function(){
    // 点击简介和擅长
    $('.info>p').click(function(){

            if($(this).siblings('.details').css('display') =='none'){
                $(this).find('.directionPic').css('background-image','url(images/ic_down1.png)');
            }else{
                $(this).find('.directionPic').css('background-image','url(images/ic_up1.png)');
            }
            $(this).siblings('.details').slideToggle(120);
    });
    
	//-----------------------------------------------------以下是业务处理的代码-----------------------------------------------------------------------
	//必须先初初始化APP的基本信息
	APP.init(function() {
		var dataJsonStr = APP.getLocationParameter('data', '{"doctorAccount":"csyi14"}');
		console.log('get parameter->data:' + dataJsonStr);
		var dataJson = APP.str2Json(dataJsonStr);
		doctorAccount = dataJson.doctorAccount; //从json数据中获取订单号
		//生成页面的数据
		genPageData();
		/**
		 * "返回按钮"点击事件
		 */
		$('#opt_title').click(function(){
			APP.finishH5();
		});
		//--------------------------------------------------------------------------
	});
    
});


function doctorMain(){
	
}
/**
 * 生成整个界面的数据
 */
function genPageData() {
	//	医生信息
	var reqJSON = {
		account: doctorAccount
	};
	APP.getData("/hrs/servlet/fetchDoctorInfo", reqJSON, function(data) {
		if (data.result == '0') {
			var doctor=data.data;
			//记录医生关键字段-------
			docPic = doctor.docPic;   //医生头像
			docName = doctor.docName;  //医生名字
			hospitalName = doctor.hospitalName; //医院名称
			deptName = doctor.deptName;  // 医生所在科室名称
			description = doctor.description;  //医生简介
			expertArea = doctor.expertArea;   //医生擅长
			var zyType = doctor.zyType;  //职业类型
			var titleText = doctor.titleText; //职称
			var gender = doctor.gender; //医生性别
			console.log('docName:'+docName);
			//医生头像
			$("#docPic").attr("src",docPic);
			//医生姓名
			$("#docName").html(docName);
			//医生性别
			if(gender == "1"){
				$("#docSex").css("background-image","url(images/man.png)");
			}else if(gender == "2"){
				$("#docSex").css("background-image","url(images/girl.png)");			
			}
			if(titleText){
				$("#titleText").html(titleText);
				$("#titleText").show();
			}else{
				$("#titleText").hide();
			}
			
			// 医院名称
			$("#hospitalName").html(hospitalName);
			// 医生所在的科室
			$("#deptName").html(deptName);
			//	医生简介
			$("#docDescription").html(description);
			// 医生擅长
			$("#expertArea").html(expertArea);

		}else {
			//未能获取成功的数据
		}
	})
}
