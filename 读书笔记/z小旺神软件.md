![wecom-temp-227273592cbc97f9a30426c165ee576d](/web/www/kaohe/读书笔记/img/wecom-temp-227273592cbc97f9a30426c165ee576d.png)

~~~js

        var reqid;
        function close_main(){
            // 关闭窗口
            reqid = xapi_close_main_window({
                request: "",
                persisten: true,
                onSuccess: function(response){},
                onFailure: function(code, msg){}
            });
        }
        function get_current(target){
            //取当前信息，可选参数：url,html,sycm_account
            reqid = xapi_get_current_page({
                request: target,
                persisten: true,
                onSuccess: function(response){
                    //console.log(response);
                    document.getElementById("result").innerText = response;
                },
                onFailure: function(code, msg){}
            });
        }

        function get_storage(key){
            // 取缓存数据
            reqid = xapi_xstorage_get({
                request: key,
                persisten: true,
                onSuccess: function(response){
                    //console.log(response);
                    document.getElementById("result").innerText = response;
                },
                onFailure: function(code, msg){}
            });
        }
        function mytest(){
            //点击某个元素
            xapi_click_element({
                request: "#app > div > section.mod-help > div.mod-dynamic > div > ul > li:nth-child(1) > a",
                persisten: true,
                onSuccess: function(response){
                    //console.log(response);
                    document.getElementById("result").innerText = response;
                },
                onFailure: function(code, msg){}
            });
        }
        // (function(){
        //     get_storage();
        // })();
get_current('html') // 当前html
get_current('url')  // 当前url
get_current('sycm_account') //当前生参账号
get_storage('xws_getShopCate') // get_storage
mytest() // click_element
xapi_localstorage_get     request 就是key
xapi_localstorage_get_all  request留空
xapi_localstorage_set  request是json字符串{key:xxx,val:xxx}
xapi_localstorage_del  request 就是key
xapi_localstorage_clear  request留空
~~~

~~~
  <script>
        function timestampToTime(timestamp, no_day) {
            var date = new Date(timestamp)
            Y = date.getFullYear()
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) D = date
                .getDate() if (
                    no_day)
                    return Y + '-' + M
            return Y + '-' + M + '-' + D
        }

        function lastYearMonth(strTime, n) {
            var ms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            var curr = new Date(strTime)
            var m = curr.getMonth()
            var r = []
            for (var i = 0; i < n; i++) {
                var tmp = m - i
                var tmp_y = 0
                while (tmp < 0) {
                    tmp += 12
                    tmp_y += 1
                    if (tmp > 0) {
                        break
                    }
                }
                y = curr.getFullYear() - tmp_y
                var month = ms[tmp] < 10 ? '0' + ms[tmp] : ms[tmp]
                r.push(y + '-' + month)
            }
            return r.reverse()
        }

        function getBeforeDate(cur_date, n, full) {
            // 获取指定日期的前n天日期，cur_date:指定日期，没有则默认为当前日期，n:多少天前，没有则默认为30天前
            // cur_date格式:2018-12-25 ,n为数字
            // full参数不存在则只返回月-日格式，如果存在则返回年-月-日
            if (n == undefined) n = 30
            var d = cur_date ? new Date(cur_date) : new Date()
            var year = d.getFullYear()
            var mon = d.getMonth() + 1
            var day = d.getDate()
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1
                } else {
                    year = year - 1
                    mon = 12
                }
            }
            d.setDate(d.getDate() - n)
            year = d.getFullYear()
            mon = d.getMonth() + 1
            day = d.getDate()
            if (full) {
                var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
            } else {
                var
                    s = (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
            }
            return s
        }

        function getBeforeDateList(cur_date, n, full) {
            // 获取指定日期n天前的所有日期(包括cur_date)，返回所有日期数组 
            var dateList = []
            while (n >=
                0) {
                dateList.push(getBeforeDate(cur_date, n, full))
                n--
            }
            return dateList
        }

        function getYesterDay() {
            // 获取昨天的日期，返回文本格式
            var today = new Date()
            today.setTime(today.getTime() - 24 * 60 * 60 * 1000)
            var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1).toString() : today.getMonth() + 1
            var date = today.getDate() < 10 ? '0' + (today.getDate()).toString() : today.getDate() var
                yesterday = today.getFullYear() + '-' + month + '-' + date
            return yesterday
        }

        function getYearWeek(dateString) {
            var da = dateString // 日期格式2015-12-30
            // 当前日期
            var date1 = new Date(da.substring(0, 4), parseInt(da.substring(5, 7)) - 1, da.substring(8, 10))
            // 1月1号
            var date2 = new Date(da.substring(0, 4), 0, 1)
            // 获取1月1号星期（以周一为第一天，0周一~6周日）
            var dateWeekNum = date2.getDay() - 1
            if (dateWeekNum < 0) {
                dateWeekNum = 6
            }
            if (dateWeekNum < 4) { // 前移日期 
                date2.setDate(date2.getDate() - dateWeekNum)
            } else { // 后移日期 
                date2.setDate(date2.getDate() + 7 - dateWeekNum)
            }
            var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
            if (d < 0) {
                var date3 = (date1.getFullYear() -
                    1) + '-12-31'
                return getYearWeek(date3)
            } else { // 得到年数周数 
                var year = date1.getFullYear()
                var week = Math.ceil((d + 1) / 7)
                return year + ' 第' + week + '周'
            }
        }

        function getYearWeekStrList(dateString, n) {
            // 将文本时间转化为时间戳
            var date = transdate(dateString)
            var weekList = []
            for (var i = 0; i < n; i++) {
                weekList.push(date - 7 * 86400000 * i)
            }
            var week_len = weekList.length
            var
                weekArr = []
            for (var i = 0; i < week_len; i++) {
                weekArr.push(getYearWeek(timestampToTime(weekList[i])))
            }
            return weekArr.reverse()
        }

        function percentFormat(value) {
            if (value == 0 || value == '-') return value
            return value + '%'
        }
    </script>
~~~

~~~
   # 'ltao_market': ['//ltao.seller.taobao.com/sycm/market'],
        # 'ltao_flow': ['//ltao.seller.taobao.com/sycm/flow'],
        # 'ltao_shop': ['//ltao.seller.taobao.com/sycm/shop'],
        # 'ltao_other': ['//ltao.seller.taobao.com/sycm/?'],
        'ltao': ['//ltao.seller.taobao.com/sycm/market'],
        
~~~

~~~
      c.prototype.__requestJSONP = function(e) {
            function t(e) {
                if (u && clearTimeout(u),
                c.parentNode && c.parentNode.removeChild(c),
                "TIMEOUT" === e)
                    window[l] = function() {
                        window[l] = void 0;
                        try {
                            delete window[l]
                        } catch (e) {}
                    }
                    ;
                else {
                    window[l] = void 0;
                    try {
                        delete window[l]
                    } catch (e) {}
                }
            }
            var n = r()
              , o = this.params
              , i = this.options
              , s = o.timeout || 2e4
              , l = "mtopjsonp" + (o.jsonpIncPrefix || "") + ++_
              , u = setTimeout((function() {
                e(i.timeoutErrMsg || "TIMEOUT::接口超时"),
                t("TIMEOUT")
            }
            ), s);
            i.querystring.callback = l;
            var c = document.createElement("script");
            return c.src = i.path + "?" + a(i.querystring) + "&" + a(i.postdata),
            c.async = !0,
            c.onerror = function() {
                t("ABORT"),
                e(i.abortErrMsg || "ABORT::接口异常退出")
            }
            ,
            window[l] = function() {
                i.results = Array.prototype.slice.call(arguments),
                t(),
                n.resolve()
            }
            ,
            function(e) {
                (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] || document.firstElementChild || document).appendChild(e)
            }(c),
            n.promise
        }
~~~

