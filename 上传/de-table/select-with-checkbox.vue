<!--
 * @Author: your name
 * @Date: 2022-03-04 08:27:18
 * @LastEditTime: 2022-03-08 16:57:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /xws_cj/src/components/src/components/select-with-checkbox.vue
-->
<template>
  <el-select v-model="curSelect" placeholder="请选择" filterable="" multiple="">
    <el-checkbox v-model="checkVal" class="heck-all" @change="checkChange">
      <el-option v-for="e in optionList" :key="e.value" :label="e.text" :value="e.value">
        <span class="check"> </span>
        <span>{{ e.text }}</span>
      </el-option>
    </el-checkbox>
  </el-select>
</template>

<script>
export default {
  name: 'SelectWithCheckbox',
  props: {
    value: {
      type: [Array],
      default: function() {
        return []
      },
    },
    optionList: {
      type: [Array],
      default: function() {
        return []
      },
    },
  },
  data: function() {
    return {
      checkVal: !1,
    }
  },
  computed: {
    curSelect: {
      get: function() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.checkVal = this.value.length === this.optionList.length), this.value
      },
      set: function(e) {
        this.$emit('input', e)
      },
    },
  },
  methods: {
    checkChange: function(e) {
      this.curSelect = e
        ? this.optionList.map(function(e) {
            return e.value
          })
        : []
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
.check-all.el-checkbox__input.is-checked + .el-checkbox__label {
  font-weight: 700;
}
</style>
