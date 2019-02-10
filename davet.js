const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Davet Edip Bana Yardımcı Olmak İçin Bana Tıklayabilirsin :)")
  .setAuthor("The Light", "")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription("The Light botu sunucunuza ekleyip The Light BOT'una Yardım Etmiş Olursunuz Ve Eğlenceli Komutlara Sahip Olursunuz. ♥ ")
  .setFooter("♥️ 2018 ♥ The Light ♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/416104849701339136/430973516117049344/image.png")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discordapp.com/oauth2/authorize?client_id=542318752210092036&scope=bot&permissions=-1')
  
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};
