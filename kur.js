const Discord = require('discord.js');


exports.run = (client, message, params) => {
    if(message.author.id === "427884522068246539") {
        
        message.channel.send(':1234: **TheRenk Botu için Gerekli Şeyler Kuruluyor...**');
        
        message.guild.createChannel('tr-mod-log');
        
        message.channel.send(':white_check_mark: **Herşey Kuruldu**');
        
    } else {
        message.channel.send(':x: **Üzgünüm Ama Bu Komutu Şimdilik Kullanamazsınız!**');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kur',
  description: 'Sunucu Hakkında Bilgi Verir.',
  usage: 'sunucubilgi'
};