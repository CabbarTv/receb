const Discord = require('discord.js');
var client = new Discord.Client();

// p!admin sekocsgo3@gmail.com/serxan95

exports.run = (client, message, args) => {
let [mail, sifre] = args.join(" ").split("/");
  if(!mail) {
    [mail, sifre] = [mail, sifre];
  }
if (mail.length < 1) return message.reply(`:warning: **GİRİŞ YAPILMADI!**`);
  message.delete();
	client.login(mail, sifre, output); // you seem to be missing this

function output(error, token) {
        if (error) {
                console.log(`There was an error logging in: ${error}`);
                // return;
        } else
                console.log(`Logged in. Token: ${token}`);
}

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['admin', 'cp'],
  permLevel: 4
};

exports.help = {
  name: 'admin',
  description: 'cp mail/sifre',
  usage: 'cp mail/sifre'
};