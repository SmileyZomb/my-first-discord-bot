const Discord = require("discord.js");

module.exports = bot => {
  console.log(`${bot.user.username} est en ligne`);
  // bot.user.setActivity("En DEV", {type: "STREAMING",url: "https://www.twitch.tv/jlkeyzork"});

  let statuses = [
    `${bot.guilds.size} serveurs !`,
    "s+help",
    `plus de ${bot.users.size} membres!`
  ];

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
  }, 5000);
};
