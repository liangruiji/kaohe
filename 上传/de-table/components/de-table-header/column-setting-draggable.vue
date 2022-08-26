<!--
 * @Author: your name
 * @Date: 2022-03-03 16:40:53
 * @LastEditTime: 2022-03-08 17:11:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/column-setting-draggable.vue
-->
<template>
  <draggable v-model="draggableData">
    <transition-group type="transition" name="flip-list">
      <div v-for="t in draggableData" :key="t.prop || t.label" style="margin-top:10px">
        <div class="draggable-item">
          <div class="item-before">
            <span :title="t.label">
              {{ t.label }}
            </span>
            <span class="caret-wrapper">
              <i class="sort-caret ascending" title="向上移动" @click.stop="onClickMoveIcon('top', t)"></i>
              <i class="sort-caret descending" title="向下移动" @click.stop="onClickMoveIcon('bottom', t)"></i>
            </span>
            <el-tooltip v-if="t.hasOwnProperty('numStripe')" effect="dark" :content="'数据条' + t.numStripe ? '打开' : '关闭'" placement="top">
              <span :class="{ 'item-setting': true, open: t.numStripe }" @click="t.numStripe = !t.numStripe">
                <i class="el-icon-s-data"> </i>
              </span>
            </el-tooltip>
          </div>
          <div class="item-after">
            <el-switch
              v-model="t.switch"
              class="switch"
              @change="
                e => {
                  return onSwitchChange(t, e)
                }
              "
            ></el-switch>
          </div>
        </div>
        <div style="padding:-left:15px">
          <column-setting-draggable v-if="t.children" v-model="t.children" :group="t.prop" @switch-change="onSwitchChange"></column-setting-draggable>
        </div>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'ColumnSettingDraggable',
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      },
    },
    draggableGroup: {
      type: String,
      default: 'directory',
    },
  },
  computed: {
    draggableData: {
      get: function() {
        return this.value
      },
      set: function(e) {
        this.$emit('input', e)
      },
    },
  },
  methods: {
    onClickMoveIcon: function(e, t) {
      for (var n = 0; n < this.draggableData.length; n++) {
        var r = this.draggableData[n]
        if ((r.prop && r.prop === t.prop) || (!r.prop && r.label && r.label === t.label)) {
          'top' === e
            ? 0 < n && (this.draggableData.splice(n, 1), this.draggableData.splice(n - 1, 0, r))
            : n < this.draggableData.length - 1 && (this.draggableData.splice(n, 1), this.draggableData.splice(n + 1, 0, r))
          break
        }
      }
    },
    onSwitchChange: function(e, t) {
      this.$emit('switch-change', e, t)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.draggable-item {
  border-radius: 4px;
  background-color: #fff;
  padding: 0 10px;
  border: 1px solid #eee;
  line-height: 1;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.draggable-item .item-before {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.draggable-item .item-before span {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.draggable-item .item-before .caret-wrapper {
  flex-shrink: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.draggable-item .item-before .caret-wrapper .sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
  transition: border 0.2s ease;
}
.draggable-item .item-before .caret-wrapper .sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 6px;
}
.draggable-item .item-before .caret-wrapper .sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 6px;
}
.draggable-item .item-before .caret-wrapper .ascending:hover {
  border-bottom-color: #409eff;
}
.draggable-item .item-before .caret-wrapper .descending:hover {
  border-top-color: #409eff;
}
.draggable-item .item-before .item-setting {
  flex-shrink: 0;
  display: inline-flex;
  height: 34px;
  width: 24px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, color 0.2s ease;
  color: #c0c4cc;
}
.draggable-item .item-before .item-setting.open {
  color: #409eff;
}
.draggable-item .item-after {
  display: flex;
  align-items: center;
}
.draggable-item .item-after .switch {
  margin-left: 10px;
}
.draggable-item:hover .caret-wrapper {
  opacity: 1;
}
.draggable-item:hover .item-setting {
  opacity: 1;
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
