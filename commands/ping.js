const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let debut = Date.now();
    await message.channel.send("Ping").then(async(m) => await m.edit(`**Ping du bot:** ${Date.now() - debut} ms`))
    message.delete();

};

module.exports.config = {
    name: "ping",
    aliases: ["ping"],
    description: "Savoir le ping du bot..",
    usage: "s+ping",
    accessableby: "Members"
};
