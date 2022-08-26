const runTime = Date.now();
console.log(runTime);

for (let i = 0; i < 100000000; i++) {// do something
}

console.log(Date.now() - runTime);
// 10 milliseconds or more

const create = f=>{
    let code
    if (typeof f === 'function') {
        code = [`self.fn = ${f.toString()};`, 'self.onmessage = (e) => {', ' const r = self.fn(e.data);', ' self.postMessage(r);', '}'];
    }

    const blob = new Blob(code,{
        type: 'text/javascript'
    });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.cleanup = ()=>{
        URL.revokeObjectURL(url);
        worker.terminate();
    }
    ;
    return worker

}

const useWorker = (f,i)=>{
    const worker = create(f);

    if (!worker) {
        throw new Error('Need correctly parameter!');
    }

    worker.postMessage(i);

    return new Promise((resolve,reject)=>{
        worker.onmessage = e=>{
            if (worker.cleanup)
                worker.cleanup();
            resolve(e.data);
        }
        ;

        worker.onerror = e=>{
            if (worker.cleanup)
                worker.cleanup();
            reject(e.message);
        }
        ;

        worker.onmessageerror = ()=>{
            if (worker.cleanup)
                worker.cleanup();
            reject(e.message);
        }
        ;
    }
    );
}
;

const runTime1 = Date.now();
console.log(runTime1);

useWorker(()=>{
    for (let i = 0; i < 100000000; i++) {// do something
    }
    return 'finish';
}
).then(res=>{
    console.log(res);
    console.log(Date.now() - runTime1);
}
);

// time
console.log(Date.now() - runTime1);
// within 5 milliseconds
useWorker(fetch("https://cdn.bootcdn.net/ajax/libs/localforage/1.9.0/localforage.js").then(function(o) {
    console.log(o)
    return o.text()
})
).then(res=>{
    console.log(res);
    console.log(Date.now() - runTime1);
}
);
