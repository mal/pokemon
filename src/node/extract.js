var codes = null;

function clean(data) {
    return data.map(function (ep) {
        for (iso in codes)
            ep[iso].number = ep[iso].season = ep[iso].series = undefined;
        return ep;
    });
}

function extract(data) {
    var data = Object.keys(data).map(function (key) {
        var group = data[key];
        if (key !== 'episodes' && key !== 'movies')
            group = clean(group);
        return group;
    });

    return Array.prototype.concat.apply([], data);
}

module.exports = function (countries) {
    codes = countries;
    return extract;
};
