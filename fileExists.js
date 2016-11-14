"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
};