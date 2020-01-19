const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  //check if the command caller has permission to use the command

  if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
    return message.channel.send(
      "Vous n'avez pas les permissions pour éxecuter cette commande!"
    );

  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
    return message.channel.send(
      "Je n'ai pas la permission d'ajouter des rôles!"
    );

  //define the reason and unmutee

  let mutee =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!mutee)
    return message.channel.send("S'il vous plaît entrez un nom pour démute");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  //define mute role and if the mute role doesnt exist then send a message
  let muterole = message.guild.roles.find(r => r.name === "Muter");
  if (!muterole) return message.channel.send("Ce membre n'est pas muté");
  //remove the role to the mentioned user and also send the user a dm explaing where and why they were unmuted
  mutee.removeRole(muterole.id).then(() => {
    message.delete();
    mutee
      .send(
        `Bonjour, vous avez été démuté sur ${message.guild.name} pour: ${reason}`
      )
      .catch(err => console.log(err));
    message.channel.send(`${mutee.user.username} a était démuté avec succès.`);
  });
  //send an embed to the modlogs channel
  let embed = new Discord.MessageEmbed()
    .setColor(colours.green_dark)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Modération:", "unmute")
    .addField("Démuté:", mutee.user.username)
    .addField("Raison:", reason)
    .addField("Modérateur:", message.author.username)
    .addField("Date:", message.createdAt.toLocaleString());

  let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs");
  sChannel.send(embed);
};

module.exports.config = {
  name: "unmute",
  aliases: ["unm", "speak"],
  description: "Démuter une personne avec une raison.",
  accessableby: "Members",
  usage: "s+unmute <@membre> <raison>"
};
