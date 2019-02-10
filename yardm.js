const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Ana Komutlar")
  .setAuthor("TheRenk", "https://cdn.discordapp.com/attachments/416104849701339136/430973516117049344/image.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setDescription('tr!davet • Botun davet linkini atar.\ntr!botbilgi• Bakımdtr!.\ntr!partner • Botun partner olduğu sunucuları atar.[Partnerler Eklenicek!]\ntr!ping • Botun pingini gösterir.\ntr!sunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\ntr!tavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.\n')
  .setFooter("♥️ 2018 ♥ TheRenk ♥ BOT ♥️ 0.0.1 V ♥", "https://cdn.discordapp.com/attachments/416104849701339136/430973516117049344/image.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/416104849701339136/430973516117049344/image.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  
  .addField("Moderatör Komutları",
     "tr!ban • Belirttiğiniz kişiyi sunucudan banlar.\ntr!kick • Belirttiğiniz kişiyi sunucudan atar.\ntr!sustur • Belirttiğin kişiyi susturur.\ntr!temizle • Sohbeti belirttiğin sayı kadar siler.\ntr!unban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\n")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Eğlence Komutları", "tr!alkış • Etiketlediğiniz kişiyi alkışlar.\ntr!söv • Etiketlediğiniz kişiye söver.\ntr!yaz • Bota istediğiniz şeyi yazdırır.\n", true)
  .addBlankField(true)
  .addField("Kullanıcı Komutları", "tr!afk • Komut ve afk sebebini yazarsanız afk moda geçersiniz.\ntr!geldim • Afk Modundan Çıkmanızı Sağlar.\ntr!kullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.\n", true)
  .addBlankField(true)
  .addField("Müzik Komutları", "》 tr!oynat <Müzik Adı> • Seçtiğiniz Muźiği Oynatır.\n》 tr!geç • Oynatılan Şarkıyı Geçer.\n》 tr!kuyruk • Şarkı Kuyruğunun Listesini Gösterir.\n》 tr!kapat • Botun Kuyruğunu Boşaltır.(Seçilen Şarkıları Listeden Kaldırıp Ses Kanalından Çıkar.)\ntr!durdur • Oynatılan Şarkıyı Durdurur. \n》 tr!devamet • Durdurulan Şarkıyı Devam Ettirir.", true);


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
