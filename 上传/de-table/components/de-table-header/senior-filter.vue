<!--
 * @Author: your name
 * @Date: 2022-03-03 16:42:01
 * @LastEditTime: 2022-03-10 00:58:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/senior-filter.vue
-->
<template>
  <div>
    <el-dropdown
      ref="dropdown"
      class="defined-dropdown"
      :split-button="true"
      szie="small"
      trigger="click"
      @click="onClickSeniorFilter"
      @visible-change="onVisibleChange"
    >
      <span class="senior-filter"> <i class="iconfont aming-filter senior-filter-icon"> </i>高级筛选 </span>
      <el-dropdown-menu slot="dropdown">
        <div class="list-wrap">
          <div class="list-header">
            <span>高级筛选模板列表</span>
            <el-button type="text" size="medium" style="padding:0" @click="onClickAddTpl"> <i class="el-icon-plus"></i>添加模板 </el-button>
          </div>
          <div class="list-body">
            <el-scrollbar ref="scrollbar" wrap-style="max-height: 265px;">
              <draggable v-if="tplList.length > 0" v-model="tplList" class="list-group" tag="ul" @end="onDraggableEnd">
                <li v-for="(e, t) in tplList" :key="e.name" class="list-item">
                  <div class="item-before">
                    <span :title="e.name">{{ e.name }}</span>
                  </div>
                  <div class="item-after">
                    <div class="btn-group">
                      <el-button type="text" size="small" class="default-btn" @click="onClickFilter(t)">筛选</el-button>
                      <el-divider direction="vertical"></el-divider>
                      <el-button type="text" size="small" class="default-btn" @click="onClickEdit(t)">编辑</el-button>
                      <el-divider direction="vertical"></el-divider>
                      <el-button type="text" size="small" class="default-btn" @click="onClickDel(t)">删除</el-button>
                    </div>
                  </div>
                </li>
              </draggable>
              <div class="list-empty">暂无模板</div>
            </el-scrollbar>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <save-filter-tpl
      :visible.sync="saveTplVisible"
      :table-key="store.table.tableKey"
      :columns="store.states.columns"
      :edit-tpl-name="curEditTplName"
      :is-only-filter="isOnlyFilter"
      @find="handleFind"
    >
    </save-filter-tpl>
  </div>
</template>

<script>
import SaveFilterTpl from './save-filter-tpl.vue'
import draggable from 'vuedraggable'

import { fS19 } from '@/components/de-table/copy.js' // 设置模板的相关函数
import { getColumnByProp } from '@/components/de-table/public.js' // 过滤的处理相关函数

export default {
  name: 'SeniorFilter',
  components: {
    draggable,
    SaveFilterTpl,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    // eslint-disable-next-line vue/require-prop-types
    store: {
      required: !0,
    },
  },
  data: function() {
    return {
      tplList: [],
      isOnlyFilter: !1,
      curEditTplName: null,
      saveTplVisible: !1,
    }
  },
  methods: {
    onClickSeniorFilter: function() {
      this.isOnlyFilter = !0
      this.curEditTplName = null
      this.saveTplVisible = !0
    },
    onVisibleChange: function(e) {
      e && this.loadTplList()
    },
    onClickAddTpl: function() {
      this.isOnlyFilter = !1
      this.curEditTplName = null
      this.saveTplVisible = !0
    },
    onDraggableEnd: function() {
      fS19.setTplList(this.store.table.tableKey, this.tplList)
    },
    onClickFilter: function(e) {
      this.handleFind(this.tplList[e])
    },
    onClickEdit: function(e) {
      this.isOnlyFilter = !1
      this.curEditTplName = this.tplList[e].name
      this.saveTplVisible = !0
    },
    onClickDel: function(e) {
      this.tplList.splice(e, 1)
      fS19.setTplList(this.store.table.tableKey, this.tplList)
    },
    loadTplList: async function() {
      this.tplList = await fS19.getTplList(this.store.table.tableKey)
    },
    handleFind: function(e) {
      var n = this.store.states,
        r = []
      e.conditions.forEach(function(e) {
        var t = getColumnByProp(n.columns, e.prop)
        !t ||
          t.filterType !== e.filterType ||
          ((e = fS19.tplConditionToFilterValue(e)) &&
            r.push({
              column: t,
              value: e,
            }))
      })
      this.store.commit('seniorFilterChange', {
        filters: r,
        mode: e.mode,
      })

      this.$refs.dropdown.hide()
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.senior-filter .senior-filter-icon {
  color: #c0c4cc;
  display: inline-block;
  font-size: 12px;
  vertical-align: baseline;
}
.defined-dropdown .el-button-group > .el-button:first-child:focus .senior-filter-icon {
  color: #409eff;
}
::v-deep .list-wrap {
  width: 360px;
  margin: 0 0 -5px 0;
  line-height: 1.4;
  font-size: 14px;
  color: #606266;
}
::v-deep .list-wrap .list-header {
  padding: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .list-wrap .list-body {
  padding: 12px;
}
::v-deep .list-wrap .list-body .list-group {
  padding: 0;
  margin: 0;
  min-height: 150px;
}
::v-deep .list-wrap .list-body .list-group .list-item {
  background-color: #fff;
  padding: 6px 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: -1px;
  padding-right: 0px;
  line-height: 1;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-before {
  display: flex;
  align-items: center;
  overflow: hidden;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-before span {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-after {
  display: flex;
  align-items: center;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-after .btn-group {
  text-align: right;
  margin-left: 10px;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-after .btn-group .default-btn {
  padding: 6px;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-after .btn-group .el-divider {
  margin: 0;
}
::v-deep .list-wrap .list-body .list-group .list-item .item-after .btn-group .is-hover {
  opacity: 0;
}
::v-deep .list-wrap .list-body .list-group .list-item:hover .is-hover {
  opacity: 1 !important;
}
::v-deep .list-wrap .list-body .list-group .list-item:last-child {
  margin-bottom: 0;
}
::v-deep .list-wrap .list-body .list-empty {
  text-align: center;
  line-height: 150px;
  font-size: 12px;
  color: #909399;
}
</style>
