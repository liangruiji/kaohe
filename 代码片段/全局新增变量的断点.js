/**
 * GlobalsDebugger
 *
 * Inspect the stack when a global variable is being set on the window object.
 * Given a global variable name, it proxies the variable name in the window
 * object adding some custom code that will be invoked whenever the variable
 * is set. The custom code will log the current stack trace and halt the code
 * execution to allow inspecting the stack and context in your browser DevTools.
 * You can use the "globalsToInspect" query-parameter to set a comma-separated
 * list of names of the variables you want to inspect.
 * Additionally, you can also add globals to inspect at runtime by invoking
 * "window.__globalsDebugger__.addGlobalToInspect(globalName)" (which will be
 * useful only if you expect these globals to be set asynchronously after you
 * invoked addGlobalsToInspect).
 */
// https://gist.github.com/mmazzarolo/2b325f3af2bc83f56d3c921ff0fdeddc 链接
window.__globalsDebugger__ = (function createGlobalsDebugger() {
    // Name of the variables to inspect.
    const globalsToInspect = [];

    // Name of the variables that have already been inspected once.
    const inspectedGlobals = [];

    /**
   * Given a global variable name, halt the code execution when the variable
   * gets set to allow inspecting the stack (to debug what line of code is
   * setting it).
   * @param {string} globalName Name of the global variable to inspect.
   */
    function addGlobalToInspect(globalName) {
        if (!globalsToInspect.includes(globalName)) {
            globalsToInspect.push(globalName);
        }
        // Proxy the global variable that we're interested in to log the stack trace
        // halt the execution when it gets set.
        Object.defineProperty(window, globalName, {
            get: function() {
                return window[`__globals-debugger-proxy-for-${globalName}__`];
            },
            set: function(value) {
                // To avoid noise in case the global is set multiple times, run the 
                // inspection only the first time the variable is set.
                if (!inspectedGlobals.includes(globalName)) {
                    inspectedGlobals.push(globalName);
                    // Print the stack trace to the console.
                    console.trace()
                    // Halt the code execution (only if the DevTools are running).
                    debugger ;
                }
                window[`__globals-debugger-proxy-for-${globalName}__`] = value;
            },
            configurable: true,
        });
    }

    // Start inspecting the global variables listed in the "globalsToInspect"
    // query parameter.
    const parsedUrl = new URL(window.location.href);
    (parsedUrl.searchParams.get("globalsToInspect") || "").split(",").filter(Boolean).forEach((globalToInspect)=>addGlobalToInspect(globalToInspect));

    return {
        addGlobalToInspect,
    };
}
)();
__globalsDebugger__.addGlobalToInspect("lll")
