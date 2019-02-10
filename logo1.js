const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [yazi, boyut] = args.join(" ");
  if(!boyut) {
    [yazi, boyut] = ["180", yazi];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);

  if(yazi.length > 14 || boyut.length > 4) return msg.edit("Max Length: 22 Characters. Soz.").then(msg.delete.bind(msg), 2000);
  const url = `http://mynamepics.in/result_display.php?name=${encodeURIComponent(yazi)}&name2=&id=557`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["logo1"]
};

exports.help = {
  name: 'logo1',
  description: 'Basit bir logo yapar.',
  usage: 'logo1'
};
