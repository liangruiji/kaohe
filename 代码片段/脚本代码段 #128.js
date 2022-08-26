function formatJsonp(e) {
        return void 0 === e && (e = ""),
        e.substring(e.indexOf("{"), e.lastIndexOf("}") + 1)
    }