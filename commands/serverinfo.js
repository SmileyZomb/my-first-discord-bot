const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

  let serverinfoEmbed = new Discord.MessageEmbed()
      .setColor(colours.gold)
      .setTitle("Serveur Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField("**Nom du Serveur:**", `${message.guild.name}`, true)
      .addField("**Propriétaire du Serveur:**", `${message.guild.owner}`, true)
      .addField("**Nombre de Membre:**", `${message.guild.memberCount}`, true)
      .addField("**Nombre de Rôle:**", `${message.guild.roles.size}`, true)
      .addField("**Serveur créé le:**", `${message.guild.createdAt.toLocaleString()}`, true)
      .addField("**Invitation:**", `${message.guild.guild}`, false)
      .setFooter(bot.user.username, bot.user.displayAvatarURL);

  await message.channel.send({embed: serverinfoEmbed});
  message.delete();
};

module.exports.config = {
  name: "serverinfo",
  aliases: ["si", "sinfo"],
  description: "Montre les informations du serveur.",
  usage: "++serverinfo",
  accessableby: "Members"
};

