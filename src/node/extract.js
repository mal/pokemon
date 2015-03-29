var Node = require('./util/node');

function clean(ep) {
    ep.each(function (a) {
        delete a.number, a.season, a.series;
    });
}

function extract(data) {
    var data = Object.keys(data).map(function (key) {
        var group = data[key].map(Node.create);
        if (key !== 'episodes' && key !== 'movies')
            group.forEach(clean);
        return group;
    });

    return Array.prototype.concat.apply([], data);
}

module.exports = extract;
