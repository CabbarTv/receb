const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Sunucumuza gelmek İçin ! Tıklayabilirsin :)")
  .setAuthor("The Light", "")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription("Sunucumuza Gelirseniz Mutlu olurum . ♥ ")
  .setFooter("♥️ 2018 ♥ The Light ♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/416104849701339136/430973516117049344/image.png")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discord.gg/g8xuEP6')
  
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'sunucu',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'sunucu'
};
