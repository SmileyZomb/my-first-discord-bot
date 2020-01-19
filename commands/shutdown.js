const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {

  const smid = message.author.id != "244915572297433098"
  const ryid = message.author.id != "362557302441771009"

  if(smid) return message.channel.send("Vous n'êtes pas le propriétaire du BOT")

  try {
    await message.channel.send("Le Bot s'éteind...")
    process.exit()
  } catch(e) {
    message.channel.send(`**ERREUR** ${e.message}`)
  }



};

module.exports.config = {
  name: "shutdown",
  aliases: ["botstop"],
  description: "Arrête le Bot.",
  usage: "++shutdown",
  accessableby: "Owner"
};
