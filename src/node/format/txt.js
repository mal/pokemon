module.exports = function (data) {
    return data.map(function (ep) {
        return ep.usa.title ? ep.usa.title : '[JPN] ' + ep.jpn.title;
    }).join('\n');
}
