~~~
 // 操作indexedDB
  window.myDb = {
    options: {
      dbName: 'XWS_SYCM',
      tbName: 'ipollVisitor',
      keyPath: 'id',
    },
    getIndexedDB: function(name) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.get(name)
          result.onsuccess = function(e) {
            var obj = e.target.result
            success(obj)
          }
          result.onerror = function(e) {
            error(obj)
          }
        }
        request.onerror = function() {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath })
        }
      })
    },
    getIndexedDBAll: function() {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var cursorRequest = store.openCursor()
          var list = []
          cursorRequest.onsuccess = function(event) {
            var cursor = event.target.result
            if (cursor) {
              var value = cursor.value
              list.push(value)
              cursor.continue()
            } else {
              success(list)
            }
          }
        }
        request.onerror = function() {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          var store = e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath, autoIncrement: true })
          store.createIndex('oid', 'oid', { unique: false })
          store.createIndex('source', 'source', { unique: false })
          store.createIndex('itemid', 'itemid', { unique: false })
          store.createIndex('updateTime', 'updateTime', { unique: false })
        }
      })
    },
    // 获得indexName下keyValue的全部
    getIndexedDB_index: function(indexName, keyValue) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readonly').objectStore(that.options.tbName)
          var objectIndex = store.index(indexName)
          let list = objectIndex.getAll(keyValue)
          success(list)
        }
      })
    },
    //指定索引、游标的范围,查询
    getCursor: function(indexName, IDBKeyRangeFun, ...value) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readonly').objectStore(that.options.tbName)
          var objectIndex = store.index(indexName)
          var keyRangeValue = IDBKeyRange[IDBKeyRangeFun](...value)
          var list = []
          objectIndex.openCursor(keyRangeValue).onsuccess = function(event) {
            var cursor = event.target.result
            if (cursor) {
              let value = cursor.value
              list.push(value)
              // 当匹配时进行一些操作
              cursor.continue()
            } else {
              success(list)
            }
          }
        }
      })
    },
    saveOneIndexedDB: function(keyValue) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          var store = null
          store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.put(keyValue)
          result.onsuccess = function(event) {
            success(keyValue)
          }
          result.onerror = function(event) {
            error(event)
          }
        }
        request.onerror = function(event) {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          var store = e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath, autoIncrement: true })
          store.createIndex('oid', 'oid', { unique: false })
          store.createIndex('source', 'source', { unique: false })
          store.createIndex('itemid', 'itemid', { unique: false })
          store.createIndex('updateTime', 'updateTime', { unique: false })
        }
      })
    },
    saveListIndexedDB: function(list, back, error) {
      var that = this
      return Promise.all(
        list.map(function(v) {
          return that.saveOneIndexedDB(v)
        }),
      )
    },
    deleteDB: function(name) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.delete(name)
          result.onsuccess = function(event) {
            success(name)
          }
          result.onerror = function(event) {
            error(event)
          }
        }
        request.onerror = function(event) {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath })
        }
      })
    },
  }// 操作indexedDB
  window.myDb = {
    options: {
      dbName: 'XWS_SYCM',
      tbName: 'ipollVisitor',
      keyPath: 'id',
    },
    getIndexedDB: function(name) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.get(name)
          result.onsuccess = function(e) {
            var obj = e.target.result
            success(obj)
          }
          result.onerror = function(e) {
            error(obj)
          }
        }
        request.onerror = function() {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath })
        }
      })
    },
    getIndexedDBAll: function() {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          // 操作数据表
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var cursorRequest = store.openCursor()
          var list = []
          cursorRequest.onsuccess = function(event) {
            var cursor = event.target.result
            if (cursor) {
              var value = cursor.value
              list.push(value)
              cursor.continue()
            } else {
              success(list)
            }
          }
        }
        request.onerror = function() {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath })
        }
      })
    },
    saveOneIndexedDB: function(keyValue) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          var store = null
          store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.put(keyValue)
          result.onsuccess = function(event) {
            success(keyValue)
          }
          result.onerror = function(event) {
            error(event)
          }
        }
        request.onerror = function(event) {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          var store = e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath, autoIncrement: true })
          store.createIndex('oid', 'oid', { unique: false })
          // store.createIndex('file', 'file', {unique: false});
          var result = store.put(keyValue)
          result.onsuccess = function(event) {
            success(keyValue)
          }
          result.onerror = function(event) {
            error(event)
          }
        }
      })
    },
    saveListIndexedDB: function(list, back, error) {
      var that = this
      // return Promise.all(
      //   list.map(function(v) {
      //     console.log(v)
      //     return that.saveOneIndexedDB(v)
      //   }),
      // )
      list.map(item => {
        console.log(item)
        that.saveOneIndexedDB(item)
      })
    },
    deleteDB: function(name) {
      var that = this
      return new Promise(function(success, error) {
        // 打开数据库
        var request = indexedDB.open(that.options.dbName)
        request.onsuccess = function(e) {
          var database = e.target.result
          var store = database.transaction(that.options.tbName, 'readwrite').objectStore(that.options.tbName)
          var result = store.delete(name)
          result.onsuccess = function(event) {
            success(name)
          }
          result.onerror = function(event) {
            error(event)
          }
        }
        request.onerror = function(event) {
          error(event)
        }
        // 数据库不存在时，或者版本号不一致时，就会执行这里
        request.onupgradeneeded = function(e) {
          e.target.result.createObjectStore(that.options.tbName, { keyPath: that.options.keyPath })
        }
      })
    },
  }
~~~









~~~


<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <script charset="utf-8" src="https://g.alicdn.com/mtb/lib-flexible/0.3.2/flexible.js" crossorigin></script>
    <script charset="utf-8" src="//g.alicdn.com/code/lib/qrcodejs/1.0.0/qrcode.min.js" crossorigin></script>
    <link rel="stylesheet" href="https://g.alicdn.com/bsop-static/sufei-punish/0.0.133/build/main.css">
</head>

<body><script>
with(document)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("exparams","category=&userid=3979790082&aplus&yunid=&ea981500b7b35&trid=21362e2f16324550835154773e2efc&asid=AQLHNu2rSU1hDj8TdQAAAACzHlX9egCtIw==",id="tb-beacon-aplus",src=(location>"https"?"//g":"//g")+".alicdn.com/alilog/mlog/aplus_v2.js")
</script>

    <punish-component />
    <script>
        window._config_ = {
            "renderTo": "#nocaptcha",
            "NCTOKENSTR": "80b37bc10a85c190f28501f34695a7de",
            "action": "captcha",
            "HOST": "sycm.taobao.com:443",
            "PATH": "/mc/mq/supply/mkt/overview.json",
            "FORMACTIOIN": "/_____tmd_____/verify/",
            "BXSTEP": "100",
            "SECDATA": "5e0c8e1365474455070961b803bd560607b52cabf5960afff39b64ce58073f78b21e9970e0da9855f10b57ffa2f69a8917e4c63bdfa309a2ca71ca3fd9cd5ad2ec8dc61d2f84755dd34ee44aa396445df90881e03135d2ec69cec4d4fd9d71e4e7b6c0cfdc0c8553416fbd938ba8376f8325c37497985c957de97940e28220ef49d5db805b9215f9db44920987df88e472b67f9b2e4fcd396b5bfc15622b4d34674a03426c2714343e31b220029a05d4a2d60d0b13682ab5f1b1648fb4035e5eb05960c880170a729a67640856a59b432634a89914925d3cfa29197b257ccfb0afb3f59c461c51b8d9da168f0e68f989560c3bb38615a025229a8d448537ab454d09579522267458c7e8d3e73d46ae2841c38f3421d53df4d594e5903daae19a20bc2079d80bb9f79e6f69c7c441da1ccd46f170e781370adc8ebe2b3473dd68de910636afe4dbd36928306837453bc5be1ef56b5b51b8eaf1ca5c05d218ab3fc78fb8e3e510b7cfdf5eedeee82fd64aa3c41d8bb2dacbeabfd9080ef20d569956a46e017badc22b0e1aa27b77b199afc6f02df37e073f088e4b0c9f4cf176ad237139ee0f211601042f6acf84498d407a313870eb4c119a871f6684a03275433fe496306606d8a3eacd0ad6eaf7cc0388cbb19624fa01cef85d31a771ba36d4ab570034bcc3f82cda2fb36536ba0f7874b21a11c745a375c487c921ba021efd9edbdc2f818bf749a946b822e14601a5fd8c43cc1fe576228359ecd036efeaffa90fd4047ed8517003501e6eee80187d",
            "NCAPPKEY": "X82Y__5370ed8a827058ff88932091aa69adb4",
      		"isUpgrade": "false",
            "customImage": "https://img.alicdn.com/tps/TB1V3KzLpXXXXXhXXXXXXXXXXXX-384-404.png",
            "logo": "",
            "logoLink": "",
      		"copyright": "",
            "noCaptchaCallback": "",
            "language": "",
            "languageConfig": {"captcha-h5-tips":"亲，检测到您正使用爬虫/插件（如：阿明工具、淘指数、店透视及类似功能的插件）爬取平台商业信息，该行为违反<a href='https://rule.taobao.com/detail-515.htm?spm=a2177.7231205.0.0.2c4017eaCeZca2&tag=self'>淘宝规则</a>，请立即删除/卸载爬虫和插件。如有疑问（例如：如何卸载），可查询<a href='https://www.yuque.com/docs/share/79deadd6-b1b2-45ff-a486-1c303df7ff8b?#'>FAQ</a><p>友情提醒：以上违规行为，可能导致B类扣分等处罚，详见<a href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10665325?_k=zcfebb'>处罚公告</a></p>","deny-h5-tips":"亲，检测到您正使用爬虫/插件（如：阿明工具、淘指数、店透视及类似功能的插件）爬取平台商业信息，该行为违反<a href='https://rule.taobao.com/detail-515.htm?spm=a2177.7231205.0.0.2c4017eaCeZca2&tag=self'>淘宝规则</a>。请立即删除/卸载爬虫和插件，页面将在您停止违规行为10min后恢复访问。如有疑问（例如：如何卸载），可查询<a href='https://www.yuque.com/docs/share/79deadd6-b1b2-45ff-a486-1c303df7ff8b?#'>FAQ</a><p>友情提醒：以上违规行为，可能导致B类扣分等处罚，详见<a href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10665325?_k=zcfebb'>处罚公告</a></p>"},
            "url":"/mc/mq/supply/mkt/overview.json/_____tmd_____/punish?x5secdata=5e0c8e1365474455070961b803bd560607b52cabf5960afff39b64ce58073f78b21e9970e0da9855f10b57ffa2f69a8917e4c63bdfa309a2ca71ca3fd9cd5ad2ec8dc61d2f84755dd34ee44aa396445df90881e03135d2ec69cec4d4fd9d71e4e7b6c0cfdc0c8553416fbd938ba8376f8325c37497985c957de97940e28220ef49d5db805b9215f9db44920987df88e472b67f9b2e4fcd396b5bfc15622b4d34674a03426c2714343e31b220029a05d4a2d60d0b13682ab5f1b1648fb4035e5eb05960c880170a729a67640856a59b432634a89914925d3cfa29197b257ccfb0afb3f59c461c51b8d9da168f0e68f989560c3bb38615a025229a8d448537ab454d09579522267458c7e8d3e73d46ae2841c38f3421d53df4d594e5903daae19a20bc2079d80bb9f79e6f69c7c441da1ccd46f170e781370adc8ebe2b3473dd68de910636afe4dbd36928306837453bc5be1ef56b5b51b8eaf1ca5c05d218ab3fc78fb8e3e510b7cfdf5eedeee82fd64aa3c41d8bb2dacbeabfd9080ef20d569956a46e017badc22b0e1aa27b77b199afc6f02df37e073f088e4b0c9f4cf176ad237139ee0f211601042f6acf84498d407a313870eb4c119a871f6684a03275433fe496306606d8a3eacd0ad6eaf7cc0388cbb19624fa01cef85d31a771ba36d4ab570034bcc3f82cda2fb36536ba0f7874b21a11c745a375c487c921ba021efd9edbdc2f818bf749a946b822e14601a5fd8c43cc1fe576228359ecd036efeaffa90fd4047ed8517003501e6eee80187d",	
            "languageConfigJson": "",
            "noCaptchaLanguage": "",
      		"js": "",
      		"css": ""
        };
    </script>
<!--rgv587_flag:sm-->
</body>
<script charset="utf-8" src="//g.alicdn.com/bsop-static/sufei-punish/0.0.133/build/punishpage.min.js" crossorigin></script>
<script charset="utf-8" type="text/javascript"
    src="https://g.alicdn.com/dt/tracker/4.0.0/??tracker.Tracker.js,tracker.interfaceTrackerPlugin.js,tracker.performanceTrackerPlugin.js"
    crossorigin></script>
<script type="text/javascript">
    var tracker = new window.Tracker({
        uidResolver: function () {
            // 具体获取 userId 逻辑自行实现
            return "80b37bc10a85c190f28501f34695a7de__1.1.1";
        }, pid: 'punish-page', plugins: [[window.interfaceTrackerPlugin], [window.performanceTrackerPlugin, { sampleRate: 1 }]]
    });
    tracker.install();
    tracker.log({
        code: 11,  // 系统自动生成，请勿修改 100%
        c1: '80b37bc10a85c190f28501f34695a7de',
  		c2: '0.0.133',
        msg: '霸下通用 新版处置页面',  // 异常信息，推荐传入
        sampleRate: 1.00,  // 目前采样率为 100.00%
    });
</script>

</html>
~~~

~~~
mc/mq/supply/mkt/overview.json
报警
~~~

~~~
Request URL: https://sycm.taobao.com/mc/mq/supply/mkt/overview.json?dateType=day&dateRange=2021-09-23%7C2021-09-23&cateId=124180005&device=0&sellerType=-1&_=1632455077991&token=350d93307
Request Method: GET
Status Code: 200 
Remote Address: 203.119.169.6:443
Referrer Policy: strict-origin-when-cross-origin

access-control-allow-credentials: true
bxpunish: 1
bxuuid: 80b37bc10a85c190f28501f34695a7de
cache-control: no-store
content-encoding: gzip
content-type: application/json;charset=UTF-8
date: Fri, 24 Sep 2021 03:44:38 GMT
eagleeye-traceid: 21362e2f16324550780854279e2efc
p3p: CP='CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR'
s: STATUS_NORMAL
server: Tengine/Aserver
set-cookie: JSESSIONID=0786B0D8F4D4A54FBEE8AFF984EC49EA; Path=/; HttpOnly
strict-transport-security: max-age=31536000
timing-allow-origin: *
ufe-result: A6
vary: Accept-Encoding

:authority: sycm.taobao.com
:method: GET
:path: /mc/mq/supply/mkt/overview.json?dateType=day&dateRange=2021-09-23%7C2021-09-23&cateId=124180005&device=0&sellerType=-1&_=1632455077991&token=350d93307
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en;q=0.8
bx-ua: defaultFY3_fyjs_not_initialized@@https://sycm.taobao.com/mc/mq/overview@@1632455078051
bx-umidtoken: T2gA8TgDw9qCNT21mvomH5vRlRFXVj6KtwLPvFg0OJfUVR9njHS7cgeVmgzTfy2Z-jU=
cache-control: no-cache
cookie: t=9f82c227fc66878ee35b5dd7511863cc; UM_distinctid=178c8b701b7b-05d681782d2c2a-1633685c-13c680-178c8b701b89e1; thw=cn; everywhere_tool_welcome=true; cookie2=17c14ddd826774bcaa9af5d3128aa3b0; _tb_token_=ea981500b7b35; _samesite_flag_=true; XSRF-TOKEN=36525179-2c9b-40d4-a5cc-06126efc5d46; enc=cQBi%2BQneKQjZTxqzwtMrw8zUH%2FR1nT45QbB0FQSySu110tWPDCHVpbmYiIL%2FUyvABEZW44jymxxs6hZkK8BKMw%3D%3D; cancelledSubSites=empty; Hm_lvt_96bc309cbb9c6a6b838dd38a00162b96=1631862850; _m_h5_tk=410283376e1daa16a12c8ef9d4f23279_1632368503409; _m_h5_tk_enc=7ec0a0f34b81f55afdc2394cec25db15; sgcookie=E100pS16Jf5VCUEGcHWM570lQc8NHjcZEcdupbLierLqGW%2Bu9VNc%2BHOCN6yuBjLJ7rsFwHgzZqXoqVvb%2F0S46FhQyQ%3D%3D; uc1=cookie14=Uoe3dYXnvM4FlA%3D%3D&cookie21=UtASsssmfufd; unb=3979790082; sn=%E9%9B%85%E8%BD%A9%E6%96%8B%E6%97%97%E8%88%B0%E5%BA%97%3A%E5%88%98%E8%8A%B8; csg=b3de6da8; skt=60778dab6e6f8f2c; _cc_=V32FPkk%2Fhw%3D%3D; _euacm_ac_l_uid_=3979790082; 3979790082_euacm_ac_c_uid_=293034738; 3979790082_euacm_ac_rs_uid_=293034738; v=0; _portal_version_=new; cc_gray=1; cna=uVO6GHFlExkCAT2SvaTmt17u; _euacm_ac_rs_sid_=59211142; datawar_version=new; xlly_s=1; CNZZDATA1277371679=550019405-1618270111-%7C1632453368; Hm_lpvt_96bc309cbb9c6a6b838dd38a00162b96=1632455066; JSESSIONID=1484DBA75C2EF62BCB68BE0125A0D0B9; tfstk=czHOBI2dwHIO1nZK4fdHcObWIBKlZYRLu1alHHh1tI-9n4XAiDMoePOMfu_TpHC..; l=fBLIo-VRjZEDf7uMKOfwPurza77OSIRAguPzaNbMi95P9T5p55LCW6FIwcY9C3GVFs6HR3k1BpKbBeYBcIvHZHxEj49KabkmnmOk-Wf..; isg=BEREMXu--XqT10y_DV_nj4o8FcQ2XWjHTgBHxV7l0I_SieRThm04V3ovzSFRkaAf
onetrace-card-id: sycm-mc-mq-market-overview.sycm-mc-mq-cate-trend
pragma: no-cache
referer: https://sycm.taobao.com/mc/mq/overview?cateFlag=2&cateId=124180005&dateRange=2021-09-23%7C2021-09-23&dateType=day&parentCateId=21&sellerType=-1&spm=a21ag.11815255.LeftMenu.d590.3f9f50a58xLxni
sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"
sec-ch-ua-mobile: ?0
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
sycm-referer: /mc/mq/overview
transit-id: Mmdbj6b6vxxfUDiOK9s2PuV+qQ6DbmzJTfBOO5z1MX2FFnWQXlHQ+GNB6HNcE3EbGqlJCXnV/QKiuVQDrJWac1LuC+XvD8WC90NmrtkFOHkHvIVpARXdkIF3WO7zhUqO/M1LKadR4QPrBf1u4h3WtUeqlsxeJHHHDOdiPkQFtrs=
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36

dateType: day
dateRange: 2021-09-23|2021-09-23
cateId: 124180005
device: 0
sellerType: -1
_: 1632455077991
token: 350d93307
~~~

~~~
Request URL: https://sycm.taobao.com/mc/mq/supply/mkt/trend/cate.json?dateType=day&dateRange=2021-09-23%7C2021-09-23&indexCode=seIpvUvHits&cateId=124180005&device=0&sellerType=-1&_=1632455077991&token=350d93307
Request Method: GET
Status Code: 200 
Remote Address: 203.119.169.6:443
Referrer Policy: strict-origin-when-cross-origin

:authority: sycm.taobao.com
:method: GET
:path: /mc/mq/supply/mkt/trend/cate.json?dateType=day&dateRange=2021-09-23%7C2021-09-23&indexCode=seIpvUvHits&cateId=124180005&device=0&sellerType=-1&_=1632455077991&token=350d93307
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en;q=0.8
bx-ua: defaultFY3_fyjs_not_initialized@@https://sycm.taobao.com/mc/mq/overview@@1632455078064
bx-umidtoken: T2gA8TgDw9qCNT21mvomH5vRlRFXVj6KtwLPvFg0OJfUVR9njHS7cgeVmgzTfy2Z-jU=
cache-control: no-cache
cookie: t=9f82c227fc66878ee35b5dd7511863cc; UM_distinctid=178c8b701b7b-05d681782d2c2a-1633685c-13c680-178c8b701b89e1; thw=cn; everywhere_tool_welcome=true; cookie2=17c14ddd826774bcaa9af5d3128aa3b0; _tb_token_=ea981500b7b35; _samesite_flag_=true; XSRF-TOKEN=36525179-2c9b-40d4-a5cc-06126efc5d46; enc=cQBi%2BQneKQjZTxqzwtMrw8zUH%2FR1nT45QbB0FQSySu110tWPDCHVpbmYiIL%2FUyvABEZW44jymxxs6hZkK8BKMw%3D%3D; cancelledSubSites=empty; Hm_lvt_96bc309cbb9c6a6b838dd38a00162b96=1631862850; _m_h5_tk=410283376e1daa16a12c8ef9d4f23279_1632368503409; _m_h5_tk_enc=7ec0a0f34b81f55afdc2394cec25db15; sgcookie=E100pS16Jf5VCUEGcHWM570lQc8NHjcZEcdupbLierLqGW%2Bu9VNc%2BHOCN6yuBjLJ7rsFwHgzZqXoqVvb%2F0S46FhQyQ%3D%3D; uc1=cookie14=Uoe3dYXnvM4FlA%3D%3D&cookie21=UtASsssmfufd; unb=3979790082; sn=%E9%9B%85%E8%BD%A9%E6%96%8B%E6%97%97%E8%88%B0%E5%BA%97%3A%E5%88%98%E8%8A%B8; csg=b3de6da8; skt=60778dab6e6f8f2c; _cc_=V32FPkk%2Fhw%3D%3D; _euacm_ac_l_uid_=3979790082; 3979790082_euacm_ac_c_uid_=293034738; 3979790082_euacm_ac_rs_uid_=293034738; v=0; _portal_version_=new; cc_gray=1; cna=uVO6GHFlExkCAT2SvaTmt17u; _euacm_ac_rs_sid_=59211142; datawar_version=new; xlly_s=1; CNZZDATA1277371679=550019405-1618270111-%7C1632453368; Hm_lpvt_96bc309cbb9c6a6b838dd38a00162b96=1632455066; JSESSIONID=1484DBA75C2EF62BCB68BE0125A0D0B9; tfstk=c8mfByN5dfnytDYN0x9P_-6XSUrGZ8sbUKNohV_QQMApRjHfi6IUOxoiI_I8J81..; l=fBLIo-VRjZEDf7uMXOfwPurza77OSIRAguPzaNbMi95P9T5p55LCW6FIwcY9C3GVFs6HR3k1BpKbBeYBcIvHZHxEj49KabkmnmOk-Wf..; isg=BMXFM_LBCAl6QC1cNFCWXHNL1Af_gnkUp7fmpscqgfwLXuXQj9KJ5FM4bIKoHpHM
onetrace-card-id: sycm-mc-mq-market-overview.sycm-mc-mq-cate-trend
pragma: no-cache
referer: https://sycm.taobao.com/mc/mq/overview?cateFlag=2&cateId=124180005&dateRange=2021-09-23%7C2021-09-23&dateType=day&parentCateId=21&sellerType=-1&spm=a21ag.11815255.LeftMenu.d590.3f9f50a58xLxni
sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"
sec-ch-ua-mobile: ?0
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
sycm-referer: /mc/mq/overview
transit-id: BuRVYXvuat8uv7mJzv+g/UqgLGzQYXNSGVQooJf1DMtCEBrHv/QS8ovbfymbfihIC89Bdce/k1mp7h9nlVQ3EdvOgaAqeM+IHCZdsW0WIJZcqkK3kVpbA+QwTTRcFjpGaJifHEpXypq81tzLd0UCx8JeAKi3TXuo9UUJ0wODqvc=
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36

dateType: day
dateRange: 2021-09-23|2021-09-23
indexCode: seIpvUvHits
cateId: 124180005
device: 0
sellerType: -1
_: 1632455077991
token: 350d93307
~~~

~~~
HookBX$1
~~~

~~~
document.currentScript
+encodeURIComponent
navigator.javaEnabled
~~~

![image-20210925194349660](/Users/telking/Library/Application Support/typora-user-images/image-20210925194349660.png)

![image-20210925194508714](/Users/telking/Library/Application Support/typora-user-images/image-20210925194508714.png)

![image-20210925194548359](/Users/telking/Library/Application Support/typora-user-images/image-20210925194548359.png)

~~~
 t.init(n, (function(e) {
                    i.getFYToken = function() {
                        return this.fyObj.getFYToken(n)
                    }
                    ,
                    i.getUidToken = function() {
                        return this.fyObj.getUidToken(n)
                    }
                    ,
                    l()
                }
                ))
~~~

~~~
{
    "Flag2": 1,
    "MaxMTLog": 20,
    "MaxNGPLog": 10,
    "MaxKSLog": 5,
    "MaxFocusLog": 3,
    "location": "cn",
    "loadTime": 82
}
~~~

~~~
5-16 7-10 6-14 1-13
~~~

~~~
defaultFY1_fyjs_not_loaded
defaultFY2_load_failed with 
defaultFY3_fyjs_not_initialized
用户不知道触发的是哪一种ua开头，这三种都会触发说是爬虫的弹窗的
第一种是fireyejs.js，没加载成功的
第二种是加载fireyejs.js超过5s的
第三种是加载了fireyejs.js，但没有重写getFYToken，重写getFYToken是回调函数，在fireyejs.js的调用的，混淆了，调不调用的逻辑看不懂。
第三种自己测试也能很难触发，不知道什么条件。。
~~~

~~~
  // function() {
    //   let timer = setInterval(function() {
    //     if (window.__baxia__ && window.__baxia__.options) {
    //       window.__baxia__.options.checkApiPath = function(e) {
    //         return false
    //       }
    //       window.clearInterval(timer)
    //     }
    //   }, 100)
~~~

~~~
:authority: sycm.taobao.com
:method: GET
:path: /mc/searchword/propertyTrend.json?dateType=day&dateRange=2021-09-27%7C2021-09-27&indexCode=&device=0&keyword=%E5%87%89%E6%8B%96%E9%9E%8B%20%E6%83%85%E4%BE%A3&diffKeyword=&_=1632798296740&token=350d93307
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en;q=0.8
cache-control: no-cache
cookie: t=9f82c227fc66878ee35b5dd7511863cc; UM_distinctid=178c8b701b7b-05d681782d2c2a-1633685c-13c680-178c8b701b89e1; thw=cn; everywhere_tool_welcome=true; cookie2=17c14ddd826774bcaa9af5d3128aa3b0; _tb_token_=ea981500b7b35; _samesite_flag_=true; XSRF-TOKEN=36525179-2c9b-40d4-a5cc-06126efc5d46; enc=cQBi%2BQneKQjZTxqzwtMrw8zUH%2FR1nT45QbB0FQSySu110tWPDCHVpbmYiIL%2FUyvABEZW44jymxxs6hZkK8BKMw%3D%3D; cancelledSubSites=empty; Hm_lvt_96bc309cbb9c6a6b838dd38a00162b96=1631862850; _m_h5_tk=410283376e1daa16a12c8ef9d4f23279_1632368503409; _m_h5_tk_enc=7ec0a0f34b81f55afdc2394cec25db15; xlly_s=1; _cc_=URm48syIZQ%3D%3D; sgcookie=E100oX0VYqT4wIyRKpGF5zs8x4Zg6%2BTG2YSNUZnCnGWizsZ5cKO7oSfZzPxKx64zj4NiTLPBIVdSRWdVhYu%2BY8ZD2A%3D%3D; uc1=cookie14=Uoe3dYZsTGyRyg%3D%3D&cookie21=W5iHLLyFfoaZ; unb=3979790082; sn=%E9%9B%85%E8%BD%A9%E6%96%8B%E6%97%97%E8%88%B0%E5%BA%97%3A%E5%88%98%E8%8A%B8; csg=21403551; skt=faef32bb84fdb87e; _euacm_ac_l_uid_=3979790082; 3979790082_euacm_ac_c_uid_=293034738; 3979790082_euacm_ac_rs_uid_=293034738; v=0; _portal_version_=new; cc_gray=1; cna=uVO6GHFlExkCAT2SvaTmt17u; CNZZDATA1277371679=550019405-1618270111-%7C1632789072; _euacm_ac_rs_sid_=59211142; datawar_version=new; Hm_lpvt_96bc309cbb9c6a6b838dd38a00162b96=1632798156; JSESSIONID=AF402EB85718ED15018C0EE207B4FF3E; tfstk=cqmhBSGWy51jWYailHZICWBWoZlhar6a9blIbm2SBsLb_9i0Lsxc7Z7_DFVit0Q5.; l=fBLIo-VRjZEDfm8NBO5Zhurza77toIdfGsPzaNbMiIeca6ZFFFGakNCL3LpWcdtjgTf5OeKrCOppcRn278zU5xGQyxYhoVz3BPp6-bpU-L5..; isg=BFBQF4dABYGAtdgT-ZurayYwIZiiGTRjMnwzqUoglKtzhfQv8yrZ8hbzWU1lVew7
onetrace-card-id: sycm-mc-mq-search-analyze.sycm-mc-mq-search-overview.sycm-mc-mq-search-trend
pragma: no-cache
referer: https://sycm.taobao.com/mc/mq/search_analyze?activeKey=overview&dateRange=2021-09-27%7C2021-09-27&dateType=day&keyword=%E5%87%89%E6%8B%96%E9%9E%8B+%E6%83%85%E4%BE%A3&spm=a21ag.11815242.LeftMenu.d588.ebe050a5mzRfJr
sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"
sec-ch-ua-mobile: ?0
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
sycm-referer: /mc/mq/search_analyze
transit-id: YnFytyBB5hCfwDHoXoTpmydh+jfxjMLdDvkLbOP6PAg2OI/nnlq04yQtI4728mN8yt4ZQ5ZCeKm05BZvPJoF/rMBviSRN9S3YM8Jd/RhHXPUHkbnqky5v3gO2YgXdGGWO4nx0lgF8tEP1AWBnE/+vDI9qFFu8HUE8HfwKdQKr6w=
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36
~~~

