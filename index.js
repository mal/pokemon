var wfs = require('fs').writeFileSync;

var codes = require('./data/countries.json');
var extract = require('./src/extract');
var transform = require('./src/transform');

function save(name) {
    return function (data) {
        wfs('./data/' + name + '.json', JSON.stringify(data, null, 2));
        return Promise.resolve(data);
    };
}

// Promise.resolve(require('./data/raw.json'))

// extract().then(transform).then(load);

extract()
    .then(save('raw'))

    .then(transform)

    .then(save('anime'))

    .catch(function () {
        console.err(arguments);
    });
