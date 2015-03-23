var fs = require('fs');

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

function fetch(url, script) {
    var url = 'http://bulbapedia.bulbagarden.net/wiki/' + encodeURI(url);
    return new Promise(function (res, rej) {
        var win = {};

        app.on('ready', function () {
            win.site = new BrowserWindow({
                width: 500,
                height: 200,
                preload: require.resolve('./preload.js'),
                'web-preferences': {
                    'web-security': true
                }
            });

            win.site.loadUrl(url);

            win.site.webContents.on('did-finish-load', function(e) {
                console.log('>> ' + url);
                win.site.webContents.executeJavaScript(script);
            });

            ipc.on(url, function (e, data) {
                res(data);
                console.log('<< ' + url);
                win.site.close();
            });
        });
    });
}

var episodes = fs.readFileSync('./scrapers/episodes.js').toString();
    movies = fs.readFileSync('./scrapers/movies.js').toString();

Promise
    .all([
        fetch('List_of_anime_episodes', episodes),
        fetch('Pikachu_shorts', episodes),
        fetch('List_of_side_story_episodes', episodes),
        fetch('Pokémon_movie', movies),
        fetch('List_of_anime_specials', episodes)
    ])
    .then(function (data) {
        data[4] = data[4].map(function (ep) {
            ep.jpn.series = ep.jpn.number = undefined;
            ep.usa.season = ep.usa.number = undefined;
            return ep;
        });
        var all = Array.prototype.concat.apply([], data);

        var unknown = 0;
        all.map(function (ep) {
            if (ep.code === '*')
                ep.code = 'UN' + ('00' + ++unknown).substr(-2);
            return ep;
        });
        fs.writeFileSync('anime.json', JSON.stringify(all, null, 2));
    });
