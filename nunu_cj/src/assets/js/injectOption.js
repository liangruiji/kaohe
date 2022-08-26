[{
  name: 'jq',
  url: 'https: //cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
  matches: ['*: //*.taobao.com/*'],
  switch: true,
  run_at: 'document_start',
  act: 'inject_cdn_script',
  injectCb: '(' +
    function bb() {
      console.log(666)
    }.toString() +
    ')()',
}, ]