var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var fs = require('fs');
var path = require('path');

var win = {};
var ready = new Promise(function (done) {
    app.on('ready', done);
});

var bootstrap = require.resolve('./scripts/bootstrap');
var cache = {};

function load(script) {
    if (!(script in cache))
        cache[script] = fs.readFileSync(
            require.resolve('./scripts/' + script)
        ).toString();
    return cache[script];
}

function promise(url, script) {
    return ready.then(function () {
        return new Promise(function (done) {
            scrape(url, load(script), done);
        });
    });
}

function scrape(url, script, done) {
    var url = encodeURI(url);

    var site = win[url] = new BrowserWindow({
        preload: bootstrap,
        'web-preferences': {
            'web-security': true
        }
    });

    site.webContents.on('did-finish-load', function () {
        console.log('>> ' + url);
        site.webContents.executeJavaScript(script);
    });

    ipc.on(url, function (e, data) {
        done(data);
        console.log('<< ' + url);
        site.close();
        delete win[url];
    });

    console.log('++ ' + url);
    site.loadUrl(url);
}

var file = require.resolve('../../data/sources.json'),
    directory = path.dirname(file),
    sources = require(file);

Promise
    .all(Object.keys(sources).map(function (key) {
        var src = sources[key];
        if (typeof src === 'string')
            return Promise.resolve(require(path.join(directory, src)));
        return promise.apply(null, src);
    }))
    .then(function (data) {
        var out = {};
        Object.keys(sources).forEach(function (key, i) {
            out[key] = data[i];
        });
        fs.writeFileSync(
            path.resolve(process.argv[2]),
            JSON.stringify(out, null, 2)
        );
    })
    .catch(function (e) {
        console.err(e);
    });
