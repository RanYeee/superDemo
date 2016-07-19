/**
 * Created by zhengxiaoyong on 16/4/18.
 *
 * native结果数据返回格式:
 * var resultData = {
    status: {
        code: 0,//0成功，1失败
        msg: '请求超时'//失败时候的提示，成功可为空
    },
    data: {}//数据,无数据可以为空
};
 协定协议:rainbow://class:port/method?params;
 params是一串json字符串
 */
(function () {
    var doc = document;
    var win = window;
    var ua = win.navigator.userAgent;
    var JS_BRIDGE_PROTOCOL_SCHEMA = "rainbow";
    var increase = 1;
    var RainbowBridge = win.RainbowBridge || (win.RainbowBridge = {});

    var ExposeMethod = {

        callMethod: function (clazz, method, param, callback) {
            var port = PrivateMethod.generatePort();
            if (typeof callback !== 'function') {
                callback = null;
            }
            PrivateMethod.registerCallback(port, callback);
            PrivateMethod.callNativeMethod(clazz, port, method, param);
        },

        onComplete: function (port, result) {
            PrivateMethod.onNativeComplete(port, result);
        }

    };

    var PrivateMethod = {
        callbacks: {},
        registerCallback: function (port, callback) {
            if (callback) {
                PrivateMethod.callbacks[port] = callback;
            }
        },
        getCallback: function (port) {
            var call = {};
            if (PrivateMethod.callbacks[port]) {
                call.callback = PrivateMethod.callbacks[port];
            } else {
                call.callback = null;
            }
            return call;
        },
        unRegisterCallback: function (port) {
            if (PrivateMethod.callbacks[port]) {
                delete PrivateMethod.callbacks[port];
            }
        },
        onNativeComplete: function (port, result) {
            console.info('oncomplete：' + result);
            var resultJson = PrivateMethod.str2Json(result);
            var callback = PrivateMethod.getCallback(port).callback;
            PrivateMethod.unRegisterCallback(port);
            if (callback) {
                //执行回调
                callback && callback(resultJson);
            }
        },
        generatePort: function () {
            return Math.floor(Math.random() * (1 << 50)) + '' + increase++;
        },
        str2Json: function (str) {
            if (str && typeof str === 'string') {
                try {
                    return JSON.parse(str);
                } catch (e) {
                    return {
                        status: {
                            code: 1,
                            msg: 'params parse error!'
                        }
                    };
                }
            } else {
                return str || {};
            }
        },
        json2Str: function (param) {
            if (param && typeof param === 'object') {
                return JSON.stringify(param);
            } else {
                return param || '';
            }
        },
        callNativeMethod: function (clazz, port, method, param) {
        	var jsonStr = PrivateMethod.json2Str(param);
        	jsonStr = encodeURIComponent(jsonStr);
            var uri = JS_BRIDGE_PROTOCOL_SCHEMA + "://" + clazz + ":" + port + "/" + method + "?" + jsonStr;
            if (PrivateMethod.isAndroid()) {
                win.prompt(uri, "");
            }else if(PrivateMethod.isIos()){
            	//获取ios的系统版本
            	var version=PrivateMethod.getIosVersion();
            	console.info('---ios系统版本：'+version);
            	//不同的系统版本原生方法监听的js函数不一样
            	if(version>=9){
            		 win.prompt(uri, "");//ios9及以上监听此函数
            	}else{
            		win.prompt(uri);//ios端需监听此js函数，ios9以下版本
            	}
            }
        },
        isAndroid: function () {
            var tmp = ua.toLowerCase();
            var android = tmp.indexOf("android") > -1;
            return !!android;
        },
        isIos: function () {
            var tmp = ua.toLowerCase();
            console.log('isIos ua:'+tmp);
            //var ios = tmp.indexOf("iphone") > -1;
            var ios = tmp.indexOf("iphone") > -1 || tmp.indexOf("ipod") > -1 || tmp.indexOf("ipad") > -1 || tmp.indexOf("ios") > -1;
            return !!ios;
        },
        /**
         * 获取ios系统的版本号
         */
        getIosVersion:function(){
        	var v=0;
        	if(this.isIos()){
        		try{
        			var tmp = ua.toLowerCase();
		            console.log('isIos ua:'+tmp);
		            //isIos ua:mozilla/5.0 (iphone; cpu iphone os 9_3_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13e238
		            var osIndex=tmp.indexOf('os');//第一串os的位置
		            //从第一串os的位置开始截取，截取结果如：os 9_3_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13e238
		            var osString=tmp.substring(osIndex);
		            //console.log('7777777:'+osString);
		            var vStr=osString.substring(3,4);
		            v=parseInt(vStr);//转出int
        		}catch(e){
        			console.log('getIosVersion exception:'+e);
        		}
        	}
        	return v;
        	
        }
    };
    for (var index in ExposeMethod) {
        if (ExposeMethod.hasOwnProperty(index)) {
            if (!Object.prototype.hasOwnProperty.call(RainbowBridge, index)) {
                RainbowBridge[index] = ExposeMethod[index];
            }
        }
    }
})();


