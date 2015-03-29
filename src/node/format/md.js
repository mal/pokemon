"use strict";

let table = require('markdown-table');

let header = [
    'Code',
    'Japanese Title',
    'Japanese Airdate',
    'English Title',
    'English Airdate'
];

function date(input) {
    if (input)
        return input.toISOString().substr(0, 10);
    return '_Unaired_';
}

function row(ep) {
    return [
        ep.code,
        ep.jpn.title,
        date(ep.jpn.airdate),
        ep.usa.title ? ep.usa.title : '_Not Dubbed_',
        date(ep.usa.airdate)
    ];
}

module.exports = function (data) {
    return table([header].concat(data.map(row)));
}
