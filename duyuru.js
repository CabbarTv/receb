const Discord = require('discord.js');

exports.run = (client, message, args) => {
	
        if (!message.guild) {
        return message.author.send("Bu komutu özel mesajlarda kullanamazsın."); }

        if (message.channel.type !== 'dm') {
			
  if (message.member.hasPermission("MANAGE_MESSAGES")) {

	  let broadcastt = args.slice(0).join(' ');
    	if (broadcastt.length < 1) return message.channel.send('**' + message.author.username + '** duyuruya ne yazmamı istersin?');
       
      message.delete();


        const broadcast = new Discord.RichEmbed()
  
            .setDescription(broadcastt)

        return message.channel.sendEmbed(broadcast)

  } else {
  
      message.channel.send("Yetkin yok!")
  }
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuru','bc'],
  permLevel: 0
};

exports.help = {
  name: 'duyuru',
  description: 'Duyuru yaparsınız.',
  usage: 'duyuru'
};