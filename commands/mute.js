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

  //define the reason and mutee
  let mutee =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!mutee)
    return message.channel.send("S'il vous plaît entrez un nom pour mute");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  //define mute role and if the mute role doesnt exist then create one
  let muterole = message.guild.roles.find(r => r.name === "Muter");
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muter",
        color: "#514f48",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  //add role to the mentioned user and also send the user a dm explaing where and why they were muted

  mutee.addRole(muterole.id).then(() => {
    message.delete();
    mutee.send(
      `Bonjour vous avez été muté sur ${message.guild.name} pour: ${reason}`
    );
    message.channel.send(`${mutee.user.username} a étais muté avec succès.`);
  });

  //send an embed to the modlogs channel

  let embed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Modération:", "mute")
    .addField("Muté:", mutee.user.username)
    .addField("Raison:", reason)
    .addField("Modérateur:", message.author.username)
    .addField("Date:", message.createdAt.toLocaleString());

  let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs");
  sChannel.send(embed);
};

module.exports.config = {
  name: "mute",
  aliases: ["m", "nospeak", "tagueule"],
  description: "Muter une personne avec une raison.",
  accessableby: "Members",
  usage: "s+mute <@membre> <raison>"
};
