const Discord = require('discord.js');
exports.run = function(client, message, args) {

  if (!message.guild) {
    return message.author.send('`temizle` komutu sadece sunucularda kullanılabilir.');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send('| Kaç mesaj sileceğimi belirtmedin!')
  if (mesajsayisi > 201) return message.channel.send('🚫 | **200 adetden fazla mesaj silemem!**');
  message.channel.bulkDelete(mesajsayisi + 1);
  message.channel.send('**✅**' + mesajsayisi +' **adet mesaj sildim!**')
  message.react('✅')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
