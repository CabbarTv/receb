const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .addField("❯ Sunucu Adı ",
    "🔸HSG Ailesi🔸")
  .setAuthor("Yeni Partner", "https://cdn.discordapp.com/icons/390156673190199298/d3da3f619fdac8013f015c2856308a81.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor('RANDOM')
  .setFooter("©️ 2018 | Anlox BOT", "https://i.hizliresim.com/PlaDk7.png")
  .setThumbnail("https://cdn.discordapp.com/icons/390156673190199298/d3da3f619fdac8013f015c2856308a81.jpg")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .addField("❯ Sunucu Açıklaması ",
    "HistoryGame Ailesinin Bol Eğlenceli Bol Çekilişli Resmi Sunucusudur. Hepinizi Bekliyoruz.")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("❯ Sunucu Sahibi", "", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("❯ Sunucu Linki", "", true);
  message.delete()
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'partnerkomudu',
  description: 'Botun pingini gösterir.',
  usage: 'part'
};