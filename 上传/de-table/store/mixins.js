import { DrKm } from '@/components/de-table/copy.js'
import { getElColPaddingClassName, getColumnByProp } from '@/components/de-table/public.js'

let f = ['selection', 'index', 'expand']

function o(e, a, i) {
  e = e.map(function(e) {
    var t,
      n = Object.assign({}, e),
      r = a.find(function(e) {
        return e.prop === n.prop
      })
    return (
      r &&
        ((n.hidden = !r.switch),
        r.hasOwnProperty('isShow') && (n.isShow = !!r.isShow),
        r.hasOwnProperty('isExport') && (n.isExport = !!r.isExport),
        r.hasOwnProperty('numStripe') && n.hasOwnProperty('numStripe') && (n.numStripe = r.numStripe),
        r.hasOwnProperty('notExport') && n.hasOwnProperty('notExport') && (n.notExport = r.notExport)),
      i.hasOwnProperty(n.prop) && (n.filters = i[n.prop]),
      n.hasOwnProperty('filters') &&
        ((e = (t = l(n.filters)).type), (t = t.filters), (n.filterType = e), t ? (n.filters = Object.freeze(t)) : delete n.filters),
      (n.elTableColumn = Object.freeze(s(n))),
      n.hasOwnProperty('exportOptions') && (n.exportOptions = Object.freeze(n.exportOptions)),
      n.hasOwnProperty('children') && (n.children = o(n.children, r && r.hasOwnProperty('children') ? r.children : [], i)),
      n
    )
  })
  let n = a.map(function(e) {
    return e.prop
  })
  return (
    0 === n.length ||
      e.sort(function(e, t) {
        return f.includes(e.type) || f.includes(t.type)
          ? f.includes(e.type)
            ? -1
            : 1
          : n.includes(e.prop) && n.includes(t.prop)
          ? n.indexOf(e.prop || e.label) > n.indexOf(t.prop || t.label)
            ? 1
            : -1
          : n.includes(e.prop) || n.includes(t.prop)
          ? n.includes(e.prop)
            ? -1
            : 1
          : 0
      }),
    e
  )
}

function s(e) {
  var t,
    n = Object.assign({}, e)
  return (
    n.hasOwnProperty('showOverflowTooltip') || (n.showOverflowTooltip = !0),
    n.align && 'right-by-header' === n.align && ((n.align = 'right'), (n.className = getElColPaddingClassName(n)), '' === n.className && delete n.className),
    n.hasOwnProperty('minWidth') &&
      0 <= n.minWidth.toString().indexOf('byLabel') &&
      ((t = 12 * (n.labelTwoLine ? Math.ceil(n.label.length / 2) : n.label.length) + 50),
      (e = n.minWidth.match(/\s*([+-])\s*(\d+)/)) && 2 < e.length && ('+' === e[1] ? (t += parseFloat(e[2])) : (t -= parseFloat(e[2]))),
      (n.minWidth = t)),
    !0 === n.fixed && delete n.fixed,
    delete n.labelTwoLine,
    delete n.filterType,
    delete n.hidden,
    delete n.slot,
    delete n.slotHeader,
    delete n.filters,
    delete n.filterBy,
    delete n.valueFilter,
    delete n.numStripe,
    delete n.exportOptions,
    delete n.sortable,
    delete n.notExport,
    delete n.tips,
    n
  )
}

function r(e) {
  var n = []
  return (
    e.forEach(function(e) {
      var t
      f.includes(e.type) ||
        ((t = {
          prop: e.prop,
          label: e.label,
          switch: !e.hidden,
        }),
        e.hasOwnProperty('numStripe') && (t.numStripe = e.numStripe),
        e.hasOwnProperty('notExport') && (t.notExport = e.notExport),
        e.hasOwnProperty('isShow') && (t.isShow = !!e.isShow),
        e.hasOwnProperty('isExport') && (t.isExport = !!e.isExport),
        e.children && (t.children = r(e.children)),
        n.push(t))
    }),
    n
  )
}

function a(e) {
  return e.map(function(e) {
    if (Array.isArray(e)) {
      var t = {
        prop: e[0],
        switch: !!e[1],
      }
      return (
        -1 !== e[2] && (t.numStripe = !!e[2]),
        void 0 !== e[4] && null !== e[4] && (t.isShow = !!e[4]),
        void 0 !== e[5] && null !== e[5] && (t.isExport = !!e[5]),
        0 !== e[3] && (t.children = a(e[3])),
        t
      )
    }
    return e.hasOwnProperty('dataProgressVisible') && ((e.numStripe = e.dataProgressVisible), delete e.dataProgressVisible), e
  })
}

function i(e) {
  console.log(
    e.map(function(e) {
      return [
        e.prop,
        e.switch ? 1 : 0,
        e.hasOwnProperty('numStripe') ? (e.numStripe ? 1 : 0) : -1,
        e.hasOwnProperty('children') ? i(e.children) : 0,
        e.hasOwnProperty('isShow') ? (e.isShow ? 1 : 0) : void 0,
        e.hasOwnProperty('isExport') ? (e.isExport ? 1 : 0) : void 0,
      ]
    }),
  )

  return e.map(function(e) {
    return [
      e.prop,
      e.switch ? 1 : 0,
      e.hasOwnProperty('numStripe') ? (e.numStripe ? 1 : 0) : -1,
      e.hasOwnProperty('children') ? i(e.children) : 0,
      e.hasOwnProperty('isShow') ? (e.isShow ? 1 : 0) : void 0,
      e.hasOwnProperty('isExport') ? (e.isExport ? 1 : 0) : void 0,
    ]
  })
}

function l(e) {
  if (Array.isArray(e)) {
    var t = e
    return {
      type: 'checkbox',
      filters: (t =
        e.hasOwnProperty('0') && 'string' == typeof e[0]
          ? e.map(function(e) {
              return {
                text: e,
                value: e,
              }
            })
          : t),
    }
  }
  if ('hours' === e) {
    for (var n = [], r = 0; r < 24; ) {
      var a = r < 10 ? '0'.concat(r) : r
      n.push({
        text: ''.concat(a, ':00'),
        value: ''.concat(a, ':00'),
      }),
        r++
    }
    return {
      type: 'hours',
      filters: n,
    }
  }
  if ('mark' !== e)
    return {
      type: e,
      filters: null,
    }
  for (
    var i = [
        {
          text: '无',
          value: null,
        },
      ],
      o = 1;
    o < 6;

  )
    i.push({
      text: o,
      value: o,
    }),
      o++
  return {
    type: 'mark',
    filters: i,
  }
}

function c(e) {
  var t = []
  return (
    e.forEach(function(e) {
      e.numStripe && t.push(e.prop), e.hasOwnProperty('children') && Array.isArray(e.children) && (t = t.concat(c(e.children)))
    }),
    t
  )
}

export default {
  data: function() {
    return (this.manualColumnFilters = {}), {}
  },
  methods: {
    getColumnsByCache: function(t) {
      var n = this
      DrKm.getTableConfig(this.table.tableKey, 'columnSetting', function(e) {
        console.log('getTableConfig')
        console.log(e)
        e = a((e = e || []))
        t(o(n.states._columns, e, n.manualColumnFilters))
      })
    },
    getNumStripePropsByColumns: c,
    columnsToColSetData: r,
    saveColSetDataToCache: function(e, t) {
      console.log('saveColSetDataToCache')
      DrKm.setTableConfig(this.table.tableKey, 'columnSetting', e && i(e), t)
    },
    setFilterType: function(e, t) {
      this.manualColumnFilters[e] = t
      var n = getColumnByProp(this.states.columns, e)
      n &&
        ((t = (e = l(t)).type),
        (e = e.filters),
        this.$set(n, 'filterType', t),
        e ? this.$set(n, 'filters', Object.freeze(e)) : this.$delete(n, 'filters'),
        this.elTable && this.elTable.store.updateColumns())
    },
  },
}
