const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
//const ft = new Client(process.env.FORTNITE);
const ft = new Client(botconfig.FORTNITE)

module.exports.run = async (bot, message, args) => {
const platforms = ["pc", "xb1", "psn"];

const lastWord = args[args.length - 1].toLowerCase();

let platform, username;

if(platforms.includes(lastWord)) {
    username = args.slice(0, args.length - 1).join(" ");
    platform = lastWord;
} else {
    username = args.join(" ");
    platform = "pc";
}



const search = await ft.user(username, platform);

console.log(search);


if(!search.username) {
    return message.channel.send("Je ne trouve pas cette personne...")
        .then(m => m.delete(5000));
}

const lifetime = search.stats.lifetime;
const solo = search.stats.solo;
const duo = search.stats.duo;
const squad = search.stats.squad;

const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${search.username} (${search.platform})`)
    .setFooter("Fortnite stats", message.author.displayAvatarURL)
    .setTimestamp()
    .addField("Solo:", stripIndents`**- Victoires:** ${solo.wins}
    **- KD:** ${solo.kd}
    **- Kills:** ${solo.kills}
    **- Kills par game:** ${solo.kills_per_match}`, true)
    .addField("Duo:", stripIndents`**- Victoires:** ${duo.wins}
    **- KD:** ${duo.kd}
    **- Kills:** ${duo.kills}
    **- Kills par game:** ${duo.kills_per_match}`, true)
    .addField("Squad:", stripIndents`**- Victoires:** ${squad.wins}
    **- KD:** ${squad.kd}
    **- Kills:** ${squad.kills}
    **- Kills par game:** ${squad.kills_per_match}`, true)
    .addField("Total:", stripIndents`**- Victoires:** ${lifetime.wins}
    **- KD:** ${lifetime.kd}
    **- Kills:** ${lifetime.kills}`, false);

await message.channel.send(embed);

};

module.exports.config = {
    name: "fortnite",
    aliases: ["ft"],
    description: "Fortnite API.",
    usage: "s+fortnite",
    accessableby: "Members"
};
