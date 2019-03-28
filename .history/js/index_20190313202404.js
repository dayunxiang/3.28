$(function () {
    //天气  （高德天气）
    $.ajax({
        type: "GET",
        url: 'http://restapi.amap.com/v3/weather/weatherInfo?key=dfb646b25a03a62178eb9598dfb18632&city=北京',
        success: function(data){
            var weatherList = data.lives[0];
            //console.log(weatherList)
            $('#weather').text(weatherList.weather);
            $('#temperature').text(weatherList.temperature+'℃');
            $('#winddirection').text(weatherList.winddirection+'风');
            $('#windpower').text(weatherList.windpower+'级');
        }
    });
    //时间
    function now(){
        var myDate = new Date(),
            h = myDate.getHours(),
            m = myDate.getMinutes(),
            s = myDate.getSeconds(),
            y = myDate.getFullYear(),
            mon = myDate.getMonth() + 1,
            d = myDate.getDate(),
            w = "星期" + "日一二三四五六".split(/(?!\b)/)[myDate.getDay()];
        h < 10 ? h= '0' + h : h;
        m < 10 ? m= '0' + m : m;
        s < 10 ? s= '0' + s : s;
        mon < 10 ? mon= '0' + mon : mon;
        d < 10 ? d= '0' + d : d;
        return{
            time : h+':'+m+':'+s,
            date : y + '年' + mon + '月' + d + '日',
            week : w
        }
    }
    $('#time').text(now().time);
    $('#date').text(now().date);
    $('#week').text(now().week);
    $('#calDate').text(calDay);
    window.setInterval(function () {
        $('#time').text(now().time);
        $('#date').text(now().date);
        $('#week').text(now().week);
        $('#calDate').text(calDay);
    },1000);



    //通知滚动
    $.fn.textScroll = function () {
        var speed = 60, flag = null, tt, that = $(this), child = that.children();
        var p_w = that.width(), w = child.width();
        child.css({left: p_w});
        var t = (w + p_w) / speed * 1000;
        function play(m) {
            var tm = m === undefined ? t : m;
            child.animate({left: -w}, tm, "linear", function () {
                $(this).css("left", p_w);
                play();
                });
        }
        child.on({
            mouseenter: function () {
                var l = $(this).position().left;
                $(this).stop();
                tt = (-(-w - l) / speed) * 1000;
                },
            mouseleave: function () {
                play(tt);
                tt = undefined;
            }
        });
        play();
    };
    $("#scrollBox").textScroll();



    //翻转
    $('.rotate-btn').on('click',function(){
        if(!$(this).parent().parent().hasClass('act')){
            $(this).parent().parent().addClass('act');
        }else{
            $(this).parent().parent().removeClass('act');
        }
    });

    //canvas
    myCanvas = function (cId,cdata,color,color1,threshold) {
        var bnumber = threshold - threshold*0.1
        if (cdata >= threshold) {
            color = color;
            color1 = color1;
        } else if (cdata >= bnumber && cdata < threshold) {
            color = '#ff8602'; 
            color1 = '#5f3406'; 
        } else {
            color = '#c82723'; 
            color1 = '#410704'; 
        }
        var canvas = document.getElementById(cId),
            ctx = canvas.getContext('2d'),
            oW = canvas.width = 115,
            oH = canvas.height = 115,
            oRange= cdata/* .slice(0,-1) */,//数据
            lineWidth = 1,
            // 大半径
            r = (oW / 2),
            cR = r - 10*lineWidth;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        // 水波动画初始参数
        var axisLength = 2*r - 16*lineWidth,  // Sin 图形长度
            unit = axisLength / 9, // 波浪宽
            range = .4 ,// 浪幅
            nowrange = range,
            xoffset = 8*lineWidth, // x 轴偏移量
            data = ~~(oRange) / 100,  // 数据量
            sp = 0, // 周期偏移量
            nowdata = 0,
            waveupsp = 0.006, // 水波上涨速度
            // 圆动画初始参数
            arcStack = [],  // 圆栈
            bR = r-8*lineWidth,
            soffset = -(Math.PI/2), // 圆动画起始位置
            circleLock = true; // 起始动画锁
        // 获取圆动画轨迹点集
        for(var i = soffset; i< soffset + 2*Math.PI; i+=1/(8*Math.PI)) {
            arcStack.push([
                r + bR * Math.cos(i),
                r + bR * Math.sin(i)
            ]);
        }
        // 圆起始点
        var cStartPoint = arcStack.shift();
        ctx.strokeStyle = color;
        ctx.moveTo(cStartPoint[0],cStartPoint[1]);
        // 开始渲染
        render();
        function drawSine () {
            ctx.beginPath();
            ctx.save();
            var Stack = []; // 记录起始点和终点坐标
            for (var i = xoffset; i<=xoffset + axisLength; i+=20/axisLength) {
                var x = sp + (xoffset + i) / unit;
                var y = Math.sin(x) * nowrange;
                var dx = i;
                var dy = 2*cR*(1-nowdata) + (r - cR) - (unit * y);
                ctx.lineTo(dx, dy);
                Stack.push([dx,dy])
            }
            // 获取初始点和结束点
            var startP = Stack[0];
            var endP = Stack[Stack.length - 1];
            ctx.lineTo(xoffset + axisLength,oW);
            ctx.lineTo(xoffset,oW);
            ctx.lineTo(startP[0], startP[1]);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        }
        function _myNumber(data){
            var value = Math.round(parseFloat(data) * 100) / 100;
            var d = value.toString().split(".");
            if (d.length == 1) {
                value = value.toString() + ".00";
                return value;
            }
            if (d.length > 1) {
                if (d[1].length < 2) {
                    value = value.toString() + "0";
                }
                return value;
            }
        }
        function drawText () {
            ctx.globalCompositeOperation = 'source-over';
            var size = 0.6*cR;
            ctx.font = 'bold ' + size + 'px Microsoft Yahei';
            var txt = cdata >= 1 ? cdata + '%' : _myNumber(cdata) + '%';
            var fonty = r + size/2;
            var fontx = r - size * 0.8;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(txt, r+2, r+8);
        }
        //最外面淡黄色圈
        function drawCircle(){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.arc(r, r, cR+7, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }
        //灰色圆圈
        function grayCircle(){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = color1;
            ctx.arc(r, r, cR+2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
        }
        //橘黄色进度圈
        function orangeCircle(){
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            //使用这个使圆环两端是圆弧形状
            ctx.lineCap = 'round';
            ctx.arc(r, r, cR+3,0/* * (Math.PI / 180.0)*/ - (Math.PI / 2),(nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
            ctx.stroke();
            ctx.save();
        }
        //裁剪中间水圈
        function clipCircle(){
            ctx.beginPath();
            ctx.arc(r, r, cR+2, 0, 2 * Math.PI,false);
            ctx.clip();
        }
        //渲染canvas
        function render () {
            ctx.clearRect(0,0,oW,oH);
            //最外面淡黄色圈
            drawCircle();
            //灰色圆圈
            grayCircle();
            //橘黄色进度圈
            orangeCircle();
            //裁剪中间水圈
            clipCircle();
            // 控制波幅
            data = ~~(oRange) / 100;
            if (data >= 0.85) {
                if (nowrange > range/4) {
                    var t = range * 0.01;
                    nowrange -= t;
                }
            } else if (data <= 0.1) {
                if (nowrange < range*1.5) {
                    var t = range * 0.01;
                    nowrange += t;
                }
            } else {
                if (nowrange <= range) {
                    var t = range * 0.01;
                    nowrange += t;
                }
                if (nowrange >= range) {
                    var t = range * 0.01;
                    nowrange -= t;
                }
            }
            if((data - nowdata) > 0) {
                nowdata += waveupsp;
            }
            if((data - nowdata) < 0){
                nowdata -= waveupsp
            }
            sp += 0.07;
            // 开始水波动画
            drawSine();
            // 写字
            drawText();
            requestAnimationFrame(render)
        }
        var $ele = $('#'+cId);
        $ele.siblings('div').css('height',threshold+'px').end().siblings('div').children('span').text(threshold+'%');
    }

    myCanvas('c_1',76,'#13aec0','#06263c',100);
    myCanvas('c_2',76,'#13aec0','#06263c',0);
    myCanvas('c_3',76,'#13aec0','#06263c',50);
    myCanvas('c_4',76,'#13aec0','#06263c',50);
    
    myCanvas('c1',50.53,'#13aec0','#06263c',0);
    myCanvas('c2',25,'#13aec0','#06263c',20);
    myCanvas('c3',70,'#13aec0','#06263c',40);
    myCanvas('c4',70,'#13aec0','#06263c',30);
    myCanvas('c5',0.4,'#13aec0','#06263c',80);
    myCanvas('c6',100,'#13aec0','#06263c',50);


    //工单统计
    var gj = [1600, 1200, 1500, 1900, 1200, 1400, 1500, 2000, 1600];
    function gongdan () {
        var dom = document.querySelector('#echarts_1');
        var myChart = echarts.init(dom);
        option = {
            title: {
                text: '告警工单统计',
                left: 16,
                top: 10,
                textStyle: {
                    fontSize: 22,
                    color: '#00ffff',
                }
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                left: '60%',
                top: '4%',
                textStyle: {
                    fontSize: 14,
                    color: '#ffffff'
                },
                data:['工单','故障定位准确率']
            },
            grid: {
                top: '26%',
                left: '2%',
                right: '4%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['IPRAN', '传输', '动力', '光宽', '核心网', '交换','数据', '无线', '平台'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 15,
                        color: '#fff',
                        fontSize: 14
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 2000,
                    interval: 500,
                    axisLabel: {
                        formatter: function (value, index) {
                            if (index === 0) {
                                return value + '(条)'
                            }
                            return value;
                        },
                        margin: 20,
                        color: '#fff',
                        fontSize: 18
                    }
                },
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 100,
                    interval: 25,
                    axisLabel: {
                        formatter: '{value} %',
                        margin: 20,
                        color: '#fff',
                        fontSize: 18
                    }
                }
            ],
            series: [
                {
                    name: '工单',
                    type: 'bar',
                    barWidth: '30%',
                    data: gj,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#24cef8' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#137bc9' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                {
                    name: '故障定位准确率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [75, 60, 70, 90, 50, 60, 100, 80, 75],
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#43cf42' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#43cf42' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                }
            ],
            animationEasing: 'linear',
            animationDurationUpdate: function (idx) {
                return idx *100;
            }
        };
        myChart.setOption(option);
    };
    gongdan(gj);
    /* window.setInterval(function(){
        $('#echarts_1').remove();
        $('#gongdan').append("<div id='echarts_1'></div>")
        gongdan();
    },5000); */

    //告警趋势
    function gaojing(){
        var dom = document.querySelector('#echarts_2');
        var myChart = echarts.init(dom);
        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: 20,
                data: ['IPRAN脱网数', '基站断站数'],
                textStyle: {
                    color: '#eff9ff',
                    fontSize: 14
                },
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
                axisLabel: {
                    margin: 15,
                    fontSize: 18,
                    color: '#eff9ff',
                    formatter: function (value, index) {
                        if (index === 0) {
                            return value + '(天)'
                        }
                        return value;
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 2500,
                    interval: 500,
                    axisLabel: {
                        margin: 20,
                        fontSize: 18,
                        color: '#eff9ff',
                        formatter: function (value, index) {
                            if (index === 0) {
                                return value + '(个)'
                            }
                            return value;
                        }
                    }
                },
            ],
            series: [{
                name: 'IPRAN脱网数',
                color: '#d3802b',
                data: [2300, 1582, 1000, 934, 500, 300, 10, 400, 600, 1000, 1200, 1500, 2000, 1800],
                type: 'line',
                smooth: true
            },
            {
                name: '基站断站数',
                color: '#25b06e',
                data: [2000, 1200, 701, 444, 120, 200, 500, 1000, 1200, 1100, 1300, 1300, 1500, 1400],
                type: 'line',
                smooth: true
            }]
        };
        
        
        myChart.setOption(option);
    };
    gaojing();
    window.setInterval(function(){
        $('#echarts_2').remove();
        $('#gaojing').append("<div id='echarts_2'></div>")
        gaojing();
    },5000);


    //工单监控数字刷新
    function numAnimation(){
        var options = {
            useEasing: true, 
            useGrouping: true,
            separator: ',',	
            decimal: '.',	
            prefix: '',	
            suffix: ''
        };
        // CountUp(参数一, 参数二, 参数三, 参数四, 参数五, 参数六)
		// 参数一: 数字所在容器
		// 参数二: 数字开始增长前的默认值(起始值),一般从 0 开始增长
		// 参数三: 数字增长后的最终值(data)
		// 参数四: 数字小数点后保留的位数
		// 参数五: 数字增长特效的时间
        // 参数六: 其他配置项
        //实际上线参数二为数据老值  参数三为数据新值
        new CountUp("num_zq_1", 70, 80, 0, 3, options).start();
        new CountUp("num_zq_2", 8, 10, 0, 3, options).start();
        new CountUp("num_zq_3", 30, 30, 0, 3, options).start();
        new CountUp("num_yd_1", 50, 50, 0, 3, options).start();
        new CountUp("num_yd_2", 80, 100, 0, 3, options).start();
        new CountUp("num_yd_3", 50, 60, 0, 3, options).start();
        new CountUp("num_kd_1", 120, 150, 0, 3, options).start();
        new CountUp("num_kd_2", 180, 200, 0, 3, options).start();
        new CountUp("num_kd_3", 120, 130, 0, 3, options).start();
        new CountUp("num_wl_1", 150, 180, 0, 3, options).start();
        new CountUp("num_wl_2", 10, 20, 0, 3, options).start();
        new CountUp("num_wl_3", 70, 90, 0, 3, options).start();
    };
    window.setInterval(numAnimation,10000);


    //点击返回按钮返回链接列表
    $('#back-home').on('click',function(){
        $('#iframe').attr('src','');
        $(this).hide();
        $('.link-list-1,.link-list-2').show();
    });

    //链接列表
    $('#link-list').on('click','li',function(){
        var $iframe = $('#iframe');
        var $this = $(this);
        var $btnId = $this.attr('id');
        if($this.hasClass('disabled')) return;
        $('#back-home').show();
        $('.link-list-1,.link-list-2').hide();
        switch($btnId){
            case 'link_0':
            $iframe.attr('src','http://219.141.137.11:2003/nos/LiquidBigview/index.html?moniSchemaId=0')
            break;
            case 'link_1':
            $iframe.attr('src','http://106.37.68.12:8181/cloud/npage/index.html')
            break;
            case 'link_2':
            $iframe.attr('src','')
            break;
            case 'link_3':
            $iframe.attr('src','https://219.141.149.194/index.php')
            break;
            case 'link_4':
            $iframe.attr('src','https://219.141.148.18:8080/rssmc/index.jsp')
            break;
            case 'link_5':
            $iframe.attr('src','http://172.19.108.18:8088/')
            break;
            case 'link_6':
            $iframe.attr('src','http://136.38.55.20')
            break;
            case 'link_7':
            $iframe.attr('src','https://idc.bj189.cn/sys/login3.jsp')
            break;
            case 'link_8':
            $iframe.attr('src','https://136.39.250.205:8443/')
            break;
            case 'link_9':
            $iframe.attr('src','http://42.99.0.100:55001/')
            break;
            case 'link_10':
            $iframe.attr('src','http://59.43.51.136:2016/login')
            break;
            case 'link_11':
            $iframe.attr('src','http://180.149.129.243:8080/isms/login.do;jsessionid=3D60F32D08AEC5FEAD90185C21905767')
            break;
            case 'link_12':
            $iframe.attr('src','https://172.16.16.8/navigate/index')
            break;
            case 'link_13':
            $iframe.attr('src','https://10.62.226.211:4567/index.html ')
            break;
            case 'link_14':
            $iframe.attr('src','http://136.37.49.6:8080/bj_commonui/index.jsp')
            break;
            case 'link_15':
            $iframe.attr('src','https://10.62.226.211:4567/index.html ')
            break;
            case 'link_16':
            $iframe.attr('src','http://www.damddos.com/attackDemo.html')
            break;
            case 'link_17':
            $(iframe).attr('src','')
            break;
            case 'link_18':
            $(iframe).attr('src','http://172.19.101.180:58045/ucas/login')
            break;
            case 'link_19':
            $(iframe).attr('src','')
            break;
            case 'link_20':
            $(iframe).attr('src','http://136.38.55.20')
            break;
            case 'link_21':
            $(iframe).attr('src','http://219.141.148.56:3366/session/new')
            break;
            case 'link_22':
            $(iframe).attr('src','')
            break;
            case 'link_23':
            $(iframe).attr('src','')
            break;
            case 'link_24':
            $(iframe).attr('src','http://132.63.13.7:2003/nms/login.jsp')
            break;
            case 'link_25':
            $(iframe).attr('src','https://136.44.37.130:8443/ETS_NINETEEN/pages/nineteen.jsp')
            break;
            case 'link_26':
            $(iframe).attr('src','')
            break;
            case 'link_27':
            $(iframe).attr('src','http://10.62.226.176:7015/JZSH-WEB/')
            break;
            case 'link_28':
            $(iframe).attr('src','')
            break;
            case 'link_29':
            $(iframe).attr('src','http://172.19.10.129:9080/bjts/')
            break;
            case 'link_30':
            $(iframe).attr('src','')
            break;
            case 'link_31':
            $(iframe).attr('src','https://136.44.37.130:8443/portal/service/main/index')
            break;
            case 'link_32':
            $(iframe).attr('src','http://132.63.13.9:2016/nms/login.jsp')
            break;
            case 'link_33':
            $(iframe).attr('src','http://132.32.3.160:8888/jthxwg/')
            break;
            case 'link_34':
            $(iframe).attr('src','http://132.63.13.7:2003/nms/login.jsp')
            break;
            case 'link_35':
            $(iframe).attr('src','https://136.37.76.152:8443/')
            break;
            case 'link_36':
            $(iframe).attr('src','https://136.36.48.49:8443/common/assets/htmls/login/login.html')
            break;
            case 'link_37':
            $(iframe).attr('src','http://132.33.18.31/ucenter/login')
            break;
            case 'link_38':
            $(iframe).attr('src','http://132.33.18.55:9902/')
            break;
            case 'link_39':
            $(iframe).attr('src','')
            break;
            case 'link_40':
            $(iframe).attr('src','http://136.38.59.4:8080/ponFrame/')
            break;
            case 'link_41':
            $(iframe).attr('src','')
            break;
            case 'link_42':
            $(iframe).attr('src','')
            break;
            case 'link_43':
            $(iframe).attr('src','http://10.62.233.180:7001/ZNFX/')
            break;
            case 'link_44':
            $(iframe).attr('src','https://10.62.233.161:8090/YJBZZH2/')
            break;
            case 'link_45':
            $(iframe).attr('src','http://10.62.233.178:8088/fwbz/login')
            break;
            case 'link_46':
            $(iframe).attr('src','http://10.62.226.152:8080/custdegra')
            break;
            case 'link_47':
            $(iframe).attr('src','http://10.62.232.153:58045/ucas/login')
            break;
            case 'link_48':
            $(iframe).attr('src','')
            break;
            case 'link_49':
            $(iframe).attr('src','http://10.62.233.177:7015/userman/')
            break;
            case 'link_50':
            $(iframe).attr('src','http://10.116.1.30/cas/login')
            break;
            case 'link_51':
            $(iframe).attr('src','')
            break;
            case 'link_201':
            $(iframe).attr('src','http://10.62.226.152:8080/custdegra')
            break;
            case 'link_202':
            $(iframe).attr('src','')
            break;
            case 'link_203':
            $(iframe).attr('src','')
            break;
            case 'link_204':
            $(iframe).attr('src','https://idc.bj189.cn/sys/login3.jsp')
            break;
            case 'link_205':
            $(iframe).attr('src','http://42.99.0.100:55001/')
            break;
            case 'link_206':
            $(iframe).attr('src','http://10.62.233.178:8088/fwbz/login')
            break;
            case 'link_207':
            $(iframe).attr('src','http://10.62.233.180:7001/ZNFX/')
            break;
            case 'link_208':
            $(iframe).attr('src','http://10.62.232.153:58045/ucas/login')
            break;
            case 'link_209':
            $(iframe).attr('src','http://136.38.55.20')
            break;
            case 'link_210':
            $(iframe).attr('src','')
            break;
            case 'link_211':
            $(iframe).attr('src','')
            break;
            case 'link_212':
            $(iframe).attr('src','http://172.19.10.129:9080/bjts/')
            break;
            case 'link_213':
            $(iframe).attr('src','')
            break;
            case 'link_214':
            $(iframe).attr('src','http://59.43.51.136:2016/login')
            break;
            case 'link_215':
            $(iframe).attr('src','http://132.32.3.160:8888/jthxwg/')
            break;
            case 'link_216':
            $(iframe).attr('src','http://136.37.49.6:8080/bj_commonui/index.jsp')
            break;
            case 'link_217':
            $(iframe).attr('src','https://10.62.226.211:4567/index.html')
            break;
            case 'link_218':
            $(iframe).attr('src','https://219.141.149.194/index.php')
            break;
            case 'link_219':
            $(iframe).attr('src','https://219.141.148.18:8080/rssmc/index.jsp')
            break;
            case 'link_220':
            $(iframe).attr('src','https://172.16.16.8/navigate/index')
            break;
            case 'link_221':
            $(iframe).attr('src','http://180.149.129.243:8080/isms/login.do;jsessionid=3D60F32D08AEC5FEAD90185C21905767')
            break;
            case 'link_222':
            $(iframe).attr('src','http://www.damddos.com/attackDemo.html')
            break;
            case 'link_223':
            $(iframe).attr('src','http://106.37.68.12:8181/cloud/npage/index.html')
            break;
            case 'link_224':
            $(iframe).attr('src','')
            break;
            case 'link_225':
            $(iframe).attr('src','https://10.62.233.161:8090/YJBZZH2/')
            break;
            case 'link_226':
            $(iframe).attr('src','http://132.63.13.9:2016/nms/login.jsp')
            break;
        }
    });


    



    //右侧三分之一屏
    


    //天/周切换
    $('#tab').on('click','li',function(){
        var $this = $(this);
        $this.addClass('act').siblings().removeClass('act');
        var $index = $this.index();
        $index === 0 ? '' : '';
    });


    //攻击总数
    /* function gongji(){
        var myChart = echarts.init(document.getElementById('chart_1'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: 10,
                data: ['攻击总数','攻击IP地址总数','攻击流量'],
                textStyle: {
                    color: '#00ffff',
                    fontSize: 24
                },
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap : false,
                data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
                axisLabel: {
                    margin: 15,
                    fontSize: 18,
                    color: '#eff9ff',
                    formatter: function (value, index) {
                        if (index === 0) {
                            return value + '(天)'
                        }
                        return value;
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 2000,
                    interval: 500,
                    axisLabel: {
                        margin: 20,
                        fontSize: 18,
                        color: '#eff9ff',
                        formatter: function (value, index) {
                            if (index === 0) {
                                return value + '(个/G)'
                            }
                            return value;
                        }
                    }
                },
            ],
            series: [{
                name: '攻击总数',
                color: '#ff0000',
                data: [500, 1582, 1000, 934, 500, 300, 10, 400, 600, 1000, 1200, 1500, 2000, 1800],
                type: 'line',
                smooth: true
            },{
                name: '攻击IP地址总数',
                color: '#fbad1c',
                data: [300, 1082, 500, 1134, 1500, 1300, 800, 1400, 1800, 500, 200, 500, 1000, 900],
                type: 'line',
                smooth: true
            },{
                name: '攻击流量',
                color: '#43cf42',
                data: [1500, 1582, 300, 1934, 1500, 1800, 1000, 1500, 1000, 500, 1300, 800, 1000, 1200],
                type: 'line',
                smooth: true
            }]
        };
        myChart.setOption(option);
    }
    gongji();
    window.setInterval(function(){
        $('#chart_1').remove();
        $('#chart_1_w').append("<div id='chart_1'></div>")
        gongji();
    },5000); */


    //IDC城域网切换
    $('#tab_idc').on('click',function(){
        var $this = $(this);
        $this.children('ul').slideDown();
        $this.children('i').addClass('act');
    });
    $('#tab_idc ul').on('click','li',function(){
        var $this = $(this);
        $('#tab_idc').children('span').text($this.text());
        $this.parent('ul').siblings('i').removeClass('act');
        $this.parent('ul').slideUp();
        if($this.text() === 'IDC数据网流量'){
            $('#mynetwork').show();
            $('#mynetwork_1').hide();
        }else if($this.text() === '城域网数据流量'){
            $('#mynetwork').hide();
            $('#mynetwork_1').show();
        }
        return false;
    });

    //关闭IDC数据展示
    $('#close_idc').on('click',function(){
        $('#con_idc').hide();
    });



    //右下角折线图
    function idc() {
        var dom = document.querySelector('#echarts_last');
        var myChart = echarts.init(dom);
        option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15'],
                axisLabel: {
                    margin: 20,
                    fontSize: 14,
                    color: '#ffffff',

                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 2500,
                    interval: 500,
                    axisLabel: {
                        margin: 20,
                        fontSize: 18,
                        color: '#ffffff',

                    }
                },
            ],
            series: [{
                name: '流入',
                data: [250, 750, 1100, 1500, 1200, 1300, 1400, 2200, 1330, 900],
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(255,118,215,0.8)'
                            }, {
                                offset: 0.5, color: 'rgba(255,118,215,0.5)'
                            }, {
                                offset: 1, color: 'rgba(255,118,215,0)'
                            }]
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "rgba(255,118,215,1)",
                        lineStyle: {
                            color: "rgba(255,118,215,1)"
                        }
                    }
                }
            },
            {
                name: '流出',
                data: [0, 1000, 1300, 2200, 1800, 1500, 800, 900, 1130, 1100],
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(255,221,113,0.8)'
                            }, {
                                offset: 0.5, color: 'rgba(255,221,113,0.5)'
                            }, {
                                offset: 1, color: 'rgba(255,221,113,0)'
                            }]
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "rgba(255,221,113,1)",
                        lineStyle: {
                            color: "rgba(255,221,113,1)"
                        }
                    }
                }
            }
            ]
        };

        myChart.setOption(option);
    };

    idc();
    window.setInterval(function(){
        $('#echarts_last').remove();
        $('#idc').append("<div id='echarts_last'></div>")
        idc();
    },5000);



    //拓扑图canvas连接线
    //IDC
    (function () {
        var canvas = document.getElementById('canvas_1');
        var ctx = canvas.getContext("2d");
        //曲线
        function drawLine_c(x1,y1,x2,y2,x3,y3){
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.quadraticCurveTo(x2,y2,x3,y3);
            ctx.strokeStyle = '#767783';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        //直线
        function drawLine(x1,y1,x2,y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#767783';
            ctx.stroke();
        }

        drawLine_c(500,940,650,900,900,940);
        drawLine_c(1040,940,1190,900,1380,940);
        drawLine_c(1540,940,1700,900,1880,940);
        drawLine_c(500,940,1200,600,1880,940);
        drawLine_c(500,940,1000,750,1380,940);
        drawLine_c(1040,940,1300,750,1880,940);

        /* drawLine(700,600,440,910);
        drawLine(850,600,950,910);
        drawLine(920,550,1450,920);
        drawLine(950,500,1950,910);

        drawLine(1450,500,440,910);
        drawLine(1600,550,950,910);
        drawLine(1600,600,1450,920);
        drawLine(1700,600,1950,910); */
    })();

    //城域网
    (function () {
        var canvas = document.getElementById('canvas_2');
        var ctx = canvas.getContext("2d");
        //曲线
        function drawLine_c(x1,y1,x2,y2,x3,y3){
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.quadraticCurveTo(x2,y2,x3,y3);
            ctx.strokeStyle = '#767783';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        //直线
        function drawLine(x1,y1,x2,y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#767783';
            ctx.stroke();
        }

        drawLine_c(520,1050,650,1120,820,1056);
        drawLine_c(500,1060,850,1230,1400,1066);
        drawLine_c(480,1066,1050,1350,1980,1066);

        drawLine_c(1040,1050,1180,1120,1350,1056);
        drawLine_c(1020,1060,1400,1230,1900,1066);

        drawLine_c(1580,1050,1700,1120,1860,1046);

        /* drawLine(380,630,410,830);
        drawLine(400,620,900,830);
        drawLine(420,600,1360,860);
        drawLine(460,580,1900,900);

        drawLine(800,560,420,840);
        drawLine(920,560,920,830);
        drawLine(940,560,1400,840);
        drawLine(960,520,1900,860);

        drawLine(1350,540,440,840);
        drawLine(1450,560,940,830);
        drawLine(1480,560,1480,840);
        drawLine(1500,520,1960,860);

        drawLine(1950,560,460,860);
        drawLine(1970,580,980,830);
        drawLine(1990,600,1500,840);
        drawLine(2020,520,2000,860); */
    })();

    //idc数据网流量点击节点
    var $flowName = $('#flow_name');
    var $flowWrap = $('#flow_wrap');
    var idcDateStr = '<li><span>出口总带宽</span><p>'+'1440G'+'</p></li><li><span>峰值利用率</span><p>'+'100%'+'</p></li><li><span>至163带宽</span><p>'+'1440G'+'</p></li><li><span>至163峰值利用率</span><p>'+'100%'+'</p></li><li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>';
    $('#mynetwork').on('click','div',function(){
        var $this = $(this);
        var $nodeClass  = $this.attr('class');
        var $text = $('#txt');
        var $text_sub = $('#txt_sub');
        $('#con_idc').show()
        switch($nodeClass){
            case 'gg_cy':
            $text.text('骨干层');
            $text_sub.text('北京电信城域网');
            $flowName.text('北京电信城域网');
            $flowWrap.html(idcDateStr);
            break;
            case 'gg_ip':
            $text.text('骨干层');
            $text_sub.text('中国电信IP骨干网');
            $flowName.text('中国电信IP骨干网');
            $flowWrap.html(idcDateStr);
            break;
            case 'hx_yf':
            $text.text('核心层');
            $text_sub.text('永丰');
            $flowName.text('城域网');
            $flowWrap.html(idcDateStr);
            break;
            case 'hx_yz':
            $text.text('核心层');
            $text_sub.text('亦庄瀛海');
            $flowName.text('城域网');
            $flowWrap.html(idcDateStr);
            break;
            case 'hx_ds':
            $text.text('核心层');
            $text_sub.text('东四');
            $flowName.text('城域网');
            $flowWrap.html(idcDateStr);
            break;
            case 'hx_zw':
            $text.text('核心层');
            $text_sub.text('兆维');
            $flowName.text('城域网');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_yh':
            $text.text('汇聚层');
            $text_sub.text('亦庄瀛海');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_cp':
            $text.text('汇聚层');
            $text_sub.text('昌平未来科技城');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_yf':
            $text.text('汇聚层');
            $text_sub.text('永丰');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_zw':
            $text.text('汇聚层');
            $text_sub.text('兆维');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_zx':
            $text.text('汇聚层');
            $text_sub.text('中兴马驹桥');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_jx':
            $text.text('汇聚层');
            $text_sub.text('酒仙桥');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_yz':
            $text.text('汇聚层');
            $text_sub.text('亦庄');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_dw':
            $text.text('汇聚层');
            $text_sub.text('德外');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_dj':
            $text.text('汇聚层');
            $text_sub.text('大郊亭');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_zg':
            $text.text('汇聚层');
            $text_sub.text('中广亚');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_ds':
            $text.text('汇聚层');
            $text_sub.text('东四');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_yq':
            $text.text('汇聚层');
            $text_sub.text('洋桥');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_ja':
            $text.text('汇聚层');
            $text_sub.text('静安');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_ay':
            $text.text('汇聚层');
            $text_sub.text('奥运');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_lf':
            $text.text('汇聚层');
            $text_sub.text('廊坊润泽');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_wj':
            $text.text('汇聚层');
            $text_sub.text('望京嘉轩');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
            case 'hj_sd':
            $text.text('汇聚层');
            $text_sub.text('上地');
            $flowName.text('汇聚层');
            $flowWrap.html(idcDateStr);
            break;
        }
    });

    //城域网数据节点
    $('#mynetwork_1').on('click','div',function(){
        var $this = $(this);
        var $nodeClass  = $this.attr('class');
        var $text = $('#txt');
        var $text_sub = $('#txt_sub');
        $('#con_idc').show()
        switch($nodeClass){
            case 'gg_163':
            $text.text('骨干层');
            $text_sub.text('163');
            $flowName.text('163');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'gg_cn2':
            $text.text('骨干层');
            $text_sub.text('CN2');
            $flowName.text('CN2');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'gg_idc':
            $text.text('骨干层');
            $text_sub.text('IDC');
            $flowName.text('IDC');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'gg_iptv':
            $text.text('骨干层');
            $text_sub.text('IPTV');
            $flowName.text('IPTV');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hx_ja':
            $text.text('核心层');
            $text_sub.text('CR-JA');
            $flowName.text('城域网');
            $flowWrap.html('<li><span>至163带宽</span><p>'+'1440G'+'</p></li><li><span>至163峰值利用率</span><p>'+'100%'+'</p></li><li><span>至CN2带宽</span><p>'+'1440G'+'</p></li><li><span>至CN2峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IDC带宽</span><p>'+'1440G'+'</p></li><li><span>至IDC峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hx_xd':
            $text.text('核心层');
            $text_sub.text('CR-XD');
            $flowName.text('城域网');
            $flowWrap.html('<li><span>至163带宽</span><p>'+'1440G'+'</p></li><li><span>至163峰值利用率</span><p>'+'100%'+'</p></li><li><span>至CN2带宽</span><p>'+'1440G'+'</p></li><li><span>至CN2峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IDC带宽</span><p>'+'1440G'+'</p></li><li><span>至IDC峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hx_dw':
            $text.text('核心层');
            $text_sub.text('CR-DW');
            $flowName.text('城域网');
            $flowWrap.html('<li><span>至163带宽</span><p>'+'1440G'+'</p></li><li><span>至163峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IDC带宽</span><p>'+'1440G'+'</p></li><li><span>至IDC峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IPTV带宽</span><p>'+'1440G'+'</p></li><li><span>至IPTV峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hx_ds':
            $text.text('核心层');
            $text_sub.text('CR-DS');
            $flowName.text('城域网');
            $flowWrap.html('<li><span>至163带宽</span><p>'+'1440G'+'</p></li><li><span>至163峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IDC带宽</span><p>'+'1440G'+'</p></li><li><span>至IDC峰值利用率</span><p>'+'100%'+'</p></li><li><span>至IPTV带宽</span><p>'+'1440G'+'</p></li><li><span>至IPTV峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
        }
    });
    $('#hj_wrap').on('click','li',function(){
        var $this = $(this);
        var $nodeClass  = $this.attr('class');
        var $text = $('#txt');
        var $text_sub = $('#txt_sub');
        $('#con_idc').show()
        switch($nodeClass){
            case 'hj_sr':
            $text.text('汇聚层');
            $text_sub.text('SR');
            $flowName.text('汇聚层');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hj_bas':
            $text.text('汇聚层');
            $text_sub.text('BAS');
            $flowName.text('汇聚层');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
            case 'hj_mse':
            $text.text('汇聚层');
            $text_sub.text('MSE');
            $flowName.text('汇聚层');
            $flowWrap.html('<li><span>至城域网带宽</span><p>'+'1440G'+'</p></li><li><span>至城域网峰值利用率</span><p>'+'100%'+'</p></li>');
            break;
        }
    });
    
});