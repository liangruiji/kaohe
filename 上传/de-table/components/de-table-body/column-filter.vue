<!--
 * @Author: your name
 * @Date: 2022-03-03 16:44:27
 * @LastEditTime: 2022-03-10 00:57:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-filter.vue
-->
<template>
  <span class="column-filter-wrap">
    <i v-popover:popover :class="{ iconfont: true, 'aming-filter': true, 'filter-icon': true, 'icon-on': defaultValue }"></i>
    <el-popover
      ref="popover"
      v-model="visible"
      :width="'checkbox' === type ? 100 : 'hours' === type ? 60 : 'mark' === type ? 335 : 200"
      placement="bottom"
      trigger="click"
      :popper-class="'filter-popover' + timeTypes.includes(type ? ' filter-popover-time' : '')"
      @show="assignAndFocus"
    >
      <lazy-load v-if="lazyLoadStatus" :show="visible" :follow-show="false">
        <el-form ref="form" :model="form" :rules="formRules" size="mini" @keyup.enter="handleFilter">
          <div v-if="'string' === type">
            <el-form-item prop="keyword">
              <el-input ref="keywordInput" v-model="form.keyword" placeholder="请输入搜索字符"></el-input>
            </el-form-item>

            <el-form-item style="margin-bottom:0">
              <el-button type="primary" @click="handleFilter('fuzzy')">模糊</el-button>
              <el-button type="primary" @click="handleFilter('precision')">精确</el-button>
              <el-button type="text" @click="onClickReset">重置</el-button>
            </el-form-item>
          </div>

          <div v-if="'number' === type">
            <el-form-item prop="gt">
              <el-input ref="gtInput" v-model="form.gt" placeholder="大于">
                <template slot="prepend">&gt;</template>
              </el-input>
            </el-form-item>

            <el-form-item prop="eq">
              <el-input v-model="form.eq" placeholder="等于">
                <template slot="prepend">=</template>
              </el-input>
            </el-form-item>

            <el-form-item prop="lt">
              <el-input v-model="form.lt" placeholder="小于">
                <template slot="prepend">&lt;</template>
              </el-input>
            </el-form-item>

            <el-form-item style="margin-bottom:0">
              <el-button type="primary" @click="handleFilter">筛选</el-button>
              <el-button type="text" @click="onClickReset">重置</el-button>
            </el-form-item>
          </div>

          <div v-if="'checkbox' === type">
            <el-form-item style="margin-bottom:0" prop="check">
              <el-scrollbar ref="checkScroll" wrap-style="max-height: 300px;">
                <el-checkbox-group v-model="form.check" class="checkbox-group">
                  <el-checkbox
                    v-for="t in filters"
                    :key="t.value"
                    style="checkbox-item"
                    :label="t.value"
                    :title="t.text"
                    @change="
                      e => {
                        return onCheckboxChange(t.value, e)
                      }
                    "
                  >
                    {{ t.text }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-scrollbar>
            </el-form-item>
          </div>

          <div v-if="'hours' === type">
            <el-form-item style="margin-bottom:0" prop="hours">
              <el-scrollbar ref="hoursScroll" wrap-style="max-height: 300px;">
                <el-checkbox-group v-model="form.hours" class="checkbox-group">
                  <el-checkbox
                    v-for="t in filters"
                    :key="t.value"
                    style="checkbox-item"
                    :label="t.value"
                    :title="t.text"
                    @change="
                      e => {
                        return onHoursChange(t.value, e)
                      }
                    "
                  >
                    {{ t.text }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-scrollbar>
            </el-form-item>
          </div>

          <div v-if="'day' === type">
            <el-form-item style="position:relative" prop="day">
              <el-date-picker
                ref="day"
                v-model="form.day"
                type="daterange"
                align="center"
                :unlink-panels="true"
                @change="handleFilter"
                @blur="onDatePickerBlur"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div v-if="'week' === type">
            <el-form-item style="position:relative" prop="week">
              <el-date-picker
                ref="week"
                v-model="form.week"
                type="week"
                align="center"
                :unlink-panels="true"
                @change="handleFilter"
                @blur="onDatePickerBlur"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div v-if="'month' === type">
            <el-form-item style="position:relative" prop="month">
              <el-date-picker
                ref="month"
                v-model="form.month"
                type="monthrange"
                align="center"
                :unlink-panels="true"
                @change="handleFilter"
                @blur="onDatePickerBlur"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div v-if="'mark' === type">
            <el-form-item class="mark-level" label="" prop="mark_priority">
              <el-radio-group v-model="form.mark_priority">
                <div>
                  <el-radio label="">
                    <el-tag size="small" type="info">全部</el-tag>
                  </el-radio>
                  <el-radio label="无">
                    <el-tag size="small" type="info">无</el-tag>
                  </el-radio>
                  <el-radio label="1">
                    <el-tag size="small" type="danger">1</el-tag>
                  </el-radio>
                  <el-radio label="2">
                    <el-tag size="small" type="warning">2</el-tag>
                  </el-radio>
                </div>
                <div style="margin-bottom: -12px">
                  <el-radio label="3">
                    <el-tag size="small" type="success">3</el-tag>
                  </el-radio>
                  <el-radio label="4">
                    <el-tag size="small">4</el-tag>
                  </el-radio>
                  <el-radio label="5">
                    <el-tag size="small" class="level-5">5</el-tag>
                  </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="mark-info" label="" prop="mark_note">
              <el-input v-model="form.mark_note" maxlength="10" placeholder="请输入标注信息" type="text"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:-12px">
              <el-button type="primary" @click="handleFilter('fuzzy')">刷选</el-button>
              <el-button type="primary" @click="onClickReset">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </lazy-load>
    </el-popover>
  </span>
</template>

<script>
import LazyLoad from '@/components/de-table/lazy-load'
import { transformToFloat } from '@/components/de-table/public.js' // 一些处理数据格式公共函数

export default {
  name: 'ColumnFilter',
  components: {
    LazyLoad,
  },
  props: {
    type: {
      type: String,
      default: 'string',
      validator: function(e) {
        return -1 !== ['string', 'number', 'checkbox', 'hours', 'day', 'week', 'month', 'mark'].indexOf(e)
      },
    },
    filters: {
      type: Array,
      default: function() {
        return []
      },
    },
    defaultValue: {
      default: null,
    },
  },
  data: function() {
    return {
      lazyLoadStatus: !0,
      visible: !(this.timeTypes = ['day', 'week', 'month']),
      form: {
        keyword: null,
        gt: null,
        eq: null,
        lt: null,
        check: [],
        hours: [],
        day: [],
        week: null,
        month: [],
        mark_note: null,
        mark_priority: null,
      },
      formRules: {
        gt: [
          {
            type: 'number',
            transform: transformToFloat,
            message: '请输入数字',
            trigger: 'blur',
          },
        ],
        eq: [
          {
            type: 'number',
            transform: transformToFloat,
            message: '请输入数字',
            trigger: 'blur',
          },
        ],
        lt: [
          {
            type: 'number',
            transform: transformToFloat,
            message: '请输入数字',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    type: function() {
      var e = this
      this.lazyLoadStatus = !1
      this.$nextTick(function() {
        e.lazyLoadStatus = !0
      })
    },
  },
  methods: {
    assignAndFocus: function() {
      var t = this
      this.$nextTick(function() {
        var e = null
        'string' === t.type
          ? ((e = t.$refs.keywordInput), (t.form.keyword = t.defaultValue ? t.defaultValue.keyword : null))
          : 'number' === t.type
          ? ((e = t.$refs.gtInput),
            t.defaultValue
              ? ((t.form.gt = t.defaultValue.gt), (t.form.eq = t.defaultValue.eq), (t.form.lt = t.defaultValue.lt))
              : (t.form.gt = t.form.eq = t.form.lt = null))
          : 'checkbox' === t.type
          ? ((t.form.check = t.defaultValue ? Array.from(t.defaultValue) : []),
            t.$refs.checkScroll && ((t.$refs.checkScroll.moveX = 0), (t.$refs.checkScroll.moveY = 0)))
          : 'hours' === t.type
          ? ((t.form.hours = t.defaultValue ? Array.from(t.defaultValue) : []),
            t.$refs.hoursScroll && ((t.$refs.hoursScroll.moveX = 0), (t.$refs.hoursScroll.moveY = 0)))
          : 'day' === t.type
          ? ((e = t.$refs.day), (t.form.day = t.defaultValue ? Array.from(t.defaultValue) : []))
          : 'week' === t.type
          ? ((e = t.$refs.week), (t.form.week = t.defaultValue || null))
          : 'month' === t.type && ((e = t.$refs.month), (t.form.month = t.defaultValue ? Array.from(t.defaultValue) : [])),
          e && (e.focus(), e.select && e.select())
      })
    },
    handleFilter: function(e) {
      var t = this,
        n = null,
        r = !0
      if ('string' === this.type) {
        if (this.form.keyword) {
          n = {
            mode: e,
            keyword: this.form.keyword,
          }
        }
      } else if ('number' === this.type) {
        this.$refs.form.validate(function(e) {
          r = e
          if (r) {
            if (t.form.gt || t.form.eq || t.form.lt) {
              n = {
                gt: t.form.gt ? parseFloat(t.form.gt) : null,
                eq: t.form.eq ? parseFloat(t.form.eq) : null,
                lt: t.form.lt ? parseFloat(t.form.lt) : null,
              }
            }
          }
        })
      } else if ('checkbox' === this.type) {
        if (0 < this.form.check.length) {
          n = Array.from(this.form.check)
        }
      } else if ('hours' === this.type) {
        if (0 < this.form.hours.length) {
          n = Array.from(this.form.hours)
        }
      } else if ('day' === this.type) {
        if (0 < this.form.day.length) {
          n = Array.from(this.form.day)
        }
      } else if ('week' === this.type) {
        if (this.form.week) {
          n = this.form.week
        }
      } else if ('month' === this.type) {
        if (0 < this.form.month.length) {
          n = Array.from(this.form.month)
        }
      } else if ('mark' === this.type) {
        if (this.form.mark_priority || this.form.mark_note) {
          n = {
            mode: e,
            mark_priority: '无' === this.form.mark_priority ? 'null' : this.form.mark_priority,
            mark_note: this.form.mark_note,
          }
        }
      }

      if (r) {
        this.visible = !1
        this.$emit('change', n)
      }
    },
    onCheckboxChange: function(e, t) {
      this.form.check = []
      t && this.form.check.push(e)
      this.handleFilter()
    },
    onHoursChange: function(e, t) {
      this.form.hours = []
      t && this.form.hours.push(e)
      this.handleFilter()
    },
    onDatePickerBlur: function() {
      this.visible = !1
    },
    onClickReset: function() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.column-filter-wrap {
  display: inline-block;
  vertical-align: middle;
  z-index: 2;
}
.column-filter-wrap .filter-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 20px;
  cursor: pointer;
  overflow: initial;
  color: #c0c4cc;
  font-size: 12px;
}
.column-filter-wrap .icon-on {
  color: #409eff;
}
.checkbox-group {
  line-height: inherit;
  display: block;
}
.checkbox-group .checkbox-item {
  line-height: inherit;
  display: block;
  margin-right: 0;
}
.checkbox-group .checkbox-item .el-checkbox__input {
  display: none;
}
.checkbox-group .checkbox-item .el-checkbox__label {
  padding-left: 0;
}
.checkbox-group .checkbox-item .el-checkbox__label {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-range-editor,
.el-date-editor {
  opacity: 0;
  z-index: -1;
  position: absolute;
  left: 45px;
  top: -25px;
  overflow: hidden;
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
}
.mark-level .el-radio {
  margin-right: 0px;
  width: 74px;
  margin-bottom: 12px;
}
.mark-level .level-5 {
  color: #90c7cc;
  border-color: #d3eef0;
  background-color: #eaf7f8;
}
.mark-level .el-tag {
  width: 42px;
  text-align: center;
}
.mark-level .el-radio__label {
  padding-left: 8px;
}
.mark-info {
  display: flex;
}
.mark-info .el-form-item__content {
  flex: 1;
}

.filter-popover {
  min-width: 80px;
}
.filter-popover-time {
  opacity: 0;
}
</style>
