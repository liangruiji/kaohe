data = [{
    name: "zhangsan",
    age: 20,
    info: {
        address: "北京"// 需要深度监听
    },
    nums: [10, 20, 30]
}, {
    name: "zhangsan",
    age: 20,
    info: {
        address: "北京"// 需要深度监听
    },
    nums: [10, 20, 30]
}, {
    name: "zhangsan",
    age: 20,
    info: {
        address: "北京"// 需要深度监听
    },
    nums: [10, 20, 30]
}, {
    name: "zhangsan",
    age: 20,
    info: {
        address: "北京"// 需要深度监听
    },
    nums: [10, 20, 30]
}, {
    name: "zhangsan",
    age: 20,
    info: {
        address: "北京"// 需要深度监听
    },
    nums: [10, 20, 30]
}];

function reactice(obj) {
    
    return new Proxy(obj,{
        get(target, key, receiver) {
            let ret = Reflect.get(target, key, receiver)
            if (key == 'age') {
                ret = ret * 100
            }
            if (key == 'nums') {
                ret = ret.map(i=>i.toFixed(2))
            }
            if (key == 'line') {
                let list = []
                for (let i = 0; i < target.length; i++) {
                    let ret = Reflect.get(target[i], 'age', receiver)
                    list.push(ret)
                }
                return list

            }
            console.log('get', key)
            return ret instanceof Object ? reactice(ret) : ret
        },
        set(target, key, val, receiver) {
            let ret = Reflect.set(target, key, val, receiver)
            return ret
        },
        deleteProperty(target, key) {
            let ret = Reflect.deleteProperty(target, key)
            return ret
        },
    })
}

proxyData = reactice(data)
