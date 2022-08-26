Function.prototype.constructor_bc = Function.prototype.constructor;
Function.prototype.constructor = function() {
    if (arguments[0] === "debugger") {
        // "什么都不做"
    }//利用arguments关键字的属性获取当前方法里面的参数
    else {
        return Function.prototype.constructor_bc.apply(this, arguments)
        //跟上面处理debugger和定时器一起用的处理方法一样
    }
}
