<!--
 * @Author: your name
 * @Date: 2022-03-03 16:45:51
 * @LastEditTime: 2022-03-08 17:29:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-copy.vue
-->
<template>
  <span class="column-copy-wrap" title="点击复制列数据" @click.stop="onClickCopyBtn">
    <i class="el-icon-document-copy" @click.stop="onClickCopyBtn"></i>
  </span>
</template>

<script>
import { YKlt } from '@/components/de-table/copy.js' // 复制功能相关

export default {
  name: 'ColumnCopy',
  props: {
    store: {
      type: Object,
      default: () => {},
    },
    column: {
      type: Object,
      default: () => {},
    },
  },
  data: function() {
    return {}
  },
  computed: {
    content: function() {
      return '点此可复制'.concat(this.column.label, '列')
    },
  },
  methods: {
    onClickCopyBtn: function() {
      var t = this
      let e = this.store.table
      let n = this.store.states
      let r = n.columns
      let a = n.data
      n = r.filter(function(e) {
        return e.label === t.column.label && e.prop === t.column.prop
      })
      r = new YKlt(!0, !0, !1, !1)
      r.setColumns(n)
      e.tableOptions.hasOwnProperty('exportRowHeight') && 'number' == typeof e.tableOptions.exportRowHeight && r.setRowHeight(e.tableOptions.exportRowHeight)
      this.store.elTable.summaryMethod && r.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns)
      r.onSuccess(function() {
        t.$message.success('复制成功')
      })
      r.copy(a)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.column-copy-wrap {
  width: 24px;
  height: 28px;
  z-index: 2;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.column-copy-wrap .el-icon-document-copy {
  color: #909399;
}
</style>
