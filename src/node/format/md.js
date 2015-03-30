"use strict";

let table = require('markdown-table');

let header = [
    'Code',
    'English Title',
    'Japanese',
    'English'
];

function date(input) {
    if (input)
        return input.toISOString().substr(0, 10);
    return '_Unaired_';
}

function row(ep) {
    return [
        ep.code,
        ep.usa.title ? ep.usa.title : '[JPN] ' + ep.jpn.title,
        date(ep.jpn.airdate),
        date(ep.usa.airdate)
    ];
}

module.exports = function (data) {
    return table([header].concat(data.map(row)), {
        align: ['l', 'l', 'r', 'r']
    });
}
