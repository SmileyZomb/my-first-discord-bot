const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send(
      "Vous n'avez pas les permissions d'éxécuter cette commande!"
    );

  let banMember =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!banMember)
    return message.channel.send("S'il vous plaît mettez un nom pour ban!");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("Je n'ai pas la permission de le faire!");

  message.delete();

  banMember
    .send(
      `Bonjour, Vous avez été banni de ${message.guild.name} pour ${reason}`
    )
    .then(() => {
      message.guild
        .ban(banMember, { days: 1, reason: reason })
        .then(() => message.guild.unban(banMember.id, { reason: "Softban" }))
        .catch(err => console.log(err));

      message.channel.send(`**${banMember.user.tag}** a était banni.`);

      let embed = new Discord.MessageEmbed()
        .setColor(colours.red_dark)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Modération:", "ban")
        .addField("Banni:", banMember.user.username)
        .addField("Raison:", reason)
        .addField("Modérateur:", message.author.username)
        .addField("Date:", message.createdAt.toLocaleString());

      let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs");
      sChannel.send(embed);
    });
};

module.exports.config = {
  name: "softban",
  aliases: ["softban", "softbanish", "softhammer", "dégagepassur"],
  description: "Banir une personne avec une raison temporairement.",
  accessableby: "Administrators",
  usage: "s+softban <@membre> <raison>"
};
