/**
 * @ Author: 幸焕光
 * @ Create Time: 2021-01-13 20:53:49
 * @ Modified by: 梁锐基
 * @ Modified time: 2021-10-26 15:24:35
 * @ Description: 辅助column的渲染函数
 * @ URL:
 */

export default {
  checkbox: {
    renderHeader(h, { store }) {
      /**
       * 列标题 Label 区域渲染使用的 Function
       * @param {Function} createElement 元素创建者
       * @param {Object} store 内部状态管理数据
       */
      return (
        <el-checkbox
          disabled={store.states.data && store.states.data.length === 0}
          indeterminate={store.states.selection.length > 0 && !store.states.isAllSelected}
          nativeOn-click={store.toggleAllSelection}
          value={store.states.isAllSelected}
        />
      )
    },
    // renderCell(h, { row, column, store, $index }) {
    //   /**
    //    * 渲染单元格
    //    * @param {Function} createElement 元素创建者
    //    * @param {Object} row 行
    //    * @param {Object} column 列
    //    * @param {Object} store 内部状态管理数据
    //    * @param {Number} $index 第几行
    //    */
    //   return (
    //     <el-checkbox
    //       nativeOn-click={event => event.stopPropagation()}
    //       value={store.isSelected(row)}
    //       disabled={
    //         column.selectable
    //           ? !column.selectable.call(null, row, $index)
    //           : false
    //       }
    //       on-input={() => {
    //         store.commit('rowSelectedChanged', row)
    //       }}
    //     />
    //   )
    // },
    sortable: false,
    resizable: false,
  },
  seq: {
    renderHeader: (h, scope) => {
      return <span>{scope.column.label || '#'}</span>
    },
    renderCell: (h, _options) => {
      const { rowIndex, column } = _options
      let i = rowIndex + 1
      const index = column.index

      if (index && typeof index === 'number') {
        i = rowIndex + index
      } else if (index && typeof index === 'function') {
        i = index(rowIndex)
      }

      return <div>{i}</div>
    },
    sortable: false,
  },
  expand: {
    renderHeader: (h, scope) => {
      return <span>{scope.column.label || ''}</span>
    },
    renderCell: (h, { row, store }, proxy) => {
      const expanded = store.states.expandRows.indexOf(row) > -1
      return (
        <div class={'el-table__expand-icon ' + (expanded ? 'el-table__expand-icon--expanded' : '')} on-click={e => proxy.handleExpandClick(row, e)}>
          <i class="el-icon el-icon-arrow-right" />
        </div>
      )
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column',
  },
}
