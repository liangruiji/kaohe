<!--
 * @Author: your name
 * @Date: 2022-03-03 16:42:22
 * @LastEditTime: 2022-03-10 00:59:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/save-filter-tpl.vue
-->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="680px"
    custom-class="save-senior-filter-dialog"
    append-to-body
    @open="initFormData"
    @close="onDialogClose"
  >
    <el-form ref="form" :model="form" label-width="80px" size="small" hide-required-asterisk :rules="rules">
      <el-form-item v-if="showNameInput" label="模板名称" prop="name" :error="definedError.name">
        <el-input ref="nameInput" v-model="form.name" style="width:340px"></el-input>
      </el-form-item>
      <el-form-item label="筛选方式" prop="mode">
        <el-radio-group v-model="form.mode">
          <el-radio label="and">所有条件满足</el-radio>
          <el-radio label="or">任一条件满足</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="筛选条件" prop="conditions">
        <el-row v-for="(t, n) in form.conditions" :key="n" class="condition-item">
          <div v-if="fields.hasOwnProperty(t.prop)">
            <el-col :span="6">
              <el-select v-model="t.prop" @change="onFieldSelectChange(n)">
                <el-option v-for="e in Object.values(fields)" :key="e.prop + '-' + e.label" :label="e.label" :value="e.prop"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" style="margin-left:10px">
              <el-select v-if="fields[t.prop].filterType == 'string'" v-model="t.matchMode">
                <el-option label="包含" value="fuzzy"></el-option>
                <el-option label="等于" value="precision"></el-option>
                <el-option label="不包含" value="nequal"></el-option>
              </el-select>
              <el-select v-else-if="fields[t.prop].filterType == 'number'" v-model="t.matchMode">
                <el-option label="大于" value="gt"></el-option>
                <el-option label="等于" value="eq"></el-option>
                <el-option label="小于" value="lt"></el-option>
              </el-select>
              <el-select v-else-if="['checkbox', 'hours', 'day', 'week', 'month', 'mark'].includes(r.fields[t.prop].filterType)" v-model="t.matchMode" disabled>
                <el-option label="等于" value="eq"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12" style="margin-left:10px">
              <el-input v-if="'string' === fields[t.prop].filterType || 'number' === fields[t.prop].filterType" v-model="t.value"></el-input>

              <select-with-checkbox
                v-if="'checkbox' === fields[t.prop].filterType || 'hours' === fields[t.prop].filterType"
                v-model="t.value"
                :option-list="fields[t.prop].filters"
              ></select-with-checkbox>
              <el-select v-if="'mark' === fields[t.prop].filterType" v-model="t.value" size="small" placeholder="请选择">
                <el-option v-for="e in fields[t.prop].filters" :key="e.value" :label="e.text" :value="e.value"></el-option>
              </el-select>
              <el-date-picker
                v-if="'day' === fields[t.prop].filterType"
                v-model="t.value"
                class="defined-date-editor"
                style="width:100%"
                type="daterange"
                align="center"
                :unlink-panels="true"
              ></el-date-picker>
              <el-date-picker
                v-if="'week' === fields[t.prop].filterType"
                v-model="t.value"
                class="defined-date-editor"
                style="width:100%"
                type="week"
                align="center"
                format="yyyy 第WW周"
              ></el-date-picker>
              <el-date-picker
                v-if="'month' === fields[t.prop].filterType"
                v-model="t.value"
                class="defined-date-editor"
                style="width:100%"
                type="monthrange"
                align="center"
                :unlink-panels="true"
              ></el-date-picker>
            </el-col>
            <el-col v-if="form.conditions.length > 1" style="margin-left:10px" :span="2">
              <el-button type="text" @click="handleDelete(n)">删除</el-button>
            </el-col>
          </div>
        </el-row>
        <el-button type="text" @click="onClickAddCondition">
          <i class="el-icon-plus">添加条件</i>
        </el-button>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button v-if="isOnlyFilter" size="small" @click="handleConfirm('find')">仅筛选</el-button>
      <el-button v-else type="text" size="small" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm('save,find')">保存模板并筛选</el-button>
    </div>
  </el-dialog>
</template>

<script>
import SelectWithCheckbox from '@/components/de-table/select-with-checkbox'
import { fS19 } from '@/components/de-table/copy.js' // 设置模板的相关函数

function i(e) {
  for (var t = [], n = 0; n < e.length; n++) {
    var r = e[n]
    r.hasOwnProperty('children') && Array.isArray(r.children)
      ? (t = t.concat(i(r.children)))
      : (r.type && ['selection', 'index', 'expand', 'image'].includes(r.type)) || t.push(r)
  }
  return t
}

export default {
  name: 'SaveFilterTpl',
  components: {
    SelectWithCheckbox,
  },
  props: {
    visible: Boolean,
    tableKey: { type: String, default: '' },
    columns: { type: Array, default: () => [] },
    editTplName: { type: String, default: '' },
    isOnlyFilter: {
      type: Boolean,
      default: !1,
    },
  },
  data: function() {
    return {
      isEdit: !1,
      form: {
        name: '',
        mode: 'and',
        conditions: [],
      },
      definedError: {},
      showNameInput: !0,
    }
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible
      },
      set: function(e) {
        this.$emit('update:visible', e)
      },
    },
    dialogTitle: function() {
      return this.isOnlyFilter ? '高级筛选' : ''.concat(this.isEdit ? '编辑' : '添加', '高级筛选模板')
    },
    fields: function() {
      var e = i(this.columns),
        t = {}

      e.forEach(function(e) {
        if (e.filterType) {
          t[e.prop] = {
            prop: e.prop,
            label: e.label,
            filterType: e.filterType,
          }
          if (e.hasOwnProperty('filters')) {
            t[e.prop].filters = e.filters
          }
        }
      })

      return t
    },
    rules: function() {
      var e = {}
      if (this.showNameInput) {
        e.name = [
          {
            required: !0,
            message: '请输入模板名称',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ]
      }
      e.mode = [
        {
          required: !0,
          message: '请选择筛选方式',
          trigger: 'change',
        },
      ]
      e.conditions = [
        {
          validator: function(e, t, n) {
            var r = t
              .filter(function(e) {
                return 'checkbox' === e.filterType && 'eq' === e.matchMode
              })
              .map(function(e) {
                return e.prop
              })

            t = Array.from(new Set(r))
            r.length !== t.length ? n(new Error('支持复选的条件列请在下拉菜单中进行复选，勿重复添加！')) : n()
          },
          trigger: ['blur', 'change'],
        },
      ]
      return e
    },
  },
  methods: {
    initFormData: async function() {
      var a = this
      let t, n, r
      t = !1
      n = null
      if (this.editTplName) {
        n = await fS19.getTplByName(this.tableKey, this.editTplName)
        t = !!n
      }
      this.isEdit = t
      r = i(a.columns)
      if (this.isEdit) {
        this.form = n
      } else {
        this.form = {
          name: '',
          mode: 'and',
          conditions: [this.getCondition(r[0].prop)],
        }
      }

      this.showNameInput = !this.isOnlyFilter

      this.showNameInput &&
        this.$nextTick(function() {
          this.$refs.nameInput.focus()
        })
    },
    getCondition: function(e) {
      var t = this.fields[e],
        n = t.filterType,
        r = null,
        a = null

      return (
        'string' === t.filterType
          ? ((r = 'fuzzy'), (a = ''))
          : 'number' === t.filterType
          ? ((r = 'gt'), (a = ''))
          : 'checkbox' === t.filterType || 'hours' === t.filterType || 'day' === t.filterType || 'week' === t.filterType || 'month' === t.filterType
          ? ((r = 'eq'),
            'checkbox' === t.filterType || 'hours' === t.filterType
              ? (a = [0 < t.filters.length ? t.filters[0].value : null])
              : 'week' === t.filterType
              ? (a = null)
              : ('day' !== t.filterType && 'month' !== t.filterType) || (a = []))
          : 'mark' === t.filterType && ((r = 'eq'), (a = [])),
        {
          prop: e,
          matchMode: r,
          value: a,
          filterType: n,
        }
      )
    },
    onClickAddCondition: function() {
      var e = Object.keys(this.fields)[0]
      this.form.conditions.push(this.getCondition(e))
    },
    onFieldSelectChange: function(e) {
      this.$set(this.form.conditions, e, this.getCondition(this.form.conditions[e].prop))
    },
    handleConfirm: function(t) {
      var n = this
      this.definedError = {}

      this.$refs.form.validate(function(e) {
        if (e)
          if (0 <= t.indexOf('save')) {
            if (!n.showNameInput)
              return (
                (n.showNameInput = !0),
                n.$nextTick(function() {
                  n.handleConfirm(t),
                    n.$nextTick(function() {
                      n.$refs.nameInput.focus()
                    })
                }),
                !1
              )
            fS19.saveTpl(n.tableKey, n.form, n.isEdit ? n.editTplName : null).then(function(e) {
              return !0 !== e
                ? (1e4 === e.code && n.$set(n, 'definedError', e.data), !1)
                : (n.$message.success('模板保存成功'), void (0 <= t.indexOf('find') && n.emitFindEvent()))
            })
          } else 0 <= t.indexOf('find') && n.emitFindEvent()
      })
    },
    emitFindEvent: function() {
      this.dialogVisible = !1
      this.$emit('find', this.form)
    },
    onDialogClose: function() {
      this.$refs.form.clearValidate()
    },
    handleDelete: function(e) {
      this.form.conditions.splice(e, 1)
      this.$refs.form.clearValidate('conditions')
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  visibility: hidden;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item .check {
  display: inline-block;
  position: relative;
  border: 1px solid #409eff;
  border-radius: 2px;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 5px;
  transition: border-color 0.25s cubic-bezier(0.71, -0.49, 0.26, 1.46), background-color 0.25s cubic-bezier(0.71, -0.49, 0.26, 1.46);
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check {
  background-color: #409eff;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check::after {
  width: 3px;
  height: 7px;
  box-sizing: content-box;
  content: '';
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  position: absolute;
  top: 1px;
  left: 4px;
  transform: rotate(45deg) scaleY(1);
}
.check-all {
  display: inline-block;
  width: 100%;
  padding-left: 20px;
  line-height: 34px;
}
.check-all .el-checkbox__input.is-checked + .el-checkbox__label {
  font-weight: 700;
}
</style>
