const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  let uEmbed = new Discord.MessageEmbed()
    .setColor(colours.red_light)
    .setTitle("User Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(
      `${message.author.username} Info`,
      message.author.displayAvatarURL
    )
    .addField("**Nom de la personne:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Compte créé le:**", `${message.author.createdAt}`, true)
    .addField("**Serveur rejoin le:**", `${message.guild.joinedAt}`, true)
    .setFooter(bot.user.username, bot.user.displayAvatarURL);

  await message.channel.send({ embed: uEmbed });

  message.delete();
};

module.exports.config = {
  name: "userinfo",
  aliases: ["ui", "uinfo", "userinfo"],
  description: "Montre vos informations ou celles d'un autre membre.",
  usage: "s+userinfo",
  accessableby: "Members"
};
