var codes = require('../../data/countries.json');

function Index() {
    this.i = {code: {}, jpn: {}, usa: {}};
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

module.exports = Index;
