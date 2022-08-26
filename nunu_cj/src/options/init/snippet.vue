<!--
 * @Author: your name
 * @Date: 2021-10-06 17:35:45
 * @LastEditTime: 2021-10-27 11:03:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init/snippet.vue
-->
<template>
  <div>
    <div class="item" @click="drawer = !drawer">
      常用代码片段
    </div>
    <el-drawer append-to-body size="85%" :with-header="false" title="常用代码" :visible.sync="drawer" :direction="direction">
      <div class="main">
        <div class="left">
          <div v-for="(item, index) in data" :key="index" class="list-item" @click="click(item)">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="dec">
              {{ item.dec }}
            </div>
          </div>
        </div>
        <el-input id="hhh" v-model="textarea" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容"></el-input>
      </div>

      <el-button type="primary" size="mini" @click="copy">
        复制
      </el-button>
    </el-drawer>
  </div>
</template>

<script>
function formatDateTime() {
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return y + m + d + h + minute + second
}
// eslint-disable-next-line no-unused-vars
function getUuid() {
  return (
    formatDateTime() +
    Math.random()
      .toString(36)
      .substr(2)
  )
}

export default {
  name: '',
  data() {
    return {
      drawer: false,
      textarea: '',
      direction: 'ltr',
      data: [
        { name: 'test', dec: '测试', data: 'fsfsfafa', id: 6666 },
        { name: 'test', dec: '测试', data: 'fsfsfafa', id: 6666 },
      ],
    }
  },
  methods: {
    copy() {},
    click(item) {
      this.textarea = item.data
    },
  },
}
</script>

<style lang="scss" scoped>
.left {
  width: 257px;
  margin-right: 17px;
  // border: 1px solid red;
  background-color: #f6f7f9;
  padding: 8px 5px;
}
.main {
  display: flex;
  margin-left: 5px;
  margin-top: 15px;
}
.list-item {
  line-height: 1.3;
  font-size: 12px;
  border-bottom: 1px solid #5a6a7a;

  &:hover {
    background-color: #e6e7e9;
  }
  .name {
    line-height: 1.6;
    color: #2a3a4a;
  }
  .dec {
    color: #ccc;
  }
}
</style>
