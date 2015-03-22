global.ATOM_SHELL_COMPLETE = function () {
    var ipc = global.require('ipc');
    return function (data) {
        ipc.send(location.href, data);
    }
}();

delete global.require
delete global.module
delete global.__filename
delete global.__dirname
delete global.process
