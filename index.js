#!/usr/bin/env node
const argv = require('yargs').argv;
const package = require('./package.json');
const os = require('os');
const colors = require('colors');
const readline = require('readline');
const readlineSync = require('readline-sync');
const Discord = require('discord.js');
const util = require('util');

const client = new Discord.Client();

global.currentServer = undefined;
global.currentChannel = undefined;

const login = {};

if (argv.about || argv.a)
    return console.log([
        package.name.bold.green + " version " + package.version.bold.green,
        "Created by " + package.author + " with help from the community",
        "Project page: " + package.homepage.cyan

    ].join(os.EOL));

if (!login.username)
    login.username = readlineSync.question('Discord username: ');

if (!login.password)
    login.password = readlineSync.question('Discord password: ', { hideEchoBack: true });

process.stdout.write('\x1B[2J\x1B[0f');
process.stdout.write("\x1Bc");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("> ", 2);
rl.on("line", function (line) {
    if (line.startsWith("/eval ")) {
        console.log(eval(line.substring(6)));
        return rl.prompt();
    }
    if (line.startsWith("/servers")) {
        let search = line.startsWith("/servers ") ? line.substring("/servers ".length) : "";
        if (line.includes(""))
            try {
                for (let id in client.servers)
                    if (search == "" || (client.servers[id].name.toLowerCase().includes(search.toLowerCase())))
                        console.log(id + ": " + client.servers[id].name)
                console.log("Use /connect server to connect to any server.");
            } catch (e) { }
        return rl.prompt();
    }
    if (line.startsWith("/connect ")) {
        let connect = line.substring("/connect ".length);
        try {
            let server = client.servers[parseInt(connect)];
            global.currentServer = server;
            global.currentChannel = undefined;
            console.log("Connected to server! Use /channels to list channels");
        } catch (e) {
            console.log("That is not a valid server. Use /servers to list servers.");
        }
        return rl.prompt();
    }
    if (line.startsWith("/channels")) {
        if (currentServer == undefined) {
            console.log("Connect to a server first. Use /servers to list servers and /connect to connect.");
            return rl.prompt();
        }
        let search = line.startsWith("/channels ") ? line.substring("/channels ".length) : "";
        if (line.includes(""))
            try {
                for (let channel of currentServer.channels)
                    if (search == "" || (channel.name.toLowerCase().includes(search.toLowerCase())))
                        if (channel.type == "text")
                            console.log("#" + channel.name);
                console.log("Use /join #channel to join any channel.");
            } catch (e) { }
        return rl.prompt();
    }
    if (line.startsWith("/join ")) {
        if (currentServer == undefined) {
            console.log("Connect to a server first. Use /servers to list servers and /connect to connect.");
            return rl.prompt();
        }
        let connect = line.substring("/join ".length + 1);
        console.log(connect);
        try {
            for (let channel of global.currentServer.channels) {
                if (channel.name.toLowerCase() == connect.toLowerCase()) {
                    global.currentChannel = channel;
                    console.log("Connected to channel!");
                    return rl.prompt();
                }
            }



        } catch (e) {
            console.log("That is not a valid channel. Use /channels to list servers.");
        }
        return rl.prompt();
    }
    if (global.currentChannel == undefined)
        return rl.prompt();
    client.sendMessage(global.currentChannel, line);
    rl.prompt();
});
rl.on('close', function () {
    return process.exit(1);
});
rl.on("SIGINT", function () {
    rl.clearLine();
    process.exit(1);
});
rl.prompt();

var fu = function (type, args) {
    var t = Math.ceil((rl.line.length + 3) / process.stdout.columns);
    var text = util.format.apply(console, args);
    rl.output.write("\n\x1B[" + t + "A\x1B[0J");
    rl.output.write(text + "\n");
    rl.output.write(Array(t).join("\n\x1B[E"));
    rl._refreshLine();
};

console.log = function () {
    fu("log", arguments);
};
console.warn = function () {
    fu("warn", arguments);
};
console.info = function () {
    fu("info", arguments);
};
console.error = function () {
    fu("error", arguments);
};

//-----------------------------

console.log("Authenticating...");
if (login.username == "token")
    client.login(login.username, login.password);
else
    client.loginWithToken(login.password);
client.on("ready", () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    process.stdout.write("\x1Bc");
    console.log(`Authentication successful! \n${client.servers.length} servers available.\nType /servers to list channels.`);
});

client.on("message", msg => {
    if (global.currentChannel == undefined)
        return;
    if (msg.author.id === client.user.id)
        return;
    if (msg.channel.id !== global.currentChannel.id)
        return;
    console.log(`<${msg.author.username + "#" + msg.author.discriminator}> ${msg.content}`);
});