(function() {

    window.__globalsDebugger__ = (function createGlobalsDebugger() {
        const globalsToInspect = [];
        const inspectedGlobals = [];
        function addGlobalToInspect(globalName) {
            if (!globalsToInspect.includes(globalName)) {
                globalsToInspect.push(globalName);
            }

            Object.defineProperty(window, globalName, {
                get: function() {
                    return window['__globals-debugger-proxy-for-' + globalName + '__'];
                },
                set: function(value) {

                    if (!inspectedGlobals.includes(globalName)) {
                        inspectedGlobals.push(globalName);

                    }
                    window['__globals-debugger-proxy-for-' + globalName + '__'] = value;
                    if (value.header.includes("window.location = '//jie.taobao.com'") || value.header.includes("vjs-body-fullscreen")) {
                        value.header = value.header.replace("window.location = '//jie.taobao.com';", '')
                        window['__globals-debugger-proxy-for-' + globalName + '__'] = value;
                    }

                },
                configurable: true,
            });
        }

        return {
            addGlobalToInspect,
        };
    }
    )();
    __globalsDebugger__.addGlobalToInspect("SHOP_DC")

}
)();
