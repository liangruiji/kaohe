export function checkUrl() {
  const cjtpl_load_href = window.location.href
  const urls = {
    tb_item: [
      // 淘宝详情页（部分）
      '://detail.tmall.com/item.htm',
      '://detail.tmall.com//item.htm',
      '://item.taobao.com/item.htm',
      '://chaoshi.detail.tmall.com/item.htm',
      '://world.tmall.com/item/',
    ],
    tb_list: [
      // 淘宝列表页（部分）
      '://s.taobao.com/',
      '://list.tmall.com/search_product.htm',
    ],
    dsy: [
      // 电商易网站（部分）
      'kandianbao.com/',
      'kandianbao.cn/',
      'xuedianshang.com/',
      'kandianshang.com/',
      'kandianshang.net/',
      'dianzhentan.com/',
      'xiaowangshen.com/',
    ],
  }
  for (const t in urls) {
    for (const url of urls[t]) {
      if (cjtpl_load_href.includes(url)) {
        return t
      }
    }
  }
  return ''
}
