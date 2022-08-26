~~~js
// 取cookie中的某个值
function aa(n, e, a) {
        void 0 === a && (a = "&");
        var o = RegExp(e + "=([^" + a + "]+)").exec(n);
        return o && o[1] ? o[1] : null
    }(document.cookie, "_bxjs_gray_", ";")
~~~

~~~js
// 返回运行这段代码的script标签
_ = function() {
        if (document.currentScript)
            return document.currentScript;
        var n = null
          , e = document.getElementsByTagName("script")
          , a = null;
        try {
            throw Error()
        } catch (t) {
            var o, i = (/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(t.stack) || [!1])[1];
            for (o in e)
                if ((a = e[o]).src == i || "interactive" == a.readyState)
                    return n = e[o],
                    e[o]
        }
        return n
    }();
~~~

~~~js
 // 是否是ObjectString
 isObjectString = function(e) {
        var t = !0;
        try {
            JSON.parse(e)
        } catch (n) {
            t = !1
        }
        return t
    }
~~~

~~~js
 isEmptyObject = function(e) {
        if (!e)
            return !0;
        for (var t in e)
            return !1;
        return !0
    }
~~~

~~~js
// 截去对象字符串  
 function formatJsonp(e) {
        return void 0 === e && (e = ""),
        e.substring(e.indexOf("{"), e.lastIndexOf("}") + 1)
    }
~~~

~~~js
 hookFunctionAndArguments = function(e, t, n, r) {
        var o = e[t];
        e[t] = function() {
            var e = toArray(arguments);
            if (n && !r && !1 === n.apply(this, e))
                return;
            return r && (e = n.apply(this, e)),
            o.apply(this, e)
        }
    }
~~~

~~~
isNull = function(e) {
	return null === e
}
~~~

~~~js
// 数组多条件过滤器
function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}
filterArray([{a:44},{a:77},{a:78}],{a:(e)=>{e<=77}})
~~~

~~~js
// ignores case-sensitive
const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

// 数组多条件过滤器
function filterPlainArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores an empty filter
      if (!filters[key].length) return true;
      return filters[key].find(filter => getValue(filter) === getValue(item[key])); 
			//  return !!~filters[key].indexOf(item[key])
    });
  });
}
 
~~~

