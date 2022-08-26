import { Table } from 'element-ui'

let r = Table.methods.doLayout
Table.methods.doLayout = function() {
  for (var a, e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n]
  r.call.apply(r, [this].concat(t)),
    this.useVirtual &&
      this.useVirtualColumn &&
      ((a = 0),
      (this.columnsPosotion = this.columns.map(function(e, t) {
        var n = e.realWidth,
          r = e.width
        r = void 0 === r ? 0 : r
        e = e.minWidth
        return [a, (a += Math.max(void 0 === n ? 0 : n, r || (void 0 === e ? 0 : e)))]
      })),
      this.computeScrollToColumn(this.scrollLeft))
}
if (!Table.mixins) {
  Table.mixins = []
}
// ElTable.mixins || ElTable.mixins = []

Table.mixins.push({
  props: {
    rowHeight: {
      type: Number,
      default: 50,
    },
    excessRows: {
      type: Number,
      default: 5,
    },
    useVirtual: Boolean,
    useRowKey: Boolean,
    useVirtualColumn: {
      type: Boolean,
      default: !1,
    },
  },
  data: function() {
    return {
      scrollTop: 0,
      scrollLeft: 0,
      columnsPosotion: {},
      innerTop: 0,
      start: 0,
      end: 0,
      columnStart: 0,
      columnEnd: 0,
    }
  },
  computed: {
    visibleCount: function() {
      return Math.ceil(parseFloat(this.height) / this.rowHeight)
    },
    virtualBodyHeight: function() {
      var e = this.store.states.data
      return e ? e.length * this.rowHeight : 0
    },
  },
  watch: {
    scrollTop: {
      immediate: !0,
      handler: function(e) {
        this.computeScrollToRow(e)
      },
    },
    scrollLeft: function(e) {
      this.useVirtualColumn && this.computeScrollToColumn(e)
    },
    virtualBodyHeight: function() {
      this.useVirtual && setTimeout(this.doLayout, 10)
    },
    height: function() {
      this.useVirtual && this.computeScrollToRow(this.scrollTop)
    },
  },
  mounted: function() {
    this.useVirtual && this.bindEvent('bind')
  },
  activated: function() {
    this.useVirtual && ((this.scrollTop = 0), this.bindEvent('bind'))
  },
  deactivated: function() {
    this.useVirtual && this.bindEvent('unbind')
  },
  beforeDestroy: function() {
    this.useVirtual && this.bindEvent('unbind')
  },
  methods: {
    bindEvent: function(e) {
      var t = this.$el.querySelector('.el-table__body-wrapper')
      this.binded || 'bind' !== e
        ? this.binded && 'unbind' === e && (t.removeEventListener('scroll', this.handleScroll), (this.binded = !1))
        : (t.addEventListener('scroll', this.handleScroll), (this.binded = !0))
    },
    computeScrollToColumn: function(e) {
      for (var t = 0, n = this.columns.length, r = 0, a = this.$el.clientWidth, i = 0; i < this.columnsPosotion.length; i++) {
        var s = Array.from(this.columnsPosotion[i]),
          o = s[0]
        s = s[1]
        if ((o <= e && e < s ? ((t = i), (r = s - e)) : e < o && (r += s - o), r + this.layout.gutterWidth >= a)) {
          n = i
          break
        }
      }
      this.columnStart = t
      this.columnEnd = n
    },
    computeScrollToRow: function(e) {
      var t = parseInt(e / this.rowHeight)
      e = this.getVisibleRange(t)
      t = e.start
      e = e.end
      this.start = t
      this.end = e
      this.innerTop = this.start * this.rowHeight
    },
    getVisibleRange: function(e) {
      var t = e - this.excessRows
      return {
        start: 0 <= t ? t : 0,
        end: e + this.visibleCount + this.excessRows,
      }
    },
    handleScroll: function(e) {
      var t = e.srcElement || e.target,
        n = t.scrollTop,
        r = t.scrollLeft

      e = this.visibleCount * this.rowHeight
      this.useRowKey || ((t = this.$el.querySelector(':focus')) && t.blur()),
        (this.store.states.hoverRow = null),
        this.virtualBodyHeight < n + e && (n = this.virtualBodyHeight - e),
        parseInt(this.scrollTop) !== parseInt(n) && (this.scrollTop = n),
        parseInt(this.scrollLeft) !== parseInt(r) && (this.scrollLeft = r)
    },
  },
})
