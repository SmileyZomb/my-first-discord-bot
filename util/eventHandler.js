const reqEvent = event => require(`../events/${event}`);

module.exports = bot => {
  bot.on("ready", function() {
    reqEvent("ready")(bot);
  });
  bot.on("reconnecting", () => redEvent("reconnecting")(bot));
  bot.on("disconnect", () => reqEvent("disconnect")(bot));
  bot.on("warn", reqEvent("warn"));
  bot.on("error", reqEvent("error"));
};
