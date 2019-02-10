const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setTitle("Bot Davet")
  .setAuthor("The Light | Bilgi", "https://cdn.discordapp.com/attachments/419155895398825984/419876730006929428/cce1e65f9511629a3366a8e163f71365--letter-logo-logo-design.jpg")
  .setColor("RANDOM")
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("♥️ 2018 ♥️ The Light ♥️ BOT♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/419155895398825984/419876730006929428/cce1e65f9511629a3366a8e163f71365--letter-logo-logo-design.jpg")
  .setThumbnail("https://cdn.discordapp.com/attachments/419155895398825984/419876730006929428/cce1e65f9511629a3366a8e163f71365--letter-logo-logo-design.jpg")
  .setTimestamp()
  .setURL("")
  .addField("Bot Davet",
    "This is a field value, it can hold 2048 characters.")
  .addField("Inline Field", "They can also be inline.", true)
  .addBlankField(true)
  .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};
