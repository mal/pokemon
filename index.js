var fs = require('fs');
var Data = require('./src/data');

function clean(data) {
    return Promise.resolve(data.map(function (ep) {
        ep.jpn.series = ep.jpn.number = undefined;
        ep.usa.season = ep.usa.number = undefined;
        return ep;
    }));
}

function reanimate(data) {
    return Promise.resolve(data.map(function (ep) {
        for (country in {jpn: 0, usa: 0})
            if (ep[country].airdate)
                ep[country].airdate = new Date(ep[country].airdate);
        return ep;
    }));
}

function recode(data) {
    var unknown = 0;
    return Promise.resolve(data.map(function (ep) {
        if (ep.code === '*')
            ep.code = 'UN' + ('00' + ++unknown).substr(-2);
        return ep;
    }));
}

function save(data) {
    fs.writeFileSync('./data/anime.json', JSON.stringify(data, null, 2));
}

function sort(country) {
    return function (data) {
        return Promise.resolve(data.sort(function (a, b) {
            return a[country].airdate - b[country].airdate;
        }));
    }
}

var episodes = fs.readFileSync('./src/scripts/episodes.js').toString();
var movies = fs.readFileSync('./src/scripts/movies.js').toString();

new Data()

    .add('http://bulbapedia.bulbagarden.net/wiki/List_of_anime_episodes', {
        script: episodes
    })

    .add('http://bulbapedia.bulbagarden.net/wiki/Pikachu_shorts', {
        script: episodes,
        after: clean
    })

    .add('http://bulbapedia.bulbagarden.net/wiki/List_of_side_story_episodes', {
        script: episodes,
        after: clean
    })

    .add('http://bulbapedia.bulbagarden.net/wiki/Pokémon_movie', {
        script: movies
    })

    .add('http://bulbapedia.bulbagarden.net/wiki/List_of_anime_specials', {
        script: episodes,
        after: clean
    })

    .add(require('./data/extra.json'))

    .data()

    .then(reanimate)
    .then(sort('jpn'))
    .then(recode)
    .then(save);
