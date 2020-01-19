const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");
const { server_token } = require("../botconfig");
const curl = new (require( 'curl-request' ))();

module.exports.run = async (bot, message, args) => {



  curl.setHeaders([
    'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  ])
      .get(`https://api.top-serveurs.net/v1/servers/${server_token}/players-ranking`)
      .then(({statusCode, body, headers}) => {
        console.log(statusCode, body, headers)
      })
      .catch((e) => {
        console.log(e);
      });

  let svmEmbed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`MindRP Vote`, message.guild.iconURL())
      .addField(vsm)
      .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());

  await message.channel.send({ embed: svmEmbed });

  await msg.delete();
};

module.exports.config = {
  name: "voteserverinfo",
  aliases: ["vt", "vtinfo"],
  description: "Affiche une photo de chat.",
  usage: "++voteserverinfo"
};
