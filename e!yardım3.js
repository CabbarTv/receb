const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("kulanıcı Komutları;")
  .setColor("RANDOM")
  .setDescription("l!afk • Komut ve afk sebebini yazarsanız afk moda geçersiniz.\nl!geldim • Afk Modundan Çıkmanızı Sağlar.\nl!kullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.\n", true)
  .setFooter("♥️ 2018 ♥ HY3PER ♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/437149104402071556/438925804005752832/aragami_icon_by_andonovmarko-dajaa1o.png")
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'yardım4',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım4'
};

