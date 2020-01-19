const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const Gamedig = require("gamedig");
const { options } = require("gamedig");


module.exports.run = async (bot, message, args) => {
  const gameserver = Gamedig.query({
    type: "minecraft",
    host: "82.64.203.135"
  })
    gameserver
    .then(state => {
      console.log(state);
    })
    .catch(error => {
      console.log("Server is offline");
    });

  message.delete();


};

module.exports.config = {
  name: "gameserver",
  aliases: ["gs", "gsinfo"],
  description: "Montre les informations du serveur de votre jeu.",
  usage: "+gameserver",
  accessableby: "Members"
};
