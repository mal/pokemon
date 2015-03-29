"use strict";

let codes = ['jpn', 'usa'];

function Node(data) {
    data.code = data.code === '*' ? null : data.code;
    this.data = data;
    this.each(function (a) {
        a.airdate = new Date(a.airdate);
        if (isNaN(a.airdate))
            delete a.airdate;
    });
}

Node.create = function (data) {
    return new Node(data);
}

Node.prototype = {
    get code() { return this.data.code; },
    set code(v) { this.data.code = v; },
    get jpn() { return this.data.jpn; },
    get usa() { return this.data.usa; }
};

Node.prototype.each = function (fn) {
    for (let i = codes.length; i-- > 0;)
        fn(this.data[codes[i]], codes[i]);
    return this;
}

Node.prototype.merge = function (b) {
    if (!this.code)
        this.code = b.code;
    this.each(function (aa, key) {
        let bb = b[key];
        if (bb.title)
            aa.title = bb.title;
        if (!aa.airdate || aa.airdate > bb.airdate)
            aa.airdate = bb.airdate;
    });
}

Node.prototype.toJSON = function () {
    return this.data;
}

module.exports = Node;
