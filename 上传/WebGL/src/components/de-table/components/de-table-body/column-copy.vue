<!--
 * @Author: your name
 * @Date: 2022-03-03 16:45:51
 * @LastEditTime: 2022-03-03 16:59:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-copy.vue
-->
<template>
  
</template>

<script>
 var i = n("YKlt"); // // 复制功能相关函数
export default  {
    name: "columnCopy",
    props: {
      store: {
        type: Object,
        default: {}
      },
      column: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {}
    },
    computed: {
      content: function () {
        return "点此可复制".concat(this.column.label, "列")
      }
    },
    methods: {
      onClickCopyBtn: function () {
        var t = this,
          e = this.store.table,
          n = this.store.states,
          r = n.columns,
          a = n.data,
          n = r.filter(function (e) {
            return e.label === t.column.label && e.prop === t.column.prop
          }),
          r = new i.default(!0, !0, !1, !1);
        r.setColumns(n),
          e.tableOptions.hasOwnProperty("exportRowHeight") && "number" == typeof e.tableOptions.exportRowHeight && r.setRowHeight(e.tableOptions.exportRowHeight),
          this.store.elTable.summaryMethod && r.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns),
          r.onSuccess(function () {
            t.$message.success("复制成功")
          }),
          r.copy(a)
      }
    }
  }
</script>

<style lang='scss' scope>

</style>