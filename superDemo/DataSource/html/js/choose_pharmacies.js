/* 
* @Author: liangjie
*/

$(document).ready(function(){
        // 点击切换按钮
        $(".con_top_div").click(function(e) {
            $(this).addClass('store_active').siblings().removeClass('store_active');
        });
        // 切换地图与列表内容
        $('.myLocate').click(function(event) {
            $('.map').css('display','block');
            $('.pharmacy_list').css('display','none');
        });
        $('.myList').click(function(event) {
            $('.map').css('display','none');
            $('.pharmacy_list').css('display','block');
        });
        // 点击下拉选择
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
        })
        $('.rightLi ul li').click(function(){
            $(this).css('color','#65d0e4').siblings().css('color','#000');
            var value = $(this).text();
            $(this).parent().prev('span').text(value)
        })    
});