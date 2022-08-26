var a3 = ()=>{
    return new Promise((r)=>{
        setTimeout(()=>{
            r(new Date())
        }
        , 3000)

    }
    )
}
var a6 = ()=>{
    return new Promise((r)=>{
        setTimeout(()=>{
            r(new Date())
        }
        , 6000)

    }
    )
}
var a9 = ()=>{
    return new Promise((r)=>{
        setTimeout(()=>{
            r(new Date())
        }
        , 9000)

    }
    )
}

// 与第二中的区别在于 new Promise运行的位置不同
// async function test() {
//     var a = a3()
//     var b = a6()
//     var c = a9()
//     await a
//     console.log('3')
//     await b
//     console.log('6')
//     await c
//     console.log('9')
// }

async function test() {
    var a = await a3()
    console.log(a)
    var b = await a6()
    console.log(b)
    var c = await a9()
    console.log(c)
}
test()

// Promise.all([a3(), a6(), a9()]).then((res)=>{
//     console.log(res)
// }
// )
