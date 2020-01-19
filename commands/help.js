const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  if (args[0] == "help")
    return message.channel.send(`Just do ${prefix}help instead.`);

  if (args[0]) {
    let command = args[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      var SHembed = new Discord.MessageEmbed()
        .setColor(colours.orange)
        .setAuthor(`LossaBot Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(
          `Le préfix du bot est: ${prefix}\n\n**Commande:** ${
            command.config.name
          }\n**Description:** ${command.config.description ||
            "Pas de Description"}\n**Usage:** ${command.config.usage ||
            "Pas d'utilisation"}\n**Accessible par:** ${command.config
            .accessableby || "Members"}\n**Alias:** ${command.config.noalias ||
            command.config.aliases}`
        );
    }
  }

  if (!args[0]) {
    message.delete();
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Commande d'aide`, message.guild.iconURL)
      .setColor(colours.red_light)
      .setDescription(`${message.author.username} regarde tes messages!`);

    let Sembed = new Discord.MessageEmbed()
      .setColor(colours.cyan)
      .setThumbnail(bot.user.displayAvatarURL)
      .setTimestamp()
      .setDescription(
        `Voici les commandes disponible pour LossaBot!\nLe préfix du bot est: ${prefix}`
      )
      .addField(
        `Commande:`,
        "``meme`` ``dog`` ``cat`` ``serverinfo`` ``userinfo`` ``help``"
      )
      .setFooter(bot.user.username, bot.user.displayAvatarURL);
    message.channel.send(embed).then(m => m.delete(10000));
    await message.author.send(Sembed);
  }
};

module.exports.config = {
  name: "help",
  aliases: ["h", "help", "commands"],
  description: "",
  accessableby: "Members"
};
