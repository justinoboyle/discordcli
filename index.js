import inquirer from 'inquirer';
import fileExists from './fileExists.js';
import fs from 'fs';
import mkdirSync from './mkdirSync.js';
import BottomBar from './node_modules/inquirer/lib/ui/bottom-bar'
import homedir from 'homedir';
import Discord from 'discord.js';
import app from './app.js';
import util from 'util';

process.argv.forEach(function (val, index, array) {
    if(val == "--token") {
        console.log(fs.readFileSync('tokentutorial.md', 'utf-8'));
        process.exit(1);
    }
});

const defaultConfig = {
    token: ""
}
try {
    global.config = JSON.parse(fs.readFileSync(homedir() + '/discord.json')) || defaultConfig;
} catch (e) {
    printNoConfig();
    fs.writeFileSync(homedir() + '/discord.json', JSON.stringify(defaultConfig, null, 4));
}

function printNoConfig() {
    console.log(`Personal token is not present in ~/discord.json file.
    Example configuration has been copied if the file does not exists.
    For help on getting your personal Discord token, type discord --token`);
    process.exit(1);
    return;
}

for (let i = 0; i < 3000; i++)
    console.log("");

var loader = [
    '/ Connecting to Discord.',
    '| Connecting to Discord..',
    '\\ Connecting to Discord...',
    '- Connecting to Discord'
];
var i = 4;
var ui = new BottomBar({ bottomBar: loader[i % 4] });

let cnt = true;
setInterval(() => {
    if (cnt)
        ui.updateBottomBar(loader[i++ % 4]);
}, 100);
ui.close();
var spawn = require('child_process').spawn;
global.client = new Discord.Client();

client.on('ready', () => {
    cnt = false;
    console.log("----- DO NOT COPY LOGS THIS WAY -----");
    for (let i = 0; i < process.stdout.rows; i++)
        console.log("");
    let tempArr = [];
    for (let x in client.guilds.array()) {
        try {
            tempArr.push(client.guilds.array()[x].name);
        } catch (e) { }

    }

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'server',
            message: 'Select a Server',
            choices: tempArr
        }
    ]).then((answers) => {
        console.log("----- DO NOT COPY LOGS THIS WAY -----");
        for (let i = 0; i < process.stdout.rows; i++)
            console.log("");
        global.guild = getGuildByName(answers.server);
        console.log(util.inspect(global.guild));
        global.channel = global.guild.defaultChannel;
        return app();
    });
});

function getGuildByName(name) {
    for (let guild of client.guilds.array()) {
        if (guild.name == name)
            return guild;
    }
    return undefined;
}
client.login(global.config.token);