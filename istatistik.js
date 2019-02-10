const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("asciidoc", `☼ Çalışma Sürem ☼

》 Çalışma süresi   :: ${duration}`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çalışma-sürem',
  description: 'Botun istatistik gösterir.',
  usage: 'çalişma-surem'
};