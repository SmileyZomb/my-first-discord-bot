const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    //define the reason and mutee
    let usinfom =
        message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!usinfom)
        return message.channel.send("S'il vous plaît entrez un nom");

    //send an embed to the modlogs channel

    let umEmbed = new Discord.MessageEmbed()
        .setColor(colours.red_light)
        .setTitle("User Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(
            `${usinfom.user.username} Info`,
            message.author.displayAvatarURL
        )
        .addField("**Nom de la personne:**", `<@${usinfom.user.id}>`, true)
        .addField("**Discriminator:**", `${usinfom.user.discriminator}`, true)
        .addField("**ID:**", `${usinfom.user.id}`, true)
        .addField("**Status:**", `${usinfom.user.presence.status}`, true)
        .addField("**Compte créé le:**", `${usinfom.user.createdAt.toLocaleString()}`, true)
        .addField("**Serveur rejoin le:**", `${usinfom.joinedAt.toLocaleString()}`, true)
        .setFooter(bot.user.username, bot.user.displayAvatarURL);

    await message.channel.send({ embed: umEmbed });
    message.delete();
};

module.exports.config = {
    name: "userinfom",
    aliases: ["uim", "uinfom"],
    description: "Montre les informations d'un membre.",
    usage: "s+userinfom (@mention)",
    accessableby: "Members"
};
