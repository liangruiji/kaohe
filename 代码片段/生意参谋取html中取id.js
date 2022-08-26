var n = document.getElementById("microdata") || document.querySelector('[name="microdata"]');
n = n.content.split(";").reduce(function(e, t) {
    var n = t.split("=");
    if (n[0]) {
        var r;
        try {
            r = JSON.parse(n[1])
        } catch (i) {
            r = n[1]
        }
        e[n[0]] = r
    }
    return e
}, {})
