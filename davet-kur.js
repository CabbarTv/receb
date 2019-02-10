const Discord = require('discord.js');

exports.run = function(client, message, args) {

// MSeko - 372856591990521858 Wigq8NUdSKF8STFLqoPy9ixlThZCG-np7ohijJexq81jcuepaAjqSNLrCRWqEyGTlkQw
// Faceit Administrator - 372862295295918137 cWBiI2pbYEvgiAyFX2vWP0W_UXM1oAHxBpbIUrefKdKVBQoymBDRsd6rlG-BA3K4auf8
// Duyuru - 372998310702743552 GahmMwROvpBb8bo5taYevsK6SQPcZynhJWJAM3ozBHmeTQMA2IacvzJKpskTJSSMCm-j

  // Create a new webhook
const hook = new Discord.WebhookClient('372862295295918137', 'cWBiI2pbYEvgiAyFX2vWP0W_UXM1oAHxBpbIUrefKdKVBQoymBDRsd6rlG-BA3K4auf8');
let [botid, botpermission] = args.join(" ").split("|");
if(!botpermission) {
  [botid, botpermission] = [botid, "401812495"];
}
let rnd = Math.floor((Math.random() * 39) + 1);

if(botid.length > 20 || botpermission.length > 10) return msg.edit(":bell: Kullanim: .davet-kur Client ID|Bot Yetkisi").then(msg.delete.bind(msg), 2000);
// https://discordapp.com/oauth2/authorize?client_id=368724640094355467&scope=bot&permissions=401812495
const invitelink = `https://discordapp.com/oauth2/authorize?client_id=$encodeURIComponent(botid)}&scope=bot&permissions=${encodeURIComponent(botpermission)}`;
hook.send(invitelink);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['create-link'],
  permLevel: 0
};

exports.help = {
  name: 'davet-kur',
  description: 'Botunuzun davet linkini kurar.',
  usage: 'davet-kur'
};
