 var h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
 function aa(k) {
          var l = String(k)['replace'](/=+$/, '')
          console.log('l',l) 
          var m = ''
          for (
            var n = 0x0, o, p, q = 0x0;
            (p = l['charAt'](q++));
            ~p && ((o = n % 0x4 ? o * 0x40 + p : p), n++ % 0x4) ? (m += String['fromCharCode'](0xff & (o >> ((-0x2 * n) & 0x6)))) : 0x0
          ) {
                console.log('>>>>>>')
            console.log('p1:',p)
            p = h['indexOf'](p)
            console.log('p2:',p)
             console.log('~p2:',~p)    
            
            console.log('m:',m)
            console.log('o:',o)
            console.log('n:',n)
            console.log(String['fromCharCode'](0xff & (o >> ((-0x2 * n) & 0x6))))
          }
          return m
        }
var h = aa('dW5kZWZpbmVk')
console.log('h',h)
var j = []
for (var k = 0x0, l = h['length']; k < l; k++) {
        j += '%' + ('00' + h['charCodeAt'](k)['toString'](0x10))['slice'](-0x2)
      }
console.log('j:',j)
console.log(decodeURIComponent(j))