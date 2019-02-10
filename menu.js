const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Ana Yemekler")
  .setAuthor("YEMEK MENUSU" , "https://img.monocle.com/radio/shows/the-menu-final-5718a9900140e.jpg?w=640&h=640")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription('l!hamburger\n')
  .setFooter("♥️ 2018 ♥ The Light ♥ BOT ♥️ 0.0.1 V ♥", "https://img.monocle.com/radio/shows/the-menu-final-5718a9900140e.jpg?w=640&h=640")
  .setThumbnail("https://img.monocle.com/radio/shows/the-menu-final-5718a9900140e.jpg?w=640&h=640")
 
  .setTimestamp()
  .addField("Meşrubatlar", "l!çay\n", true)
  
  .addField("Ek seyler ", "l!sigara \n", true)
  
 
  .addField("Yemek", "l!çorba\n", true)
  
  .addField("Tatli", "l!pasta\n", true)
  
  .addField("Salata", "l!salata \n", true)
  

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['menu,yemek,yemekmenu,'],
  permLevel: 0
};

exports.help = {
  name: 'menu',
  description: 'menu',
  usage: 'menu'
};
