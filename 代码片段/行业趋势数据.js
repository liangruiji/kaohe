function fontLoaded(res) {
  if (!Typr) return ''
  const obj = Typr['parse'](res)[0]
  let arr = new Array(obj['maxp']['numGlyphs'])
  for (let i = 0; i < 130000; i++) {
      let key = Typr['U']['codeToGlyph'](obj, i);
      if (0 != key) {
        null == arr[key] ? arr[key] = [i] : arr[key]['push'](i)
      }
  }
  let min = Math['min'](100, obj['maxp']['numGlyphs'])
  let char = '';
  for (let i = 0; i < min; i++) {
      const new_arr = arr[i];
      if (null != new_arr) {
        char += String.fromCharCode(new_arr[0])
      }
  }
  return char.match(/\d/g)
}
