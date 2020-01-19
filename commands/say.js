const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let imgurl = args[0];
    message.delete();
    if(!imgurl )
    bot.setAvatar(imgurl);

};

module.exports.config = {
    name: "say",
    aliases: ["say"],
    description: "Faire parler le bot.",
    usage: "s+say [message]",
    accessableby: "Members"
};
