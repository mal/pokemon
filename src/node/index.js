var codes = { jpn: 0, usa: 0 };

var extract = require('./extract')(codes);
var transform = require('./transform')(codes);
var load = require('./load')(codes);

Promise.resolve(require('../../data/raw.json'))
    .then(extract)
    .then(transform)
    .then(load)

    .then(function (data) {
        console.log(data);
    });
