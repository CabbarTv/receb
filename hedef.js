const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
               author: {
                   name: "HEDEFİMİZ",
                   icon_url: ""
                 },
               color: 0xD97634,
               description: `Hedef komut sayısı = __***100*** \nŞimdiki komut sayısı = 55 \nHedef Sunucu Sayısı = __***100***__ \nŞimdiki sunucu sayısı = ${client.guilds.size}`
             }});
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'hedef',
 description: 'Değişiklikleri gösterir.',
 usage: 'değişiklikler'
};
