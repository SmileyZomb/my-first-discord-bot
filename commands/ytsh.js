const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");
const fs = require("fs");
const search = require('yt-search');
const opts = {
    maxResults: 25,
    key: botconfig.YOUTUBE_API,
    type: 'video'
};

module.exports.run = async (bot, message, args) => {
search(args.join(" "), function (err, res) {

    if(err) return message.channel.send("Désolé, quelque chose ne va pas, réessayez!")

    let videos = res.videos.slice(0, 10);
    let resp = ``;
    for (var i in videos) {
        resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
    }

    resp += `\n***Choisissez un nombre entre*** \`1-${videos.length}\``;

    message.channel.send(resp);

    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;

    const collector = message.channel.createMessageCollector(filter);

    collector.videos = videos;

    collector.once(`collect`, function (m) {
        let commandFile = require("./play.js");
        commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], opts)
    })

});

   //     embed = new Discord.MessageEmbed()
   //         .setTitle(`${selected.title}`)
  //          .setURL(`${selected.link}`)
    //        .setDescription(`${selected.description}`)
    //        .setThumbnail(`${selected.thumbnails.default.url}`);

     //   await message.channel.send(embed);
   // };




};

module.exports.config = {
    name: "ytsh",
    aliases: ["ys"],
    description: "Recherchez une musique.",
    usage: "s+ytsh",
    accessableby: "Members"
};
