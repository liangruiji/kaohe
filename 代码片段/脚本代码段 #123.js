v = function(e, t) {
    return e.reduce((function(e, n) {
        var r, i = o.a.get(b, "".concat(n, ".name")) || o.a.get(t, "".concat(n, ".text")) || "-";
        switch (o.a.get(b, "".concat(n, ".type"))) {
        case "int":
            r = ",";
            break;
        case "float":
            r = ",.2f";
            break;
        case "float5":
            r = ",.5f";
            break;
        case "percent":
            r = ".2%";
            break;
        case "percent4":
            r = ".4%";
            break;
        default:
            r = ""
        }
        return r || (r = o.a.get(t, "".concat(n, ".format"))),
        c(c({}, e), {}, u({}, "".concat(n), {
            value: n,
            text: i,
            format: r
        }))
    }
    ), {})
}
