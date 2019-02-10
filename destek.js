const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Tıkla ve destek sunucusuna ışınlan !")
  .setAuthor("Anlox", "https://i.hizliresim.com/5DNb6d.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0xff8080)
  .setDescription("Anlox bot resmi destek sunucusu.")
  .setFooter("©️ 2018 | Anlox BOT", "https://i.hizliresim.com/5DNb6d.jpg")
  .setThumbnail("https://i.hizliresim.com/5DNb6d.jpg")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discord.gg/hwmVmBH')
  
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'destek',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'destek'
};
