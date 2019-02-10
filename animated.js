const Discord = require('discord.js');

exports.run = (client, message, args) => {
	
	client.on('message', function() {
	
	var interval = setInterval (function () {
	
	client.user.setStatus('dnd');
	client.user.setGame('Receb <3');
	client.user.setStatus('online');
	client.user.setGame('Receb');
	
      }, 1 * 1000);
	
});

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['statusanim','durumanim'],
  permLevel: 4
};

exports.help = {
  name: 'Status Animated',
  description: 'Status haraket modunu ayarlar',
  usage: 'Server-daki status haraket eder.'
}; 