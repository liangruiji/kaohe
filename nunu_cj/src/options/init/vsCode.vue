<!--
 * @Author: your name
 * @Date: 2021-09-18 22:25:24
 * @LastEditTime: 2021-10-29 10:49:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init/vsCode.vue
-->
<template>
  <div>
    <div class="item" @click="drawer = !drawer">
      vsC代码片段
    </div>
    <el-drawer append-to-body size="85%" :with-header="false" :visible.sync="drawer" :direction="direction">
      <div id="con">
        <div class="head">
          <h1>VSCode 代码片段生成器</h1>
        </div>
        <div class="flex con-wrap">
          <div class="item left">
            <div class="demo-input-suffix">
              名字：
              <el-input v-model="name" class="input" placeholder="" suffix-icon="el-icon-date" @keyup.native="ToDo"></el-input>
            </div>
            <div class="demo-input-suffix">
              简写：
              <el-input v-model="prefix" class="input" placeholder="" suffix-icon="el-icon-date" @keyup.native="ToDo"></el-input>
            </div>
            <el-input v-model="daima" type="textarea" :rows="20" placeholder="" suffix-icon="el-icon-date" @keyup.native="ToDo"></el-input>
          </div>
          <div class="item right">
            <el-input
              id="snippet_result"
              ref="result"
              v-model="result"
              type="textarea"
              :rows="20"
              class="textarea"
              placeholder=""
              suffix-icon="el-icon-date"
            ></el-input>
            <el-button style="margin-top:5px" type="primary" plain @click="click">
              主要按钮
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      value: false,
      drawer: false,
      direction: 'ltr',
      name: '',
      prefix: '',
      daima: '',
      result: '',
      dollar: '',
    }
  },

  methods: {
    setSelectRange(textarea, start, end) {
      if (typeof textarea.createTextRange != 'undefined') {
        // IE
        var range = textarea.createTextRange()
        // 先把相对起点移动到0处
        range.moveStart('character', 0)
        range.moveEnd('character', 0)
        range.collapse(true) // 移动插入光标到start处
        range.moveEnd('character', end)
        range.moveStart('character', start)
        range.select()
      } // if
      else if (typeof textarea.setSelectionRange != 'undefined') {
        textarea.setSelectionRange(start, end)
        textarea.focus()
      } // else
    },

    insertText(obj, str) {
      if (document.selection) {
        var sel = document.selection.createRange()
        sel.text = str
      } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
          endPos = obj.selectionEnd,
          cursorPos = startPos,
          tmpStr = obj.value
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
        cursorPos += str.length
        obj.selectionStart = obj.selectionEnd = cursorPos
      } else {
        obj.value += str
      }
    },

    // 实时生成snippet
    ToDo() {
      var name = this.name
      var prefix = this.prefix
      var dollar = this.dollar
      var daima = this.daima
      var snippet = ''
      if (daima != '') {
        var line_arr = daima.split('\n')
        if (line_arr.length) {
          // eslint-disable-next-line no-undef
          $.each(line_arr, (i, v) => {
            if (v.indexOf('"') >= 0) {
              v = this.replaceAllSR(v, '"', '\\"')
            }
            if (dollar && v.indexOf('$') >= 0) {
              v = v.replace(/[$]/g, '\\\\$')
            }

            /* if(v.indexOf("  ")==0){
                    v=replaceAllSR(v,'  ','\\t');
                }
                if(v.indexOf("	")==0){
                    v=replaceAllSR(v,"	",'\\t');
                } */
            v = this.replaceTab(v)
            snippet += '\t\t"' + v + '"'
            snippet += i == line_arr.length - 1 ? '\n' : ',\n'
          })
          if (daima.indexOf('$') >= 0) {
            this.show = true
          } else {
            this.show = false
          }
        }
        // snippet=replaceAllSR(daima,'\n','\\n');
      }
      var result =
        ',\n"' +
        name +
        '": {\n' +
        '\t"prefix": "' +
        prefix +
        '",\n' +
        '\t"body": [\n' +
        snippet +
        // '\t\t""\n'+
        '\t],\n' +
        '\t"description": "' +
        name +
        '"\n' +
        '}'
      this.result = result
    },

    replaceTab(v) {
      var result = v
      var tab = ''
      for (var i = 0; i < v.length; i++) {
        var t = v.charAt(i)
        if (t != '  ' && t != '	' && t != '    ') {
          break
        } else {
          tab += '\\t'
          result = result.substr(1)
        }
      }
      return tab + result
    },
    // 把s里面的p全部替换为q，存在则替换，不存在则直接返回s
    replaceAllSR(s, p, q) {
      if (s.indexOf(p) >= 0) {
        var re_w = new RegExp(p, 'g')
        s = s.replace(re_w, q)
      }
      return s
    },

    click() {
      this.$refs.result.select()
      document.execCommand('Copy')
    },
  },
}
</script>

<style lang="scss" scoped>
// body,
// html {
//   font-family: microsoft Yahei;
// }

// body {
//   background: #edf9ff;
//   padding: 0;
//   margin: 0;
// }

h1 {
  font-weight: bold;
  color: #0b75c8;
}

#con {
  // width: 1024px;
  // margin: 0px auto;
  background: #fff;
  // padding: 10px 20px;
  font-family: microsoft Yahei;
  /deep/ .el-textarea__inner {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
  }
}

.head {
  border-bottom: 5px solid #ddd;
  margin-bottom: 20px;
}
.input {
  display: inline-block;
  width: 200px;
}

.flex {
  display: flex;
  .item {
    flex: 1;
  }
  .left {
    padding-right: 5px;
  }
  .right {
    height: inherit;
  }
}
.textarea {
  height: 100%;
  /deep/ .el-textarea__inner {
    height: 100%;
    background: #282c34;
    color: #61afef;
  }
}
</style>
