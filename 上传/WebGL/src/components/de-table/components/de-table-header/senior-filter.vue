<!--
 * @Author: your name
 * @Date: 2022-03-03 16:42:01
 * @LastEditTime: 2022-03-03 16:57:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/senior-filter.vue
-->
<template>
  
</template>

<script>
  var r = n("HaE+"), // Promise相关的函数 ，没看明白
    a = (n("ls82"),
      n("sMBO"),
      n("pDQq"),
      n("07d7"),
      n("FZtP"),
      n("t2rG")),
    i = n.n(a), // draggable库，不知道是哪个，拖拽组件库
    a = n("8iSq"), // SaveFilterTpl
    o = n("fS19"), // 设置模板的相关函数
    s = n("gKiB"); // 过滤的处理相关函数
export default  {
    name: "seniorFilter",
    components: {
      draggable: i.a,
      SaveFilterTpl: a.default
    },
    props: {
      store: {
        required: !0
      }
    },
    data: function () {
      return {
        tplList: [],
        isOnlyFilter: !1,
        curEditTplName: null,
        saveTplVisible: !1
      }
    },
    methods: {
      onClickSeniorFilter: function () {
        this.isOnlyFilter = !0,
          this.curEditTplName = null,
          this.saveTplVisible = !0
      },
      onVisibleChange: function (e) {
        e && this.loadTplList()
      },
      onClickAddTpl: function () {
        this.isOnlyFilter = !1,
          this.curEditTplName = null,
          this.saveTplVisible = !0
      },
      onDraggableEnd: function () {
        Object(o.setTplList)(this.store.table.tableKey, this.tplList)
      },
      onClickFilter: function (e) {
        this.handleFind(this.tplList[e])
      },
      onClickEdit: function (e) {
        this.isOnlyFilter = !1,
          this.curEditTplName = this.tplList[e].name,
          this.saveTplVisible = !0
      },
      onClickDel: function (e) {
        this.tplList.splice(e, 1),
          Object(o.setTplList)(this.store.table.tableKey, this.tplList)
      },
      loadTplList: function () {
        var t = this;
        return Object(r.default)(regeneratorRuntime.mark(function e() { // Babel 将 Generator 编译后的代码 https://juejin.cn/post/6844903701908291592#heading-0
          return regeneratorRuntime.wrap(function (e) {
            for (;;)
              switch (e.prev = e.next) {
                case 0:
                  return e.next = 2,
                    Object(o.getTplList)(t.store.table.tableKey);
                case 2:
                  t.tplList = e.sent;
                case 3:
                case "end":
                  return e.stop()
              }
          }, e)
        }))()
      },
      handleFind: function (e) {
        var n = this.store.states,
          r = [];
        e.conditions.forEach(function (e) {
            var t = Object(s.getColumnByProp)(n.columns, e.prop);
            !t || t.filterType !== e.filterType || (e = Object(o.tplConditionToFilterValue)(e)) && r.push({
              column: t,
              value: e
            })
          }),
          this.store.commit("seniorFilterChange", {
            filters: r,
            mode: e.mode
          }),
          this.$refs.dropdown.hide()
      }
    }
  }
</script>

<style lang='scss' scope>

</style>