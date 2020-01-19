const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");
const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {

    if (!message.member.voice.channel) return message.channel.send("S'il vous plaît connectez-vous à un salon vocal")

    if (message.guild.me.voice.channel) return message.channel.send("Désolé je suis déjà dans un salon vocal")

    if(!args[0]) return message.channel.send("Vous n'avez pas entré de lien!");

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) return message.channel.send("Quelque chose ne va pas! Veuillez réessayer!")

    let info = await ytdl.getInfo(args[0]);

    let connection = await message.member.voice.channel.join();

    let dispatcher = await connection.play((ytdl(args[0], { filter: `audioonly` })));

    await message.channel.send(`**En cours:** ${info.title}`);

    message.delete();
    // await message.channel.send("Ok, Je suis en train de partir. En revoir")
};

module.exports.config = {
    name: "play",
    aliases: ["pl"],
    description: "Jouer une musique avec une url.",
    usage: "s+play [url]",
    accessableby: "Members"
};
