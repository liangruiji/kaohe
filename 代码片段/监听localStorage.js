// 同一个页面,在同源的两个页面中，可以监听 storage 事件
if (!orignalSetItem) {
    var orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, newValue) {

        let oldValue = localStorage.getItem(key)
        if (oldValue != newValue) {
            var setItemEvent = new Event("setItemEvent");
            setItemEvent.newValue = newValue;
            setItemEvent.key = key;
            setItemEvent.oldValue = oldValue
            window.dispatchEvent(setItemEvent);
            orignalSetItem.apply(this, arguments);
        }

    }
}

window.addEventListener("setItemEvent", function(e) {
    if (e.key != '__q__')
        console.dir(e);
});

// 在同源的两个页面中，可以监听 storage 事件
// window.addEventListener("storage", function (e) {
//         alert(e.newValue);
// });
