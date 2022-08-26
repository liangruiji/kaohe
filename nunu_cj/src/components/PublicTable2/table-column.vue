<!--
 * @ Author: 幸焕光
 * @ Create Time: 2021-01-12 09:21:47
 * @ Modified by: 梁锐基
 * @ Modified time: 2021-10-26 15:24:19
 * @ Description: 表格列设置
 * @ URL:
 -->

<!--
**vxe-table-column的属性，详细文档URL:https://xuliangzhan_admin.gitee.io/vxe-table/#/table-column/api **
type: 列的类型
field: 列的字段名，直接获取数据
title: 列标题
width: 列宽
minWidth: 最小列宽
resizable: 列是否允许拖动列宽调整大小
visible: 列是否显示
fixed: 列固定
align: 列对其方式
headerAlign: 列表头对齐方式
footerAlign: 列尾对齐方式
showOverflow: 当内容过长时显示为省略号
showHeaderOverflow: 当表头内容过长时显示省略号
showFooterOverflow: 当表尾内容过长时显示省略号
className: 给单元格附加class
headerClassName: 给表头的单元格附加class
footerClassName: 给表尾的单元格附加class
formatter: 自定义列内容格式化
seqMethod: 自定义索引方法（只对type=sqe生效）
sortable: 是否允许列排序
sort-by: 自定义排序规则
filters: 配置筛选条件，（筛选只能用于列表，如果是树结构则过滤根节点）
filterRender: 筛选渲染器配置项
exportMethod: 自定义单元格数据的导出方法，该方法的返回值将会被导出
footerExportMethod: 自定义表尾单元格数据导出方法，该方法的返回值将会被导出
titleHelp: 标题帮助图标配置项
cellType: 只对特定功能有效，单元格值类型（例如：导出数据类型设置）❗️没搞清楚具体使用场景
cellRender: 默认的渲染器配置项
editRender: 可编辑渲染器配置项
contentRender :内容渲染配置项
treeNode: 只对 tree-config 配置时有效，指定为树节点
params: 额外的参数（可以用来存放一些私有参数）
-->

<template>
  <!-- column显示 -->
  <vxe-table-column
    v-bind="$attrs"
    :type="column.type"
    :field="column.field"
    :title="column.title || column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :resizable="column.resizable || true"
    :visible="column.visible"
    :fixed="column.fixed"
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :footer-align="column.footerAlign"
    :show-overflow="column.showOverflow"
    :show-header-overflow="column.showHeaderOverflow"
    :show-footer-overflow="column.showFooterOverflow"
    :class-name="column.className"
    :header-class-name="column.headerClassName"
    :footer-class-name="column.footerClassName"
    :formatter="column.formatter"
    :sortable="column.sortable || false"
    :sort-by="column.sortBy"
    :filters="column.filters"
    :filter-render="column.filterRender"
    :export-method="column.exportMethod"
    :footer-export-method="column.footerExportMethod"
    :title-help="column.titleHelp"
    :cell-type="column.cellType"
    :cell-render="column.cellRender"
    :edit-render="column.editRender"
    :content-render="column.contentRender"
    :tree-node="column.treeNode"
    :params="column.params"
    v-on="$listeners"
  >
    <!-- 插槽-处理自定义列的内容 -->
    <template #default="scope">
      <column-render :scope="scope" :render="column.render" />
    </template>

    <!-- 多级表头 -->
    <template v-if="column.children">
      <table-column v-for="(col, index) in column.children" :key="index" :column="col" />
    </template>
  </vxe-table-column>
</template>

<script>
import ColumnUtils from './column-utils'
import ColumnRender from './column-render'

export default {
  name: 'TableColumn',
  components: {
    ColumnRender,
  },
  props: {
    column: {
      type: Object,
      default: () => {},
    },
    align: {
      type: String,
      default: '',
    },
    headerAlign: {
      type: String,
      default: '',
    },
  },
  watch: {
    column: {
      handler() {
        this.setColumn()
      },
      immediate: true,
    },
  },
  methods: {
    setColumn() {
      // 处理type类型
      if (this.column.type) {
        // eslint-disable-next-line vue/no-mutating-props
        this.column.render = this.column.render || ColumnUtils[this.column.type].renderCell
      }

      // 处理格式化formatter
      if (this.column.formatter) {
        // eslint-disable-next-line vue/no-mutating-props
        this.column.render = (h, scope) => {
          return <span>{scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)}</span>
        }
      }
      // 处理render函数配置
      if (!this.column.render) {
        // eslint-disable-next-line vue/no-mutating-props
        this.column.render = (h, scope) => {
          if (scope.row[this.column.field] || scope.row[this.column.field] === 0) {
            return <span>{scope.row[scope.column.property]}</span>
          } else if (!this.column.type) {
            return <span>-</span>
          }
        }
      }
    },
  },
}
</script>
