#!/bin/bash
'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fileExists = require('./fileExists.js');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirSync = require('./mkdirSync.js');

var _mkdirSync2 = _interopRequireDefault(_mkdirSync);

var _bottomBar = require('./node_modules/inquirer/lib/ui/bottom-bar');

var _bottomBar2 = _interopRequireDefault(_bottomBar);

var _homedir = require('homedir');

var _homedir2 = _interopRequireDefault(_homedir);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.argv.forEach(function (val, index, array) {
    if (val == "--token") {
        console.log(_fs2.default.readFileSync('tokentutorial.md', 'utf-8'));
        process.exit(1);
    }
});

var defaultConfig = {
    token: ""
};
try {
    global.config = JSON.parse(_fs2.default.readFileSync((0, _homedir2.default)() + '/discord.json')) || defaultConfig;
} catch (e) {
    printNoConfig();
    _fs2.default.writeFileSync((0, _homedir2.default)() + '/discord.json', JSON.stringify(defaultConfig, null, 4));
}

function printNoConfig() {
    console.log('Personal token is not present in ~/discord.json file.\n    Example configuration has been copied if the file does not exists.\n    For help on getting your personal Discord token, type discord --token');
    process.exit(1);
    return;
}

for (var _i = 0; _i < 3000; _i++) {
    console.log("");
}var loader = ['/ Connecting to Discord.', '| Connecting to Discord..', '\\ Connecting to Discord...', '- Connecting to Discord'];
var i = 4;
var ui = new _bottomBar2.default({ bottomBar: loader[i % 4] });

var cnt = true;
setInterval(function () {
    if (cnt) ui.updateBottomBar(loader[i++ % 4]);
}, 100);
ui.close();
var spawn = require('child_process').spawn;
global.client = new _discord2.default.Client();

client.on('ready', function () {
    cnt = false;
    console.log("----- DO NOT COPY LOGS THIS WAY -----");
    for (var _i2 = 0; _i2 < process.stdout.rows; _i2++) {
        console.log("");
    }var tempArr = [];
    for (var x in client.guilds.array()) {
        try {
            tempArr.push(client.guilds.array()[x].name);
        } catch (e) {}
    }

    _inquirer2.default.prompt([{
        type: 'rawlist',
        name: 'server',
        message: 'Select a Server',
        choices: tempArr
    }]).then(function (answers) {
        console.log("----- DO NOT COPY LOGS THIS WAY -----");
        for (var _i3 = 0; _i3 < process.stdout.rows; _i3++) {
            console.log("");
        }global.guild = getGuildByName(answers.server);
        console.log(_util2.default.inspect(global.guild));
        global.channel = global.guild.defaultChannel;
        return (0, _app2.default)();
    });
});

function getGuildByName(name) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = client.guilds.array()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var guild = _step.value;

            if (guild.name == name) return guild;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return undefined;
}
client.login(global.config.token);