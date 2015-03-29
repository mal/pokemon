module.exports = function () {
    var type = process.argv[2].replace(/^\.(\w+)/, '$1');
    return require('./format/' + type);
}
