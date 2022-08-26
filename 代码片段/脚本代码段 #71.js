function get_domain(url) {
  let domain = url
    .replace('http://', '')
    .replace('https://')
    .split('/')[0]
  return domain
}
get_domain('http://rate.taobao.com/')