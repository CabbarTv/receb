const Discord = require('discord.js');
let talkedRecently = new Set();

function get_random(list) {
  return list[Math.floor((Math.random() * list.length))];
};

exports.run = (client, message, args) => {
	
        if (!message.guild) {
        return message.author.send("Bu komutu lütfen bir sunucuda deneyin."); }

        if (message.channel.type !== 'dm') {

  var pokemon = ["Venasaur","Squirtle","Charmeleon ","Charizard ","Blastoise","Beedrill ","Pidgey","Arbok","Pikachu","Nidoqueen","Jigglypuff","Meowth","Haunter","Kangaskhan ","Gyarados","Umbreon","Grovyle"];
  var poke = get_random(pokemon);

  message.channel.send("Pokemon Yakalanıyor :D ...").then(async msg => {
    
            setTimeout(() => {
    
                msg.edit(`**${message.author.username}** Bir Adet \**${poke}\** Yakaladın Tebrik Ederim !`);
    
            }, 1100);

    });

  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`pokemon-yakala`,`poke`,`pokemon`],
  permLevel: 0
};

exports.help = {
  name: 'pokemon',
  description: 'Pokemon Yakalar',
  usage: 'pokemon'
};

            
                                