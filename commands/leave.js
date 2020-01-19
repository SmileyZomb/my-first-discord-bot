const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    if (!message.member.voice.channel) return message.channel.send("S'il vous plaît connectez-vous à un salon vocal")

    if (!message.guild.me.voice.channel) return message.channel.send("Désolé je ne suis pas dans un salon vocal")

    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send("Désolé ne nous sommes pas dans le même salon vocal")

    message.guild.me.voice.channel.leave();

    message.delete();
    // await message.channel.send("Ok, Je suis en train de partir. En revoir")
};

module.exports.config = {
    name: "leave",
    aliases: ["lv"],
    description: "Fait quitter le bot du salon vocal.",
    usage: "s+leave",
    accessableby: "Members"
};
