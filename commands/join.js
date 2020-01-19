const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    //define the reason and mutee
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
    } else {
       await message.reply('You need to join a voice channel first!');
    }
    message.delete();
};

module.exports.config = {
    name: "join",
    aliases: ["join"],
    description: "Fait venir le bot dans votre vocal.",
    usage: "s+join",
    accessableby: "Members"
};
