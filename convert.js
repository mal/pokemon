var data = require('./anime.json');

function nullable(input) {
    if (input)
        return quote(input);
    return 'NULL';
}

function quote(input) {
    return typeof input === 'string'
        ? "'" + input.replace(/\'/g, '\\\'') + "'"
        : input;
}

function series(ref) {
    return series[ref];
}
series.EP = 1;
series.AG = 2;
series.DP = 3
series.BW = 4;
series.XY = 5;
series.TV = 252;
series.SS = 253;
series.PK = 254;
series.M = 255;
series[null] = 'NULL';

function season(ep, ref) {
    var code =  ep.slice(0, 2);
    if (code in season)
        ref = code;
    return season[ref] ? season[ref] : ref;
}
season.M = 'NULL';
season.PK = 'NULL';
season.SS = 'NULL';
season.TV = 'NULL';

function keys(row) {
    return Object.keys(row)
        .join(', ');
}

function update(row) {
    return Object.keys(row)
        .filter(function (k) {
            return k !== 'code';
        })
        .map(function (k) {
            return k + ' = ' + row[k];
        })
        .join(', ');
}

function values(row) {
    return Object.keys(row)
        .map(function (k) {
            return row[k];
        })
        .join(', ');
}

console.log('SET @@auto_increment_increment=10;');
console.log('SET @@auto_increment_offset=10;');

data.forEach(function (ep) {
    var jpn = ep.jpn, usa = ep.usa;
    var jpn = {
        code: quote(ep.code),
        series: series(jpn.series),
        number: nullable(jpn.number),
        title: quote(jpn.title),
        airdate: nullable(jpn.airdate)
    };
    console.log('INSERT INTO episodes (' + keys(jpn) + ') VALUES (' + values(jpn) + ') ON DUPLICATE KEY UPDATE ' + update(jpn) + ';');
    if (!usa.title) return;
    var ssn = season(ep.code, usa.season);
    var usa = {
        code: jpn.code,
        season: ssn,
        number: ssn === 'NULL' ? 'NULL' : usa.number,
        title: quote(usa.title),
        airdate: nullable(usa.airdate)
    };
    console.log('INSERT INTO dubs (' + keys(usa) + ') VALUES (' + values(usa) + ') ON DUPLICATE KEY UPDATE ' + update(usa) + ';');
});
