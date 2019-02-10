const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Moderötör Komutları  ;")
  .setColor("RANDOM")
  .setDescription('l!ban • Belirttiğiniz kişiyi sunucudan banlar. \n \nl!kick • Belirttiğiniz kişiyi sunucudan atar. \n \nl!sustur • Belirttiğin kişiyi susturur.\n \nl!temizle • Sohbeti belirttiğin sayı kadar siler.\n \nl!unban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\n')
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
  name: 'yardım2',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım2'
};

