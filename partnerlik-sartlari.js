const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("TheRenk BOT ! \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .addField('**1.** `BOT^unuzun En Az 60 Sunucuda Ekli Olması Lazım`')
  .addField('**2.** `Botunuzda Sizde Bizi Partner Yapıcaksınız!`')
  .addField('**3.** `Eğer Botunuzdan Partnerliğimizi Silerseniz Partnerlik Iptal Olur!`')
  .addField('**4.** `BOT^umuzu Sunucunuza Eklemelisiniz!`')
  .addField('**YUKARDAKI KURALLARA UYULMADIGI TAKDIRDE PARTNERLIK IPTAL OLUR!!!**')
  .setFooter("♥ 2018 ♥ TheRenk ♥ BOT ♥ 0.0.1 V ♥", " ")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'partnerlik-şartları',
  description: 'Botun pingini gösterir.',
  usage: 'partnerlik-şartları'
};