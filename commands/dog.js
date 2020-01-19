const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("En cours de génération...");

  let { body } = await superagent.get(
    `https://dog.ceo/api/breeds/image/random`
  );
  //console.log(body, file)
  if (!{ body }) return message.channel.send("Aie problème! Réessayer.");

  let dEmbed = new Discord.MessageEmbed()
    .setColor(colours.gold)
    .setAuthor(`LossaBot DOGS!`, message.guild.iconURL)
    .setImage(body.message)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);

  await message.channel.send({ embed: dEmbed });

  await msg.delete();
};

module.exports.config = {
  name: "dog",
  aliases: ["dog", "doggy"],
  description: "Affiche une photo de chien.",
  usage: "s+dog"
};
