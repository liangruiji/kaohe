function aa(e) {
    if (null !== e) {
        try {
            e = JSON.parse(e)
        } catch (e) {}
        if ("string" != typeof e)
            return e;
        var t = e.match(/^(\d+?)\|/);
        if (null !== t && 2 === t.length) {
            if (1 * t[1] !== (e = e.replace(t[0], "")).length)
                return null;
            try {
                e = JSON.parse(e)
            } catch (e) {
                return null
            }
        }
    }
    return e
}
