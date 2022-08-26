let aa = '(' + function() {
    const _historyWrap = function(type) {
        const orig = history[type]
        const e = new Event(type)
        return function() {
            const rv = orig.apply(this, arguments)
            e.arguments = arguments
            window.dispatchEvent(e)
            return rv
        }
    }
    history.pushState = _historyWrap('pushState')
}
.toString() + ')();'
var script = document.createElement('script')
script.type = 'text/javascript'
script.setAttribute('id', '_0xb670xf')
script.textContent = aa
script.onload = function() {
    this.parentNode.removeChild(this)
}
;
(document.head || document.documentElement).appendChild(script)
