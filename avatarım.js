const Discord = require('discord.js');
exports.run = function(client, message, args) {
const embed = new Discord.RichEmbed()

    .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor('RANDOM')
    .setFooter("©️ 2018 | TheRenk BOT", "")
    .setImage(message.author.avatarURL)
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
  
    message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatarım',
  description: 'Botun pingini gösterir.',
  usage: 'avatarım'
};
