/*
 * @Author: your name
 * @Date: 2021-04-28 15:06:52
 * @LastEditTime: 2021-04-28 15:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/test_CJ/js/2.js
 */

!function(e) {
    var t = {};
    function n(a) {
        if (t[a])
            return t[a].exports;
        var i = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(i.exports, i, i.exports, n),
        i.l = !0,
        i.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, a) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var a = Object.create(null);
        if (n.r(a),
        Object.defineProperty(a, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var i in e)
                n.d(a, i, function(t) {
                    return e[t]
                }
                .bind(null, i));
        return a
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "/",
    n(n.s = 3)
}({
    "./src/modules/i18n/language.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = {
            "th-TH": {
                "captcha-h5-tips": "ขออภัยเราตรวจพบการเข้าชมที่ผิดปกติจากเครือข่ายของคุณ",
                "captcha-h5-tips-slider": "โปรดเลื่อนเพื่อยืนยัน",
                "wait-h5-tips": "โปรดลองใหม่อีกครั้ง",
                "deny-h5-tips": "เราตรวจพบการเข้าชมที่ผิดปกติจากเครือข่ายของคุณ โปรดลองใหม่อีกครั้งในภายหลัง",
                "feedback-code": "Feedback ID",
                "common-company-name": "Alibaba Group",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            "vi-VN": {
                "captcha-h5-tips": "Rất tiếc, hệ thống của chúng tôi đã phát hiện lưu lượng truy cập bất thường từ mạng máy tính của bạn",
                "captcha-h5-tips-slider": "Vui lòng kéo sang phải để xác nhận",
                "wait-h5-tips": "Hệ thống của chúng tôi đã phát hiện lưu lượng truy cập bất thường từ mạng máy tính của bạn, vui lòng thử lại sau.",
                "deny-h5-tips": "Hệ thống của chúng tôi đã phát hiện lưu lượng truy cập bất thường từ mạng máy tính của bạn, vui lòng thử lại sau.",
                "common-company-name": "@2013-Bây giờ Alibaba Nhóm",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            "zh-CN": {
                "captcha-h5-tips": "休息会呗，坐下来喝口水，<p>&nbsp;我们马上回来。</p>",
                "common-company-name": "@2003-现在 阿里巴巴集团",
                "wait-h5-tips": "亲，小二正忙<p> 等一下马上回来</p>",
                "deny-h5-tips": "亲，访问被拒绝<p>请检查是否使用了代理软件或 VPN 哦~</p>",
                "captcha-h5-tips-slider": "为保证您的正常访问请进行验证",
                "feedback-code": "反馈码",
                copyright: "© 1999-现在 Alibaba.com 版权所有",
                "captcha-title": "验证码拦截",
                "deny-title": "访问被拒绝",
                "wait-title": "系统正忙",
                "previous-page": "返回上一页"
            },
            "in-ID": {
                "captcha-h5-tips-slider": "Geser untuk verifikasi",
                "wait-h5-tips": "Silahkan coba lagi",
                "deny-h5-tips": "Mohon periksa koneksi jaringan Anda dan coba lagi",
                "captcha-h5-tips": "Mohon maaf, silahkan periksa koneksi jaringan Anda dan coba lagi",
                "common-company-name": "@2003-Now Alibaba Group",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            "en-US": {
                "captcha-h5-tips": "Sorry, we have detected unusual traffic from your network.",
                "captcha-h5-tips-slider": "Please slide to verify.",
                "wait-h5-tips": "Please try again.",
                "deny-h5-tips": "We have detected abnormal network request. Please check whether it is hijacked by proxy or VPN.",
                "common-company-name": "@2003-Now Alibaba Group",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            "ms-MY": {
                "captcha-h5-tips": "Kesesakan yang tidak dijangka telah di kesan dalam rangkaian kami.",
                "captcha-h5-tips-slider": "Sila leret untuk teruskan.",
                "wait-h5-tips": "Terdapat kesesakan pada sistem. Sila cuba sekali lagi.",
                "deny-h5-tips": "Kesesakan yang tidak dijangka telah di kesan dalam rangkaian kami. Sila cuba lagi sebentar lagi.",
                "feedback-code": "Feedback ID",
                "common-company-name": "@2003-Now Alibaba Group",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            ne: {
                "captcha-h5-tips": "हामीले तपाईंको नेटवर्क असामान्य ट्राफिक फेला पारेको छौँ  ।",
                "captcha-h5-tips-slider": "कृपया प्रमाणिकरण गर्न स्लाइड गर्नुहोस्।",
                "wait-h5-tips": "पुन:प्रयास गर्नुहोस्।",
                "deny-h5-tips": "हामीले तपाईंको नेटवर्क असामान्य ट्राफिक फेला पारेको छौँ, कृपया केहि समयपछि पुन:प्रयास गर्नुहोस्।",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            bn: {
                "captcha-h5-tips": "দুঃখিত, আমরা আপনার নেটওয়ার্ক থেকে অস্বাভাবিক ট্র্যাফিক সনাক্ত করেছি।",
                "captcha-h5-tips-slider": "যাচাই করার জন্য স্লাইড করুন।",
                "wait-h5-tips": "অনুগ্রহপূর্বক আবার চেষ্টা করুন.",
                "deny-h5-tips": "আমরা আপনার নেটওয়ার্ক থেকে অস্বাভাবিক ট্র্যাফিক সনাক্ত করেছি, অনুগ্রহপূর্বক আবার চেষ্টা করুন.।",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            si: {
                "captcha-h5-tips": "සමාවෙන්න , ඔබේ ජාලයෙන් අපට අසාමාන්‍ය තදබදයක් වාර්තා වී ඇත.",
                "captcha-h5-tips-slider": "කරුණාකර තහවුරු කිරීමට ස්ලයිඩ් කරන්න.",
                "wait-h5-tips": "කරුණාකර නැවත උත්සහ කරන්න ",
                "deny-h5-tips": "ඔබේ ජාලයෙන් අපට අසාමාන්‍ය තදබදයක් වාර්තා වී ඇත.කරුණාකර පසුව උත්සහ කරන්න.",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            my: {
                "captcha-h5-tips": "ဝမ္းနည္းပါတယ္။ သင္၏နက္ဝက္ခ္မွ ပံုမွန္မဟုတ္ေသာ ဝင္ေရာက္မႈမ်ားကို သတိျပဳမိပါသည္။",
                "captcha-h5-tips-slider": "အတည္ျပဳရန္ ေဘးသို႔ဆြဲပါ။",
                "wait-h5-tips": "ေက်းဇူးျပဳ၍ ေနာက္တစ္ႀကိမ္ ထပ္မံႀကိဳးစားပါ။",
                "deny-h5-tips": "သင္၏နက္ဝက္ခ္မွ ပံုမွန္မဟုတ္ေသာ ဝင္ေရာက္မႈမ်ားကို သတိျပဳမိပါသည္။ ေနာက္တစ္ႀကိမ္ ထပ္မံႀကိဳးစားပါ။",
                "feedback-code": "Feedback ID",
                copyright: "© 1999-Now Alibaba.com Copyright",
                "previous-page": "BACK"
            },
            "zh-TW": {
                "captcha-h5-tips": "休息一會兒，坐下來喝口水吧，<p>&nbsp;我們馬上回來。</p>",
                "common-company-name": "@2003-現在 阿里巴巴集團",
                "wait-h5-tips": "系統繁忙，請您稍等片刻，<p> 稍等馬上回來哦</p>",
                "deny-h5-tips": "您的訪問被拒絕<p>請檢查是否使用了代理軟件或 VPN 哦~</p>",
                "captcha-h5-tips-slider": "為保證您的正常訪問請進行驗證",
                "feedback-code": "反饋碼",
                copyright: "© 1999-現在 Alibaba.com 版權所有",
                "captcha-title": "驗證碼攔截",
                "deny-title": "訪問被拒絕",
                "wait-title": "系統繁忙",
                "previous-page": "返回上一頁"
            }
        };
        a.zh = a["zh-CN"],
        a["zh-cn"] = a["zh-CN"],
        a.th = a["th-TH"],
        a.vi = a["vi-VN"],
        a.id = a["in-ID"],
        a.ms = a["ms-MY"],
        a.tw = a["zh-TW"],
        a["ne-NP"] = a.ne,
        a["id-ID"] = a["in-ID"];
        for (var i = ["en", "en-SG", "en-GB", "en-PK", "en-MY", "en-VN", "en-TH"], o = 0; o < i.length; o++)
            a[i[o]] = a["en-US"];
        t.default = a
    },
    "./src/modules/punishpage/base-template.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n("./src/modules/punishpage/utils/index.js");
        t.default = function(e, t) {
            var n = e.uuid
              , i = e.copyright
              , o = e.logo
              , s = e.logoLink;
            return '<div id="baxia-punish" class=\'baxia-punish ' + e.action + " " + (a.isMobile ? " mobile " : a.isAjax ? " pc-ajax " : " pc ") + '\'><div id="J_Header" class="header clearfix">\n                    <h1 id="logo" class="logo">\n                        <a href="' + s + '" target="_top">\n                          <img class="logo" src="' + o + '" title="点击查看源网页">\n                        </a>\n                    </h1>\n                </div><div class="wrapper">\n    <div class="content-inside">\n       ' + t + '\n        </div>\n\n    <div class="copyright">\n    ' + (a.isMobile ? n : "") + "\n    <span>" + i + "</span>\n    </div>\n    </div>\n   </div> </div>"
        }
    },
    "./src/modules/punishpage/capslide.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("./src/modules/punishpage/base-template.js"), o = (a = i) && a.__esModule ? a : {
            default: a
        }, s = n("./src/modules/punishpage/utils/index.js");
        t.default = {
            template: function(e) {
                var t = e.customImage
                  , n = e.uuid
                  , a = e.languageConfig
                  , i = e.isMobile;
                return (0,
                o.default)(e, ' <div class="bannar">\n        <div class=\'bg-img-wrap\'>\n        <img id="bg-img" src="' + t + '" /></div>\n        <div class=\'captcha-tips\'><div class="warnning-text">\n        ' + a["captcha-h5-tips"] + '\n        </div>\n        <center>\n        <div id="nocaptcha" style="margin-top:20px">\n        </div> <p class="p-uuid-tips captcha-uuid-tips">' + (!i && n ? n : "") + "</p></div>\n    </center>\n   \n    </div>")
            },
            render: function(e) {
                c(e),
                (0,
                s.initReferrer)()
            }
        };
        var c = function(e) {
            (0,
            s.loadScript)("https://g.alicdn.com/bsop-static/slide-captcha/0.0.9/index.js?t=500", (function() {
                window.index.initSC({
                    token: e.NCTOKENSTR,
                    appKey: e.NCAPPKEY,
                    getUrl: (0,
                    s.getSubmitPathPrefix)(e) + "/_____tmd_____/newslidecaptcha",
                    postUrl: (0,
                    s.getSubmitPathPrefix)(e) + "/_____tmd_____/newslidevalidate",
                    x5secdata: e.SECDATA,
                    language: n,
                    renderTo: document.querySelector(t),
                    callback: function() {
                        (0,
                        s.close)()
                    },
                    onload: function(e) {},
                    onerror: function(e) {}
                })
            }
            ));
            var t = e.renderTo
              , n = e.noCaptchaLanguage
        }
    },
    "./src/modules/punishpage/captcha.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = s(n("./src/modules/punishpage/base-template.js"))
          , i = s(n("./src/modules/punishpage/render.js"))
          , o = n("./src/modules/punishpage/utils/index.js");
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            template: function(e) {
                var t = e.customImage
                  , n = e.uuid
                  , i = e.languageConfig;
                return (0,
                a.default)(e, ' <div class="bannar">\n        <div class=\'bg-img-wrap\'>\n        <img id="bg-img" src="' + t + '" /></div>\n        <div class=\'captcha-tips\'><div class="warnning-text">\n        ' + i["captcha-h5-tips"] + '\n        </div>\n        <center>\n        <div id="nocaptcha" style="margin-top:20px">\n        </div> <p class="p-uuid-tips captcha-uuid-tips">' + (!o.isMobile && n ? n : "") + '</p></div>\n    </center>\n    <form id="nc-verify-form" action="' + e.FORMACTIOIN + '" method="GET">\n        <input name="nc_token" value="' + e.NCTOKENSTR + '" type="hidden">\n        <input name="nc_session_id" id="nc-session-id" value="" type="hidden">\n        <input name="nc_sig" id="nc-sig" value="" type="hidden">\n        <input name="x5sec_domain" id="x5sec_domain" value="" type="hidden">\n        <input name="x5secdata" id="x5secdata" type="hidden" value="' + e.SECDATA + '">\n        <input name="x5step" id="x5step" type="hidden" value="' + e.BXSTEP + '">\n        <input name="ajax" id="ajax" type="hidden" value="true">\n        <input name="nc_app_key" id="nc_app_key" type="hidden" value="' + e.NCAPPKEY + '">\n    </form>\n    </div>')
            },
            ajaxSubmit: u,
            submit: r,
            formSubmit: function(e, t) {
                var n = d(e, t);
                document.getElementById("nc-verify-form").action = n.url,
                document.getElementById("nc-verify-form").submit()
            },
            render: function(e) {
                c(e),
                (0,
                o.initReferrer)()
            }
        };
        var c = function(e) {
            var t = "";
            e.isMobile && -1 === location.search.indexOf("pc_native=1") ? (t = "register_h5",
            (0,
            o.loadScript)("//g.alicdn.com/sd/nch5/index.js", (function() {
                c && d && window.NoCaptcha.upLang(c, d);
                window.NoCaptcha.init(l),
                window.NoCaptcha.setEnabled(!0)
            }
            ))) : (t = "register",
            (0,
            o.loadScript)("//g.alicdn.com/sd/ncpc/nc.js", (function() {
                c && d && new window.noCaptcha({}).upLang(c, d);
                window.noCaptcha(l)
            }
            )));
            var n = e.renderTo
              , a = e.NCAPPKEY
              , i = e.NCTOKENSTR
              , s = e.noCaptchaCallback
              , c = e.noCaptchaLanguage
              , d = e.noCaptchaLanguageCont
              , p = e.preNoCaptchaSubmit
              , l = {
                renderTo: n,
                appkey: a,
                token: i,
                scene: t,
                callback: function(e) {
                    if (s)
                        return s(!1, e);
                    p && p(),
                    r(e)
                }
            };
            c && (l.language = c),
            s || (l.replaceCallback = function(t, n, a, i) {
                if ("string" == typeof t) {
                    var o = n;
                    (n = {}).success = a.bind(this, "ok"),
                    n.fail = a,
                    n.data = o,
                    t = n
                }
                u(e, t)
            }
            )
        };
        function r(e) {
            document.getElementById("nc-session-id").value = e.csessionid,
            document.getElementById("nc-sig").value = e.sig,
            document.getElementById("nc-verify-form").submit()
        }
        function d(e, t) {
            return location.pathname.indexOf("x5secdata%3D") > -1 ? {
                data: {
                    slidedata: JSON.stringify(t.data),
                    x5secdata: e.SECDATA
                },
                url: (0,
                o.getSubmitPathPrefix)(e) + "/_____tmd_____/slide/" + encodeURIComponent("slidedata=" + JSON.stringify(t.data) + "&x5secdata=" + e.SECDATA)
            } : {
                data: {
                    slidedata: JSON.stringify(t.data),
                    x5secdata: e.SECDATA
                },
                url: (0,
                o.getSubmitPathPrefix)(e) + "/_____tmd_____/slide"
            }
        }
        function u(e, t) {
            var n = d(e, t);
            t.success = t.success || p,
            t.fail = t.fail || p,
            (0,
            o.request)({
                url: n.url,
                type: "GET",
                dataType: "json",
                data: n.data,
                success: function(n, a) {
                    try {
                        if (n.indexOf("Deny from x5") > -1)
                            return t.success(n);
                        if (n.indexOf("window._config_") > -1)
                            return void function(e) {
                                var t = e.replace(/\s+/g, "").match(/window\.\_config_\=([^}]+)/)
                                  , n = "";
                                t && t[1] && (n = (n = t[1] + "}").replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":'));
                                e = n && JSON.parse(n),
                                document.getElementById("x5secdata").value = e.SECDATA,
                                document.getElementById("nc_app_key").value = e.NCAPPKEY,
                                new i.default(e).render()
                            }(n);
                        if ((n = JSON.parse(n)).rgv587_flag)
                            return void function(e, t) {
                                var n = (0,
                                o.getSubmitPathPrefix)(t) + "/_____tmd_____" + e.url.split("_____tmd_____")[1];
                                o.isInNativeSdk && (n += "&native=1");
                                location.replace(n)
                            }(n, e);
                        n.result && 0 === n.result.code ? p() : t.success(n)
                    } catch (e) {
                        p()
                    }
                },
                error: function(e) {
                    p()
                }
            })
        }
        function p() {
            (0,
            o.close)()
        }
    },
    "./src/modules/punishpage/close.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n("./src/modules/punishpage/utils/index.js");
        t.default = {
            template: function() {
                return "<div>跳转中，如果跳转失败，请手动回退。 Jumping,</div>"
            },
            render: function() {
                (0,
                a.close)()
            }
        }
    },
    "./src/modules/punishpage/deny.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("./src/modules/punishpage/base-template.js"), o = (a = i) && a.__esModule ? a : {
            default: a
        }, s = n("./src/modules/punishpage/utils/index.js");
        t.default = {
            template: function(e) {
                var t = e.languageConfig
                  , n = e.uuid
                  , a = e.customImage
                  , i = document.referrer;
                return i.indexOf("___tmd___") > -1 && (i = ""),
                (0,
                o.default)(e, '<div class="bannar">\n        <img id="bg-img" src="' + a + '" />\n        <div class="warnning-text" style="margin-bottom: 100px;">\n            ' + t["deny-h5-tips"] + "\n            \n            " + (e.showCenterClose ? '<p style="text-align:center;margin-top: 10px;"><a  class="btn-submit-close" id="js-btn-submit-close" href="javascript:void(0)">我知道了</a>\n            </p>' : "") + '\n            <p class="p-uuid-tips">' + (!s.isMobile && n ? n : "") + "</p>\n            " + (s.isMobile || !i || s.isAjax ? "" : '<a class="back-referrer" href=' + i + "><img class='back-up-img' src='https://img.alicdn.com/tfs/TB1AWGWD1L2gK0jSZFmXXc7iXXa-200-200.png' />" + t["previous-page"] + "</a>") + "\n        </div>\n    </div>")
            }
        }
    },
    "./src/modules/punishpage/index.js": function(e, t, n) {
        "use strict";
        n("./src/modules/punishpage/render.js"),
        n("./src/modules/punishpage/style/index.less")
    },
    "./src/modules/punishpage/nlp.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = s(n("./src/modules/punishpage/base-template.js"))
          , i = n("./src/modules/punishpage/utils/index.js")
          , o = s(n("./src/modules/punishpage/captcha.js"));
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            template: function(e) {
                var t = e.customImage
                  , n = e.uuid
                  , o = e.languageConfig
                  , s = e.isMobile;
                return (0,
                a.default)(e, ' <div class="bannar">\n        <div class=\'bg-img-wrap\'>\n        <img id="bg-img" src="' + t + '" /></div>\n        <div class=\'captcha-tips\'><div class="warnning-text">\n        ' + o["captcha-h5-tips"] + '\n        </div>\n        <center>\n        <div id="nocaptcha" style="width:100%">\n        </div> <p class="p-uuid-tips captcha-uuid-tips">' + (!s && n ? n : "") + '</p></div>\n    </center>\n    <form id="nc-verify-form" action="' + e.FORMACTIOIN + '" method="GET">\n        <input name="nc_token" value="' + e.NCTOKENSTR + '" type="hidden">\n        <input name="nc_session_id" id="nc-session-id" value="" type="hidden">\n        <input name="nc_sig" id="nc-sig" value="" type="hidden">\n        <input name="x5sec_domain" id="x5sec_domain" value="" type="hidden">\n        <input name="x5secdata" id="x5secdata" type="hidden" value="' + e.SECDATA + '">\n        <input name="x5step" id="x5step" type="hidden" value="' + e.BXSTEP + '">\n        <input name="ajax" id="ajax" type="hidden" value="true">\n        <input name="nc_app_key" id="nc_app_key" type="hidden" value="' + e.NCAPPKEY + '">\n        <input name="native" id="native" type="hidden" value="' + (i.isInNativeSdk ? "1" : "0") + '">\n    </form>\n    </div>')
            },
            render: function(e) {
                c(e),
                (0,
                i.initReferrer)()
            }
        };
        var c = function(e) {
            var t = e.NCAPPKEY
              , n = e.NCTOKENSTR;
            (0,
            i.loadScript)("//g.alicdn.com/sd/quizCaptcha/0.0.8/index.js", (function() {
                var e = {
                    appKey: t,
                    scene: "lc_register",
                    renderTo: "#nocaptcha",
                    token: n,
                    success: function(e) {
                        o.default.submit({
                            code: e.code,
                            sig: e.sig,
                            csessionid: e.sessionId
                        })
                    }
                };
                i.isAjax && (e.width = 360);
                new window.quizCaptcha(e).init()
            }
            ))
        }
    },
    "./src/modules/punishpage/render.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var a = t[n];
                    a.enumerable = a.enumerable || !1,
                    a.configurable = !0,
                    "value"in a && (a.writable = !0),
                    Object.defineProperty(e, a.key, a)
                }
            }
            return function(t, n, a) {
                return n && e(t.prototype, n),
                a && e(t, a),
                t
            }
        }()
          , i = l(n("./src/modules/punishpage/deny.js"))
          , o = l(n("./src/modules/punishpage/wait.js"))
          , s = l(n("./src/modules/punishpage/nlp.js"))
          , c = l(n("./src/modules/punishpage/captcha.js"))
          , r = l(n("./src/modules/punishpage/close.js"))
          , d = l(n("./src/modules/punishpage/capslide.js"))
          , u = l(n("./src/modules/i18n/language.js"))
          , p = n("./src/modules/punishpage/utils/index.js");
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var g = {
            deny: i.default,
            wait: o.default,
            captcha: c.default,
            captchanlp: s.default,
            captchacapslide: d.default,
            nlp: s.default,
            close: r.default,
            capslide: d.default
        }
          , h = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.props = this.getDefaultProps(t),
                this.isIE() && (document.getElementsByTagName("html")[0].className = "ie-browser")
            }
            return a(e, [{
                key: "getNoCaptchaLanguage",
                value: function(e, t) {
                    var n = t.noCaptchaLanguage;
                    return n || (n = {
                        zh: "cn",
                        "zh-cn": "cn",
                        "en-us": "en",
                        "zh-tw": "tw"
                    }[e ? e.toLowerCase() : "en-us"] || e.replace("-", "_"))
                }
            }, {
                key: "getHost",
                value: function(e) {
                    return "wait" === e || "deny" === e ? document.referrer : location.hostname
                }
            }, {
                key: "getLogoInfo",
                value: function(e) {
                    var t = this.getHost(e)
                      , n = (new Date).getFullYear();
                    return t.indexOf("taobao.com") > -1 ? {
                        logo: "https://img.alicdn.com/tfs/TB1UDHOcwoQMeJjy0FoXXcShVXa-286-118.png",
                        logoLink: "https://www.taobao.com/",
                        copyright: "© 2003-现在 Taobao.com 版权所有"
                    } : t.indexOf("tmall.com") > -1 ? {
                        logo: "https://img.alicdn.com/tfs/TB1MaLKRXXXXXaWXFXXXXXXXXXX-480-260.png",
                        logoLink: "https://www.tmall.com/",
                        copyright: "© 2003-" + n + " TMALL.COM 版权所有"
                    } : t.indexOf("aliyun.com") > -1 ? {
                        logo: "https://img.alicdn.com/tfs/TB13DzOjXP7gK0jSZFjXXc5aXXa-212-48.png",
                        logoLink: "https://www.aliyun.com/",
                        copyright: "© 2009-" + n + " Aliyun.com 版权所有"
                    } : t.indexOf("etao.com") > -1 ? {
                        logo: "https://gw.alicdn.com/tfs/TB1yRiUQVXXXXaAXFXXXXXXXXXX-620-220.png",
                        logoLink: "https://etao.com/",
                        copyright: "Copyright © 2010-" + n + " ETAO.COM 版权所有"
                    } : t.indexOf("alimama.com") > -1 ? {
                        logo: "https://img.alicdn.com/tfs/TB12M.meYH1gK0jSZFwXXc7aXXa-392-100.png",
                        logoLink: "https://www.alimama.com/index.htm",
                        copyright: "© 2007-现在 阿里妈妈版权所有"
                    } : t.indexOf("youku.com") > -1 ? {
                        logo: "https://gw.alicdn.com/tfs/TB1ugm9f5cKOu4jSZKbXXc19XXa-356-76.png",
                        logoLink: "https://www.youku.com/",
                        copyright: "Copyright©" + n + " 优酷 youku.com 版权所有"
                    } : t.indexOf("feizhu.com") > -1 ? {
                        logo: "https://gw.alicdn.com/bao/tfs/TB1mFZneMmH3KVjSZKzXXb2OXXa-748-467.png",
                        logoLink: "https://www.feizhu.com/",
                        copyright: "© Fliggy.com版权所有"
                    } : t.indexOf("ele.me") > -1 ? {
                        logo: "https://img.alicdn.com/tfs/TB10aMXfaNj0u4jSZFyXXXgMVXa-500-128.svg",
                        logoLink: "https://www.ele.me/",
                        copyright: "Copyright ©2008-" + n + " 上海拉扎斯信息科技有限公司, All Rights Reserved."
                    } : {
                        logo: "https://img.alicdn.com/tfs/TB17G2dJGmWBuNjy1XaXXXCbXXa-241-41.png",
                        logoLink: "https://www.alibaba.com/",
                        copyright: "© 1999-" + n + " Alibaba.com. All rights reserved. "
                    }
                }
            }, {
                key: "getDefaultProps",
                value: function(e) {
                    var t = this.getI18nProps(e)
                      , n = this.getLogoInfo(e.action)
                      , a = n.logo
                      , i = n.logoLink
                      , o = n.copyright;
                    return e = Object.assign({
                        logo: a,
                        logoLink: i,
                        customImage: "https://img.alicdn.com/tfs/TB1a0io3GL7gK0jSZFBXXXZZpXa-656-668.png",
                        action: "captcha",
                        copyright: o || t.languageConfig.copyright,
                        renderTemplate: !0
                    }, e, t)
                }
            }, {
                key: "getI18nProps",
                value: function(e) {
                    var t = e.languageConfigJson
                      , n = e.language
                      , a = e.languageConfig
                      , i = n || (navigator.browserLanguage ? navigator.browserLanguage : navigator.language)
                      , o = (t = Object.assign(u.default, t || {}))[i];
                    return o || (o = t["en-US"]),
                    {
                        languageConfig: o = Object.assign(o, a || {}),
                        languageConfigJson: t,
                        language: n,
                        noCaptchaLanguage: this.getNoCaptchaLanguage(i, e)
                    }
                }
            }, {
                key: "bindEvents",
                value: function() {
                    this.props.showCenterClose && (document.getElementById("js-btn-submit-close").onclick = function() {
                        if (window.frames.length !== parent.frames.length)
                            try {
                                window.parent.postMessage(JSON.stringify({
                                    type: "child",
                                    content: '{"sm3Token":"not-send"}'
                                }), "*")
                            } catch (e) {
                                alert("请手动退出")
                            }
                        else
                            location.href = "https://sec.taobao.com/"
                    }
                    )
                }
            }, {
                key: "setTitle",
                value: function(e) {
                    var t = this.props.languageConfig
                      , n = {
                        deny: t["deny-title"] || t["deny-h5-tips"],
                        wait: t["deny-title"] || t["wait-h5-tips"],
                        captcha: t["captcha-title"] || t["captcha-h5-tips"],
                        nlp: t["captcha-title"] || t["captcha-h5-tips"]
                    };
                    document.title = n[e] || t["captcha-title"]
                }
            }, {
                key: "isIE",
                value: function() {
                    var e = navigator.userAgent.toLowerCase()
                      , t = e.indexOf("msie") > -1
                      , n = void 0;
                    return t && (n = e.match(/msie ([\d.]+)/)[1]),
                    n <= 9
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.languageConfig
                      , n = e.action
                      , a = e.renderTemplate
                      , i = void 0 === a || a
                      , o = g[n]
                      , s = Object.assign(this.props, {
                        uuid: this.getUUID(),
                        languageConfig: t,
                        isMobile: p.isMobile
                    });
                    i && ((0,
                    p.removeDom)("baxia-punish"),
                    document.body.innerHTML = document.body.innerHTML + o.template(s)),
                    o.render && o.render(s),
                    window._render_config_ = s,
                    this.setTitle(n),
                    this.bindEvents(),
                    this.renderQRCode()
                }
            }, {
                key: "getUUIDValue",
                value: function() {
                    var e = location.href.match(/uuid=([^&]+)/)
                      , t = this.props.NCTOKENSTR;
                    return e && e[1] ? e = e[1] : t && "###NCTOKENSTR###" !== t && (e = t),
                    e
                }
            }, {
                key: "getUUID",
                value: function() {
                    var e = this.props.languageConfig
                      , t = this.getUUIDValue();
                    return t && "undefined" !== t ? '<div class="bx-pu-qrcode-wrap"><div id="captcha-qrcode"></div>\n      <label>' + e["feedback-code"] + "</label>" : ""
                }
            }, {
                key: "renderQRCode",
                value: function() {
                    var e = this.props.qrcodeRenderTo
                      , t = void 0 === e ? "captcha-qrcode" : e
                      , n = document.getElementById(t.replace("#", ""))
                      , a = this.getUUIDValue();
                    if (a && n) {
                        if (!window.QRCode)
                            return void (n.innerHTML = a);
                        new window.QRCode(n,{
                            text: a,
                            width: 80,
                            colorDark: "#999",
                            height: 80
                        })
                    }
                }
            }]),
            e
        }();
        t.default = h,
        "function" != typeof Object.assign && (Object.assign = function(e) {
            if (null === e)
                throw new TypeError("Cannot convert undefined or null to object");
            e = Object(e);
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                if (null !== n)
                    for (var a in n)
                        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
            }
            return e
        }
        ),
        window.onload = function() {
            var e = document.getElementsByTagName("punish-component")[0]
              , t = function(e) {
                var t = Object.assign({}, e || {})
                  , n = location.href.match(/action=([^&]+)/);
                return n = n ? n[1] : "",
                t.action && "###ACTION###" !== t.action && "###SUB_TYPE###" !== t.action && "###ACTION######SUB_TYPE###" !== t.action || (t.action = "captcha"),
                n && ["captcha", "captchamlp", "captchaslide", "deny", "wait"].indexOf(n) > -1 && (t.action = n),
                t.showCenterClose && !p.isMobile && (t.showCenterClose = !1),
                t
            }(window._config_);
            !e && t.renderTemplate || new h(t).render(),
            e && e.remove && e.remove()
        }
    },
    "./src/modules/punishpage/style/index.less": function(e, t) {},
    "./src/modules/punishpage/utils/index.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , i = 320 === (document.documentElement.clientHeight || document.body.clientHeight) || 480 === (document.documentElement.clientHeight || document.body.clientHeight) || window.frames.length !== parent.frames.length
          , o = function(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (t.addEventListener)
                t.addEventListener(e, n, a);
            else if (t.attachEvent)
                return t.attachEvent("on" + e, n),
                !1
        }
          , s = function() {
            return location.href.indexOf("https://sec.taobao1111.com/") > -1 ? "https://sec.taobao1111.com/" : "https://sec.taobao.com/"
        }
          , c = location.href
          , r = c.indexOf("native=1") > -1 || c.indexOf("tmd_nc=1") > -1
          , d = navigator.userAgent.match(/.*(iPhone|iPad|Android|ios|SymbianOS|Windows Phone).*/i) || r;
        o("DOMContentLoaded", window, (function() {
            var e = "number" == typeof window.orientation && "object" === a(window.onorientationchange);
            if (d) {
                var t, n = document.body.parentNode;
                o(e ? "orientationchange" : "resize", window, (function() {
                    location.reload()
                }
                )),
                t = window.innerWidth > window.innerHeight ? "landscape" : "portrait",
                n.setAttribute("class", t)
            }
        }
        )),
        t.request = function(e) {
            e = e || {};
            var t = [];
            for (var n in e.data)
                t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e.data[n]));
            t.push(("v=" + Math.random()).replace(".", ""));
            var a = t.join("&")
              , i = new XMLHttpRequest;
            i.onreadystatechange = function() {
                if (4 === i.readyState) {
                    var t = i.status;
                    t >= 200 && t < 300 ? e.success && e.success(i.responseText, i.responseXML) : e.error && e.error(t)
                }
            }
            ,
            "GET" === e.type ? (i.open("GET", e.url + "?" + a, !0),
            i.send(null)) : "POST" === e.type && (i.open("POST", e.url, !0),
            i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            i.send(a))
        }
        ,
        t.loadScript = function(e, t) {
            var n = document.createElement("script")
              , a = document.getElementsByTagName("head")[0];
            n.type = "text/javascript",
            n.charset = "UTF-8",
            n.src = e,
            n.crossOrigin = !0,
            n.addEventListener ? n.addEventListener("load", (function() {
                t()
            }
            ), !1) : n.attachEvent && n.attachEvent("onreadystatechange", (function() {
                "loaded" === window.event.srcElement.readyState && t()
            }
            )),
            a.appendChild(n)
        }
        ,
        t.isAjax = i,
        t.getQueryString = function(e, t) {
            var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)")
              , a = e.substr(1).match(n);
            return null !== a ? unescape(a[2]) : null
        }
        ,
        t.close = function() {
            if (i) {
                try {
                    window.parent.postMessage(JSON.stringify({
                        type: "child",
                        content: '{"smToken":"token","queryToken":"sm","sm":"sm"}'
                    }), "*")
                } catch (e) {
                    window.parent.postMessage('{"type":"child","content":"{\\"smToken\\":\\"token\\",\\"queryToken\\":\\"sm\\",\\"sm\\":\\"sm\\"}"}')
                }
                try {
                    window.pointman.require(["m/messenger"], (function(e) {
                        e.initListener({
                            currentWin: window,
                            originWin: window.parent,
                            msgTransfer: "fromParent"
                        }),
                        e.send({
                            type: "msg:validateSuccess@sufei",
                            content: "smToken=xxxx"
                        })
                    }
                    ))
                } catch (e) {
                    console.log("not messenger")
                }
            } else {
                if (r)
                    return window._config_ && window._config_.sleepSubmit && (e = function() {
                        location.href = s()
                    }
                    ,
                    setTimeout((function() {
                        var t = document.cookie.match(/x5sec=([^;]+)/);
                        if (t && t[1]) {
                            var n = new Date;
                            n.setTime(n.getTime() + 1800),
                            document.cookie = "x5sec=" + t[1] + ";expires=" + n.toGMTString() + ";path=/;max-age=1800"
                        }
                        setTimeout((function() {
                            e && e()
                        }
                        ), 1e3)
                    }
                    ), 1e3)),
                    void (location.href = s());
                sessionStorage && sessionStorage.x5referer !== location.href ? (location.replace(sessionStorage.x5referer || "https//www.taobao.com"),
                sessionStorage.x5referer = "") : sessionStorage && sessionStorage.x5referer ? (sessionStorage.x5referer = "",
                location.reload()) : location.href = "https//www.taobao.com"
            }
            var e
        }
        ,
        t.initReferrer = function() {
            try {
                if (localStorage && localStorage.closeReturn) {
                    var e = sessionStorage.x5referer;
                    return location.replace(e),
                    void (localStorage.closeReturn = "")
                }
                if (location.href.indexOf("_____tmd_____") > -1)
                    return;
                sessionStorage.x5referer = window.location.href
            } catch (e) {
                console.log("err")
            }
        }
        ,
        t.isMobile = d,
        t.isInNativeSdk = r,
        t.removeDom = function(e) {
            document.getElementById(e) && (document.getElementById(e).outerHTML = "")
        }
        ,
        t.addEvent = o,
        t.getSubmitPathPrefix = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = e.HOST
              , n = e.PATH;
            return "//" + t + n
        }
    },
    "./src/modules/punishpage/wait.js": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("./src/modules/punishpage/base-template.js"), o = (a = i) && a.__esModule ? a : {
            default: a
        }, s = n("./src/modules/punishpage/utils/index.js");
        t.default = {
            template: function(e) {
                var t = e.isMobile
                  , n = e.languageConfig
                  , a = e.uuid
                  , i = e.customImage
                  , c = document.referrer;
                return c.indexOf("___tmd___") > -1 && (c = ""),
                (0,
                o.default)(e, '<div class="bannar">\n        <img id="bg-img" src="' + i + '" />\n        <div class="warnning-text" style="margin-bottom: 100px;">\n            ' + n["wait-h5-tips"] + "\n            " + (e.showCenterClose ? '<p style="text-align:center;margin-top: 10px;"><a  class="btn-submit-close" id="js-btn-submit-close" href="javascript:void(0)">我知道了</a>\n            </p>' : "") + '\n            <p class="p-uuid-tips">' + (!t && a ? a : "") + "</p>\n            " + (t || !c || s.isAjax ? "" : '<a class="back-referrer" href=' + c + "><img class='back-up-img' src='https://img.alicdn.com/tfs/TB1AWGWD1L2gK0jSZFmXXc7iXXa-200-200.png' />" + n["previous-page"] + "</a>") + "\n        </div>\n    </div>")
            }
        }
    },
    3: function(e, t, n) {
        e.exports = n("./src/modules/punishpage/index.js")
    }
});
