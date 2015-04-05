"use strict";

let Index = require('./util/index');

let edits = require('../../data/edits.json');

function compare(a, b) {
    return a.score - b.score;
}

function edit(data) {
    let i = new Index('code');
    data.forEach(function (ep) {
        i.add(ep);
    });
    edits.filter(Array.isArray).forEach(function (seq) {
        let score = i.lookup('code', seq.shift()).score;
        seq.forEach(function (code) {
            i.lookup('code', code).score = ++score;
        });
    });
    return data.sort(compare);
}

function polyfill() {
    let unknown = 0;
    return function (ep) {
        if (!ep.code)
            ep.code = 'UN' + ('00' + ++unknown).substr(-2);
        return ep;
    };
}

function score() {
    let last = 0, index = {};
    return function (ep) {
        if (ep.score)
            last = ep.score;
        ep.score = last in index ? index[last] += 10 : index[last] = last;
        return ep;
    };
}

function transform(data) {
    return Promise.resolve(edit(data
        .reduce(unique(), [])
        .map(score())
        .sort(compare)
        .map(polyfill())
    ));
}

function unique() {
    let i = new Index('code', 'jpn.title', 'usa.title'),
        e = null;
    return function (out, ep) {
        if (e = i.lookup(ep))
            return e.merge(ep), out;
        return out.concat(i.add(ep));
    };
}

module.exports = transform;
