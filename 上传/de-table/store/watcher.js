import Vue from 'vue'
import mixins from './mixins'
import {
  getSlotNamesByColumns,
  orderBy,
  getPropByColumn,
  globalFilter,
  getMinMaxByData,
  getNumStripeData,
  numberFilter,
  stringFilter,
  checkboxFilter,
  dayFilter,
  weekFilter,
  markFilter,
  monthFilter,
} from '@/components/de-table/public.js'
console.log('getSlotNamesByColumns')
console.log(getSlotNamesByColumns)
export default Vue.extend({
  mixins: [mixins],
  data: function() {
    return {
      states: {
        isServerPage: !1,
        _data: [],
        filteredData: [],
        sortedData: [],
        data: [],
        dataFun: null,
        currentPage: 1,
        total: 0,
        pageSize: null,
        numStripeProps: [],
        numStripeData: [],
        _columns: [],
        columns: [],
        _colSetData: [],
        colSetData: [],
        slotNames: [],

        filterMode: 'and',
        filters: {},
        globalFilterKeyword: null,
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,
        segment: null,
      },
    }
  },
  methods: {
    // 更新列
    updateColumns(func) {
      const states = this.states
      states.numStripeProps = []
      states.columns = []
      this.getColumnsByCache(columns => {
        states.columns = columns
        states.numStripeProps = this.getNumStripePropsByColumns(states.columns)
        this.updateNumStripeData()

        states._colSetData = this.columnsToColSetData(states._columns)
        states.colSetData = this.columnsToColSetData(states.columns)
        func && func(states, this)
      })
    },

    resetColumns(func) {
      this.states.columns = []
      this.$nextTick(() => {
        this.updateColumns(() => {
          func && func()
        })
      })
    },

    updateSlotNames: function() {
      var e = this.states
      e.slotNames = Object.freeze(getSlotNamesByColumns(e._columns))
    },
    updateFilters: function(e, t) {
      var n,
        r,
        a = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = this.states
      return (
        t
          ? ((r = null),
            'number' === e.filterType
              ? ((r = Object.assign({}, t)),
                i.filters.hasOwnProperty(e.prop) &&
                  a &&
                  ((n = i.filters[e.prop].value),
                  Object.keys(n).forEach(function(e) {
                    n[e] && (r[e] = n[e])
                  })))
              : 'string' === e.filterType
              ? ((r = [t]),
                i.filters.hasOwnProperty(e.prop) &&
                  i.filters[e.prop].hasOwnProperty('value') &&
                  a &&
                  ((a = i.filters[e.prop].value).find(function(e) {
                    return e.mode === t.mode && e.keyword === t.keyword
                  }) ||
                    (r = [].concat(Array.from(r), Array.from(a)))))
              : (r = t),
            this.$set(
              i.filters,
              e.prop,
              Object.freeze({
                column: e,
                value: r,
              }),
            ))
          : this.$delete(i.filters, e.prop),
        i.filters
      )
    },
    clearFilter: function() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
        t = this.states
      e ? this.$delete(t.filters, e) : ((t.filters = {}), (t.globalFilterKeyword = null))
    },
    updateSort: function(e, t, n) {
      this.states.sortingColumn = e
      this.states.sortProp = t
      this.states.sortOrder = n
    },
    updateNumStripeData: function() {
      var e,
        t = this.states
      t.numStripeData = []

      if (0 < t.numStripeProps.length && 0 < t.data.length) {
        e = getMinMaxByData(t.data, t.numStripeProps)
        t.numStripeData = Object.freeze(getNumStripeData(t.data, e))
      }
      // 0 < t.numStripeProps.length &&
      //   0 < t.data.length &&
      //   ((e = getMinMaxByData(t.data, t.numStripeProps)), (t.numStripeData = Object.freeze(getNumStripeData(t.data, e))))
    },
    execFilter: function() {
      var n,
        t,
        e = this.states,
        r = e._data,
        a = e.filterMode,
        i = e.filters,
        o = e.globalFilterKeyword,
        s = e.columns,
        l = r.map(function(e, t) {
          return {
            index: t,
            value: e,
          }
        }),
        c = []
      ;(c =
        'and' === a
          ? ((c = l),
            null != o && ((r = getPropByColumn(s)), (c = globalFilter(l, r, o))),
            0 < Object.keys(i).length &&
              Object.keys(i).forEach(function(e) {
                var t = i[e]
                switch (t.column.filterType) {
                  case 'string':
                    c = stringFilter(c, e, t.value, a)
                    break
                  case 'number':
                    c = numberFilter(c, e, t.value.gt, t.value.eq, t.value.lt)
                    break
                  case 'checkbox':
                  case 'hours':
                    c = checkboxFilter(c, e, t.value)
                    break
                  case 'day':
                    c = dayFilter(c, e, t.value)
                    break
                  case 'week':
                    c = weekFilter(c, e, t.value)
                    break
                  case 'month':
                    c = monthFilter(c, e, t.value)
                    break
                  case 'mark':
                    c = markFilter(c, t.value.mode, ['mark_priority', 'mark_note'], t.value)
                }
              }),
            c.map(function(e) {
              return e.value
            }))
          : ((n = !(c = [])),
            null != o && ((s = getPropByColumn(s)), (c = c.concat(globalFilter(l, s, o))), (n = !0)),
            0 < Object.keys(i).length &&
              Object.keys(i).forEach(function(e) {
                var t = i[e]
                switch (t.column.filterType) {
                  case 'string':
                    c = c.concat(stringFilter(l, e, t.value, a))
                    n = !0
                    break
                  case 'number':
                    c = c.concat(numberFilter(l, e, t.value.gt, t.value.eq, t.value.lt))
                    n = !0
                    break
                  case 'checkbox':
                  case 'hours':
                    c = c.concat(checkboxFilter(l, e, t.value))
                    n = !0
                    break
                  case 'day':
                    c = c.concat(dayFilter(l, e, t.value))
                    n = !0
                    break
                  case 'week':
                    c = c.concat(weekFilter(l, e, t.value))
                    n = !0
                    break
                  case 'month':
                    c = c.concat(monthFilter(l, e, t.value))
                    n = !0
                }
              }),
            (c = n
              ? ((t = []),
                c.filter(function(e) {
                  return !t.includes(e.index) && (t.push(e.index), !0)
                }))
              : l).map(function(e) {
              return e.value
            }))),
        (e.filteredData = c)
    },
    execSort: function() {
      var e,
        t,
        n = this.states
      let r = n.filteredData
      e = n
      t = e.sortingColumn
      if (t) {
        r = orderBy(r, e.sortProp, e.sortOrder, t.sortMethod, t.sortBy)
      }

      n.sortedData = Object.isFrozen(n.filteredData) ? Object.freeze(r) : r
    },
    execSegment: function() {
      var e = this.states
      e.segment ? (e.data = e.sortedData.slice(0, e.segment)) : (e.data = e.sortedData)
    },
    execQuery: async function(t) {
      if (!this.states.isServerPage) {
        this.execLocalQuery(t)
      } else {
        await this.execServerQuery(t)
      }
      this.execSegment()
      this.updateNumStripeData()
      return true
    },
    execLocalQuery: function(e) {
      if (!(e && e.filter)) {
        this.execFilter()
      }
      if (!(e && e.sort)) {
        this.execSort()
      }
    },
    execServerQuery: async function() {
      let t = this.states
      let n = this.getServerParams()
      n = await t.dataFun(n)
      t.currentPage = n.currentPage
      t.total = n.total
      t.sortedData = n.data
      return true
    },
    getServerParams: function() {
      var e = this.states,
        t = e.filters,
        n = e.globalFilterKeyword,
        r = e.sortProp,
        a = e.sortOrder,
        i = e.pageSize,
        o = e.currentPage
      e = {}
      return (
        null != n && '' !== n && (e.search = n),
        0 < Object.keys(t).length && (e.filters = t),
        a && ((e.order = a), (e.orderBy = r)),
        (e.pageSize = i || this.table.tableOptions.pageSize),
        (e.page = o),
        e
      )
    },
  },
})
