import colors from "colors";
import readline from "readline";
const stdout = [];
export default function () {

    let rl = readline.createInterface(process.stdin, null);

    global.client.on('message', (msg) => {
        if (msg.channel !== global.channel)
            return;
        stdout.push(`<`.gray + `${msg.author.username.red}` + `> `.gray + `${msg.content}`)
        console.log(`<`.gray + `${msg.author.username.red}` + `> `.gray + `${msg.content}`);
    });

    rl.on('line', function (line) {
        console.log("----- DO NOT COPY LOGS THIS WAY -----");
        for(let i = 0; i < process.stdout.rows; i++)
        console.log("");
        console.log(stdout.join('\n')); // lol
        rl.setPrompt("", 0);
        rl.prompt();
        global.channel.sendMessage(line);
    }).on('close', function () {
        process.exit(0);
    });
    rl.setPrompt("", 0);
    rl.prompt();

}