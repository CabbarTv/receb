const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Ana Komutlar ;")
  .setColor("RANDOM")
  .setDescription('l!davet • Botun davet linkini atar.\n \nl!botbilgi• BOT HAKKINDA BİLGİ VERİR. \n \nl!ping • Botun pingini gösterir.\n \nl!sunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\n \nl!tavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.\n')
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
  name: 'yardım1',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım1'
};

