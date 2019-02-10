const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`uyar` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('`✋ mod-log` kanalını bulamıyorum.');
  if (reason.length < 1) return message.reply('Uyarı sebebini yazmalısın.');
  if (message.mentions.users.size < 1) return message.reply('Kimi uyaracağını yazmalısın.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setAuthor("TheRenk | Moderatör", "https://cdn.discordapp.com/attachments/419155895398825984/419876730006929428/cce1e65f9511629a3366a8e163f71365--letter-logo-logo-design.jpg")
  .setThumbnail(user.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField('》 Eylem:', 'Uyarı verme')
  .addField('》 Kullanıcı:', `${user.username}#${user.discriminator}`)
  .addField('》 Yetkili:', `${message.author.username}#${message.author.discriminator}`)
  .addField('》 Sebep:', reason);
  message.delete();

  return guild.channels.get(modlog.id).sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'uyar',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar [kullanıcı] [sebep]'
};
