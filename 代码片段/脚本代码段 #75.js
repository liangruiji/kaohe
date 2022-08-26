 _ = function() {
        if (document.currentScript)
            return document.currentScript;
        var n = null
          , e = document.getElementsByTagName("script")
          , a = null;
        try {
            throw Error()
        } catch (t) {
            var o, i = (/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(t.stack) || [!1])[1];
            for (o in e)
                if ((a = e[o]).src == i || "interactive" == a.readyState)
                    return n = e[o],
                    e[o]
        }
        return n
    }();