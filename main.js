const Discord = require("discord.js");
const Enmap = require ("enmap");
const fs = require ("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config; // attacher le fichier config au client (accéder a la config partout)



fs.readdir("./events", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();
    

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const props = require(`./commands/${file}`);
        const commandName = file.split(".")[0];
        console.log(`Lancement de la commande ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.login(config.token);


