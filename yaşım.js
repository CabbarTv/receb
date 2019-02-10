const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let yasim = args.slice(0).join(' ');
        if (yasim.length < 1) {
		return message.reply('**Yaşının**,kaç olduğunu **__Yazman__** Lazim ');
			} else {
        message.member.setNickname(`${message.author.username} [${yasim}]`);
        const yasm = new Discord.RichEmbed()
        .setDescription(`${message.author.username} [${yasim}] Olarak Degistrildi`)
        return message.channel.sendEmbed(yasm)
      }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yas','yearsold'],
  permLevel: 0
};

exports.help = {
  name: 'yaşım',
  description: 'YAS Modunu ayarlar',
  usage: 'Server-daki isminin yanina yas yazar.'
}; 