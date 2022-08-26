/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// 渲染js代码（类似eval）
export function renderCode(data) {
  try {
    setTimeout(decodeURIComponent(escape(data)), 0)
  } catch (e) {
    setTimeout(data, 0)
  }
}

export function addJsByScript(scriptData) {
  const base_cdn_url = process.env.VUE_APP_CDN_BASE_URL
  const web_base_url = process.env.VUE_APP_WEB_BASE_URL
  const remote_env_dir = process.env.VUE_APP_REMOTE_ENV_DIR
  // 插入script标签并监听加载
  let jsLoaded = 1
  const loadScript = url => {
    const body = document.getElementsByTagName('body')[0] || document.documentElement
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.id = `${process.env.VUE_APP_REMOTE_ENV}_${scriptData.name}`
    let ver = scriptData.js_v
    if (process.env.NODE_ENV !== 'production') {
      url = chrome.runtime.getURL(`js/${scriptData.name}.js`)
      ver = new Date().getTime()
    }
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
      }
    }
    script.onerror = function() {
      // cdn加载失败的情况下加载网站url
      this.parentNode.removeChild(this)
      let sUrl = `${web_base_url}/${remote_env_dir}/js/${scriptData.name}/`
      if (jsLoaded === 1) {
        jsLoaded++
        loadScript(sUrl)
      }
    }
    script.src = `${url}?v=${ver}`
    body.appendChild(script)
  }
  let cdnUrl = `${base_cdn_url}/${remote_env_dir}/remote/${scriptData.name}.js`
  loadScript(cdnUrl)
}

export function createAssetsScript(scripts, callback) {
  /**
   * 加载第三方静态文件，加载完成后回调
   * scripts => 要加载的静态文件url，数组
   * callback => 回调函数
   */
  if (typeof scripts !== 'object') {
    scripts = [scripts]
  }
  let BODY = document.getElementsByTagName('body')[0] || document.documentElement
  let s = []
  let loaded = 0
  for (let i = 0; i < scripts.length; i++) {
    s[i] = document.createElement('script')
    s[i].setAttribute('type', 'text/javascript')
    s[i].setAttribute('id', scripts[i])
    // 异步
    s[i].onload = s[i].onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        loaded++
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
        if (loaded === scripts.length && typeof callback === 'function') {
          callback()
        }
      }
    }
    // 同步
    s[i].setAttribute('src', scripts[i])
    BODY.appendChild(s[i])
  }
}

export function addCssByLink(fileName, v) {
  const base_cdn_url = process.env.VUE_APP_CDN_BASE_URL
  const web_base_url = process.env.VUE_APP_WEB_BASE_URL
  const remote_env_dir = process.env.VUE_APP_REMOTE_ENV_DIR
  let cdnUrl = `${base_cdn_url}/${remote_env_dir}/remote/${fileName}.css`
  if (process.env.NODE_ENV !== 'production') {
    cdnUrl = chrome.runtime.getURL(`css/${fileName}.css`)
    v = new Date().getTime()
  }
  const url = `${cdnUrl}?v=${v}`
  const sUrl = `${web_base_url}/${remote_env_dir}/css/${fileName}/?v=${v}`
  var doc = document
  var link = doc.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', url)
  var heads = document.getElementsByTagName('head')[0] || document.documentElement
  heads.appendChild(link)
  let cssLoaded = 1
  link.onerror = function() {
    // cdn加载失败的情况下加载网站url
    link.setAttribute('href', sUrl)
    if (cssLoaded === 1) {
      heads.appendChild(link)
      cssLoaded++
    }
  }
}

export function mutationDomChange(target, mutationCallback, config = null) {
  /**
   * target => 监听的目标节点，原生js节点对象，jq对象无效
   * mutationCallback => 节点dom改变后的回调函数
   */

  const observer = new MutationObserver(mutationCallback)
  if (!config) {
    config = {
      // attributes: true, // 观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化)
      childList: true, // 观察目标节点的子节点(新增了某个子节点,或者移除了某个子节点)
      // subtree: true, // 观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述二种节点变化)
      // attributeFilter: ['style'] // 一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略
    }
  }

  observer.observe(target, config)
}
