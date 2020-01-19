const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {


    let plurl = args[0];
    if (!plurl)
        return message.channel.send("S'il vous plaît entrez un url");





    message.delete();
};

module.exports.config = {
    name: "userinfom",
    aliases: ["uim", "uinfom"],
    description: "Montre les informations d'un membre.",
    usage: "s+userinfom (@mention)",
    accessableby: "Members"
};
