for (let i in document.styleSheets) {
    try {
        let aa = document.styleSheets[i]
        let item = aa.cssRules

        for (let a = 0, len = item.length; a < len; a++) {
            if (item[a].selectorText && item[a].selectorText.includes('.tmg')) {
                console.log(item[a])
                aa.deleteRule(a)
               
                
            }
        }
    } catch {}

}
