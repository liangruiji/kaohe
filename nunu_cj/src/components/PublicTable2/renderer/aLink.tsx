
/**
 * @ Author: 幸焕光
 * @ Create Time: 2021-01-12 16:34:04
 * @ Modified by: 梁锐基
 * @ Modified time: 2021-10-26 15:24:03
 * @ Description: 超链接渲染器
 * @ URL:
 */

import VXETable from 'vxe-table'

VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault(h, renderOpts, params) {
    const { row, column } = params
    return [
      <a class="my-link" href={row.link}>
        {row[column.property]}
      </a>,
    ]
  },
})
