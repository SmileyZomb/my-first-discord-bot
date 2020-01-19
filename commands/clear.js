const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    if(message.deletable) {
        message.delete();
    }

    //Member doesn't have permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Vous ne pouvez pas effacer les messages....").then(m => m.delete(5000));
    }

    //Check if args[0] is a number
    if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("C'est n'est pas un nombre donc je ne peux supprimer aucun message!")
    }

    //Maybe the bot can't delete messages
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Désolé je ne peux pas supprimer de message.").then(m => m.delete(5000));
    }

    let deleteAmount;

    if(parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`J'ai supprimé \`${deleted.size}\` messages.`))
        .catch(err => message.reply(`Quelque chose ne va pas... ${err}`));
};

module.exports.config = {
    name: "clear",
    aliases: ["cls"],
    description: "Efface les messages.",
    usage: "s+clear [amount]",
    accessableby: "Members"
};
