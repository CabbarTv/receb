const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("Afk Modu! \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .addField('Şu Kullanıcı Afk Moduna Geçti =>', message.author.username + '#' + message.author.discriminator)
  .addField('Afk Modundan Çıkmak Için **tr!geldim** Komutunu Kullanabilirsin')
  .setFooter("♥ 2018 ♥ TheRenk ♥ BOT ♥ V1 ♥", " ")
  message.delete();
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['afk,afkol'],
  permLevel: 0
};

exports.help = {
  name: 'afk..',
  description: 'Botun pingini gösterir.',
  usage: 'afk.. [duyuruda yazıcak şey]'
};