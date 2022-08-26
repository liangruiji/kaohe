import Watcher from './watcher'

Watcher.prototype.mutations = {
  setColumn: function(e, t) {
    e._columns = t
    this.updateSlotNames()
    this.updateColumns()
  },
  setData: async function(t, n) {
    if ('function' == typeof n) {
      t.isServerPage = true
      t.dataFun = n
      t.currentPage = 1
    } else {
      t._data = n
    }
    await this.execQuery()
    this.commit('handleAutoDateFilter')
    this.updateTableScrollY()
  },
  saveColSetData: function(e, t) {
    console.log('saveColSetData')
    console.log(e.colSetData)
    console.log(e._colSetData)
    console.log(t)
    var n = this
    if (JSON.stringify(t) === JSON.stringify(e.colSetData)) return !0
    t = JSON.stringify(t) === JSON.stringify(e._colSetData) ? null : t
    this.saveColSetDataToCache(t, function() {
      n.resetColumns(function() {
        n.updateTableScrollY()
      })
    })
  },
  setDefaultSort: function(e, t) {
    var n
    t && ((n = getColumnByProp(this.table.columns, t.prop)), this.updateSort(n, t.prop, t.order))
  },
  columnFilterChange: async function(o, s) {
    let t = s.column
    let i = s.value
    let n = s.mode
    let r = s.isClear
    let a = s.silent
    if (n) {
      o.filterMode = n
    }
    if (r) {
      o.globalFilterKeyword = null
      o.filters = {}
    }
    i = this.updateFilters(t, i)
    if (o.isServerPage) {
      o.currentPage = 1
    }
    await this.execQuery()
    a || this.table.$emit('filter-change', i)
    this.updateTableScrollY()
  },
  seniorFilterChange: async function(i, o) {
    let t = o.filters
    let n = o.mode
    let r = o.silent
    i.globalFilterKeyword = null
    i.filters = {}
    i.filterMode = n
    let a = null
    t.forEach(e => {
      a = this.updateFilters(e.column, e.value, !0)
    })
    if (i.isServerPage) {
      i.currentPage = 1
    }
    await this.execQuery()

    r || this.table.$emit('filter-change', a)
    this.updateTableScrollY()
  },
  filterModeChange: async function(t, n) {
    t.filterMode = n
    if (t.isServerPage) {
      t.currentPage = 1
    }
    await this.execQuery()
    this.updateTableScrollY()
  },
  globalFilterChange: async function(r, a) {
    let t = a.keyword
    let n = a.silent
    r.globalFilterKeyword = t
    if (r.isServerPage) {
      r.currentPage = 1
    }
    await this.execQuery()
    n || this.table.$emit('global-filter-change', t)
    this.updateTableScrollY()
  },
  columnEditChange: function(e, t) {
    this.table.$emit('global-column-edit', t)
  },
  clearFilter: async function(n) {
    let r = arguments

    let t = 1 < r.length && void 0 !== r[1] ? r[1] : null
    this.clearFilter(t)
    if (n.isServerPage) {
      n.currentPage = 1
    }
    await this.execQuery()
    this.updateTableScrollY()
  },
  sort: function(e, t) {
    var n = t.prop,
      r = t.order,
      a = t.init,
      i = t.silent
    !n ||
      ((t = getColumnByProp(this.table.columns, n)) &&
        (this.updateSort(t, n, r),
        i ||
          e.isServerPage ||
          this.commit('changeSortCondition', {
            init: a,
          })))
  },
  changeSortCondition: async function(i, o) {
    let t = i.sortingColumn
    let n = i.sortProp
    let r = i.sortOrder
    if (null === r) {
      i.sortingColumn = null
      i.sortProp = null
    }
    let a = {
      filter: !0,
    }

    if (i.isServerPage) {
      i.currentPage = 1
    }
    await this.execQuery(a)
    if (!(o && (o.silent || o.init))) {
      this.table.$emit('sort-change', {
        column: t,
        prop: n,
        order: r,
      })
    }
    this.updateTableScrollY()
  },
  clearSort: function() {
    this.updateSort(null, null, null)
    this.commit('changeSortCondition')
  },
  segmentChange: async function(n, r) {
    n.segment = r
    let t = {
      filter: !0,
      sort: !0,
    }

    if (n.isServerPage) {
      n.currentPage = 1
    }
    await this.execQuery(t)
    this.updateTableScrollY()
  },
  scroll: function(e, t, n) {
    var r
    this.elTable &&
      ((r = this.elTable.$refs.bodyWrapper), 'number' == typeof t && (r.scrollTop = t), 'number' == typeof n && (r.scrollLeft = n), this.updateTableScrollY())
  },
  handleAutoDateFilter: function(e) {
    var t
    this.table.autoDateFilter &&
      'string' == typeof this.table.autoDateFilter &&
      0 < e._data.length &&
      e._data[0].hasOwnProperty(this.table.autoDateFilter) &&
      ((t = e._data[0][this.table.autoDateFilter]),
      (e = null),
      /\d{2}:\d{2}/.test(t)
        ? (e = 'hours')
        : /\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/.test(t)
        ? (e = 'day')
        : /\d{4}(\s)*第\d+周/.test(t)
        ? (e = 'week')
        : /\d{4}(-|\/|.)\d{1,2}/.test(t) && (e = 'month'),
      e && this.setFilterType(this.table.autoDateFilter, e))
  },
  changePageDetails: async function(t, n, r) {
    if (n) {
      t.currentPage = n
    }
    if (r) {
      t.pageSize = r
    }
    await this.execQuery()
  },
}

Watcher.prototype.commit = function(e) {
  var t = this.mutations
  if (!t[e]) throw new Error('方法不存在: '.concat(e))
  for (var n = arguments.length, r = new Array(1 < n ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a]

  t[e].apply(this, [this.states].concat(r))
}

Watcher.prototype.updateTableScrollY = function() {
  var e
  !this.elTable ||
    ((e = this.elTable.$refs.bodyWrapper) &&
      (this.elTable.scrollTop !== e.scrollTop ? (this.elTable.scrollTop = e.scrollTop) : this.elTable.computeScrollToRow(e.scrollTop),
      this.elTable.updateScrollY()))
}

export default Watcher
