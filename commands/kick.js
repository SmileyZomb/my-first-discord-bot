const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send(
      "Vous n'avez pas les permissions d'éxécuter cette commande!"
    );

  let kickMember =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!kickMember)
    return message.channel.send("S'il vous plaît mettez un nom pour kick!");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("Je n'ai pas la permission de le faire!");

  kickMember
    .send(
      `Bonjour, Vous avez été kick de ${message.guild.name} pour: ${reason}`
    )
    .then(() => {
      kickMember.kick().catch(err => console.log(err));
    });

  message.channel
    .send(`**${kickMember.user.tag}** a était kick`)
    .then(m => m.delete(5000));

  let embed = new Discord.MessageEmbed()
    .setColor(colours.red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Modération:", "kick")
    .addField("kické:", kickMember.user.username)
    .addField("Raison:", reason)
    .addField("Modérateur:", message.author.username)
    .addField("Date:", message.createdAt.toLocaleString());

  let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs");
  sChannel.send(embed);
};

module.exports.config = {
  name: "kick",
  aliases: ["kick", "kik"],
  description: "Kick une personne avec une raison.",
  accessableby: "Administrators",
  usage: "s+kick <@membre> <raison>"
};
