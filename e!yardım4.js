const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("kulanıcı Komutları;")
  .setColor("RANDOM")
  .setDescription("l!alkış • Etiketlediğiniz kişiyi alkışlar.\nl!söv • Etiketlediğiniz kişiye söver.\nl!yaz • Bota istediğiniz şeyi yazdırır.\nl!wtf • wtf gif atar\nl!banned • Dene Ve Gör \nl!avatar •  avatarını s gosterir \nl!ascii yazi • yazdıgın yazıyı ascii formatına \nl!çekiç  •  Etikeledigin kişiye çekiç atar\nl!nf gif atar kurcalama fala \nl!menu - yemek menusu", true)
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
  name: 'yardım3',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım3'
};

