/* 
* @Author: liangjie
*/

$(document).ready(function(){
            var k = 1;
            //点击订单详情
            $(".h2Out").click(function(){

                if(k == 1){
                    $(".slet_p").css("display","block");
                    $(".h2Out .apph2").css("background","url(images/ic_up.png) right center no-repeat");
                    $(".h2Out .apph2").css("background-size",".15rem .10rem");
                    k = 0;

                }else if(k == 0){
                    $(".slet_p").css("display","none");
                    $(".h2Out .apph2").css("background","url(images/ic_up_blue.png) right center no-repeat");
                    $(".h2Out .apph2").css("background-size",".09rem .14rem");
                    k = 1;
                }
            });

            // 点击病人信息
            var j = 1;
            $(".pe_info").click(function(){

                if(j == 1){
                    $(".info_out").css("display","none");
                    $(".pe_info p").css("background","url(images/ic_up_blue.png) right center no-repeat");
                    $(".pe_info p").css("background-size",".09rem .14rem");                    
                    j = 0;

                }else if(j == 0){
                    $(".info_out").css("display","block");
                    $(".pe_info p").css("background","url(images/ic_up.png) right center no-repeat");
                    $(".pe_info p").css("background-size",".15rem .10rem");
                    j = 1;
                }
            }); 
  
        // 点击高血压糖尿病是选项弹出底部框

            popUpBox(".hyper",".hypertension"); // 点击高血压是选项弹出底部框
            popUpBox(".diabe",".diabetes"); // 点击糖尿病是选项弹出底部框

            function popUpBox(par1,par2){

                var myButtom = $(par2).height();
                $(par2).css("bottom",-myButtom);  
                $(".div01_pr").css("display","none"); // 控制描述病情一开始隐藏
                        // 点击用法
                $(par1).click(function() {
                    $(".cover").css("display","block")
                    $('html').css('overflow','hidden');  //锁屏
                    $(par2).animate({"bottom": 0}, 300);
                });

                // 点击遮罩层
                $(".cover").click(function() {
                    if($(".par ul").hasClass('active')){
                        $(this).css("display","block");
                    }else{
                        $(this).css("display","none");
                        $('html').css('overflow','auto');  //释放锁屏 
                        $(par2).animate({"bottom": -myButtom}, 300);
                        $(par1).removeClass('check_on');
                        $(par1).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').addClass("check_on")
                    };
                   
                });
                // 选择弹出框列表选项
                var $myLi = $(par2).children("ul").children("li")
                $myLi.click(function() {
                    $(par2).animate({"bottom": -myButtom}, 300);
                    $(".cover").css("display","none");
                    $('html').css('overflow','auto');  //释放锁屏 

                    var $myLiText = $(this).text();
                    var $myText = $(par1).parents(".lab_mar").siblings(".div01_pr").children('.pr_text');
                    $myText.parent().css("display","block");                    
                    $myText.text($myLiText);

                });

            };  

            // 点击单选改变图标背景色
            $(".rad_incon").click(function() {
                $(this).addClass("check_on");
                $(this).parents(".lab_mar").siblings().children('.rad_out').children('.rad_incon').removeClass("check_on");
            })

            clicNo(".hyper_no");  // 点击高血压否选项
            clicNo(".diabe_no");  // 点击点击糖尿病否选项

            function clicNo(par){
                $(par).click(function(){
                    $(this).parents(".lab_mar").siblings(".div01_pr").css("display","none");
                })
            }

            // 点击判断是否是婴儿
            $(".sui").click(function(event) {
                $(".nianLing_text").text("岁");
            });
            $(".yue").click(function(event) {
                $(".nianLing_text").text("个月");
            });

            $(".guomin").css("display","none"); // 一开始隐藏过敏史
            $(".specialDiseases").css("display","none"); // 一开始隐藏疾病

            // 点击判断是否有过敏史/或者特殊疾病
            shuoMing(".allergy_no",".guomin",".allergy_yes");
            shuoMing(".specialDiseases_no",".specialDiseases",".specialDiseases_yue");
            function shuoMing(a,b,c){
                $(a).click(function(event) {
                    $(b).css("display","none");
                });
                $(c).click(function(event) {
                    $(b).css("display","block");
                });
            };

                // 点击到店自取
            $('.rad_incon02').eq(0).click(function(event) {
                $(this).addClass('check_on');
                $('.rad_incon02').eq(1).removeClass("check_on");
                $('.info_list_write').hide();
                $('.info_list_write').eq(0).show();
            });
                // 点击配送
            $('.rad_incon02').eq(1).click(function(event) {
                $(this).addClass('check_on');
                $('.rad_incon02').eq(0).removeClass("check_on");
                $('.info_list_write').show();
                $('.info_list_write').eq(1).hide();
            });
            // 点击住院
            $('.info_list_write').hide();
            $('.info_list_write').eq(0).show();
            $('.hospitalized').click(function(event) {
                $('.hospitalSelect').css('display','block');
                $('.info_list_write').hide();
                $('.info_list_write').eq(0).show();
            });
            // 点击门诊
            $('.Outpatient').click(function(event) {
                $('.hospitalSelect').css('display','none');
                $('.rad_incon02').eq(0).addClass('check_on');
                $('.rad_incon02').eq(1).removeClass('check_on');
                $('.info_list_write').eq(0).css('display','none');
                $('.info_list_write').hide();
                $('.info_list_write').eq(1).show();
            });   

////////////////////////////////////////// 订单详情-点击药品详情切换内容效果
            var g = 1;
            $(".pe_info_drug").click(function() {
                // alert("ok");
                if(g == 1){
                    $(".drugDes").css("display","block");
                    $(".drugH2").addClass('changeBg');
                    g = 0;
                }else if(g == 0){
                    $(".drugDes").css("display","none");
                    $(".drugH2").removeClass('changeBg');
                    g = 1;
                } 
            });    
////////////////////////////////////////// 订单详情-点击药品详情切换内容效果  end  

///////////////// 点击姓名输入姓名弹出姓名信息
            $(".inp_box_name .tex").bind('input',function(){
                inpName();
            })
            function inpName(){
                    if($(".inp_box_name .tex").val()===""){
                        $(".drop_down_selection").css("display","none");
                    }else{
                        $(".drop_down_selection").css("display","block");
                        $('.cover_all').css("display","block");
                    }          
            }
            // 点击搜索药品列表消失
            var name = null;   //初始化名字
            var age = null;    //初始化年龄
            $(".drop_down_selection ul li").click(function(event) {
                $(".drop_down_selection").hide();
                name = $(this).children(".span_neme").html();
                age = $(this).find("i").html();
                $(".inp_box_name .tex").val(name);
                $(".nianLing").val(age);
                if($(this).children(".gender").html()=="女"){    //若是女的，下面单选框自动直接选择女的
                    $(".nv").addClass("check_on");
                    $(".nan").removeClass("check_on");
                }else{
                    $(".nan").addClass("check_on");
                    $(".nv").removeClass("check_on");
                };
                if($(this).find("em").html()=="个月"){    //判断所选的是否是婴儿
                    $(".yue").addClass("check_on");
                    $(".sui").removeClass("check_on");
                    $(".nianLing_text").text("个月");
                }else{
                    $(".yue").removeClass("check_on");
                    $(".sui").addClass("check_on");
                    $(".nianLing_text").text("岁");
                }

            });  
            // 点击空白处
            $('.cover_all').click(function(event) {
                $(".drop_down_selection").hide();
                $(this).hide();
            });
            // 点击指定药品,切换背景图
            $(".add_i").find('i').click(function(e) {
                $(this).toggleClass('check_i');
                $(".drugs_a").toggleClass('a_hide');
            });

            // 对上传图片位置的控制
            $(".liImage>a img").each(function(){
                if($(this).height()<=$(this).width()){
                    $(this).css('margin-top','0px');
                }else{
                    var mar_top = 0.5*($(this).height()-$(this).width());
                    $(this).css('margin-top',-mar_top);
                } 
            })
                  
});