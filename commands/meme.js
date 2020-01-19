const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("En cours de génération...");

  let { body } = await superagent.get(`https://meme-api.herokuapp.com/gimme`);
  //console.log(body, file)
  if (!{ body }) return message.channel.send("Aie problème! Réessayer.");

  let mEmbed = new Discord.MessageEmbed()
    .setColor(colours.red_light)
    .setAuthor(`LossaBot MEMES!`, message.guild.iconURL)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);

  await message.channel.send({ embed: mEmbed });

  await msg.delete();
};

module.exports.config = {
  name: "meme",
  aliases: ["mem", "meme"],
  description: "Affiche un meme.",
  usage: "s+meme"
};
