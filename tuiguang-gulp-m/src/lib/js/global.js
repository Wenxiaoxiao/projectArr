/**
 * Created by Administrator on 2017/8/2.
 */

!(function ($) {
    var browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
                iPhone: u.indexOf('iPhone') > -1, //iPhone
                iPad: u.indexOf('iPad') > -1, //iPad
                webApp: u.indexOf('Safari') > -1, //Safari
                user: u,
            };
        }()
    }
    
    
    $.extend({
        tools: tools,//工具类
        regular: regular,//正则类
        getLocalUrl: function () {
            var url = location.href;
            var num = url.indexOf("?");
            if (num != -1) {
                url = url.substring(0, num);
            }
            return url;
        },//获取基础地址
        getQueryString: getQueryString,//获取地址栏参数
        domain: document.domain,
        //domain :"http://bx.wts999.com/",//正式环境
        indexHtml: function () {
            var url = $.getLocalUrl();
            if (url.indexOf("/market/") > -1 || url.indexOf("/community/") > -1 || url.indexOf("/personal/") > -1) {
                return "../index.html";
            } else {
                return "./index.html";
            }
        },
        errorLogFn:errorLogFn,//错误打印
    });
    console.log($.domain);
    //工具类
    function tools() {
        return {
            android: browser.versions.android,//安卓
            trident: browser.versions.trident, //IE内核
            presto: browser.versions.presto, //opera内核
            webKit: browser.versions.webKit, //苹果、谷歌内核
            gecko: browser.versions.gecko, //火狐内核Gecko
            mobile: browser.versions.mobile, //是否为移动终端
            ios: browser.versions.ios, //ios
            iPhone: browser.versions.iPhone, //iPhone
            iPad: browser.versions.iPad, //iPad
            webApp: browser.versions.webApp, //Safari
            user: browser.versions.user, //Safari
            checkScreen:function (url){
                if(!this.mobile && !this.iPad){
                    location.href=location.href.replace('/m/','/pc/');
                }
            },
            //微信
            isWeiXin: function () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },//微信id
            isDD:function(){
                //判断是不是钉钉
            　　var ua = navigator.userAgent.toLowerCase();
            　　return ua.indexOf("dingtalk") >= 0;
            },
            getWxId: function () {
                var openId=""
                var doman=document.domain;
                if(doman.indexOf("wts9999.net")>-1){
                    //测试环境
                    openId="wx04452e22173121e5";
                }else{
                    //正式环境
                    openId="wx3bbb18bc95bc7cff";
                }
                return openId;
            },
            //获取安卓版本号
            getAnbanben: function () {
                var user = this.user;
                var index = user.indexOf("Android");
                if (index > 0) {
                    return parseFloat(user.slice(index + 8));
                } else {
                    return null;
                }
            },
            // 获取html名称
            pageName: function () {
                var a = location.href;
                var b = a.split("/");
                var c = b.slice(b.length - 1, b.length).toString(String).split(".");
                return c.slice(0, 1);
            },
            //判断null
            isNull: function (exp) {
                if (!exp && typeof exp != "undefined" && exp != 0) {
                    return true;
                } else if (exp == "null") {
                    return true;
                }
                return false;
            },
            //删除地址栏参数
            delQueStr: function (url, ref) {
                var str = "";
                if (url.indexOf('?') != -1) {
                    str = url.substr(url.indexOf('?') + 1);
                }
                else {
                    return url;
                }
                var arr = "";
                var returnurl = "";
                var setparam = "";
                if (str.indexOf('&') != -1) {
                    arr = str.split('&');
                    for (i in arr) {
                        if (arr[i].split('=')[0] != ref) {
                            returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                        }
                    }
                    return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
                }
                else {
                    arr = str.split('=');
                    if (arr[0] == ref) {
                        return url.substr(0, url.indexOf('?'));
                    }
                    else {
                        return url;
                    }
                }
            },
            //获取cookie
            getcookie: function (name) {
                var strcookie = document.cookie;
                var arrcookie = strcookie.split("; ");
                for (var i = 0; i < arrcookie.length; i++) {
                    var arr = arrcookie[i].split("=");
                    if (arr[0] == name)return decodeURIComponent(arr[1]);
                }
                return "";
            },
            //设置本地储存
            setLocal: function (name, value, type) {
                var curTime = new Date().getTime();
                if (!type || type == 2) { //默认设置-之前存在则使用创建时间
                    var data = localStorage.getItem(name);
                    if (!data || data == "null") {
                        localStorage.setItem(name, JSON.stringify({
                            data: value,
                            time: curTime
                        }));
                    } else {
                        var dataObj = JSON.parse(data);
                        var setTime = dataObj.time;
                        localStorage.setItem(name, JSON.stringify({
                            data: value,
                            time: setTime
                        }));
                    }
                } else if (type == 1) { //type:1重新创建
                    localStorage.setItem(name, JSON.stringify({
                        data: value,
                        time: curTime
                    }));
                }
    
            },
            //获取本地储存
            getLocal: function (name, exp) {
                var data = localStorage.getItem(name);
                var dataObj = JSON.parse(data);
                if (!exp) {
                    var exp = 1000 * 60 * 60 * 24 * 3;
                }
                if (dataObj && new Date().getTime() - dataObj.time > exp) {
                    localStorage.removeItem(name);
                    console.log('信息已过期');
                    return null;
                } else {
                    var dataObjDatatoJson = !dataObj ? null : dataObj.data;
                    return dataObjDatatoJson;
                }
            },
            //判断是否是数组
            isArr: function (value) {
                if (value instanceof Array ||
                    (!(value instanceof Object) &&
                        (Object.prototype.toString.call((value)) == '[object Array]') ||
                        typeof value.length == 'number' &&
                        typeof value.splice != 'undefined' &&
                        typeof value.propertyIsEnumerable != 'undefined' &&
                        !value.propertyIsEnumerable('splice'))) {
                    return true;
                } else {
                    return false;
                }
            },
    
            /*
            * 深复制
            * params
            * -destination  被赋值的新对象
            * -source  取值的对象
            * -miss  忽略的对象
            * */
            deepCopy: function (destination, source,miss) {
                for (var p in source) {
                    if($.inArray(p, miss)>-1){
                        return;
                    }
                    if (getType(source[p]) == "array" || getType(source[p]) == "object") {
                        destination[p] = getType(source[p]) == "array" ? [] : {};
                        arguments.callee(destination[p], source[p]);
                    }
                    else {
                        destination[p] = source[p];
                    }
                }
                function getType(o) {
                    var _t;
                    return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
                }
            },
            comeFrom:function(){
                var comeFrom=sessionStorage.getItem("comeFrom");
                if(comeFrom){
                    return comeFrom;
                }else{
                    return "null";
                }
            },
            /*
            * ios页面返回刷新
            * */
            reloadIos: function () {
                var isPageHide = false;
                window.addEventListener('pageshow', function () {
                    if (isPageHide) {
                        window.location.reload();
                    }
                });
                window.addEventListener('pagehide', function () {
                    isPageHide = true;
                });
            },
            //通过媒体端获取code
            //通过媒体端获取code
            getMediaCode:function(){
                //测试
                var channelInfo = document.referrer;
                if(!channelInfo || ""== channelInfo || typeof(channelInfo)== "undefined") {
                    //当cookie无法使用时，优先使用window.name
                    channelInfo = (window.name) ? window.name : "";
                }
                console.log("channelInfo",channelInfo);
                var ourWebsite = [
                    {name:'https://www.baidu.com/baidu.php',code:'word',decode:'utf-8'},
                    {name:'https://m.baidu.com/baidu.php',code:'word',decode:'utf-8'},
                    {name:'http://cpro.baidu.com/cpro/ui/uijs.php',code:'word',decode:'utf-8'},
                    {name:'https://www.baidu.com/s',code:'wd',decode:'utf-8'},
                    {name:'http://www.baidu.com/baidu.php',code:'word',decode:'utf-8'},
                    {name:'https://zhidao.baidu.com/question',code:'word',decode:'utf-8'},
                    {name:'http://youxuan.baidu.com/s',code:'p',decode:'gbk',fliter:'query'},//二次过滤先获取参数p然后获取query
                    {name:'https://m.sogou.com/bill_cpc',code:'keyword',decode:'utf-8'},
                    {name:'https://wap.sogou.com/bill_cpc',code:'keyword',decode:'utf-8'},
                    {name:'http://zhishi.sogou.com/zhishi',code:'keyword',decode:'utf-8'},
                    {name:'http://m.sogou.com/web/searchList.jsp',code:'keyword',decode:'utf-8'},
                    {name:'https://yz.m.sm.cn/s',code:'q',decode:'utf-8'},
                    {name:'https://so.m.sm.cn',code:'q',decode:'utf-8'},
                    {name:'http://m.sm.cn',code:'q',decode:'utf-8'},
                    {name:'http://m.sm.cn',code:'q',decode:'utf-8'},
                    {name:'https://www.so.com',code:'q',decode:'utf-8'},
                ],channelInfo=channelInfo.toLowerCase(),needCode;
                //匹配 网址
                ourWebsite.forEach(function(item){
                    if(channelInfo.indexOf(item.name) !== -1){//存在
                        needCode = item.code
                    }
                })
                return needCode;
            },
            getKeyWords:function(){
                var code = this.getMediaCode();
                var sourceUrl = document.referrer,p;
                var wret = new RegExp("(^|&)" + code + "=([^&]*)(&|$)");
                if (sourceUrl) {
                    var pr = decodeURI(sourceUrl).substr(1).match(wret);
                    console.log("pr",pr);
                    if (!pr) return;
                    p = pr[2];
                }
                return p;
            }
        }
    }
    
    //正则类
    function regular() {
        return {
            //电话号码
            isPhone: function (phone) {
                var pattern = /^1[3,4,5,6,7,8,9]\d{9}$/;
                return pattern.test(phone);
            },
            //邮件
            isEmail: function (email) {
                var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
                return pattern.test(email);
            },
            //姓名
            isName: function (val) {
                var pattern = /^[\u4e00-\u9fa5]{2,10}$|^[\w+\s]{1,20}$/;
                return pattern.test(val);
            },
            //邮编
            isZip: function (val) {
                var pattern = /^[0-9]\d{5}$/;
                return pattern.test(val);
            },
            //身份证
            issfz: function (val) {
                var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return pattern.test(val);
            },
            //数字
            isNum: function (val) {
                var pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
                return pattern.test(val);
            },
            //匹配中英文
            isChAndEn: function (val) {
                var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
                return !pattern.test(val);
            },
            //获取身份证对应的性别和年龄
            getDateSex: function (num) {
                var UUserCard = num;
                var returns = {
                    age: '',
                    sex: ''
                }
                //获取出生日期
                UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                //获取性别
                if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                    //alert("男");
                    returns.sex = 1;
                } else {
                    //alert("女");
                    returns.sex = 2;
                }
                //获取年龄
                var myDate = new Date();
                var month = myDate.getMonth() + 1;
                var day = myDate.getDate();
                var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                    age++;
                }
                //alert(age);
                returns.age = age;
                return returns;
            }
        }
    }

    function getQueryString(name,type) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var search=window.location.search;
        if(type){
            search=decodeURI(search);
        }
        var r = search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
    function errorLogFn() {
        // 错误打印处理
        $("body").append('<script src="./lib/js/alloy-lever.js"></script>');
        $("body").append('<div id="console_log">console</div>');
        AlloyLever.config({
            cdn:'http://s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole的CDN地址
            reportUrl: "http://policy-produce.cn-hangzhou.log.aliyuncs.com/logstores/app/track",  //错误上报地址
            reportPrefix: 'qun',    //错误上报msg前缀，一般用于标识业务类型
            reportKey: 'key1', 
            entry:"#console_log"          //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
        })
    }
    
    // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, true);
})(jQuery);