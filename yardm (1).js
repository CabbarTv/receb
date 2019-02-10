const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

  let pages = ['[❯  Genel Komutlar](https://discord.gg/wpG8bcG)\n\n[l!tavsiye](https://discord.gg/wpG8bcG)  •  Yapımcıya tavsiye yollarsınız.\n[l!yardım](https://discord.gg/wpG8bcG)  •  Botun Komutlarını Gösterir.\n[l!pp](https://discord.gg/wpG8bcG) •  Etiketledğiniz Kişinin Avatarını Verir.\n[l!,sunucubilgi](https://discord.gg/wpG8bcG)  •  Sunucu Hakkında Bilgi Verir.\n[l!ping](https://discord.gg/wpG8bcG) • Botun Pingini Gösterir.• Etiketlene kişinin hakkında bilgi verir.\n[ l!avatar](https://discord.gg/wpG8bcG)  • Etiketlediğiniz Kullanıcının Avatarını Verir.\n[ l!istatistik](https://discord.gg/wpG8bcG) • Botun istatistiklerini Göstir.\n[ l!davet](https://discord.gg/wpG8bcG)  •   Botun Davet Linkini Atar.','[❯  Destek Sistemimiz](https://discord.gg/wpG8bcG)\n\n`çağrılar` adında bir kanal açın.\n[ l!çağır](https://discord.gg/wpG8bcG) •Desteği Çağırır.\n[ l!bildir](https://discord.gg/wpG8bcG) •  Bildiriniz Yetkililere Gönderir.','[❯  Eğlence Komutları](https://discord.gg/wpG8bcG) \n\n [l!1vs1](https://discord.gg/wpG8bcG) •  Seçtiğiniz 2 kişiyi savaştırırsınız.\n[ l!tokat](https://discord.gg/wpG8bcG) •  İstediğiniz kişiye tokat atar.\n[ l!aletim](https://discord.gg/wpG8bcG) •  Aletinizin kaç cm olduğunu ölçer.\n[ l!geleceğim](https://discord.gg/wpG8bcG) • Geleceğinizi Söyler.\n[ l!sor](https://discord.gg/wpG8bcG) •  Bota Sorular Sorarsınız.\n[ l!taş-kağıt-makas](https://discord.gg/wpG8bcG) •  Bot İle Taş-Kağıt-Makas Oynarsınız.\n[ l!günaydın](https://discord.gg/wpG8bcG)  •  Günaydın Gifi Atar.\n[ l!yaz](https://discord.gg/wpG8bcG)  •  Bota Yazı Yazdırırsınız.\n[ l!merhaba](https://discord.gg/wpG8bcG) • Merhaba Gifi Atar.','[❯  Moderatör Komutları](https://discord.gg/wpG8bcG)\n\n[ l!yasakla](https://discord.gg/wpG8bcG) • Birini Sunucudan Yasaklar.\n[ l!unban](https://discord.gg/wpG8bcG) •  (İD ile)Birinin Yasağını Açar.\n[ l!at](https://discord.gg/wpG8bcG) •   Birini Sunucudan Atar.\n[ l!sil](https://discord.gg/wpG8bcG) •  Belirtilen Sayı Kadar Mesaj Siler.\n[ l!uyar](https://discord.gg/wpG8bcG)  • Belirtilen Kişiye `@Uyarıldı` Rolü Verir.\n[ l!sustur](https://discord.gg/wpG8bcG) • Belirtilen Kişiyi `@Susturulmuş` Rolü Verir.\n[ l!duyuru](https://discord.gg/wpG8bcG) •  Güzel Bir Duyuru Görünmü Sağlar.\n[ l!anket](https://discord.gg/wpG8bcG) • Anket açarsınız','[❯  Admin Komutları](https://discord.gg/wpG8bcG) \n\n [l!ayrıl](https://discord.gg/wpG8bcG) • Belirtilen sunucudan botu çıkartır.\n[ l!eval](https://discord.gg/wpG8bcG) • JS kodu dener.\n[ l!unload](https://discord.gg/wpG8bcG) • Bir komutu devre dışıbırakır.\n[ l!load](https://discord.gg/wpG8bcG) •  Devredışı bir komutu yeniden başlatır.\n[ l!reboot](https://discord.gg/wpG8bcG) •  Botu yenidenbaşlatır.\n[ l!reload](https://discord.gg/wpG8bcG) •  Bir komutu yeniden başlatır.\n[ l!sunucular](https://discord.gg/wpG8bcG) • Botun bulunduğu sunucuları gösterir.']; // Sayfalar
  let page = 1; // Sayfa 1

  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(message.guild.name,client.user.avatarURL)
  .setFooter(`© 2018 The Light|Sayfa ${page} / ${pages.length}`,client.user.avatarURL)
  .setThumbnail(client.user.avatarURL)
  .setDescription(pages[page-1])
  .setAuthor(message.guild.name,client.user.avatarURL)
message.channel.send(embed).then(msg => {

    msg.react('⬅').then(r => {
      msg.react('➡')

      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`© 2018 The Light|Sayfa ${page} / ${pages.length}`,client.user.avatarURL)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`© 2018 The Light|Sayfa ${page} / ${pages.length}`,client.user.avatarURL)
        msg.edit(embed)
      })

    })
  })
};


exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["yardıme,ey,emojiliyardım,ej,"],
permLevel: 0
};

exports.help = {
name: 'yardıme',
description: 'Yardım Listesini Gösterir.',
usage: 'yardıme'
};