<!--
 * @Author: your name
 * @Date: 2022-03-03 16:43:52
 * @LastEditTime: 2022-03-10 00:57:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-header.vue
-->
<template>
  <div class="defined-header">
    <slot>
      <span :class="{ 'column-label-inner': true, 'two-line-header': column.labelTwoLine }" @click="onClickLabel">
        {{ label }}
      </span>
    </slot>
    <el-tooltip v-if="column.tips" effect="dark" :content="column.tips" placement="top">
      <i class="el-icon-question help-icon"></i>
    </el-tooltip>
    <column-edit v-if="column.editColumn" class="column-edit-inner" :column="column" :store="store" @change="onColumnEditChange"></column-edit>
    <column-sort v-if="column.sortable" ref="columnSort" v-model="sortOrder" class="column-sort-inner" :sort-orders="column.sortOrders"></column-sort>
    <column-filter
      v-if="column.filterType"
      class="column-filter-inner"
      :type="column.filterType"
      :filters="column.filters"
      :default-value="filterDefaultValue"
      @change="onColumnFilterChange"
    ></column-filter>
    <column-copy v-if="column.copyColumn" class="column-copy-inner" :column="column" :store="store"></column-copy>
  </div>
</template>

<script>
import ColumnSort from './column-sort.vue'
import ColumnFilter from './column-filter.vue'
import ColumnCopy from './column-copy.vue'
import ColumnEdit from './column-edit.vue'

export default {
  name: 'TableHeader',
  components: {
    ColumnSort,
    ColumnFilter,
    ColumnCopy,
    ColumnEdit,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    store: {
      required: !0,
    },
    // eslint-disable-next-line vue/require-default-prop
    column: {
      type: Object,
      required: !0,
    },
  },
  computed: {
    label: function() {
      var e,
        t,
        n = this.column.label
      if (this.column.labelTwoLine) {
        if ('string' == typeof this.column.labelTwoLine) {
          n = this.column.labelTwoLine
        } else {
          e = this.column.label
          t = Math.floor(e.length / 2)
          n = ''.concat(e.slice(0, t), '<br/>').concat(e.slice(t))
        }
      }

      return n
    },
    filterDefaultValue: function() {
      return this.store.states.filters[this.column.prop] ? this.store.states.filters[this.column.prop].value : null
    },
    sortOrder: {
      get: function() {
        return this.store.states.sortProp === this.column.prop ? this.store.states.sortOrder : null
      },
      set: function(e) {
        this.store.states.sortingColumn = Object.freeze(this.column)
        this.store.states.sortProp = this.column.prop
        this.store.states.sortOrder = e

        this.store.commit('changeSortCondition')
      },
    },
  },
  methods: {
    onColumnFilterChange: function(e) {
      this.store.commit('columnFilterChange', {
        column: this.column,
        value: e,
      })
    },
    onClickLabel: function() {
      this.$refs.columnSort && this.$refs.columnSort.onClickSortBtn()
    },
    onColumnEditChange: function(e) {
      this.store.commit('columnEditChange', {
        column: this.column,
        value: e,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.defined-header {
  display: block;
  padding: 0; /*解决无排序无筛选表格头高度问题*/ /*line-height: 1;*/
  box-sizing: border-box;
  white-space: nowrap;
}
.defined-header .column-label-inner {
  display: inline-block;
  vertical-align: middle;
}
.defined-header .column-copy-inner {
  display: inline-block;
  vertical-align: middle;
}
.defined-header .column-sort-inner + .column-filter-inner {
  margin-left: -2px;
}
.defined-header .column-sort-inner + .column-filter-inner .filter-icon {
  width: 20px;
} /* 两行表格头 */
.two-line-header {
  display: inline-block;
  line-height: 1.2; /* 解决第二行文字左对齐问题*/ /*text-align: left;*/
}
.help-icon {
  margin-left: 3px;
  color: #c0c4cc;
  cursor: pointer;
  vertical-align: middle;
}
</style>
