<!--
 * @ Author: 幸焕光
 * @ Create Time: 2021-01-12 09:11:13
 * @ Description: vxe-table公共表格组件入口
 -->

<template>
  <div class="public-style">
    <vxe-table ref="vxeTable" :data="data" v-bind="$attrs" :sort-config="sortConfig" v-on="$listeners">
      <div slot="empty">
        <slot name="empty">
          {{ $attrs['empty-text'] || '暂无数据' }}
        </slot>
      </div>
      <table-column v-for="(col, index) in column" :key="index" v-bind="$attrs" :column="col" v-on="$listeners" />
    </vxe-table>
  </div>
</template>

<script>
import TableColumn from './table-column'

export default {
  components: {
    TableColumn,
  },
  props: {
    // 存放表格column数组
    column: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    // // 是否要开启页面吸顶
    // openSticky: {
    //   type: Boolean,
    //   default: false,
    // },
    sortConfig: {
      type: Object,
      default: () => {
        return {
          trigger: 'cell',
          orders: ['desc', 'asc', null],
        }
      },
    },
  },
  methods: {
    // 清除用户的选择
    clearCheckboxRow() {
      this.$refs.vxeTable.clearCheckboxRow()
    },
    // 切换某一行的选中状态
    toggleCheckboxRow(row) {
      this.$refs.vxeTable.toggleCheckboxRow(row)
    },
    // 切换某一展开行的状态
    toggleRowExpand(row) {
      this.$refs.vxeTable.toggleRowExpand(row)
    },
    // 用于 highlight-current-row，设置某一行为高亮状态
    setCurrentRow(row) {
      this.$refs.vxeTable.setCurrentRow(row)
    },
    // 手动清空排序条件，数据会恢复成未排序状态
    clearSort() {
      this.$refs.vxeTable.clearSort()
    },
    // 手动清空筛选条件,数据会恢复成未筛选状态
    clearFilter() {
      this.$refs.vxeTable.clearFilter()
    },
    // 手动对表格进行排序
    sort(sortConfs, order) {
      this.$refs.vxeTable.sort(sortConfs, order)
    },
  },
}
</script>

<style lang="scss" scoped>
// @import '@/styles/views-main.scss';
</style>
