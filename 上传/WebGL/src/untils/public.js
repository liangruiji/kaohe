/*
 * @Author: your name
 * @Date: 2022-03-03 16:12:06
 * @LastEditTime: 2022-03-03 16:29:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/untils/public.js
 */
export function s(e) {
   function i(e) {
            if (Array.isArray(e))
                return r(e)
   }
   function r(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
   }
   function a(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
   }
    function b(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return r(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Object(r.default)(e, t) : void 0
            }
    }
    function c() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
    return i(e) ||a(e) || b(e) || c()
}

export  function deTypeOf(e) {
    return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } :
      function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }
    )(e)
  }
  