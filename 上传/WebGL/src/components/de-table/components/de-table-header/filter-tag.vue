<!--
 * @Author: your name
 * @Date: 2022-03-03 16:41:19
 * @LastEditTime: 2022-03-03 16:54:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/filter-tag.vue
-->
<template>
  
</template>

<script>

 var r = n("wd/R"), // momentjs时间库
    s = n.n(r), // momentjs时间库
    l = {
      fuzzy: "包含",
      precision: "等于",
      nequal: "不包含"
    };
export default {
    name: "filterTag",
    props: {
      headerText: {
        type: String,
        default: ""
      },
      filters: {
        type: Object,
        default: function () {
          return {}
        }
      },
      globalFilterKeyword: {
        type: String,
        default: null
      },
      filterMode: {
        type: String,
        default: null
      }
    },
    computed: {
      tags: function () {
        var t = this,
          n = [];
        return this.globalFilterKeyword && n.push({
            prop: null,
            text: "全局搜索-".concat(this.globalFilterKeyword)
          }),
          Object.keys(this.filters).forEach(function (e) {
            n.push({
              prop: e,
              text: function (n, r, a) {
                var i = "",
                  o = [];
                switch (n.filterType) {
                  case "string":
                    Array.isArray(r) ? r.forEach(function (e, t) {
                      i += "".concat(l[e.mode], ": ").concat(e.keyword).concat(t !== r.length - 1 ? "and" === a ? " & " : " | " : "")
                    }) : i = "".concat("fuzzy" === r.mode ? "模糊" : "精确", "搜索-").concat(r.keyword);
                    break;
                  case "number":
                    o = [],
                      null !== r.gt && o.push("大于".concat(r.gt)),
                      null !== r.eq && o.push("等于".concat(r.eq)),
                      null !== r.lt && o.push("小于".concat(r.lt)),
                      0 < o.length && (i = o.join(" ".concat(r.gt > r.lt ? "|" : "&", "  ")));
                    break;
                  case "checkbox":
                    o = [],
                      r.forEach(function (t) {
                        var e = n.filters.find(function (e) {
                          return e.value === t
                        });
                        e && o.push(e.text)
                      }),
                      0 < o.length && (i = o.join(" | "));
                    break;
                  case "hours":
                    0 < r.length && (i = r.join(" | "));
                    break;
                  case "day":
                    i = "".concat(s.a.unix(r[0].getTime() / 1e3).format("YYYY-MM-DD"), "~").concat(s.a.unix(r[1].getTime() / 1e3).format("YYYY-MM-DD"));
                    break;
                  case "week":
                    i = s.a.unix(r.getTime() / 1e3).format("YYYY 第ww周");
                    break;
                  case "month":
                    i = "".concat(s.a.unix(r[0].getTime() / 1e3).format("YYYY-MM"), "~").concat(s.a.unix(r[1].getTime() / 1e3).format("YYYY-MM"));
                    break;
                  case "mark":
                    var e = "null" === r.mark_priority ? "无" : r.mark_priority,
                      i = "优先级 ".concat("null" === r.mark_priority ? "无" : e, " ");
                    r.mark_note && (i += "".concat(r.mark_note)),
                      r.keyword && (i = "优先级 ".concat(r.keyword))
                }
                return "".concat(n.label, "：").concat(i)
              }(t.filters[e].column, t.filters[e].value, t.filterMode)
            })
          }),
          n
      }
    },
    methods: {
      onClickTagClose: function (e) {
        return e.prop && this.filters.hasOwnProperty(e.prop) ? this.$emit("remove-filter", this.filters[e.prop]) : this.$emit("remove-global-filter"),
          !0
      }
    }
  }
</script>

<style lang='scss' scope>

</style>