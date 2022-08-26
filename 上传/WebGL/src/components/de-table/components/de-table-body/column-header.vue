<!--
 * @Author: your name
 * @Date: 2022-03-03 16:43:52
 * @LastEditTime: 2022-03-03 23:02:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-header.vue
-->
<template>

</template>

<script>
  var r = n("pRJY"), // ColumnSort
    a = n("eodP"), // ColumnFilter
    i = n("2XmY"), // ColumnCopy
    n = n("Lg/V"); // ColumnEdit
export default {
    name: "tableHeader",
    components: {
      ColumnSort: r.default,
      ColumnFilter: a.default,
      ColumnCopy: i.default,
      ColumnEdit: n.default
    },
    props: {
      store: {
        required: !0
      },
      column: {
        type: Object,
        required: !0
      }
    },
    computed: {
      label: function () {
        var e, t, n = this.column.label;
        return n = this.column.labelTwoLine ? "string" == typeof this.column.labelTwoLine ? this.column.labelTwoLine : (e = this.column.label,
          t = Math.floor(e.length / 2),
          "".concat(e.slice(0, t), "<br/>").concat(e.slice(t))) : n
      },
      filterDefaultValue: function () {
        return this.store.states.filters[this.column.prop] ? this.store.states.filters[this.column.prop].value : null
      },
      sortOrder: {
        get: function () {
          return this.store.states.sortProp === this.column.prop ? this.store.states.sortOrder : null
        },
        set: function (e) {
          this.store.states.sortingColumn = Object.freeze(this.column),
            this.store.states.sortProp = this.column.prop,
            this.store.states.sortOrder = e,
            this.store.commit("changeSortCondition")
        }
      }
    },
    methods: {
      onColumnFilterChange: function (e) {
        this.store.commit("columnFilterChange", {
          column: this.column,
          value: e
        })
      },
      onClickLabel: function () {
        this.$refs.columnSort && this.$refs.columnSort.onClickSortBtn()
      },
      onColumnEditChange: function (e) {
        this.store.commit("columnEditChange", {
          column: this.column,
          value: e
        })
      }
    }
  }
</script>

<style lang='scss' scope>

</style>