var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://unpkg.com/dexie@latest/dist/dexie.js";
document.getElementsByTagName('head')[0].appendChild(script);
script.onload = ()=>{
    console.dir('加载完成')

}
