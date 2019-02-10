exports.run = async (client, msg, args) => {
  let kufur=[
    "",
    "Senin Sucuğun 31 Santim :banana: Ne Kadar Cünüpsün Oğlum Git Bi Duş Al",
    "Senin Sucuğun 52 Santim :banana: Ne Kadar Cünüpsün Kızım Git Bi Duş Al",
	"Senin Sucuğun 99 Santim :banana: Ne Kadar Uzun Bi Sucuğun Var Yavrum Coni Sins'in Sucuğu Bile O Kadar Değil",
    "Senin Sucuğun 46 Santim :banana:",
	"Senin Sucuğun 23 Santim :banana:",    
	"Senin Sucuğun 17 Santim :banana:",
	"Senin Sucuğun 9 Santim :banana:",
	"Senin Sucuğun 5 Santim :banana:",
	"Senin Sucuğun -5 Santim. [Yani Amın Var xD]",
	"Senin Sucuğun 4 Santim :banana:",
	"Senin Sucuğun 35 Santim :banana:",
	"Senin Sucuğun 33 Santim :banana:",
	"Senin Sucuğun 21 Santim :banana:",
	"Senin Sucuğun 28 Santim :banana:",
	"Senin Sucuğun 13 Santim :banana:",
	"Senin Sucuğun 12 Santim :banana:",
	"Senin Sucuğun 46 Santim :banana:",
	"Senin Sucuğun 51 Santim :banana:",
	"Senin Sucuğun 7 Santim :banana:",
	"Senin Sucuğun 10 Santim :banana:",
	"Senin Sucuğun 25 Santim :banana:",
	"Senin Sucuğun 3 Santim :banana:. Git Bi 31 Çek Gelde Belki Uzar",
	"Senin Sucuğun 11 Santim :banana:",
	"Senin Sucuğun 28 Santim :banana:",
	"Senin muzun 37 Santim :banana:",
  ]
     let member = msg.mentions.members.first()
   if(!member)return msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: (':no_entry_sign: Ya geçerli birini etiketle ya da Kendi Sucuğunu Öğrenmek İstiyosan Knedini Etiketle.')
}});
  if(member.id === "427884522068246539")return msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: (`:no_entry_sign: Hoop! Birşeyler ters gitti Receb'in Sucuğu Gizli Yarram!`)
}})
  if(member.id === "380817516252889109")return msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: (`:no_entry_sign: Hoop! Orda durucan Yapımcımın Sucuğunu Öğrenemezsin.`)
}})
  if(member.id === client.user.id){
    msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: (`:no_entry_sign: Beni mi kandırcan orospu çocuğu ?`)
}})
  }
  else{
  msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: (`${member} ${kufur[Math.floor(Math.random() * 16)]}.`)
  }})
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
 };
 
exports.help = {
  name: 'sucuğum',
  description: 'NSFW bir resim gösterir.',
  usage: 'sucuğum'
 }