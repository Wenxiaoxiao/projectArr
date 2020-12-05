//公共方法

!(function($) {

    //成定链接隐藏底部
    if(window.location.href.indexOf("chengding")>-1){
        $(".copyright-m").hide();
    }

    //搜易泽
    if(window.location.href.indexOf("baoxiankepu")>-1){
        $(".copyright-w").html("Copyright © 2020武汉搜易泽信息技术有限公司 All Rights Reserved.鄂icp备20010243号");
        $(".copyright-w").addClass("center");
    }

    var channel = $.getQueryString("channel") || "";
    if(channel && channel == "qxjy"){
        $(".copyright-w").html("Copyright © 2019青学教育科技（深圳）有限公司版权所有. 粤ICP备18049950号-1");
        $(".copyright-w").addClass("center");
    }else{
        $(".copyright-right").html("Copyright © 2019梧桐树保险经纪有限公司 All Rights Reserved. 鄂ICP备17019444号&nbsp;&nbsp;保险业务经营许可证：260580000000800鄂公网安备42010302000447号");
    }
    var bdOrigin="bd.baoxiankepu.cn";
    var host=location.host;
    if(bdOrigin.indexOf(host)>-1){
        $('.copyright-m .copyright-left').remove();
        $('.copyright-m .copyright-right').text('Copyright © 2020武汉搜易泽信息技术有限公司 All Rights Reserved.鄂icp备20010243号');
    }

    var lz_tools = $.tools();
    
    var fromsFn = function() {
        return {
            init:function(params){
                insuranceProductId=params.insuranceProductId;
                this.cpNav();
                this.cpNavScroll();
            },
            submitData: function(
                plan,
                name,
                mobile,
                content,
                layerMsg,
                callback
            ) {
                var self = this;
                var urls = ["/source/collect.do",'/source/txCollect.do','source/wxCollect.do'];
                var sourceUrl = location.href;
                var refererUrl = document.referrer || '';
                var userAgent = navigator.userAgent;
                var channel = $.getQueryString("c") || "";
                var send = $.getQueryString("m") || "";
                var executer = $.getQueryString("e") || "";
                var keywords = $.getQueryString("k") || "";
                var planName = $.getQueryString("p") || "";
                var clickId = $.getQueryString('qz_gdt')||"";
                var baseUrl=urls[0]
                var data;
                if(is_gdt==2){
                    //朋友圈
                    var clickId = GetQueryString('gdt_vid');
                    baseUrl=urls[2]
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'accountId' : $.getQueryString("a"),
                        'clickId' : clickId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }else if(is_gdt){
                    //广点通
                    var clickId =$.getQueryString('qz_gdt')||"";
                    baseUrl=urls[1]
                    var data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'clientId' : clientId,
                        'accountId' : accountId,
                        'clickId' : clickId,
                        'actionSetId' : actionSetId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }else{
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }
                $.ajax({
                    url: baseUrl,
                    data: data,
                    type: "POST",
                    dataType: "script",
                    success: function() {
                        afterSubmit();
                        if(result.sendSms==1){
                            wtsTG.smsEvents(data.mobile,function(e){
                                $.ajax({
                                    url: "/source/checkSms.do",
                                    data: {code:e},
                                    type: "GET",
                                    dataType: "script",
                                    success: function() {
                                        if (checkResult.success == 1) {
                                            if($.isFunction(callback)) return callback();
                                            setTimeout(() => {
                                                window.location.href = "/p/success.html";
                                            }, 100);
                                        }else if(checkResult.success == 0){
                                            $(".verify-fk .errorMsg").text("短信验证码错误！")
                                        }
                                    },
                                    error: function() {
                                        $.layerMsg("提交失败");
                                    }
                                });
                            });
                            return
                        }
                        // if(layerMsg != -1){
                        //     self.showResult(layerMsg);
                        // }
                        if($.isFunction(callback)) return callback();
                        setTimeout(() => {
                            window.location.href = "/p/success.html";
                        }, 100);
                        
                    },
                    error: function() {
                        $.layerMsg("提交失败");
                    }
                });
            },
            submitData1: function(
                plan,
                planName,
                name,
                mobile,
                content,
                layerMsg,
                callback
            ) {
                var self = this;
                var urls = ["/source/collect.do",'/source/txCollect.do','source/wxCollect.do'];
                var sourceUrl = location.href;
                var refererUrl = document.referrer || '';
                var userAgent = navigator.userAgent;
                var channel = $.getQueryString("c") || "";
                var executer = $.getQueryString("e") || "";
                var keywords = $.getQueryString("k") || "";
                var planName = planName;
                var clickId = $.getQueryString('qz_gdt')||"";
                var baseUrl=urls[0]
                var data;
                if(is_gdt==2){
                    //朋友圈
                    var clickId = GetQueryString('gdt_vid');
                    baseUrl=urls[2]
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'accountId' : $.getQueryString("a"),
                        'clickId' : clickId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName,
                    }
                }else if(is_gdt){
                    //广点通
                    var clickId =$.getQueryString('qz_gdt')||"";
                    baseUrl=urls[1]
                    var data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'clientId' : clientId,
                        'accountId' : accountId,
                        'clickId' : clickId,
                        'actionSetId' : actionSetId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName,
                    }
                }else{
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : plan,
                        'sourceUrl' : sourceUrl,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'keywords' : keywords,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName,
                    }
                }
                $.ajax({
                    url: baseUrl,
                    data: data,
                    type: "POST",
                    dataType: "script",
                    success: function() {
                        if (result.success == 1) {
                            callback('开始倒计时');
                            $.layerMsg("验证码已发送");
                        }
                    },
                    error: function() {
                        $.layerMsg("提交失败");
                    }
                });
            },
            showResult:function(layerMsg){
                  var layerHtml=
                    '<div class="wts-introduce">'
                    +'	<img src="./lib/images/layer-m-bac.png" alt="" class="top">'
                    +'	<p class="introduce-p">梧桐树保险网—银保监会网销许可的正规平台。我们拥有5000+保险产品解读及咨询能力。我们为您节省保费，买保险不花冤枉钱！</p>'
                    +'	<div class="introduce-btns">'
                    +'      <a href="https://bx.wts999.com/m/exercise/get-gift.html" class="introduce-btn">0元投保</a>'
                    +'		<a href="https://bx.wts999.com/m/index.html#/superPage" class="introduce-btn">保险超市</a>'
                    +'		<a href="https://bx.wts999.com/m/exercise/customization_home.html" class="introduce-btn">方案定制</a>'
                    +'		<a href="https://bx.wts999.com/m/exercise/usersLoves.html" class="introduce-btn">大家都爱买</a>'
                    +'	</div>'
                    +'</div>';
                    if(layerMsg==1){
                        layerHtml=
                            '<div class="wts-introduce">'
                            +'	<img src="./lib/images/layer-m-bac2.png" alt="" class="top">'
                            +'	<p class="introduce-p">梧桐树保险网——银保监会网销许可的正规平台。我们拥有5000+保险产品解读及咨询能力。我们为您节省保费，买保险不花冤枉钱！</p>'
                            +'	<div class="introduce-btns">'
                            +'      <span class="btns"><img src="./lib/images/rtbxfa-1118/5.png" alt=""><i>专业规划师一对一服务</i></span>'
                            +'		<span class="btns"><img src="./lib/images/rtbxfa-1118/6.png" alt=""><i>协助投保</i></span>'
                            +'		<span class="btns"><img src="./lib/images/rtbxfa-1118/7.png" alt=""><i>高端增值服务</i></span>'
                            +'	</div>'
                            +'</div>';
                            layer.open({
                                type: 1
                                ,content: layerHtml
                                ,skin: 'layer-introduce'
                                ,anim: 'up'
                                ,style: 'position:fixed; top:15%; left:50%; width: 9.4rem; padding:0; border:none;background-color: transparent;margin-left:-4.7rem;'
                            });
                            return
                    }
                    layer.open({
                        type: 1
                        ,content: layerHtml
                        ,skin: 'layer-introduce'
                        ,anim: 'up'
                        ,style: 'position:fixed; top:15%; left:50%; width: 9rem; padding:0; border:none;background-color: transparent;margin-left:-4.5rem;'
                    });
            },
            setDate: function () {
                //时间方法
                if($('.beginTime').length>0){
                    var begin = $('.beginTime').attr("data-begin") || "1950-01-01";
                        var end = $('.beginTime').attr("data-end") || "2030-12-31";
                    new Jdate({
                        el: '.beginTime',
                        format: 'YYYY-MM-DD',
                        beginyear: begin.split("-")[0],
                        endyear: end.split("-")[0]
                    })
                    $(".body-container").on("click",".beginTime",function(){
                        // var begin = $(this).attr("data-begin") || "1950-01-01";
                        // var end = $(this).attr("data-end") || "2030-12-31";
                        // $(this).date("beginTime", {
                        //     beginyear: begin.split("-")[0],
                        //     endyear: end.split("-")[0]
                        // })
                    })
                }
            },
            radioEvtClick:function(callBack) {
                //单选框选择
                $(".qm-input").on("click", ".typeRadio", function() {
                    var val = $(this).attr("data-item");
                    $(this).attr("data-check", true).siblings(".typeRadio").attr("data-check", "");
                    $(this).parents('.box-right').attr('data-value',val)
                });
            },
            startFroms:function(data,params,callback){
                var self=this;
                var html=template('fromHtml',{data:data});
                $('.premium-box').html(html)
                this.setDate();
                // document.addEventListener('focusout', function(e) {window.scrollTo(0,document.body.clientHeight)})
                $(".premiumBox input[type='text'],.premiumBox input[type='tel']").bind('input propertychange',function(){
                    $("#errTip").remove();
                    var value = $(this).val();
                    var parent = $(this).parent();
                    var id=parent.attr('id');
                    var name=parent.attr('name').replace(/\ +/g,"").replace(/&nbsp;/gi,'');
                    //新加
                    var errHtml = $('<div id="errTip" style="line-height:0.7rem;">');
                    errHtml.html('<img src="./lib/images/errTip.png" style="width:0.4rem;height:0.4rem;vertical-align: middle;"><span style="color:#d81e06;font-size:0.3rem;margin-left:0.1rem;"></span>');
                    //新加End
                    if(!value){
                        errHtml.find("span").html(name+'尚未填写');
                        parent.append(errHtml);
                    }else if(id==='mobile'){
                        if(!$.regular().isPhone(value)){
                            errHtml.find("span").html('您输入的不是正确的手机号码！');
                            parent.append(errHtml);
                        }
                    }

                })


                $('#subMitBtn').on('click',function(){
                    //提交数据
                    var fromValue=[],names='',mobile='',isSubmit=true;
                    $("#errTip").remove();
                    $(".qm-change").each(function(){
                        var _this=$(this);
                        var item=_this.children('.box-right');
                        var type=$(item).attr('data-type');
                        var id=$(item).attr('id');
                        var name=$(item).attr('name');
                        var value=self.getValue(item,type);
                        //新加
                        var errHtml = $('<div id="errTip" style="line-height:0.7rem;">');
                        errHtml.html('<img src="./lib/images/errTip.png" style="width:0.4rem;height:0.4rem;vertical-align: middle;"><span style="color:#d81e06;font-size:0.3rem;margin-left:0.1rem;"></span>');
                        //新加End
                        if(!value){
                            errHtml.find("span").html(name+'尚未填写');
                            $("#"+id).append(errHtml);
                            // layer.open({
                            //     content: name+'尚未填写'
                            //     ,btn: '我知道了'
                            // });
                            isSubmit=false
                            return false;
                        }else if(id==='mobile'){
                            if(!$.regular().isPhone(value)){
                                errHtml.find("span").html('您输入的不是正确的手机号码！');
                                $("#"+id).append(errHtml);
                                // layer.open({
                                //     content: '您输入的不是正确的手机号码！'
                                //     ,btn: '我知道了'
                                // });
                                isSubmit=false
                                return false;
                            }
                        }
                        if(id==='name'){
                            names=value;
                        }else if(id==='mobile'){
                            mobile=value;
                        }else{
                            fromValue.push({
                                key:name,
                                value:value
                            })
                        }
                        
                    })
                    if(!isSubmit)return;
                    self.submitData(params.title,names,mobile,JSON.stringify(fromValue),params.msg,callback)
                });
                $(".radio-box").on('click',function(){
                    $(this).addClass("active").siblings().removeClass("active");
                    if($(this).hasClass("radio-show-input")) {
                        $(this).find("input").attr("placeholder","");
                    }else{
                        var input = $(this).siblings(".radio-show-input").find("input");
                        input.attr("placeholder",input.attr("text")).val("");
                    }
                });
            },
            setFroms:function(params){
                //初始化表单和校验表单
                var self=this;
                this.initSelect(params.selects);
                // document.addEventListener('focusout', function(e) {window.scrollTo(0,document.body.clientHeight)})
                $('#subMitBtn').click(function(){
                    //提交数据
                    var fromValue=[],names='',mobile='',isSubmit=true;
                    $(".qm-change").each(function(){
                        var _this=$(this);
                        var item=_this.children('.box-right');
                        var type=$(item).attr('data-type');
                        var id=$(item).attr('data-id');
                        var name=$(item).attr('name');
                        var value=self.getValue(item,type);
                        if(!value){
                            layer.open({
                                content: name+'尚未填写'
                                ,btn: '我知道了'
                            });
                            isSubmit=false
                            return false;
                        }else if(id==='mobile'){
                            if(!$.regular().isPhone(value)){
                                layer.open({
                                    content: '您输入的不是正确的手机号码！'
                                    ,btn: '我知道了'
                                });
                                isSubmit=false
                                return false;
                            }
                        }
                        if(id==='name'){
                            names=value;
                        }else if(id==='mobile'){
                            mobile=value;
                        }else{
                            fromValue.push({
                                key:name,
                                value:value
                            })
                        }
                        
                    })
                    if(!isSubmit)return;
                    
                    self.submitData(params.title,names,mobile,fromValue,params.msg)
                })
            },
            initSelect:function(data){
                if(data){
                    var html=''
                    for(var k in data){
                        var start=Number(data[k].section.split('-')[0]);
                        var end=Number(data[k].section.split('-')[1]);
                        for(var n=start;n<end+1;n++){
                            html+='<option value="'+n+data[k].name+'">'+n+data[k].name+'</option>';
                        }
                        $('#'+data[k].id).children('select').html(html)
                    }
                }
            },
            getValue:function(item,type){
                //获取并比对表单值
                var value='';
                if(type==='2' || type==='3'){
                    value=$(item).find('.changes').val();
                }else if(type==='1'){
                    value=$(item).find('.beginTime').val();
                }else if(type==='4'){
                    value=$(item).find('.lz-radio:checked').val();
                }else if(type==='5'){
                    value=$(item).find('select').val();
                }else if(type==='6'){
                    if($(item).find('.radio-box.active').hasClass("radio-show-input")){// 选择了自定义输入
                        value=$(item).find('.radio-box.active input').val();
                    }else{
                        value=$(item).find('.radio-box.active').text();
                    }
                }
                return value;
            },
            /** 
             * 微信分享监听
             * param
             * title-标题
             * img-图片地址
             * desc-描述
             * appId-appId
             */
            shareWx: function(title, img, desc, appId) {
                var appId = appId;
                var title = title;
                var url = location.href.split("#")[0];
                // 调用服务器获取签名
                $.ajax({
                    type: "POST",
                    url: "/tools/wechat/api/getJssdk",
                    data: { appid: appId, url: url },
                    async: false,
                    dataType: "json",
                    success: function(data, isError) {
                        //微信config授权
                        if (!isError) {
                            return;
                        }
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: appId, // 必填，公众号的唯一标识
                            timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                            signature: data.data.signature, // 必填，签名，见附录1
                            jsApiList: [
                                    "onMenuShareTimeline",
                                    "onMenuShareAppMessage",
                                    "onMenuShareQQ"
                                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function() {
                            //分享到朋友圈
                            wx.onMenuShareTimeline({
                                title: title,
                                desc: desc,
                                link: url,
                                imgUrl: img,
                                success: function() {
                                    //$.layerMsg('分享成功！');
                                },
                                cancel: function() {
                                    $.layerMsg("取消分享！");
                                },
                                fail: function(res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                            //分享给朋友
                            wx.onMenuShareAppMessage({
                                title: title,
                                desc: desc,
                                link: url,
                                imgUrl: img,
                                trigger: function(res) {
                                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                                    //alert('发送成功');
                                },
                                success: function(res) {
                                    //$.layerMsg('已分享！');
                                },
                                cancel: function(res) {
                                    $.layerMsg("已取消！");
                                },
                                fail: function(res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                            //alert('已注册获取“发送给朋友”状态事件');
                        });

                        wx.error(function(res) {
                            console.log(res);
                        });
                    }
                });
            },
            getAges:function(start,end){
                var json=[];
                for(var k=start;k<=end;k++){
                    json.push({
                        value:k+'岁'
                    })
                }
                return json;
            },
            scrollFixed:function(){
                //按钮显示隐藏
                if(!$("#showFixed").length){
                    return;
                }
                var showFixedHeight = $("#showFixed").offset().top
                $(window).on("scroll",function(){
                    if($(this).scrollTop()>=showFixedHeight){
                        $(".botton-fixed").addClass("show")
                    }else{
                        $(".botton-fixed").removeClass("show")
                    }
                })
            },
            lazyImg:function(){
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 500
                });//图片懒加载
            },
            inputChange: function (callBack) {
            //输入框监听
            $ ('.qm-input').on ('change', '.changes', function () {
                var name = $ (this).attr ('name');
                var val = $ (this).val ();
                callBack (val, name);
            });
            },
            selectChange: function (callBack) {
            //选择框监听
            $ ('.qm-input').on ('change', 'select', function () {
                var name = $ (this).attr ('name');
                var val = $ (this).val ();
                callBack (val, name);
            });
            },
        };
    };
    $.extend({
        fromsFn: fromsFn,
    });
})(jQuery);

// AlloyLever.config({
//     cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole的CDN地址
//     reportUrl: "",  //错误上报地址
//     reportPrefix: 'qun',    //错误上报msg前缀，一般用于标识业务类型
//     reportKey: 'key1',        //错误上报msg前缀的key，用户上报系统接收存储msg
//     otherReport: {              //需要上报的其他信息
//         uin: 100000
//     },
//     entry:"#console_log"          //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
// })