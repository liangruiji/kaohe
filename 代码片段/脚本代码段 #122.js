function aa(n, t) {
    return new Promise(function(o, r) {
        i.before(c, n, t);
        var e = f(n, t);
        e.then(function(e) {
            var f = function() {
                throw (r(u),
                new Error(u));
            }
              , a = function(o) {
                i.fail(c, [o, n, t, f], function() {
                    return r(o);
                });
            };
            i.done(c, [e, n, t, a], function(n) {
                return o(n);
            });
        }),
        e.catch(function(e) {
            var f = function() {
                throw (r(e),
                new Error(u));
            }
              , a = function(r) {
                i.done(c, [r, n, t, f], function(n) {
                    return o(n);
                });
            };
            i.fail(c, [e, n, t, a], function() {
                return r(e);
            });
        });
    }
    );
}
