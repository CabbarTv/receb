const Discord = require('discord.js');
const Jimp = require('jimp'); 

exports.run = (client, message, args) => {
      let users = client.users;
      let searchTerm = args[0];
      if(!searchTerm) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kullanıcı ara;').setDescription(message.author.tag + ', kullanım: tr!kullanıcı-ara <mesaj>.').setFooter('TheRenk', client.user.avatarURL).setTimestamp());
      let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
      message.channel.send(`Arama sonuçları;\n~》` + matches.map(u => u.tag).join(',\n~》 '));
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say', 'söyle'],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcı-ara',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
