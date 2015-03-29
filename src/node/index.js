var input = require('../../data/raw.json');

var extract = require('./extract');
var transform = require('./transform');
var load = require('./load')();

Promise.resolve(input)
    .then(extract)
    .then(transform)
    .then(load)

    .then(function (data) {
        console.log(data);
    })

    .catch(function (e) {
        console.error(e.stack);
    });
