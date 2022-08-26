console.time()
async function aa(action,params) {
    let controller = new AbortController();
    let signal = controller.signal;

    return new Promise((a,b)=>{
        let callback =  function(event) {
            if (event.data.action == 'ReactBack') {
               
                a(event.data.data)
                controller.abort()
            }

        }
        setTimeout(()=>{
           b('11111111')
          
            window.removeEventListener('message',callback)
        },1000)
        window.addEventListener('message',callback, {
            signal:signal
        })
        window.postMessage({
            action: action,
            params: params
        }, '*')

    }
    )
}

let bb = await aa('getReact.getCacheMap(ll,kk)',{ select: "#customerAnalysis",ll:['dateRange'],kk:'tableData.params'}).catch(err=>{return Promise.reject(err)})
console.log(bb)
console.timeEnd()