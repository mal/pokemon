var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var win = {};
var bootstrap = require.resolve('./preload.js');

var ready = new Promise(function (done) {
    app.on('ready', done);
});

function promise(url, script) {
    return ready.then(function () {
        return new Promise(function (done) {
            scrape(url, script, done);
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

module.exports = promise;
