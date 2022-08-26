<!--
 * @ Author: 幸焕光
 * @ Create Time: 2021-01-12 10:21:01
 * @ Modified by: 梁锐基
 * @ Modified time: 2021-10-26 15:24:40
 * @ Description: 表格列渲染器用于自定义列内容
 * @ URL:
 -->

<script>
export default {
  name: 'ColumnRender',
  functional: true,
  render(h, ctx) {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  },
}
</script>
