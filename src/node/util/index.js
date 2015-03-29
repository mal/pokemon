"use strict";

function Index() {
    this.keys = arguments;
    this.i = {};
    for (let i = arguments.length; i-- > 0;)
        this.i[arguments[i]] = {};
}

Index.prototype.add = function (item) {
    let hash = this.hash(item);
    for (let key in hash) {
        let value = hash[key];
        this.i[key][value] = item;
    }
    return item;
}

Index.prototype.hash = function(item) {
    function _(key) {
        let path = key.split('.'),
            out = item;
        while (path.length)
            out = out[path.shift()];
        return out;
    }
    let out = {};
    for (let i = this.keys.length; i-- > 0;) {
        let key = this.keys[i];
        out[key] = _(key);
    }
    return out;
}

Index.prototype.lookup = function (key, value) {
    let hash = null;
    if (value)
        (hash = {})[key] = value;
    else
        hash = this.hash(key);
    for (let key in hash) {
        let value = hash[key];
        if (value && value in this.i[key])
            return this.i[key][value];
    }
    return false;
}

module.exports = Index;
