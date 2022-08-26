<!--
 * @Author: your name
 * @Date: 2021-08-03 13:12:42
 * @LastEditTime: 2021-11-30 17:37:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/努努工具/vue/test.vue
-->
<template>
  <div id="nunu_cj">
    <div class="nunu" :style="{ left: x, top: y }" @click="nunuclick" @mousedown.left.self="mousedown($event)" @dragstart="dragstart">
      <div class="nunu-title">
        努努工具
      </div>
      <nu-get-table-lable></nu-get-table-lable>
      <vs-code></vs-code>
      <snippet></snippet>
      <get-code></get-code>
      <settings></settings>
      <edit></edit>
    </div>
  </div>
</template>

<script>
import settings from '@/options/init/settings'
import NuGetTableLable from '@/options/init/NuGetTableLable'
import vsCode from '@/options/init/vsCode'
import snippet from '@/options/init/snippet'
import getCode from '@/options/init/getCode'
import edit from '@/options/init/edit'
export default {
  name: 'Test',
  components: { settings, NuGetTableLable, vsCode, snippet, getCode, edit },
  data() {
    return {
      x: 'calc(100vw - 120px',
      y: 'calc(100vh - 50vh',
      drawerOne: false,
      direction: 'ltr',
    }
  },

  methods: {
    nunuclick() {},

    mousedown(e) {
      // console.log(e)

      let shiftX = e.clientX - e.target.getBoundingClientRect().left
      let shiftY = e.clientY - e.target.getBoundingClientRect().top
      let moveAt = (pageX, pageY) => {
        this.x = pageX - shiftX + 'px'
        this.y = pageY - shiftY + 'px'
      }
      let onMouseMove = event => {
        // console.log(event)
        moveAt(event.clientX, event.clientY)
      }
      document.addEventListener('mousemove', onMouseMove)
      e.target.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove)
        e.target.onmouseup = null
      }
    },
    dragstart() {
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
#nunu_cj {
  font-size: 12px;

  .nunu {
    background-color: #ffea00;
    width: 100px;
    height: 250px;
    padding: 10px;
    position: fixed;
    // border: 1px solid transparent;
    border-radius: 5px;
    // bottom: 30px;
    // right: 28px;
    z-index: 1000000;
  }
  /deep/ .nunu-title {
    text-align: center;
    color: #ff6f00;
    font-weight: 800;
  }
  /deep/ .item {
    text-align: center;
    margin: 3px auto;
    padding: 4px 0;
    background-color: #ffa000;
    cursor: pointer;
    border-radius: 3px;
    // border-radius: 3px;
    // cursor: pointer;
  }
}
</style>
