<!--
 * @Author: your name
 * @Date: 2022-03-03 16:46:06
 * @LastEditTime: 2022-03-09 16:59:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-edit.vue
-->
<template>
  <span class="column-edit-wrap">
    <i v-popover:popover class="yqsiconfont yqs-edit"> </i>
    <el-popover ref="popover" v-model="visible" placement="bottom" width="200" trigger="click" @show="assignAndFocus">
      <lazy-load v-if="lazyLoadStatus" :show="visible" :follow-show="false">
        <el-form ref="form" :model="form" :rules="formRules" size="mini" @keyup.enter="handleFilter">
          <el-form-item class="sku-price" label="" prop="sku_price">
            <el-input v-model="form.sku_price" placeholder="批量设置sku成本" type="number" clearable></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:-6px;margin-top:-6px">
            <el-button type="primary" @click="handleUpdate">确定</el-button>
            <el-button type="text" @click="handleReset">取消</el-button>
          </el-form-item>
        </el-form>
      </lazy-load>
    </el-popover>
  </span>
</template>

<script>
import LazyLoad from '@/components/de-table/lazy-load'
import { transformToFloat } from '@/components/de-table/public.js' // 一些处理数据格式公共函数

export default {
  name: 'ColumnEdit',
  components: { LazyLoad },
  data: function() {
    return {
      lazyLoadStatus: !0,
      visible: !1,
      form: {
        sku_price: null,
      },
      formRules: {
        sku_price: [
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
  methods: {
    assignAndFocus: function() {
      var t = this
      this.$nextTick(function() {
        var e = t.$refs.input
        e && (e.focus(), e.select && e.select())
      })
    },
    handleUpdate: function() {
      this.$emit('change', this.form.sku_price), this.handleReset()
    },
    handleReset: function() {
      this.$refs.form.resetFields(), (this.visible = !1)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.column-edit-wrap {
  display: inline-block;
  vertical-align: middle;
  z-index: 2;
}
.column-edit-wrap .yqs-edit {
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
</style>
