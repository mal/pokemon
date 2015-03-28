var codes = null;

function Index() {
    this.i = {code: {}};
    for (iso in codes)
        this.i[iso] = {};
}

Index.prototype.index = function (ep) {
    this.i.code[ep.code] = ep;
    for (iso in codes)
        this.i[iso][ep[iso].title] = ep;
    return ep;
}

Index.prototype.lookup = function (ep) {
    if (ep.code !== '*' && ep.code in this.i.code)
        return this.i.code[ep.code];
    for (iso in codes)
        if (ep[iso].title && ep[iso].title in this.i[iso])
            return this.i[iso][ep[iso].title];
    return false;
}

function compare(a, b) {
    return a.score - b.score;
}

function inflate(ep) {
    for (iso in codes)
        ep[iso].airdate = new Date(ep[iso].airdate);
    return ep;
}

function polyfill() {
    var unknown = 0;
    return function (ep) {
        if (ep.code === '*')
            ep.code = 'UN' + ('00' + ++unknown).substr(-2);
        return ep;
    };
}

function score() {
    var last = 0, index = {};
    return function (ep) {
        last = ep.jpn.airdate.getTime() || last;
        ep.score = last in index ? index[last] += 10 : index[last] = last;
        return ep;
    };
}

function transform(data) {
    return Promise.resolve(data
        .map(inflate)
        .reduce(unique(), [])
        .map(score())
        .sort(compare)
        .map(polyfill())
    );
}

function unique() {
    var i = new Index(),
        e = null;

    function merge(a, b) {
        if (a.code === '*')
            a.code = b.code;
        for (iso in codes) {
            var aa = a[iso], bb = b[iso];
            if (bb.title)
                aa.title = bb.title;
            if (!aa.airdate || aa.airdate > bb.airdate)
                aa.airdate = bb.airdate;
        }
    }

    return function (out, ep) {
        if (e = i.lookup(ep))
            return merge(e, ep), out;
        return out.concat(i.index(ep));
    };
}

module.exports = function (countries) {
    codes = countries;
    return transform;
};
