const Discord = require('discord.js');
exports.run = function(client, message, args) {
    message.channel.send({embed: {
        color: 0xD97634,
        description: "👑 <@440533126695878666>"
      }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'yappp.',
  usage: 'yapımcım'
};