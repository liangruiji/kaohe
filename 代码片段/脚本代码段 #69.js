let aa = window.setInterval
window.setInterval = function() {
    let a = arguments[0]
    console.log(a)
    if (a.toString().includes('check')) {
        return
    }
//     return aa.apply(this, arguments)
}

setInterval(function() {
  check()
}, 4000);
var check = function() {
  function doCheck(a) {
    if (("" + a/a)["length"] !== 1 || a % 20 === 0) {
      (function() {}
      ["constructor"]("debugger")())
    } else {
      (function() {}
      ["constructor"]("debugger")())
    }
    doCheck(++a)
  } 
  try {
    doCheck(0)
  } catch (err) {}
};
check();

// setInterval(() =>{
//    console.log("debugger")
// }, 2000)
