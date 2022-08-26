fetch('http://amingtool.zhishuchacha.com/index/Tool/pop8_0_1',{method: 'POST'})
.then(res=>res.text())
.then(text=>{
    document.body.innerHTML=text;
}).catch(err=>console.log(err));
