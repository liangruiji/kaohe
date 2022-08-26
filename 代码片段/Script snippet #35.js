function change(e) {
    e.is(":checked") ? (e.hasClass("tb-fixed-switch") && chrome.storage.local.set({
        XWS_TB_FIXED_SWITCH: "1"
    }),
    e.hasClass("tk-switch") && chrome.storage.local.set({
        XWS_NEW_TK_SWITCH: !0
    }),
    e.hasClass("xws-similar-switch") && chrome.storage.local.set({
        XWS_SIMILAR_BTN_SWITCH: !0
    })) : (e.hasClass("tb-fixed-switch") && chrome.storage.local.set({
        XWS_TB_FIXED_SWITCH: "2"
    }),
    e.hasClass("tk-switch") && chrome.storage.local.set({
        XWS_NEW_TK_SWITCH: !1
    }),
    e.hasClass("xws-similar-switch") && chrome.storage.local.set({
        XWS_SIMILAR_BTN_SWITCH: !1
    }))
}
function removeRemoteJs(e) {
    for (var s in e)
        for (var t in e[s].params)
            e[s].params[t].key && chrome.storage.local.remove(e[s].params[t].key)
}
function formatTimeText(e) {
    return e = e.toString(),
    12 == e.length ? e.substring(0, 4) + "." + e.substring(4, 6) + "." + e.substring(6, 8) + "-" + e.substring(8, 12) : e
}
function showTips(e, s) {
    $("div.xws-tips").remove();
    var t = $(window).width()
      , i = $(window).height()
      , o = '<div class="xws-tips">' + e + "</div>";
    $("body").append(o),
    $("div.xws-tips").css({
        top: i / 2 - $("div.xws-tips").height() / 2 + "px",
        left: t / 2 - $("div.xws-tips").width() / 2 + "px"
    }).show(),
    s && setTimeout(function() {
        $("div.xws-tips").fadeOut(),
        setTimeout(function() {
            $("div.xws-tips").remove()
        }, 500)
    }, 1e3 * s)
}
$(".main-gy .ver_num").text(chrome.runtime.getManifest().version);
var xws_exid = chrome.runtime.id;
"cbbeihbhagkfdnfifipeakhipafgknho" == xws_exid ? $(".error_item2").css("display", "block") : "kmbagmjnoooeiindcnfgebkekiimbnee" != xws_exid && $(".error_item1").css("display", "block"),
$(".head a").each(function(e) {
    $(this).click(function() {
        $(".head a").removeClass("active"),
        $(".main>div").removeClass("show"),
        $(".head a").eq(e).addClass("active"),
        $(".main>div").eq(e).addClass("show")
    })
}),
intVersion(chrome.runtime.getManifest().version) >= 1030 ? (chrome.storage.local.get("XWS_SYCM_CONFIGS", function(e) {
    if (e.XWS_SYCM_CONFIGS) {
        var s = e.XWS_SYCM_CONFIGS;
        $(".js-engine .engine_ver .sycm").html("S" + formatTimeText(s.js.ver))
    }
}),
chrome.storage.local.get("XWS_TBITEM_CONFIGS", function(e) {
    if (e.XWS_TBITEM_CONFIGS) {
        var s = e.XWS_TBITEM_CONFIGS;
        $(".js-engine .engine_ver .tb").html("T" + formatTimeText(s.js.ver))
    }
})) : (chrome.storage.local.get("xws_tb_js_engine_ver", function(e) {
    e.xws_tb_js_engine_ver && $(".js-engine .engine_ver .tb").html("T" + e.xws_tb_js_engine_ver)
}),
chrome.storage.local.get("xws_sycm_js_engine_ver", function(e) {
    e.xws_sycm_js_engine_ver && $(".js-engine .engine_ver .sycm").html("S" + e.xws_sycm_js_engine_ver)
})),
$(".js-engine").click(function() {
    $(".js-engine #xws-loading").fadeIn(),
    $.ajax({
        url: "https://xiaowangshen.com/tb/configs/",
        type: "GET",
        success: function(e) {
            200 == e.code && (removeRemoteJs(e.data),
            $.ajax({
                url: "https://xiaowangshen.com/jd/configs/",
                type: "GET",
                success: function(e) {
                    $(".js-engine #xws-loading").fadeOut(),
                    200 == e.code && removeRemoteJs(e.data);
                    for (var s = ["XWS_SYCM_MARKET_CONFIGS", "XWS_SYCM_COMPETE_CONFIGS"], t = 0; t < s.length; t++)
                        chrome.storage.local.remove(s[t]);
                    showTips("已更新，请刷新页面重试！", 2)
                }
            }))
        }
    })
}),
$.get("https://xiaowangshen.com/xws/crx_info/?crx_pop=1", function(e) {
    $(".main-gy .ver_tips").css("display", "block");
    var s = navigator.userAgent.toLowerCase().indexOf("firefox") >= 0 ? chrome.runtime.getManifest().version : chrome.app.getDetails().version;
    intVersion(s) < intVersion(e) ? ($(".main-gy .ver_tips").text("有更新").css("background", "red"),
    $(".main-gy .ver_tips").parent().attr({
        href: "https://xiaowangshen.com?type=update",
        target: "_blank"
    })) : $(".main-gy .ver_tips").text("已是最新").css("background", "#2fc235")
}),
chrome.storage.local.get("xws_update", function(e) {
    var s = {};
    e.xws_update && (s = e.xws_update),
    s.v && (setTimeout(function() {
        versionTips(s)
    }, 500),
    $(".gy .badge-dot").length || $(".gy a").append('<i class="badge-dot"></i>'),
    $(".main-gy .update .badge-dot").length || $(".main-gy .update a").append('<i class="badge-dot"></i>')),
    $(".update").click(function() {
        if (s.v)
            versionTips(s);
        else {
            var e = $(window).width()
              , t = $(window).height();
            $("body").append('<div class="xws-tips">已经是最新版本！</div>'),
            $("div.xws-tips").css({
                top: t / 2 - $("div.xws-tips").height() / 2 + "px",
                left: e / 2 - $("div.xws-tips").width() / 2 + "px"
            }).show(),
            setTimeout(function() {
                $("div.xws-tips").fadeOut(),
                setTimeout(function() {
                    $("div.xws-tips").remove()
                }, 500)
            }, 1e3)
        }
    })
}),
chrome.storage.local.get("XWS_NEW_TK_SWITCH", function(e) {
    e.XWS_NEW_TK_SWITCH ? $(".tk-switch").attr("checked", "checked") : $(".tk-switch").removeAttr("checked")
}),
chrome.storage.local.get("XWS_SIMILAR_BTN_SWITCH", function(e) {
    e.XWS_SIMILAR_BTN_SWITCH ? $(".xws-similar-switch").attr("checked", "checked") : $(".xws-similar-switch").removeAttr("checked")
}),
chrome.storage.local.get("XWS_TB_FIXED_SWITCH", function(e) {
    var s = e.XWS_TB_FIXED_SWITCH;
    s || (s = "2",
    chrome.storage.local.set({
        XWS_TB_FIXED_SWITCH: s
    })),
    "2" == s ? $(".tb-fixed-switch").removeAttr("checked") : $(".tb-fixed-switch").attr("checked", "checked")
}),
$(".change-btn").on("change", function() {
    $(this).blur(),
    change($(this))
});
