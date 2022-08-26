<!--
 * @Author: your name
 * @Date: 2022-03-03 16:44:08
 * @LastEditTime: 2022-03-09 10:32:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-sort.vue
-->
<template>
  <span :class="{ 'caret-wrapper': true, ascending: 'ascending' === value, descending: 'descending' === value }" @click.stop="onClickSortBtn()">
    <i class="sort-caret ascending" @click.stop="onClickSortBtn('ascending')"></i>
    <i class="sort-caret descending" @click.stop="onClickSortBtn('descending')"></i>
  </span>
</template>

<script>
export default {
  name: 'ColumnSort',
  props: {
    value: {
      type: String,
      default: null,
    },
    sortOrders: {
      type: Array,
      default: function() {
        return ['ascending', 'descending', null]
      },
    },
  },
  methods: {
    onClickSortBtn: function(e) {
      var t = this
      let n = null

      if (e) {
        if (this.value === e) {
          n = null
        } else {
          n = e
        }
      } else {
        e = this.sortOrders.findIndex(function(e) {
          return e === t.value
        })
        e = e + 1
        if (e >= this.sortOrders.length) {
          e = 0
        }
        n = this.sortOrders[e]
      }

      this.$emit('input', n)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.caret-wrapper {
  z-index: 1;
  height: 28px;
}
.caret-wrapper .sort-caret.ascending {
  top: 3px;
}
.caret-wrapper .sort-caret.descending {
  bottom: 3px;
}
</style>
