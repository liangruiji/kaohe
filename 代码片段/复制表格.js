class Data {
  constructor() {
    this.isHeader = false
    this.isDisplay = false
    this.isImage = false
    this.isHref = false
    this.isShow = false
    this.rowHeight = null 
    this.handleSuccess = null
    this._summaryMethod = null
    this._elTableColumns = null
    this.columns = null
    this._columns = null
    this._mergeColumns = null
    this._outputColumns = null
    this._data = null
    this._expandTableData = null
  }
  setColumns(columns) {
    this.columns = cloneArray(columns)
    this._columns = s(this.columns, this.isDisplay, this.isShow)
  }
  setRowHeight(rowHeight) {
    this.rowHeight = rowHeight
  }
  setSummaryMethod(e, t) {
    this._summaryMethod = e
    this._elTableColumns = t
  }

  onSuccess(e) {
    this.handleSuccess = e
  }
  _initMergeColumns() {
    this._mergeColumns = convertToRows(this._columns)
  }

  _initOutputColumns() {
    this._outputColumns = l(this._columns, this.rowHeight, this, this.isImage)
    this.isImage = this._outputColumns.some(function(e) {
      return 'image' === e.type
    })
  }

  _addMergeColumnsColSpan(e, t) {
    var n = [e].concat(Array.from(c(this.columns, e)))
    this._mergeColumns.forEach(function(e) {
      e.forEach(function(e) {
        n.includes(e.prop) && (e.colSpan += t)
      })
    })
  }
  _initExpandTableData() {
    this._expandTableData = Object.values(u(this._data))
  }
  _getSummaryRowArr(e) {
    var r = this,
      a = this._summaryMethod({
        columns: this._elTableColumns,
        data: e,
      }),
      i = []
    return (
      this._outputColumns.forEach(function(e) {
        for (var t = null, n = 0; n < r._elTableColumns.length; n++)
          if (e.rowKey === r._elTableColumns[n].property) {
            t = n
            break
          }
        i.push(a.hasOwnProperty(t) ? a[t] : '')
      }),
      [i]
    )
  }
}
function cloneArray(arr) {
  return arr.map(function(item) {
    item = Object.assign({}, item)
    return item.hasOwnProperty('children') && Array.isArray(item.children) && (item.children = cloneArray(item.children)), item
  })
}
let s = function e(columns, isDisplay, isShow) {
  for (var a = [], i = 0; i < columns.length; i++) {
    var column = columns[i]
    if(isDisplay){
        (column.type && ['selection', 'index', 'expand'].includes(column.type)) ||
        !column.isExport ||
        (column.hasOwnProperty('children') && Array.isArray(column.children) && (column.children = e(column.children, isDisplay, isShow)), a.push(column))
    }else if(isShow){
        (column.type && ['selection', 'index', 'expand'].includes(o.type)) ||
        !column.isShow ||
        (column.hasOwnProperty('children') && Array.isArray(column.children) && (column.children = e(column.children, isDisplay, isShow)), a.push(column))
    }else{
        (column.type && ['selection', 'index', 'expand'].includes(column.type)) ||
        !(!0 !== column.notExport || (column.notExport && column.isExport)) ||
        (column.hasOwnProperty('children') && Array.isArray(column.children) && (column.children = e(column.children, isDisplay, isShow)), a.push(column))
    }
   
  }
  return a
}