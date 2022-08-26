<!--
 * @Author: your name
 * @Date: 2022-03-03 16:44:27
 * @LastEditTime: 2022-03-03 16:44:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-filter.vue
-->
<template>
  
</template>

<script>
  var a = n("KQm4"), // 把类数组转为数组的函数
    r = n("jraC"), // LazyLoad
    i = n("gKiB"); // 一些公共函数
export default {
    name: "columnFilter",
    components: {
      LazyLoad: r.default
    },
    props: {
      type: {
        type: String,
        default: "string",
        validator: function (e) {
          return -1 !== ["string", "number", "checkbox", "hours", "day", "week", "month", "mark"].indexOf(e)
        }
      },
      filters: {
        type: Array,
        default: function () {
          return []
        }
      },
      defaultValue: {
        default: null
      }
    },
    data: function () {
      return {
        lazyLoadStatus: !0,
        visible: !(this.timeTypes = ["day", "week", "month"]),
        form: {
          keyword: null,
          gt: null,
          eq: null,
          lt: null,
          check: [],
          hours: [],
          day: [],
          week: null,
          month: [],
          mark_note: null,
          mark_priority: null
        },
        formRules: {
          gt: [{
            type: "number",
            transform: i.transformToFloat,
            message: "请输入数字",
            trigger: "blur"
          }],
          eq: [{
            type: "number",
            transform: i.transformToFloat,
            message: "请输入数字",
            trigger: "blur"
          }],
          lt: [{
            type: "number",
            transform: i.transformToFloat,
            message: "请输入数字",
            trigger: "blur"
          }]
        }
      }
    },
    watch: {
      type: function () {
        var e = this;
        this.lazyLoadStatus = !1,
          this.$nextTick(function () {
            e.lazyLoadStatus = !0
          })
      }
    },
    methods: {
      assignAndFocus: function () {
        var t = this;
        this.$nextTick(function () {
          var e = null;
          "string" === t.type ? (e = t.$refs.keywordInput,
              t.form.keyword = t.defaultValue ? t.defaultValue.keyword : null) : "number" === t.type ? (e = t.$refs.gtInput,
              t.defaultValue ? (t.form.gt = t.defaultValue.gt,
                t.form.eq = t.defaultValue.eq,
                t.form.lt = t.defaultValue.lt) : t.form.gt = t.form.eq = t.form.lt = null) : "checkbox" === t.type ? (t.form.check = t.defaultValue ? Object(a.default)(t.defaultValue) : [],
              t.$refs.checkScroll && (t.$refs.checkScroll.moveX = 0,
                t.$refs.checkScroll.moveY = 0)) : "hours" === t.type ? (t.form.hours = t.defaultValue ? Object(a.default)(t.defaultValue) : [],
              t.$refs.hoursScroll && (t.$refs.hoursScroll.moveX = 0,
                t.$refs.hoursScroll.moveY = 0)) : "day" === t.type ? (e = t.$refs.day,
              t.form.day = t.defaultValue ? Object(a.default)(t.defaultValue) : []) : "week" === t.type ? (e = t.$refs.week,
              t.form.week = t.defaultValue || null) : "month" === t.type && (e = t.$refs.month,
              t.form.month = t.defaultValue ? Object(a.default)(t.defaultValue) : []),
            e && (e.focus(),
              e.select && e.select())
        })
      },
      handleFilter: function (e) {
        var t = this,
          n = null,
          r = !0;
        "string" === this.type ? this.form.keyword && (n = {
            mode: e,
            keyword: this.form.keyword
          }) : "number" === this.type ? this.$refs.form.validate(function (e) {
            (r = e) && (t.form.gt || t.form.eq || t.form.lt) && (n = {
              gt: t.form.gt ? parseFloat(t.form.gt) : null,
              eq: t.form.eq ? parseFloat(t.form.eq) : null,
              lt: t.form.lt ? parseFloat(t.form.lt) : null
            })
          }) : "checkbox" === this.type ? 0 < this.form.check.length && (n = Object(a.default)(this.form.check)) : "hours" === this.type ? 0 < this.form.hours.length && (n = Object(a.default)(this.form.hours)) : "day" === this.type ? 0 < this.form.day.length && (n = Object(a.default)(this.form.day)) : "week" === this.type ? this.form.week && (n = this.form.week) : "month" === this.type ? 0 < this.form.month.length && (n = Object(a.default)(this.form.month)) : "mark" === this.type && (this.form.mark_priority || this.form.mark_note) && (n = {
            mode: e,
            mark_priority: "无" === this.form.mark_priority ? "null" : this.form.mark_priority,
            mark_note: this.form.mark_note
          }),
          r && (this.visible = !1,
            this.$emit("change", n))
      },
      onCheckboxChange: function (e, t) {
        this.form.check = [],
          t && this.form.check.push(e),
          this.handleFilter()
      },
      onHoursChange: function (e, t) {
        this.form.hours = [],
          t && this.form.hours.push(e),
          this.handleFilter()
      },
      onDatePickerBlur: function () {
        this.visible = !1
      },
      onClickReset: function () {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style lang='scss' scope>

</style>