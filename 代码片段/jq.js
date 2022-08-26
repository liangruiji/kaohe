var option = {
    jq: "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js",
    //     clipboard: 'https://static.leiting.com/lib/clipboard.js',
    localforage: "https://cdn.bootcdn.net/ajax/libs/localforage/1.9.0/localforage.js",
//     html2canvas: "https://cdn.bootcdn.net/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js",
    html2canvas: 'https://github.com/niklasvh/html2canvas/releases/download/v1.3.2/html2canvas.min.js' 
}

for (let i in option) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = option[i];
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = ()=>{
        console.dir(i)

    }

}
