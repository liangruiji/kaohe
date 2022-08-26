// cloneArray convertToRows handleUrlProtocol isNumber handlerValueFilter
//  r = n("HaE+") promise转化为解决
import { cloneArray, convertToRows, handlerValueFilter, isNumber } from './public'

function saveAs(e, t) {
  var n = document.createElement('a')
  n.download = t || '下载'
  n.href = URL.createObjectURL(e)
  n.click()
  setTimeout(function() {
    URL.revokeObjectURL(e)
  }, 100)
}
function getBase64ByUrl(t, e) {
  var i = e.width,
    o = e.height,
    s = e.isRound
  return new Promise(function(r) {
    var a
    if (t) {
      a = new Image()
      a.crossOrigin = ''
      a.src = t
      a.onload = function() {
        i = i ? 5 * i : a.width
        o = o ? 5 * o : a.height
        var e = document.createElement('canvas')
        e.width = i
        e.height = o + 9
        var t = e.getContext('2d')
        if (s) {
          n = {
            x: i / 2,
            y: o / 2,
            r: i / 2,
          }
          t.arc(n.x, n.y, n.r, 0, 2 * Math.PI, !1)
          t.clip()
        }
        var n = (function(e, t, n, r) {
          var a = 0,
            i = 0,
            o = n,
            s = r
          r < n || (n === r && e < t) ? (a = (n - (o = (e * s) / t)) / 2) : (n < r || (n === r && t < e)) && (i = (r - (s = (t * o) / e)) / 2)
          return {
            sx: a,
            sy: i,
            sWidth: o,
            sHeight: s,
          }
        })(i, o, a.width, a.height)

        t.drawImage(a, n.sx, n.sy, n.sWidth, n.sHeight, 0, 0, i, o), r(e.toDataURL())
      }
      a.onerror = function() {
        r(null)
      }
    } else {
      r(null)
    }
  })
}

function s2ab(e) {
  for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r !== e.length; ++r) n[r] = 255 & e.charCodeAt(r)
  return t
}

function sheet_from_array_of_arrays(e) {
  for (
    var t,
      n = {},
      r = {
        s: {
          c: 1e7,
          r: 1e7,
        },
        e: {
          c: 0,
          r: 0,
        },
      },
      a = 0;
    a !== e.length;
    ++a
  )
    for (var i, o = 0; o !== e[a].length; ++o)
      r.s.r > a && (r.s.r = a),
        r.s.c > o && (r.s.c = o),
        r.e.r < a && (r.e.r = a),
        r.e.c < o && (r.e.c = o),
        null != e[a][o] &&
          ((i = e[a][o]),
          'object' !== typeof i &&
            ('number' ==
            typeof (i = {
              v: e[a][o],
            }).v
              ? (i.t = 'n')
              : 'boolean' == typeof i.v
              ? (i.t = 'b')
              : i.v instanceof Date
              ? ((i.t = 'n'),
                (i.z = XLSX.SSF._table[14]),
                (i.v = ((t = i.v), void 0 && (t += 1462), (Date.parse(t) - new Date(Date.UTC(1899, 11, 30))) / 864e5)))
              : (i.t = 's')),
          (n[
            XLSX.utils.encode_cell({
              c: o,
              r: a,
            })
          ] = i))
  return r.s.c < 1e7 && (n['!ref'] = XLSX.utils.encode_range(r)), n
}
let s = function e(t, n, r) {
  for (var a = [], i = 0; i < t.length; i++) {
    var o = t[i]
    n
      ? (o.type && ['selection', 'index', 'expand'].includes(o.type)) ||
        !o.isExport ||
        (o.hasOwnProperty('children') && Array.isArray(o.children) && (o.children = e(o.children, n, r)), a.push(o))
      : r
      ? (o.type && ['selection', 'index', 'expand'].includes(o.type)) ||
        !o.isShow ||
        (o.hasOwnProperty('children') && Array.isArray(o.children) && (o.children = e(o.children, n, r)), a.push(o))
      : (o.type && ['selection', 'index', 'expand'].includes(o.type)) ||
        !(!0 !== o.notExport || (o.notExport && o.isExport)) ||
        (o.hasOwnProperty('children') && Array.isArray(o.children) && (o.children = e(o.children, n, r)), a.push(o))
  }
  return a
}
let l = function e(t, n, r, a) {
  for (var i = [], o = 0; o < t.length; o++) {
    var s,
      l,
      c,
      u,
      d = t[o]
    d.children && 0 < d.children.length
      ? (i = i.concat(e(d.children, n, r, a)))
      : ((s = null),
        d.exportOptions &&
          d.exportOptions.prefix &&
          'image' ===
            (s = {
              rowKey: d.exportOptions.prefix.rowKey,
              label: d.exportOptions.prefix.label || d.label,
              type: d.exportOptions.prefix.type || 'string',
            }).type &&
          (d.exportOptions.prefix.width && (s.width = d.exportOptions.prefix.width),
          d.exportOptions.prefix.height ? (s.height = d.exportOptions.prefix.height) : n && (s.height = n),
          (s.isRound = !!d.exportOptions.prefix.isRound)),
        'image' ===
          (l = {
            rowKey: d.exportOptions && d.exportOptions.rowKey ? d.exportOptions.rowKey : d.prop,
            label: (d.exportOptions && d.exportOptions.label ? d.exportOptions : d).label,
            type:
              d.exportOptions && d.exportOptions.type
                ? d.exportOptions.type
                : d.filterType && 'string' == typeof d.filterType && ['string', 'number'].includes(d.filterType)
                ? d.filterType
                : 'string',
            hrefKey: d.exportOptions && d.exportOptions.hrefKey ? d.exportOptions.hrefKey : null,
            column: d,
          }).type &&
          (d.exportOptions && d.exportOptions.height ? (l.height = d.exportOptions.height) : n && (l.height = n),
          (l.isRound = d.exportOptions && d.exportOptions.isRound)),
        (c = null),
        d.exportOptions &&
          d.exportOptions.suffix &&
          'image' ===
            (c = {
              rowKey: d.exportOptions.suffix.rowKey,
              label: d.exportOptions.suffix.label || d.label,
              type: d.exportOptions.suffix.type || 'string',
            }).type &&
          (d.exportOptions.suffix.width && (c.width = d.exportOptions.suffix.width),
          d.exportOptions.suffix.height ? (c.height = d.exportOptions.suffix.height) : n && (c.height = n),
          (c.isRound = !!d.exportOptions.suffix.isRound)),
        a || (s && 'image' === s.type && (s = null), l && 'image' === l.type && (l = null), c && 'image' === c.type && (c = null)),
        (u = 0),
        s && u++,
        c && u++,
        0 < u && r._addMergeColumnsColSpan(d.prop, u),
        s && i.push(s),
        l && i.push(l),
        c && i.push(c))
  }
  return i
}
let c = function e(t, n, r) {
  for (var a = [], i = 0; i < t.length; i++) {
    var o = t[i]
    o.prop === n
      ? r && (a.push(r), (a = a.concat(e(t, r))))
      : o.hasOwnProperty('children') && Array.isArray(o.children) && (a = a.concat(e(o.children, n, t.prop)))
  }
  return a
}
let u = function n(e, r) {
  var a = {}
  return (
    (r = void 0 === r ? 0 : r + 1),
    e.forEach(function(e) {
      var t
      ;(a[r] = a[r] || []),
        a[r].push(e),
        e.children &&
          Array.isArray(e.children) &&
          0 < e.children.length &&
          ((t = n(e.children, r)),
          Object.keys(t).forEach(function(e) {
            a.hasOwnProperty(e) || (a[e] = []), (a[e] = a[e].concat(t[e]))
          }))
    }),
    a
  )
}
//
class skmI {
  constructor() {
    this.isHeader = !1
    this.isDisplay = !1
    this.isImage = !1
    this.isHref = !1
    this.isShow = !1
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
  setColumns(e) {
    this.columns = cloneArray(e)
    this._columns = s(this.columns, this.isDisplay, this.isShow)
  }
  setRowHeight(e) {
    this.rowHeight = e
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

//  复制相关
class YKlt extends skmI {
  constructor(isHeader, isDisplay, isImage, isHref, isShow, _tdRowSpan) {
    super()
    this.isHeader = isHeader
    this.isDisplay = isDisplay
    this.isImage = isImage
    this.isHref = isHref
    this.isShow = isShow
    this._tdRowSpan = _tdRowSpan
  }
  copy(e) {
    var a = this
    this._data = e
    this._initMergeColumns()
    this._initOutputColumns()
    this._initExpandTableData()
    this._tdRowSpan = this.isImage && this.rowHeight ? Math.ceil(this.rowHeight / 15) : 1

    e = this.isImage
    var i = ''
    if (e) {
      for (var t = '<table style="white-space: nowrap;font-size: 14px;">', n = 0; n < this._expandTableData.length; n++) {
        let r = this._expandTableData[n]
        let o = this.isHeader ? this._getTheadHtml() : ''
        r = this._getTbodyHtml(r)
        t += ''.concat(o).concat(r)
        n < this._expandTableData.length - 1 && (t += '<tr></tr><tr></tr><tr></tr>')
      }
      i = t += '</table>'
    } else
      for (var s = 0; s < this._expandTableData.length; s++)
        !(function(e) {
          var t = a._expandTableData[e]
          var n = a.isHeader ? a._getTheadData() : []
          t = a._getTbodyData(t)
          t = n.concat(t)
          var r = []
          t.forEach(function(e) {
            r.push(e.join('\t'))
          })
          i += r.join('\n')
          e < a._expandTableData.length - 1 && (i += '\n\n\n\n')
        })(s)
    this._copyContentToClipboard(i) && this.handleSuccess && this.handleSuccess()
  }
  _getTheadHtml() {
    var n = this,
      r = '<thead>'
    return (
      this._mergeColumns.forEach(function(e) {
        var t = '<tr>'
        e.forEach(function(e) {
          t += '<th colspan="'
            .concat(e.colSpan, '" rowspan="')
            .concat(e.rowSpan, '">')
            .concat((e.exportOptions && e.exportOptions.label ? e.exportOptions : e).label, '</th>')
        }),
          n._tdRowSpan,
          (r += t += '</tr>')
      }),
      (r += '</thead>')
    )
  }
  _getTbodyHtml(e) {
    for (var n = '<tbody>', t = 0; t < e.length; t++) {
      for (var r = e[t], a = '<tr>', i = 0; i < this._outputColumns.length; i++) {
        var o,
          s = this._outputColumns[i],
          l = '<td rowspan="'.concat(this._tdRowSpan, '" colspan="1">')
        'string' === s.type || 'number' === s.type
          ? ((o = r.hasOwnProperty(s.rowKey) ? r[s.rowKey] : ''),
            s.hasOwnProperty('column') && s.column.valueFilter && (o = '-' === (o = handlerValueFilter(o, s.column)) && '-' !== r[s.rowKey] ? 0 : o),
            this.isHref &&
              s.hrefKey &&
              r.hasOwnProperty(s.hrefKey) &&
              r[s.hrefKey] &&
              (o = '<a href="'.concat(handleUrlProtocol(r[s.hrefKey]), '" style="color: #2062e6;" target="_blank">').concat(o, '</a>')),
            'string' === s.type && isNumber(o) && (l = '<td rowspan="'.concat(this._tdRowSpan, '" colspan="1" style=\'mso-number-format:"\\@"\'>')),
            (l += o))
          : 'image' === s.type &&
            r[s.rowKey] &&
            (l += '<img width="'
              .concat(s.width, '" height="')
              .concat(s.height, '" src="')
              .concat(handleUrlProtocol(r[s.rowKey]), '">')),
          (a += l += '</td>')
      }
      if ((1 < this._tdRowSpan && (a += '<td></td>'), (a += '</tr>'), 1 < this._tdRowSpan)) for (var c = 0; c < this._tdRowSpan - 1; c++) a += '<tr></tr>'
      n += a
    }
    return (
      this._summaryMethod &&
        this._getSummaryRowArr(e).forEach(function(e) {
          var t = '<tr>'
          e.forEach(function(e) {
            t += '<td>'.concat(e, '</td>')
          }),
            (n += t += '</tr>')
        }),
      (n += '</tbody>')
    )
  }
  _getTheadData() {
    var a = this,
      i = 0,
      o = 0
    this._mergeColumns.forEach(function(e, t) {
      var r = {}
      e.forEach(function(n) {
        0 === t
          ? ((n.colStart = o), n.colStart > i && (i = n.colStart), (o += n.colSpan))
          : a._mergeColumns[t - 1].forEach(function(t) {
              t.children &&
                t.children.forEach(function(e) {
                  e.prop === n.prop &&
                    ((r[t.prop] = r[t.prop] || 0), (n.colStart = t.colStart + r[t.prop]), n.colStart > i && (i = n.colStart), (r[t.prop] += e.colSpan))
                })
            })
      })
    })
    var s = []
    return (
      this._mergeColumns.forEach(function(e, r) {
        s[r] = []
        for (var t = 0; t <= i; t++) s[r].push('')
        e.forEach(function(e) {
          for (var n = 0; n < e.colSpan; n++) s[r][e.colStart + n] = 0 === n ? (e.exportOptions && e.exportOptions.label ? e.exportOptions : e).label : ''
        })
      }),
      s
    )
  }
  _getTbodyData(e) {
    for (var t, n = [], r = 0; r < e.length; r++) {
      for (var a = e[r], i = [], o = 0; o < this._outputColumns.length; o++) {
        let s = this._outputColumns[o]
        let l = a.hasOwnProperty(s.rowKey) ? a[s.rowKey] : ''
        if ('string' == s.type || 'number' == s.type) {
          if (s.hasOwnProperty('column') && s.column.valueFilter) {
            l = '-' === (l = handlerValueFilter(l, s.column)) && '-' !== a[s.rowKey] ? 0 : l
          }
        }
        i.push(l)
      }
      n.push(i)
    }
    return this._summaryMethod && ((t = this._getSummaryRowArr(e)), n.push(t)), n
  }
  _copyContentToClipboard(e) {
    var t = document.createElement('textarea')
    return (t.value = e), document.body.appendChild(t), t.select(), document.execCommand('copy'), t.remove(), !0
  }
}

class LiUo extends skmI {
  constructor(type = 'csv', isImage, isDisplay, isHref, isShow) {
    super()
    this.type = type
    this.isImage = isImage
    this.isDisplay = isDisplay
    this.isHref = isHref
    this.isShow = isShow
    this.fileName = '导出数据'
    this.handleProgress = null
    this._progress = {
      finish: 0,
      total: 0,
    }
  }
  async export(t) {
    let n, r, a, i, o, s, l, c, u, d, p, f, h
    this._data = t
    this._initMergeColumns()
    this._initOutputColumns()
    this._initExpandTableData()
    this._expandTableData.forEach(e => {
      this._progress.total += e.length
    })
    n = []
    r = {
      SheetNames: [],
      Sheets: {},
    }
    for (a = 0; a < this._expandTableData.length; a++) {
      i = this._expandTableData[a]
      o = this._getExportColOption()
      s = this._getExportRowOption(i)
      u = this._getExportHeader()
      l = u.data
      c = u.merges
      p = await this._getExportBody(i)
      d = p.data
      u = p.images
      p = [[]]
      if (0 === a && this._summaryMethod) {
        p = this._getSummaryRowArr(i)
      }
      d = [].concat(Array.from(l), Array.from(d))
      if (0 < p[0].length) {
        d = d.concat(p)
      }
      if ('csv' === this.type) {
        d.forEach(function(e) {
          n.push('"'.concat(e.join('","'), '"'))
        })
        n.push('""')
        n.push('""')
        n.push('""')
      } else {
        p = 'Sheet'.concat(a + 1)
        f = sheet_from_array_of_arrays(d)
        o && (f['!cols'] = o)
        s && this.isImage && (f['!rows'] = s)
        0 === a && u && 0 < u.length && (f['!images'] = u)
        0 < c.length && (f['!merges'] = c)
        r.SheetNames.push(p)
        r.Sheets[p] = f
      }
    }
    f = ''.concat(this.fileName, '.').concat(this.type)
    if ('csv' === this.type) {
      h = '\ufeff' + n.join('\r\n')
      window.postMessage(
        {
          type: 'exportCSV',
          data: h,
        },
        '*',
      )
      saveAs(
        new Blob([h], {
          type: 'application/octet-stream',
        }),
        f,
      )
    } else {
      h = XLSX.write(r, {
        bookType: this.type,
        bookSST: !1,
        type: 'binary',
      })
      saveAs(
        new Blob([s2ab(h)], {
          type: 'application/octet-stream',
        }),
        f,
      )
    }
    this.handleSuccess && this.handleSuccess()
  }
  setFileName(e) {
    this.fileName = e
  }
  onProgress(e) {
    this.handleProgress = e
  }
  _getExportColOption() {
    return this._outputColumns.map(function(e) {
      return {
        wpx: e.width || 70,
      }
    })
  }
  _getExportRowOption(e) {
    var t = this,
      n = null,
      r
    if (this.rowHeight) {
      for (n = [], r = 0; r < this._mergeColumns.length; r++) n.push({})
      e.forEach(function() {
        n.push({
          hpx: t.rowHeight,
        })
      })
    }
    return n
  }
  _getExportHeader() {
    var a = this,
      i = 0,
      o = 0
    this._mergeColumns.forEach(function(e, t) {
      var r = {}
      e.forEach(function(n) {
        0 === t
          ? ((n.colStart = o), n.colStart > i && (i = n.colStart), (o += n.colSpan))
          : a._mergeColumns[t - 1].forEach(function(t) {
              t.children &&
                t.children.forEach(function(e) {
                  e.prop === n.prop &&
                    ((r[t.prop] = r[t.prop] || 0), (n.colStart = t.colStart + r[t.prop]), n.colStart > i && (i = n.colStart), (r[t.prop] += e.colSpan))
                })
            })
      })
    })
    var s = []
    this._mergeColumns.forEach(function(e, r) {
      s[r] = []
      for (var t = 0; t <= i; t++) s[r].push('')
      e.forEach(function(e) {
        for (var n = 0; n < e.colSpan; n++) s[r][e.colStart + n] = 0 === n ? (e.exportOptions && e.exportOptions.label ? e.exportOptions : e).label : ''
      })
    })
    var r = []
    return (
      this._mergeColumns.forEach(function(e, n) {
        e.forEach(function(e) {
          r.push({
            s: {
              c: e.colStart,
              r: n,
            },
            e: {
              c: 1 < e.colSpan ? e.colStart + e.colSpan - 1 : e.colStart,
              r: 1 < e.rowSpan ? n + e.rowSpan - 1 : n,
            },
          })
        })
      }),
      {
        data: s,
        merges: r,
      }
    )
  }
  async _getExportBody(t) {
    let n, r, a, i, o, s, l, c, u, d
    n = []
    r = []
    for (a = 0; a < t.length; a++) {
      i = t[a]
      o = []

      for (s = 0; s < this._outputColumns.length; s++) {
        l = this._outputColumns[s]
        if ('string' !== l.type && 'number' !== l.type) {
          if ('image' !== l.type) {
            continue
          }
          o.push('')
          if (i[l.rowKey]) {
            d = await getBase64ByUrl(i[l.rowKey], {
              width: l.width,
              height: l.height,
              isRound: l.isRound,
            })
            if (d) {
              r.push({
                name: 'image-'.concat(a, '-').concat(s, '.jpg'),
                data: d.split(',')[1],
                opts: {
                  base64: !0,
                },
                attrs: {
                  editAs: 'oneCell',
                },
                position: {
                  type: 'twoCellAnchor',
                  from: {
                    col: s,
                    row: a + this._mergeColumns.length,
                  },
                  to: {
                    col: s + 1,
                    row: a + this._mergeColumns.length + 1,
                  },
                },
              })
            }
          }
        } else {
          d = i.hasOwnProperty(l.rowKey) ? i[l.rowKey] : ''
          if (l.hasOwnProperty('column') && l.column.valueFilter) {
            d = handlerValueFilter(d, l.column)
            d = '-' === d && '-' !== i[l.rowKey] ? 0 : d
          }
          if ('csv' !== this.type && 'number' === l.type && 'number' != typeof d) {
            c = d
            c = c.replace(/(,|%)/g, '')
            c = isNumber(c) ? parseFloat(c) : c
            if ('number' == typeof c) {
              u = null
              if (0 <= d.indexOf(',')) {
                u = 0 <= d.indexOf('.') ? '#,##0.00' : '#,##0'
              }
              if (0 <= d.indexOf('%')) {
                c /= 100
                u = 0 <= d.indexOf('.') ? '0.00%' : '0%'
              }
              if (!u && 0 <= d.indexOf('.')) {
                u = '0.00'
              }
              d = {
                v: c,
                t: 'n',
              }
              if (u && l.hasOwnProperty('column') && !l.column.notFormat) {
                d.z = u
              }
            }
          }
          if (l.hrefKey && i.hasOwnProperty(l.hrefKey) && 'csv' !== this.type) {
            d =
              'string' == typeof d
                ? {
                    v: d,
                  }
                : d
          }
          o.push(d)
        }
      }

      this._progress.finish++
      this.handleProgress && this.handleProgress(this._progress.finish, this._progress.total)
      n.push(o)
    }
    return {
      data: n,
      images: r,
    }
  }
}

// 设置localStorage中的AM_MONITOR_CACHE
let IcxY = (function() {
  var i = 'XWS_CACHE'
  function o(e, t) {
    var n = localStorage.getItem(i),
      r = null
    if (n)
      try {
        r = JSON.parse(n)
      } catch (e) {
        r = null
      }
    t(e ? (r && 'object' === typeof r && r.hasOwnProperty(e) ? r[e] : null) : r)
  }

  function s(t, n, r) {
    o(null, function(e) {
      e = e || {}
      null !== n ? (e[t] = n) : delete e[t]
      localStorage.setItem(i, JSON.stringify(e))
      r && r(!0)
    })
  }
  return {
    getItem: function(n, t) {
      return t
        ? (o(n, function(e) {
            t(e)
          }),
          !0)
        : new Promise(function(t) {
            o(n, function(e) {
              t(e)
            })
          })
    },
    setItem: function(n, r) {
      return new Promise(function(e) {
        s(n, r, e)
      })
    },
    removeItem: function(n) {
      return new Promise(function(e) {
        s(n, null, e)
      })
    },
  }
})()

let fS19 = (function() {
  var o = 'seniorFilterTplList',
    a = ['day', 'week', 'month']

  function l(n) {
    return new Promise(function(t) {
      DrKm.getTableConfig(n, o, function(e) {
        t(p((e = e || [])))
      })
    })
  }

  function c(r, a) {
    return new Promise(function(t) {
      var n = 0 < (n = f(a)).length ? n : null
      DrKm.setTableConfig(r, o, n, function(e) {
        t(
          !!e || {
            code: 10001,
            msg: '设置模板数据失败',
          },
        )
      })
    })
  }

  function s(n, r) {
    return new Promise(function(t) {
      l(n).then(function(e) {
        e = e.find(function(e) {
          return e.name === r
        })
        t(e || null)
      })
    })
  }

  function u(i, o, s) {
    return new Promise(function(t) {
      var a = !!s
      l(i).then(function(e) {
        var n = a
            ? e.findIndex(function(e) {
                return e.name === s
              })
            : e.findIndex(function(e) {
                return e.name === o.name
              }),
          r = !1
        if (
          (e.forEach(function(e, t) {
            if (a) {
              if (e.name === o.name && t !== n) return !(r = !0)
            } else if (e.name === o.name) return !(r = !0)
          }),
          r)
        )
          return (
            t({
              code: 1e4,
              msg: '参数错误，请检查参数',
              data: {
                name: '模板名称已经存在',
              },
            }),
            !1
          )
        a && 0 <= n ? e.splice(n, 1, o) : e.unshift(o),
          c(i, e).then(function(e) {
            t(e)
          })
      })
    })
  }

  function d(e) {
    var t = null
    return (
      'string' === e.filterType || 'mark' === e.filterType
        ? e.value &&
          (t = {
            mode: e.matchMode,
            keyword: e.value,
          })
        : 'number' === e.filterType
        ? e.value &&
          (t = {
            gt: 'gt' === e.matchMode ? parseFloat(e.value) : null,
            eq: 'eq' === e.matchMode ? parseFloat(e.value) : null,
            lt: 'lt' === e.matchMode ? parseFloat(e.value) : null,
          })
        : 'checkbox' === e.filterType || 'hours' === e.filterType
        ? 0 < e.value.length &&
          (t =
            0 <
            (t = e.value.filter(function(e) {
              return null !== e
            })).length
              ? t
              : null)
        : 'week' === e.filterType
        ? e.value && (t = e.value)
        : ('month' !== e.filterType && 'day' !== e.filterType) || (0 < e.value.length && (t = Array.from(e.value))),
      t
    )
  }

  var p = function(e) {
    return e.map(function(e) {
      return {
        name: e[0],
        mode: 1 === e[1] ? 'and' : 'or',
        conditions: e[2].map(function(e) {
          return {
            prop: e[0],
            filterType: e[1],
            matchMode: e[2],
            value: m(e[1], e[3]),
          }
        }),
      }
    })
  }
  var f = function(e) {
    return e.map(function(e) {
      return [
        e.name,
        'and' === e.mode ? 1 : 2,
        e.conditions.map(function(e) {
          return [e.prop, e.filterType, e.matchMode, h(e.filterType, e.value)]
        }),
      ]
    })
  }
  var h = function t(n, e) {
    var r = e
    return (
      Array.isArray(e)
        ? (r = e.map(function(e) {
            return t(n, e)
          }))
        : a.includes(n) && e instanceof Date && (r = e.getTime() / 1e3),
      r
    )
  }
  var m = function t(n, e) {
    var r = e
    return (
      Array.isArray(e)
        ? (r = e.map(function(e) {
            return t(n, e)
          }))
        : a.includes(n) && (r = new Date(1e3 * e)),
      r
    )
  }
  return {
    getTplList: l,
    setTplList: c,
    getTplByName: s,
    saveTpl: u,
    tplConditionToFilterValue: d,
  }
})()

// 设置或获得表格配置的函数
let DrKm = (function() {
  var i = IcxY,
    o = 'deTableConfig'

  function r(t, n, r, a) {
    s(null, null, function(e) {
      e = e || {}
      if (!e[t]) {
        e[t] = {}
      }
      null === r ? delete e[t][n] : (e[t][n] = r)
      i.setItem(o, e).then(function() {
        a(!0)
      })
    })
  }

  function s(t, n, r) {
    r &&
      i
        .getItem(o)
        .then(function(e) {
          r(
            t
              ? n
                ? e && 'object' === typeof e && e[t] && 'object' === typeof e[t] && e[t][n]
                  ? e[t][n]
                  : null
                : e && 'object' === typeof e && e.hasOwnProperty(t)
                ? e[t]
                : null
              : e,
          )
        })
        .catch(function(e) {
          console.log(e)
          r(null)
        })
  }
  return {
    setTableConfig: r,
    getTableConfig: s,
  }
})()

export { YKlt, LiUo, fS19, DrKm, IcxY }
