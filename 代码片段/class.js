class aa {
    // 相当于 aa.prototype.bbb = function(){}
    bbb() {}

    // 私有属性 ，只能在类内部使用
    #waterLimit = 200;

    // 实例属性，相当于在constructor中写了this._waterAmount = 0
    _waterAmount = 0;

    // 静态属性 相当于 aa.nn = "66"// 静态属性 相当于 aa.nn = "66"
    static nn = "66"
    get zz() {
        return this.#waterLimit
    }

    set zz(val) {
        this.#waterLimit = val
    }

    get bb() {
        return "111"
    }

    constructor() {
        // 实例属性
        this.mmm = 666

        //原型属性
        if (!this.__proto__.color) {
            this.__proto__.color = "red";
        }
    }
}

let zz = new aa()
console.log(zz)
zz.__proto__.color = 22
let xx = new aa()
console.log(xx)
