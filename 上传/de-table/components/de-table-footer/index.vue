<!--
 * @Author: your name
 * @Date: 2022-03-03 16:47:39
 * @LastEditTime: 2022-03-08 18:03:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-footer/index.vue
-->
<template>
  <div class="footer-wrap">
    <div class="footer-left">
      <div v-if="!store.table.tableOptions.hiddenSegment && 0 < store.states.data.length" class="segment-inner">
        <span>显示行数</span>
        <el-select v-model="segment" placeholder="行数" size="mini" class="segment-select">
          <el-option v-for="e in segmentList" :key="e" :label="e" :value="e"></el-option>
          <el-option key="all" label="全部" :value="null"></el-option>
        </el-select>
      </div>
      <div v-else style="height:32px"></div>
      <div v-show="!store.table.tableOptions.hiddenTotalRow && 0 < store.states._data.length" class="total-row-inner">
        {{ totalText }}
      </div>
    </div>
    <div v-if="store.states.isServerPage" class="footer-right">
      <el-pagination
        :layout="store.table.tableOptions.pageLayout"
        :total="store.states.total"
        :current-page="store.states.currentPage"
        :page-size="store.table.tableOptions.pageSize"
        :page-sizes="store.table.tableOptions.pageSizes"
        :background="true"
        @size-change="
          e => {
            return store.commit('changePageDetails', 1, e)
          }
        "
        @current-change="
          e => {
            return t.store.commit('changePageDetails', e, store.states.pageSize)
          }
        "
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeTableFooter',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    store: {
      required: !0,
    },
  },
  data: function() {
    return (this.segmentList = [10, 30, 50, 100, 200]), {}
  },
  computed: {
    segment: {
      get: function() {
        return this.store.states.segment
      },
      set: function(e) {
        this.store.commit('segmentChange', e)
      },
    },
    totalText: function() {
      var e = ''
      return (
        this.store.states._data.length !== this.store.states.data.length && (e = '当前'.concat(this.store.states.data.length, '行数据，')),
        (e += '共'.concat(this.store.states._data.length, '行数据'))
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.footer-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 6px 0 6px;
  background-color: #fff;
}
.footer-wrap .footer-left {
  flex-shrink: 0;
  line-height: 32px;
  color: #909399;
  font-size: 12px;
  display: flex;
}
.footer-wrap .footer-left .segment-select {
  width: 72px;
}
.footer-wrap .footer-left .segment-select .el-input__inner {
  color: #909399;
}
.footer-wrap .footer-left > .segment-inner + .total-row-inner {
  margin-left: 5px;
}
.footer-wrap .footer-right {
  text-align: right;
}
</style>
