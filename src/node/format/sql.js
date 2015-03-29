function date(input) {
    if (input)
        return quote(input.toISOString().substr(0, 10));
    return;
}

function filter(row) {
    return Object.keys(row)
        .filter(function (k) { return row[k]; });
}

function keys(row) {
    return filter(row)
        .join(', ');
}

function quote(input) {
    if (!input) return;
    return typeof input === 'string'
        ? "'" + input.replace(/\'/g, '\\\'') + "'"
        : input;
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

function sql(data) {
    var out = [
        "CREATE SCHEMA IF NOT EXISTS pokemon;",

        "USE pokemon;",

        "CREATE TABLE IF NOT EXISTS series (",
            "id TINYINT UNSIGNED NOT NULL PRIMARY KEY,",
            "code VARCHAR(2) NOT NULL,",
            "name VARCHAR(128) NOT NULl",
        ") ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;",

        "INSERT INTO series VALUES ",
            "(1,   'EP', 'Original'),",
            "(2,   'AG', 'Advanced Generation'),",
            "(3,   'DP', 'Diamond & Pearl'),",
            "(4,   'BW', 'Best Wishes'),",
            "(5,   'XY', 'XY') ",
        "ON DUPLICATE KEY UPDATE name = VALUES(name);",

        "CREATE TABLE IF NOT EXISTS episodes (",
            "code VARCHAR(6) NOT NULL PRIMARY KEY,",
            "series TINYINT UNSIGNED NULL DEFAULT NULL",
                "REFERENCES series (id) ON DELETE RESTRICT,",
            "number SMALLINT UNSIGNED NULL DEFAULT NULL,",
            "title VARCHAR(128) NOT NULL UNIQUE KEY,",
            "airdate DATE NULL DEFAULT NULL,",
            "chronology SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE KEY",
        ") ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;",

        "CREATE TABLE IF NOT EXISTS seasons (",
            "id TINYINT UNSIGNED NOT NULL PRIMARY KEY,",
            "name VARCHAR(128) NOT NULL",
        ") ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;",

        "INSERT INTO seasons VALUES ",
            "(1,   'Indigo League'),",
            "(2,   'Adventures in the Orange Islands'),",
            "(3,   'The Johto Journeys'),",
            "(4,   'Johto League Champions'),",
            "(5,   'Master Quest'),",
            "(6,   'Advanced'),",
            "(7,   'Advanced Challenge'),",
            "(8,   'Advanced Battle'),",
            "(9,   'Battle Frontier'),",
            "(10,  'Diamond and Pearl'),",
            "(11,  'Diamond & Pearl: Battle Dimension'),",
            "(12,  'Diamond & Pearl: Galactic Battles'),",
            "(13,  'Diamond & Pearl: Sinnoh League Victors'),",
            "(14,  'Black & White'),",
            "(15,  'Black & White: Rival Destinies'),",
            "(16,  'Black & White: Adventures in Unova'),",
            "(17,  'Pokémon the Series: XY'),",
            "(18,  'Pokémon the Series: XY (continued)') ",
        "ON DUPLICATE KEY UPDATE name = VALUES(name);",

        "CREATE TABLE IF NOT EXISTS dubs (",
        "  code VARCHAR(5) NOT NULL PRIMARY KEY",
        "    REFERENCES episodes (code) ON DELETE CASCADE,",
        "  season TINYINT UNSIGNED NULL DEFAULT NULL",
        "    REFERENCES seasons (id) ON DELETE RESTRICT,",
        "  number SMALLINT UNSIGNED NULL DEFAULT NULL,",
        "  title VARCHAR(128) NOT NULL,",
        "  airdate DATE NULL DEFAULT NULL",
        ") ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;"
    ];
    var series = {
        EP: 1,
        AG: 2,
        DP: 3,
        BW: 4,
        XY: 5
    };

    out.push('SET @@auto_increment_increment=10;');
    out.push('SET @@auto_increment_offset=10;');

    data.forEach(function (ep) {
        var jpn = ep.jpn, usa = ep.usa;
        var jpn = {
            code: quote(ep.code),
            series: series[jpn.series],
            number: jpn.number,
            title: quote(jpn.title),
            airdate: date(jpn.airdate)
        };
        out.push('INSERT INTO episodes (' + keys(jpn) + ') VALUES (' + values(jpn) + ') ON DUPLICATE KEY UPDATE ' + update(jpn) + ';');

        if (!usa.title) return;
        var usa = {
            code: jpn.code,
            season: usa.season,
            number: usa.number,
            title: quote(usa.title),
            airdate: date(usa.airdate)
        };
        out.push('INSERT INTO dubs (' + keys(usa) + ') VALUES (' + values(usa) + ') ON DUPLICATE KEY UPDATE ' + update(usa) + ';');
    });

    return out.join('\n');
}

module.exports = sql;
