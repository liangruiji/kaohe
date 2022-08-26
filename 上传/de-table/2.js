// src/views/tools/online-trans/components/batch-trans/index.vue
let HleZ = function(e, t, n) {
  'use strict'
  n.r(t)
  var r = n('HaE+'),
    a = n('VTBJ'),
    i =
      (n('ls82'),
      n('2B1R'),
      n('sMBO'),
      n('07d7'),
      n('FZtP'),
      n('rB9j'),
      n('EnZy'),
      n('TeQF'),
      n('fbCW'),
      n('+2oP'),
      n('UxlC'),
      n('tkto'),
      n('B6y2'),
      n('VfhW')),
    s = n('gJvG'),
    l = n('MrSP'),
    o = n('c3kY'),
    c = n('EUZL'),
    u = n.n(c),
    d = n('fl2l'),
    f = n('N+HR')
  t.default = {
    name: 'batch-trans',
    components: {
      CategorySelect: i.default,
      TransSelect: s.default,
      TransDataTable: l.default,
      ExampleDialog: o.default,
    },
    data: function() {
      return (
        (this.indexCode = new f.default()),
        {
          tableColumns: [],
          tableData: [],
          fileName: null,
          transType: '市场大盘/行业客群',
          categoryId: null,
          isInit: !0,
          transTableData: [],
          exampleVisible: !1,
        }
      )
    },
    computed: {
      indexNames: function() {
        var t = this
        return d.INDEX_NAMES[this.transType].indexNames.map(function(e) {
          return Object(a.default)(
            Object(a.default)({}, e),
            {},
            {
              indexKey: t.indexCode.getIndexKey(e.name),
            },
          )
        })
      },
    },
    watch: {
      indexNames: function() {
        this.initTableColumns(), this.initTableData()
      },
      transType: function() {
        this.transTableData = []
      },
    },
    created: function() {
      this.$route.query.category_id && (this.categoryId = +this.$route.query.category_id), this.initTableColumns(), this.initTableData()
    },
    methods: {
      initTableColumns: function() {
        var n = this
        this.tableColumns = this.indexNames.map(function(e) {
          var t = n.indexCode.getIndexKey(e.name)
          return {
            label: e.name,
            prop: t,
            slot: e.name,
            minWidth: 'byLabel',
            sortable: !0,
            filters: 'number',
            valueFilter: ['numToIndexCode'],
            align: 'center',
            numStripe: !1,
          }
        })
      },
      initTableData: function() {
        var t = {}
        this.indexNames.forEach(function(e) {
          t[e.name] = null
        }),
          (this.tableData = [t]),
          (this.fileName = null),
          (this.isInit = !0),
          (this.transTableData = []),
          this.$nextTick(function() {
            document.getElementById('uploadFile').value = null
          })
      },
      handleChange: function(e) {
        ;(this.categoryId = null == e ? void 0 : e[0]), (this.transTableData = [])
      },
      handleUpload: function() {
        document.getElementById('uploadFile').click()
      },
      handlePaste: function(e, t, n) {
        var r = this
        e.preventDefault()
        var e = (e.clipboardData || window.clipboardData).getData('text').split(/[(\r\n)\r\n]+/),
          i = ((null === e || void 0 === e ? void 0 : e[0]) || '').split('\t'),
          s = i.filter(function(t) {
            return r.indexNames.find(function(e) {
              return e.name === t
            })
          })
        if (0 === s.length) return this.initTableData(), void this.$message.error('复制的数据中未识别到需要转化的列名')
        ;(e = e.slice(1).map(function(e) {
          var n = {},
            a = e.split('\t')
          return (
            i.forEach(function(e, t) {
              n[e] = a[t]
            }),
            n
          )
        })),
          (this.tableData = e.map(function(n) {
            var a = {}
            return (
              s.forEach(function(e) {
                var t = r.indexCode.getIndexKey(e)
                null != n && n[e] && (a[t] = +((null == n ? void 0 : n[e]) || '').replace(/,/, ''))
              }),
              a
            )
          })),
          (this.isInit = !1),
          (this.transTableData = [])
      },
      readLocalFileByExcel: function(e, t) {
        var n = new FileReader()
        ;(n.onload = function(e) {
          ;(e = e.target.result),
            (e = u.a.read(e, {
              type: 'binary',
            }))
          t && t(e)
        }),
          n.readAsBinaryString(e)
      },
      handleUploadChange: function(e) {
        var n,
          i = this,
          e = e.target.files
        0 != e.length &&
          ((n = e[0]),
          this.readLocalFileByExcel(n, function(e) {
            var t = e.SheetNames,
              e = e.Sheets[t[0]],
              t = (u.a.utils.sheet_to_csv(e), u.a.utils.sheet_to_json(e)),
              e = (null == t ? void 0 : t[0]) || {},
              r = Object.keys(e).filter(function(t) {
                return i.indexNames.find(function(e) {
                  return e.name === t
                })
              })
            if (0 === r.length) return i.initTableData(), void i.$message.warning('当前导入的表格没有需要转化的指标列')
            ;(i.fileName = n.name),
              (i.tableData = t.map(function(n) {
                var a = {}
                return (
                  r.forEach(function(e) {
                    var t = i.indexCode.getIndexKey(e)
                    null != n && n[e] && (a[t] = null == n ? void 0 : n[e])
                  }),
                  a
                )
              })),
              (i.isInit = !1),
              (i.transTableData = [])
          }))
      },
      handleTrans: function() {
        var a = this
        return Object(r.default)(
          regeneratorRuntime.mark(function e() {
            var t, n
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (null === a.categoryId && '市场大盘/行业客群' === a.transType) return a.$message.warning('请先选择类目'), e.abrupt('return')
                    e.next = 3
                    break
                  case 3:
                    if (1 !== a.tableData.length) {
                      e.next = 10
                      break
                    }
                    if (
                      ((n = Object.values(a.tableData[0])),
                      void 0 ===
                        n.find(function(e) {
                          return e
                        }))
                    )
                      return a.$message.warning('请设置需要批量转化的数据'), (a.transTableData = []), e.abrupt('return')
                    e.next = 10
                    break
                  case 10:
                    return (
                      (t = a.tableData),
                      (n = a.indexNames.map(function(e) {
                        return e.name
                      })),
                      window._hmt && window._hmt.push(['_trackEvent', '指数转化', '批量转化('.concat(a.transType, ')')]),
                      (n = a.indexCode.transform(n)),
                      '市场大盘/行业客群' === a.transType && n.setCateId(a.categoryId),
                      n.addTask(t, function(e) {
                        t = e
                      }),
                      (e.next = 18),
                      n.run()
                    )
                  case 18:
                    a.transTableData = t
                  case 19:
                  case 'end':
                    return e.stop()
                }
            }, e)
          }),
        )()
      },
    },
  }
}

let WTAb = function(e, t, n) {
  'use strict'
  n.r(t),
    n.d(t, 'render', function() {
      return a
    }),
    n.d(t, 'staticRenderFns', function() {
      return r
    })
  var a = function() {
      var r = this,
        e = r.$createElement,
        i = r._self._c || e
      return i(
        'div',
        [
          i(
            'de-card',
            {
              staticClass: 'mt-16 batch-trans',
            },
            [
              i(
                'div',
                {
                  staticClass: 'container',
                },
                [
                  i(
                    'div',
                    {
                      staticClass: 'mt-16 flex flex-between',
                    },
                    [
                      i(
                        'div',
                        {
                          staticClass: 'flex',
                        },
                        [
                          i('trans-select', {
                            model: {
                              value: r.transType,
                              callback: function(e) {
                                r.transType = e
                              },
                              expression: 'transType',
                            },
                          }),
                          '市场大盘/行业客群' === r.transType
                            ? i('category-select', {
                                staticClass: 'ml-16',
                                on: {
                                  change: r.handleChange,
                                },
                              })
                            : r._e(),
                        ],
                        1,
                      ),
                      i(
                        'div',
                        {
                          staticStyle: {
                            'text-align': 'right',
                          },
                        },
                        [
                          i('input', {
                            attrs: {
                              type: 'file',
                              id: 'uploadFile',
                              accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
                            },
                            on: {
                              change: r.handleUploadChange,
                            },
                          }),
                          i(
                            'span',
                            {
                              staticClass: 'mr-16',
                            },
                            [r._v(r._s(r.fileName))],
                          ),
                          i(
                            'el-button',
                            {
                              attrs: {
                                type: 'primary',
                                size: 'mini',
                              },
                              on: {
                                click: r.handleUpload,
                              },
                            },
                            [
                              r._v(' 导入表格 '),
                              i(
                                'el-popover',
                                {
                                  attrs: {
                                    placement: 'top-start',
                                    width: '200',
                                    trigger: 'hover',
                                  },
                                },
                                [
                                  i(
                                    'div',
                                    [
                                      r._v(' 注意：表格的列名称必须与指数名称对应，否则会出现转化失败的情况。 '),
                                      i(
                                        'el-button',
                                        {
                                          staticStyle: {
                                            'margin-top': '-6px',
                                            'margin-bottom': '-12px',
                                          },
                                          attrs: {
                                            type: 'text',
                                          },
                                          on: {
                                            click: function(e) {
                                              r.exampleVisible = !0
                                            },
                                          },
                                        },
                                        [r._v('查看模板')],
                                      ),
                                    ],
                                    1,
                                  ),
                                  i('i', {
                                    staticClass: 'el-icon-warning',
                                    attrs: {
                                      slot: 'reference',
                                    },
                                    slot: 'reference',
                                  }),
                                ],
                              ),
                            ],
                            1,
                          ),
                          i(
                            'el-button',
                            {
                              attrs: {
                                type: 'primary',
                                size: 'mini',
                              },
                              on: {
                                click: r.initTableData,
                              },
                            },
                            [r._v('清除数据')],
                          ),
                        ],
                        1,
                      ),
                    ],
                  ),
                  i(
                    'div',
                    {
                      staticClass: 'content',
                    },
                    [
                      i('de-table', {
                        ref: 'table',
                        attrs: {
                          'table-key': 'toolsOnlineBatchTransTable',
                          'row-height': 43,
                          height: 400,
                          columns: r.tableColumns,
                          data: r.tableData,
                          options: {
                            exportRowHeight: 30,
                            exportFileName: '指标转化',
                          },
                          effect: 'light',
                        },
                        scopedSlots: r._u(
                          [
                            r._l(r.indexNames, function(n, a) {
                              return {
                                key: n.name,
                                fn: function(t) {
                                  return [
                                    i(
                                      'div',
                                      {
                                        key: a,
                                        staticClass: 'el-input el-input-table',
                                      },
                                      [
                                        i('input', {
                                          directives: [
                                            {
                                              name: 'model',
                                              rawName: 'v-model',
                                              value: t.row[n.indexKey],
                                              expression: 'scope.row[indexName.indexKey]',
                                            },
                                          ],
                                          staticClass: 'el-input__inner',
                                          attrs: {
                                            type: 'number',
                                          },
                                          domProps: {
                                            value: t.row[n.indexKey],
                                          },
                                          on: {
                                            paste: function(e) {
                                              r.handlePaste(e, n, a)
                                            },
                                            input: function(e) {
                                              e.target.composing || r.$set(t.row, n.indexKey, e.target.value)
                                            },
                                          },
                                        }),
                                      ],
                                    ),
                                  ]
                                },
                              }
                            }),
                          ],
                          null,
                          !0,
                        ),
                      }),
                    ],
                    1,
                  ),
                ],
              ),
            ],
          ),
          i(
            'div',
            {
              staticClass: 'mt-16',
              staticStyle: {
                'text-align': 'center',
              },
            },
            [
              i(
                'el-button',
                {
                  attrs: {
                    size: 'small',
                    type: 'primary',
                  },
                  on: {
                    click: r.handleTrans,
                  },
                },
                [r._v(' 一键转化 ')],
              ),
            ],
            1,
          ),
          i('trans-data-table', {
            attrs: {
              indexNames: r.indexNames,
              data: r.transTableData,
            },
          }),
          i('example-dialog', {
            attrs: {
              transType: r.transType,
              indexNames: r.indexNames,
              visible: r.exampleVisible,
            },
            on: {
              'update:visible': function(e) {
                r.exampleVisible = e
              },
            },
          }),
        ],
        1,
      )
    },
    r = []
  a._withStripped = !0
}

let N+HR= function(e, i, r) {
        "use strict";
        r.r(i),
        r.d(i, "default", function() {
            return f
        });
        r("2B1R"),
        r("2eJa"),
        r("07d7"),
        r("FZtP"),
        r("tkto"),
        r("yq1k"),
        r("JTJg"),
        r("fbCW"),
        r("TeQF");
        var l = r("U8pU") // typeof
          , b = r("VTBJ") // //Object.assign
          , t = r("1OyB")
          , n = r("vuIU")
          , a = r("PNxJ")
          , o = r("EPBW")
          , s = r("RcWj")
          , u = r("QvYW")
          , f = function() {
            function e() {
                Object(t.default)(this, e),
                this.indexMap = u.INDEX_MAP,
                this.aliasMap = u.ALIAS_MAP,
                this.columns = s.default,
                this.getIndexKey = this.getIndexKey.bind(this),
                this.getIndexName = this.getIndexName.bind(this),
                this.getIndexAliasName = this.getIndexAliasName.bind(this),
                this.formatIndexNum = this.formatIndexNum.bind(this),
                this.computeDeriveIndex = this.computeDeriveIndex.bind(this),
                this.mergeIndex = this.mergeIndex.bind(this),
                this.getColumn = this.getColumn.bind(this)
            }
            return Object(n.default)(e, [{
                key: "assignIndexMap",
                value: function(e) {
                    this.indexMap = Object.assign({}, this.indexMap, e)
                }
            }, {
                key: "assignAliasMap",
                value: function(e) {
                    this.aliasMap = Object.assign({}, this.aliasMap, e)
                }
            }, {
                key: "getIndexKey",
                value: function(e) {
                    var r = this
                      , i = Array.isArray(e)
                      , e = (e = !i ? [e] : e).map(function(e) {
                        var i = r.indexMap.hasOwnProperty(e) ? r.indexMap[e] : null;
                        if (!i)
                            throw new Error("".concat(e, " indexKey不存在"));
                        return i
                    });
                    return i ? e : e[0]
                }
            }, {
                key: "getIndexName",
                value: function(i) {
                    var r = this
                      , e = Array.isArray(i);
                    e || (i = [i]);
                    var t = [];
                    return Object.keys(this.indexMap).forEach(function(e) {
                        i.includes(r.indexMap[e]) && t.push(e)
                    }),
                    t.length !== i.length && i.forEach(function(i) {
                        if (!Object.keys(r.indexMap).find(function(e) {
                            return r.indexMap[e] === i
                        }))
                            throw new Error("".concat(i, " indexName不存在"))
                    }),
                    e ? t : t[0]
                }
            }, {
                key: "getIndexAliasName",
                value: function(e) {
                    var i = this
                      , r = Array.isArray(e)
                      , e = (e = !r ? [e] : e).map(function(e) {
                        return i.aliasMap.hasOwnProperty(e) ? i.aliasMap[e] : e
                    });
                    return r ? e : e[0]
                }
            }, {
                key: "formatIndexNum",
                value: function(e, r) {
                    var t = this
                      , i = Array.isArray(e);
                    i || (e = [e]);
                    var n = r.map(function(e) {
                        return {
                            indexKey: t.getIndexKey(e),
                            indexName: e
                        }
                    });
                    return e.forEach(function(i) {
                        n.forEach(function(e) {
                            i.hasOwnProperty(e.indexKey) && (i[e.indexKey] = Object(o.formatIndexNum)(i[e.indexKey], e.indexName))
                        }),
                        i.hasOwnProperty("children") && Array.isArray(i.children) && (i.children = t.formatIndexNum(i.children, r))
                    }),
                    i ? e : e[0]
                }
            }, {
                key: "computeDeriveIndex",
                value: function(e, r) {
                    var t = this
                      , i = Array.isArray(e);
                    i || (e = [e]);
                    var n = {};
                    u.RELY_INDEX_NAMES.forEach(function(e) {
                        n[e] = t.getIndexKey(e)
                    }),
                    r.forEach(function(e) {
                        n[e] = t.getIndexKey(e)
                    });
                    e = e.map(function(e) {
                        var i = Object(b.default)({}, e);
                        return r.forEach(function(e) {
                            i = Object(o.computeDeriveIndex)(i, e, n)
                        }),
                        i.hasOwnProperty("children") && Array.isArray(i.children) && (i.children = t.computeDeriveIndex(i.children, r)),
                        i
                    });
                    return i ? e : e[0]
                }
            }, {
                key: "mergeIndex",
                value: function(r) {
                    var t = this
                      , n = {}
                      , a = [];
                    u.TOTAL_INDEX_NAMES.forEach(function(e) {
                        if (a.includes(e))
                            throw new Error("合并指标数据出错，合计的指标".concat(e, "不能同时出现两次"));
                        a.push(e);
                        var i = t.getIndexKey(e);
                        r.forEach(function(e) {
                            e.hasOwnProperty(i) && (n.hasOwnProperty(i) ? n[i] += e[i] : n[i] = e[i])
                        })
                    });
                    var e = u.DERIVE_INDEX_NAMES.filter(function(e) {
                        var i = t.getIndexKey(e);
                        return r.some(function(e) {
                            return e.hasOwnProperty(i)
                        })
                    })
                      , n = this.computeDeriveIndex(n, e)
                      , e = u.RATE_INDEX_NAMES.filter(function(e) {
                        var i = t.getIndexKey(e);
                        return r.some(function(e) {
                            return e.hasOwnProperty(i)
                        })
                    });
                    return n = this.computeDeriveIndex(n, e)
                }
            }, {
                key: "getColumn",
                value: function(e, t) {
                    var n = this
                      , i = Array.isArray(e)
                      , a = [];
                    return (e = !i ? [e] : e).forEach(function(e) {
                        if (!e)
                            return !1;
                        var i = "object" === Object(l.default)(e) ? e.label : e
                          , r = n.columns.find(function(e) {
                            return e.label === i
                        });
                        if (!r)
                            throw new Error("".concat(i, " 列不存在"));
                        r = Object(b.default)({}, r);
                        r.prop || (r.prop = n.getIndexKey(i)),
                        "object" === Object(l.default)(e) && (r = Object.assign({}, r, e)),
                        (r = "object" === Object(l.default)(t) ? Object.assign({}, r, t) : r).label = n.getIndexAliasName(r.label),
                        a.push(r)
                    }),
                    i ? a : a[0]
                }
            }, {
                key: "transform",
                value: function(e) {
                    var i = this
                      , r = {};
                    return e.forEach(function(e) {
                        r[e] = i.getIndexKey(e)
                    }),
                    new a.default(r)
                }
            }]),
            e
        }()
}

let PNxJ= function(e, i, r) {
        "use strict";
        r.r(i),
        r.d(i, "default", function() {
            return s
        });
        r("07d7"),
        r("FZtP"),
        r("ma9I"),
        r("tkto"),
        r("+2oP"),
        r("fbCW"),
        r("yq1k"),
        r("JTJg"),
        r("2eJa"),
        r("6cQw"),
        r("ls82");
        var b = r("VTBJ")
          , t = r("HaE+")
          , n = r("1OyB")
          , a = r("vuIU")
          , l = (r("PKPk"),
        r("3bBZ"),
        r("Vtdi"))// 提示出错的
          , o = r("z0WU")
          , f = r("1aZS")
          , s = function() {
            function i(e) {
                Object(n.default)(this, i),
                this._keyMap = {
                    rate: ["支付转化指数"],
                    wwConsultTrdPayRate: ["客服询单支付转化率指数"],
                    other: ["流量指数", "交易指数", "点击人气", "搜索人气", "收藏人气", "加购人气", "转化率潜力指数", "客群指数", "预售定金交易指数", "点击热度", "搜索热度", "相关词搜索人气", "相关词点击人气", "预售定金指数", "支付商品数指数", "下单买家指数", "支付买家指数", "流失指数", "流失人气", "搜索交易指数", "搜索加购指数", "搜索收藏指数", "加购指数", "访客指数", "人工平均响应时长指数", "客服支付指数", "客服客单价指数", "交易增长幅度指数", "支付金额较父行业占比指数", "访问人气", "加购热度", "收藏热度", "浏览热度"]
                },
                this.cateId = null,
                this._indexNameKeyMap = e,
                this._tasks = []
            }
            var e;
            return Object(a.default)(i, [{
                key: "addTask",
                value: function(e, i) {
                    this._tasks.push({
                        indexData: e,
                        callback: i
                    })
                }
            }, {
                key: "setCateId",
                value: function(e) {
                    this.cateId = e
                }
            }, {
                key: "run",
                value: (e = Object(t.default)(regeneratorRuntime.mark(function e() {
                    var n, t, a, l, b, o = this;
                    return regeneratorRuntime.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (n = [],
                                this._tasks.forEach(function(e) {
                                    n = n.concat(Array.isArray(e.indexData) ? e.indexData : [e.indexData])
                                }),
                                t = {},
                                a = {},
                                Object.keys(this._indexNameKeyMap).forEach(function(e) {
                                    var i = o._indexNameKeyMap[e]
                                      , r = u(n, i);
                                    0 < r.length && (e = o.cateId ? e : o._getKey(e),
                                    t.hasOwnProperty(e) || (t[e] = [],
                                    a[e] = []),
                                    t[e] = t[e].concat(r),
                                    a[e].push({
                                        indexKey: i,
                                        length: r.length
                                    }))
                                }),
                                0 < Object.keys(t).length)
                                    return e.next = 8,
                                    c(t, this.cateId).catch(function(e) {
                                        throw o._showError(e),
                                        e
                                    });
                                e.next = 10;
                                break;
                            case 8:
                                (l = e.sent) && (Object.keys(l).forEach(function(r) {
                                    var t = 0;
                                    a[r].forEach(function(e) {
                                        var i = d(n, l[r].slice(t, t + e.length), e.indexKey, 0);
                                        n = i.array,
                                        t += e.length
                                    })
                                }),
                                b = 0,
                                this._tasks.forEach(function(e) {
                                    var i = Array.isArray(e.indexData)
                                      , r = i ? e.indexData.length : 1
                                      , t = n.slice(b, b + r);
                                    e.callback(i ? t : t[0]),
                                    b += r
                                }));
                            case 10:
                                return e.abrupt("return", !0);
                            case 11:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                })),
                function() {
                    return e.apply(this, arguments)
                }
                )
            }, {
                key: "_getKey",
                value: function(i) {
                    var r = this
                      , e = Object.keys(this._keyMap).find(function(e) {
                        return r._keyMap[e].includes(i)
                    });
                    if (!e)
                        throw new Error("".concat(i, " 指数转化key不存在"));
                    return e
                }
            }, {
                key: "_showError",
                value: function(e) {
                    var i = "未知错误";
                    e.hasOwnProperty("message") ? i = e.message : e.hasOwnProperty("msg") && (i = e.msg),
                    i && l.default.$message.error(i = "网络故障" === i ? "网络故障，请检查电脑释放安装净网大师软件，可退出该软件重试" : i)
                }
            }]),
            i
        }()
          , u = function i(e, r) {
            var t = [];
            return e.forEach(function(e) {
                e.hasOwnProperty(r) && Object(o.isNumber)(e[r]) && t.push(e[r]),
                e.hasOwnProperty("children") && Array.isArray(e.children) && (t = t.concat(i(e.children, r)))
            }),
            t
        }
          , d = function r(e, t, n) {
            var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0
              , l = [];
            return e.forEach(function(e) {
                var i = Object(b.default)({}, e);
                i.hasOwnProperty(n) && Object(o.isNumber)(i[n]) && (i[n] = isNaN(t[a]) ? t[a] : parseFloat(t[a]),
                a++),
                i.hasOwnProperty("children") && Array.isArray(i.children) && (e = r(i.children, t, n, a),
                i.children = e.array,
                a = e.index),
                l.push(i)
            }),
            {
                array: l,
                index: a
            }
        }
          , c = function() {
            var r = Object(t.default)(regeneratorRuntime.mark(function e(b, o) {
                var s, u, i;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            s = 0,
                            u = {},
                            i = regeneratorRuntime.mark(function e() {
                                var i, r, t, n, a, l;
                                return regeneratorRuntime.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (r = 2e3 + (i = 2e3 * s),
                                            t = {},
                                            n = !0,
                                            Object.keys(b).forEach(function(e) {
                                                t[e] = b[e].slice(i, r),
                                                0 < t[e].length && (n = !1)
                                            }),
                                            n)
                                                return e.abrupt("return", "break");
                                            e.next = 7;
                                            break;
                                        case 7:
                                            return a = {
                                                cateId: o,
                                                data: t
                                            },
                                            e.next = 11,
                                            f.default.send("getTransformCode", a).catch(function(e) {
                                                throw e
                                            });
                                        case 11:
                                            if (l = e.sent,
                                            o)
                                                return e.next = 15,
                                                fetch("https://service.amingtool.com/index.php/sycm/v1/transform/market?from=amingshangzhi", {
                                                    method: "POST",
                                                    headers: {
                                                        "content-type": "application/json"
                                                    },
                                                    body: JSON.stringify(l)
                                                }).then(function(e) {
                                                    return e.json()
                                                }).catch(function(e) {
                                                    throw e
                                                });
                                            e.next = 24;
                                            break;
                                        case 15:
                                            if ((l = e.sent).msg)
                                                throw l;
                                            e.next = 18;
                                            break;
                                        case 18:
                                            return a.data = l,
                                            e.next = 21,
                                            f.default.send("transform", a).catch(function(e) {
                                                throw e
                                            });
                                        case 21:
                                            l = e.sent,
                                            e.next = 33;
                                            break;
                                        case 24:
                                            return e.next = 26,
                                            fetch("https://service.amingtool.com/index.php/sycm/v1/transform/sign?from=amingshangzhi&code=".concat(l.code)).then(function(e) {
                                                return e.json()
                                            }).catch(function(e) {
                                                throw e
                                            });
                                        case 26:
                                            if ((l = e.sent).msg)
                                                throw l;
                                            e.next = 29;
                                            break;
                                        case 29:
                                            return a.sign = l.sign,
                                            e.next = 32,
                                            f.default.send("transform", a).catch(function(e) {
                                                throw e
                                            });
                                        case 32:
                                            l = e.sent;
                                        case 33:
                                            if (void 0 === l)
                                                throw new Error("指数转化结果undefined");
                                            e.next = 35;
                                            break;
                                        case 35:
                                            Object.keys(l).forEach(function(e) {
                                                u.hasOwnProperty(e) || (u[e] = []),
                                                u[e] = u[e].concat(l[e])
                                            }),
                                            s++;
                                        case 37:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e)
                            });
                        case 3:
                            if (0 <= s)
                                return e.delegateYield(i(), "t0", 5);
                            e.next = 10;
                            break;
                        case 5:
                            if ("break" === e.t0)
                                return e.abrupt("break", 10);
                            e.next = 8;
                            break;
                        case 8:
                            e.next = 3;
                            break;
                        case 10:
                            return e.abrupt("return", 0 < Object.keys(u).length ? u : null);
                        case 11:
                        case "end":
                            return e.stop()
                        }
                }, e)
            }));
            return function(e, i) {
                return r.apply(this, arguments)
            }
        }()
}

 let RcWj = function(e, i, r) {
        "use strict";
        r.r(i);
        r("ma9I");
        i.default = [].concat([{
            label: "开店时间",
            prop: "start",
            minWidth: 160,
            sortable: !1,
            filters: "day"
        }, {
            label: "粉丝数量",
            minWidth: 160,
            prop: "fans",
            sortable: !1,
            filters: ""
        }, {
            label: "店铺评价信息",
            prop: "evaluate_info",
            minWidth: "byLabel",
            sortable: !1,
            filters: ""
        }, {
            label: "商品视频图",
            prop: "video_img",
            minWidth: "byLabel",
            sortable: !1,
            filters: ""
        }, {
            label: "商品所在地区",
            prop: "area",
            minWidth: "byLabel",
            sortable: !1,
            filters: "string"
        }, {
            label: "上新时间",
            prop: "starts",
            minWidth: 80,
            sortable: !1,
            filters: "day"
        }, {
            label: "上架时间",
            prop: "dateRange",
            minWidth: 160,
            sortable: !1,
            filters: "day"
        }, {
            label: "监控时间",
            prop: "add_dateline",
            minWidth: "byLabel",
            sortable: !0,
            filters: "day"
        }, {
            label: "周期",
            prop: "dateRange",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "品牌分类",
            prop: "brandType",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "监控开始时间",
            prop: "start_time",
            minWidth: 100,
            sortable: !0,
            filters: "day"
        }, {
            label: "监控状态",
            prop: "monitorStatus",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "商品标题",
            prop: "itemTitle",
            minWidth: 350,
            sortable: !0,
            filters: "string"
        }, {
            label: "商品链接",
            prop: "href",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "淘客信息",
            prop: "taobao_nick",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "店铺标题",
            prop: "shopTitle",
            minWidth: 160,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "商品信息",
            prop: "itemTitle",
            minWidth: 160,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "品牌信息",
            prop: "brandTitle",
            minWidth: 160,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "品牌简介",
            prop: "brandDesc",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "品牌id",
            prop: "brandId",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "所在地",
            prop: "address",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "商品id",
            prop: "itemId",
            minWidth: 100,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动id",
            prop: "activityId",
            minWidth: 100,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "商品状态",
            prop: "itemStatus",
            minWidth: 100,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "店铺id",
            prop: "shopId",
            minWidth: 100,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "类别",
            prop: "category",
            minWidth: 100,
            sortable: !1,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "价格区间",
            prop: "price",
            minWidth: 100,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "商品图片地址",
            prop: "pictUrl",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"],
            minWidth: 160
        }, {
            label: "一口价",
            prop: "price",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number"
        }, {
            label: "价格",
            prop: "price",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number"
        }, {
            label: "券后价",
            prop: "price_after_coupon",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number"
        }, {
            label: "类目名",
            prop: "cateName",
            minWidth: 150,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"],
            showOverflowTooltip: !1
        }, {
            label: "属性名",
            prop: "attrName",
            minWidth: 150,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"],
            showOverflowTooltip: !1
        }, {
            label: "完整类目名",
            prop: "cateAllName",
            minWidth: 150,
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"],
            hidden: !0
        }, {
            prop: "priceSegName",
            label: "价格带",
            minWidth: 100,
            sortable: !1,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "日期",
            prop: "dateRange",
            minWidth: 160,
            sortable: !0,
            filters: "day"
        }, {
            label: "时间",
            prop: "time",
            minWidth: 100,
            sortable: !0,
            filters: "day"
        }, {
            label: "订单时间",
            prop: "orderTime",
            minWidth: "byLabel",
            sortable: !0,
            filters: "day"
        }, {
            label: "定时上架时间",
            prop: "onShelvesTime",
            minWidth: 160,
            sortable: !1,
            filters: "day"
        }, {
            label: "地域名",
            prop: "area",
            minWidth: 160,
            sortable: !1,
            filters: ""
        }, {
            label: "店铺类型",
            prop: "shopType",
            minWidth: 160,
            sortable: !1,
            filters: "string"
        }, {
            label: "行业关键词",
            prop: "keywords",
            minWidth: 160,
            sortable: !1,
            filters: ""
        }, {
            label: "搜索排序类型",
            prop: "sort_type",
            minWidth: 120,
            sortable: !1,
            filters: ""
        }, {
            label: "排名类型",
            prop: "rank_type",
            minWidth: 120,
            sortable: !0,
            filters: "string"
        }, {
            label: "地址",
            prop: "address",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string"
        }, {
            label: "排名",
            minWidth: 100,
            prop: "rank",
            sortable: !0,
            filters: "number",
            valueFilter: ["undefinedText"]
        }, {
            label: "sku名称",
            minWidth: 100,
            prop: "skuName",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "排序",
            minWidth: "byLabel",
            prop: "rank",
            sortable: !0,
            filters: "number",
            valueFilter: ["undefinedText"]
        }, {
            label: "序号",
            minWidth: 60,
            prop: "index",
            sortable: !0,
            filters: "number",
            valueFilter: ["undefinedText"]
        }, {
            label: "关键词",
            minWidth: 100,
            prop: "keywords",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "市场动态",
            minWidth: 100,
            prop: "dynamic",
            sortable: !0,
            filters: "string"
        }, {
            label: "监控范围",
            minWidth: 100,
            prop: "range",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "位置",
            minWidth: 100,
            prop: "position",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动信息",
            minWidth: "byLabel",
            prop: "activityName",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动价格",
            minWidth: "byLabel",
            prop: "activityPrice",
            sortable: !0,
            filters: "number",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动类型",
            minWidth: "byLabel",
            prop: "activityType",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动状态",
            minWidth: "byLabel",
            prop: "activityStatus",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动已售",
            minWidth: "byLabel",
            prop: "activitySold",
            sortable: !0,
            filters: "number",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动开始时间",
            minWidth: "byLabel",
            prop: "activityStartTime",
            sortable: !0,
            filters: "day",
            valueFilter: ["undefinedText"]
        }, {
            label: "活动结束时间",
            minWidth: "byLabel",
            prop: "activityEndTime",
            sortable: !0,
            filters: "day",
            valueFilter: ["undefinedText"]
        }, {
            label: "推广方式",
            minWidth: "byLabel",
            prop: "pub_source",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "推广top3商品",
            minWidth: "byLabel",
            prop: "top3",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "计划类型",
            minWidth: "byLabel",
            prop: "planType",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "优惠券",
            minWidth: "byLabel",
            prop: "coupon",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "运费",
            minWidth: "byLabel",
            prop: "view_fee",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "三项分",
            minWidth: "byLabel",
            prop: "dsr_scores",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "会员版本",
            minWidth: "byLabel",
            prop: "packName",
            sortable: !0,
            filters: "",
            valueFilter: ["undefinedText"]
        }, {
            label: "会员时长",
            minWidth: "byLabel",
            prop: "monthsMap",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "订单状态",
            minWidth: "byLabel",
            prop: "orderStatus",
            sortable: !1,
            filters: "",
            valueFilter: ["undefinedText"]
        }, {
            label: "扩容类型",
            minWidth: "byLabel",
            prop: "coupon5",
            sortable: !1,
            filters: "",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播信息",
            minWidth: "byLabel",
            prop: "live",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播间类型",
            minWidth: "byLabel",
            prop: "channel_name",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播开始时间",
            minWidth: "byLabel",
            prop: "start_time",
            sortable: !0,
            filters: "day",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播结束时间",
            minWidth: "byLabel",
            prop: "end_time",
            sortable: !0,
            filters: "day",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播时长",
            minWidth: "byLabel",
            prop: "time",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播状态",
            minWidth: "byLabel",
            prop: "status_txt",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "直播id",
            prop: "live_id",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "讲解时长",
            prop: "talkTime",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "发布时间",
            prop: "publishTime",
            minWidth: "byLabel",
            sortable: !0,
            filters: "day",
            valueFilter: ["undefinedText"]
        }, {
            label: "内容标题",
            prop: "contentTitle",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "微淘类型",
            prop: "microType",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "上新最多类目",
            prop: "moreCategory",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "上新最多品牌",
            prop: "moreBrand",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "上新最多店铺",
            prop: "moreShop",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "店铺体验",
            prop: "shopStarType",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }, {
            label: "团长",
            prop: "team",
            minWidth: "byLabel",
            sortable: !0,
            filters: "string",
            valueFilter: ["undefinedText"]
        }], [{
            label: "昨日上新数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "7日上新数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日上新数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "当前月销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总收藏",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总评论数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "每日评论数",
            minWidth: "byLabel",
            sortable: !1,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "支付件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "支付金额",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "每日销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "每日收藏数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "上新数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "收货人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "监控商品数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "昨日总销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日总销量",
            minWidth: "byLabel",
            sortable: !1,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "当前收获人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "收藏人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "评价数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "问大家数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "同款数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "相似款数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月累计支付人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月累计支付件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月支付件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月支付金额",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月客单价",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "客单价",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "搜索指数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "直通车均价",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "飙升度",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "竞争度",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "人均支付件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "收货占比",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "物流评分",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "服务评分",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "描述评分",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "今日销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "日销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "预估销售额",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "佣金",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "2小时销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "2小时销售额(预估)",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "15分钟销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "15分钟销售额(预估)",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "2小时分享回流",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "出单指数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "推广量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "收入(元)",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日推广量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日支出佣金",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "最大日推广量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "月销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "今日获得佣金",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "支付人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "粉丝数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "上新商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "商品数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "卖家信用",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "动销率",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "昨日付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "7日付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "累计支付人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "淘客占比",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "订单金额",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "扩容数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "点卡抵扣",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "扩容有效期",
            minWidth: "byLabel",
            sortable: !1,
            filters: "",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "同款商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "相似商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "评论数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "实际支付金额",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "定时上架商品数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总月付款人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总月支付件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总商品数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总收货人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "预售件数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "支付定金",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总成本",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "利润",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "品牌数量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "3日上新商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "7日上新商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "30日上新商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "种草人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "今日实时销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "昨日上新商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "观看人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "上架商品数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "评论人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "点赞数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总销量",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "总收藏人数",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }, {
            label: "热推值",
            minWidth: "byLabel",
            sortable: !0,
            filters: "number",
            valueFilter: ["numToIndexCode", "undefinedText"],
            align: "right-by-header",
            numStripe: !1
        }])
 }
    
let 1aZS = function(e, i, r) {
        "use strict";
        r.r(i);
        r("07d7"),
        r("FZtP");
        var a = r("Nomr");
        r("39nS"),
        i.default = {
            _sw: null,
            _isReady: !1,
            _createCallbacks: [],
            _create: function(e) {
                var i = this;
                null === this._sw ? (this._createCallbacks.push(e),
                this._isReady || (this._isReady = !0,
                SecurityWorker.ready(function() {
                    i._sw = new SecurityWorker,
                    i._sw.onmessage = function(e) {
                        a.default.handleMessage(e)
                    }
                    ,
                    i._sw.oncreate = function() {
                        0 < i._createCallbacks.length && (i._createCallbacks.forEach(function(e) {
                            e()
                        }),
                        i._createCallbacks = [])
                    }
                }))) : e()
            },
            send: function(e, t) {
                var n = this;
                return new Promise(function(i, r) {
                    n._create(function() {
                        a.default.postMessage(e, t, n._sw).then(function(e) {
                            i(e)
                        }).catch(function(e) {
                            r(e)
                        })
                    })
                }
                )
            }
        }
    }

    let Nomr =function(e, i, r) {
        "use strict";
        r.r(i);
        r("2eJa"),
        r("07d7"),
        r("yq1k"),
        r("x0AG"),
        r("pDQq");
        var t = {
            msgPromises: [],
            postMessage: function(e) {
                var r = this
                  , i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
                  , t = 2 < arguments.length ? arguments[2] : void 0;
                if (!e)
                    throw new Error("消息事件必须注明事件类型");
                var n = Math.random()
                  , a = new Promise(function(e, i) {
                    r.msgPromises.push({
                        id: n,
                        resolve: e,
                        reject: i
                    })
                }
                )
                  , i = {
                    id: n,
                    type: e,
                    details: i
                };
                return t ? t.postMessage(i) : window.postMessage(i, "*"),
                a
            },
            handleMessage: function(i) {
                var e, r;
                i.hasOwnProperty("id") && i.hasOwnProperty("status") && ["success", "error"].includes(i.status) && (0 <= (e = this.msgPromises.findIndex(function(e) {
                    return e.id === i.id
                })) && (r = this.msgPromises[e],
                "success" === i.status ? r.resolve(i.details || null) : r.reject(i.details || null),
                this.msgPromises.splice(e, 1)))
            }
        };
        window.addEventListener("message", function(e) {
            e && e.data && t.handleMessage(e.data)
        }),
        i.default = t
    }
    
