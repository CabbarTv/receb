const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Ana Komutlar ; l!yardım1")
  .setAuthor("The Light", "https://cdn.discordapp.com/attachments/440426022584975371/440759569589862420/images_5.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription('Ana Komutları Gösterir\n')
  .setFooter("♥️ 2018 ♥ The Light ♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/437149104402071556/439097610905583617/aragami_icon_by_andonovmarko-dajaa1o.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/440426022584975371/440759569589862420/images_5.jpg")
 
  .setTimestamp()
  .addField("Moderatör Komutları ; l!yardım2", "Moderötör Komutlarını Gosterir\n", true)
  
  .addField("Eğlence Komutları ;l!yardım3", "Eglence Komutlarını Gosterir\n", true)
  
 
  .addField("Kullanıcı Komutları ; l!yardım4", "Kullanıcı Komutlarını Gösteriri\n", true)
  
  .addField("Partner Komudu l!p ;", "partner sunucuları gor \nsende Yapımcıma ulasarak partner olabılırsın \n", true)
  
  .addField("**giriş cikiş ve kayit ;", "giriş cikiş ve kayit için - bot-log adlı kanal olusturman yeterli \n**", true)
  

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım'
};
