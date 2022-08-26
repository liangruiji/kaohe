function aa(key) {
    return new Promise(((t)=>{
        var timer = setInterval(()=>{
            var val = localStorage[key]
            val && t(val)
        }
        , 77)
        setTimeout(()=>{
            clearInterval(timer)
            t(null)
        }
        , 20000)
    }
    )).catch(()=>{
        resole(null)
    }
    )
}
