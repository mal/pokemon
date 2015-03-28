var rfs = require('fs').readFileSync;

var Data = require('./util/data');
var codes = require('../data/countries.json');

function clean(data) {
    return Promise.resolve(data.map(function (ep) {
        for (iso in codes)
            ep[iso].number = ep[iso].season = ep[iso].series = undefined;
        return ep;
    }));
}

function extract() {
    var episode = rfs(require.resolve('../lib/episode.js')).toString();
    var movie = rfs(require.resolve('../lib/movie.js')).toString();

    return new Data()
        .add('http://bulbapedia.bulbagarden.net/wiki/List_of_anime_episodes', {
            parser: episode
        })
        .add('http://bulbapedia.bulbagarden.net/wiki/List_of_side_story_episodes', {
            parser: episode,
            after: clean
        })
        .add('http://bulbapedia.bulbagarden.net/wiki/Pikachu_shorts', {
            parser: episode,
            after: clean
        })
        .add('http://bulbapedia.bulbagarden.net/wiki/Pokémon_movie', {
            parser: movie
        })
        .add('http://bulbapedia.bulbagarden.net/wiki/List_of_anime_specials', {
            parser: episode,
            after: clean
        })
        .add(require('../data/extra.json'))
        .data();
}

module.exports = extract;
