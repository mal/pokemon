var data = require('./anime.json');

function nullable(input) {
    if (input)
        return quote(input);
    return;
}

function quote(input) {
    if (!input) return;
    return typeof input === 'string'
        ? "'" + input.replace(/\'/g, '\\\'') + "'"
        : input;
}

function series(code, ref) {
    var code = code.match(/^[^\d]+/)[0];
    if (code === 'UN')
        code = ref;
    if (code in series)
        return series[ref];
    return;
}
series.EP = 1;
series.AG = 2;
series.DP = 3;
series.BW = 4;
series.XY = 5;

function season(code, num) {
    var code = code.match(/^[^\d]+/)[0];
    if (code in series)
        return num;
    return;
}

function title(input) {
    return quote(input);
}

function filter(row) {
    return Object.keys(row)
        .filter(function (k) { return row[k]; });
}

function keys(row) {
    return filter(row)
        .join(', ');
}

function update(row) {
    return filter(row)
        .filter(function (k) {
            return k !== 'code';
        })
        .map(function (k) {
            if (k === 'airdate')
                return k + ' = LEAST(airdate, ' + row[k] + ')';
            return k + ' = ' + row[k];
        })
        .join(', ');
}

function values(row) {
    return filter(row)
        .filter(function (k) { return row[k]; })
        .map(function (k) {
            return row[k];
        })
        .join(', ');
}

console.log('SET @@auto_increment_increment=10;');
console.log('SET @@auto_increment_offset=10;');

data.forEach(function (ep) {
    var jpn = ep.jpn, usa = ep.usa;
    var ser = series(ep.code, jpn.series);
    var jpn = {
        code: quote(ep.code),
        series: ser,
        number: ser ? nullable(jpn.number) : null,
        title: title(jpn.title),
        airdate: nullable(jpn.airdate)
    };
    console.log('INSERT INTO episodes (' + keys(jpn) + ') VALUES (' + values(jpn) + ') ON DUPLICATE KEY UPDATE ' + update(jpn) + ';');
    if (!usa.title) return;
    var ssn = season(ep.code, usa.season);
    var usa = {
        code: jpn.code,
        season: ssn,
        number: ssn ? usa.number : null,
        title: title(usa.title),
        airdate: nullable(usa.airdate)
    };
    console.log('INSERT INTO dubs (' + keys(usa) + ') VALUES (' + values(usa) + ') ON DUPLICATE KEY UPDATE ' + update(usa) + ';');
});
