const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");
const { server_token } = require("../botconfig");
const fs = require('fs');
const request = require('request');

module.exports.run = async (bot, message, args) => {



  await msg.delete();
};

module.exports.config = {
  name: "vttest",
  aliases: ["vtt", ""],
  description: "Affiche une photo de chat.",
  usage: "++voteserverinfo"
};
