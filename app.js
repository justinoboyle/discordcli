"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    var rl = _readline2.default.createInterface(process.stdin, null);

    global.client.on('message', function (msg) {
        if (msg.channel !== global.channel) return;
        stdout.push("<".gray + ("" + msg.author.username.red) + "> ".gray + ("" + msg.content));
        console.log("<".gray + ("" + msg.author.username.red) + "> ".gray + ("" + msg.content));
    });

    rl.on('line', function (line) {
        console.log("----- DO NOT COPY LOGS THIS WAY -----");
        for (var i = 0; i < process.stdout.rows; i++) {
            console.log("");
        }console.log(stdout.join('\n')); // lol
        rl.setPrompt("", 0);
        rl.prompt();
        global.channel.sendMessage(line);
    }).on('close', function () {
        process.exit(0);
    });
    rl.setPrompt("", 0);
    rl.prompt();
};

var _colors = require("colors");

var _colors2 = _interopRequireDefault(_colors);

var _readline = require("readline");

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stdout = [];