var scrape = require('./scraper');

var Data = function () {
    this.queue = [];
};

var uri = /^https?:/;
Data.prototype.add = function (url, opts) {
    var job = null;

    if (opts && opts.script)
        job = scrape(url, opts.script);
    else
        job = Promise.resolve(require(url));

    if (opts.after)
        job = job.then(opts.after);

    this.queue.push(job);

    return this;
}

Data.prototype.data = function () {
    console.log(this.queue);
    return Promise.all(this.queue).then(collate);
}

function collate(data) {
    return Array.prototype.concat.apply([], data);
}

module.exports = Data;
