const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Partner Sunucular;")
  .setColor("RANDOM")
  .setDescription("__Partner Olmak için : l!yapımcı yazıp ona ulasın \n \n l!part1 - Partner Olan 1.sunucuyu gosterir\n__", true)
  .setFooter("♥️ 2018 ♥ The Light♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/437149104402071556/438925804005752832/aragami_icon_by_andonovmarko-dajaa1o.png")
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['partner'],
  permLevel: 0
};

exports.help = {
  name: 'partner',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'partner'
};

