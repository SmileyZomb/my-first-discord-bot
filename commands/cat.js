const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("En cours de génération...");

  let { body } = await superagent.get(`http://aws.random.cat/meow`);
  //console.log(body, file)
  if (!{ body }) return message.channel.send("Aie problème! Réessayer.");

  let cEmbed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`LossaBot CATS!`, message.guild.iconURL)
    .setImage(body.file)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);

  await message.channel.send({ embed: cEmbed });

  await msg.delete();
};

module.exports.config = {
  name: "cat",
  aliases: ["cat", "catto"],
  description: "Affiche une photo de chat.",
  usage: "s+cat"
};
