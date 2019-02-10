const Discord = require('discord.js');


exports.run = (client, message, args) => {
    if(message.author.id === "427884522068246539") {
    let kanalisim = args.slice(0).join(' ');
    if(!kanalisim) return message.channel.send(':x: **Lütfen Bir Kanal İsmi Yazın.**');

        message.guild.deleteChannel(`${kanalisim}`);

        message.channel.send(`${kanalisim} Adlı Kanal Oluşturuldu !`);

    } else {
        message.channel.send(':x: **Üzgünüm Ama Bu Komutu Şimdilik Kullanamazsınız!**');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalsil',
  description: 'Sunucu Hakkında Bilgi Verir.',
  usage: 'sunucubilgi'
};