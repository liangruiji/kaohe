import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import AppComponent from './App/App.vue'
// import './App/Icon'

// import './App/styles/index.scss'

Vue.component('app-component', AppComponent)

// import { Button, ButtonGroup, Input, TabPane, Tabs, Tooltip } from 'element-ui'
// Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Input)
// Vue.use(TabPane)
// Vue.use(Tabs)
// Vue.use(Tooltip)

new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  },
})
