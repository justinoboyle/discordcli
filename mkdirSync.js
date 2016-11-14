'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dir) {
    if (_fs2.default.existsSync(dir)) {
        return;
    }

    try {
        _fs2.default.mkdirSync(dir);
    } catch (err) {
        if (err.code == 'ENOENT') {
            myMkdirSync(_path2.default.dirname(dir)); //create parent dir
            myMkdirSync(dir); //create dir
        }
    }
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }