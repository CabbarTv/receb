const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const yt = require('ytdl-core');
const sql = require('sqlite');
sql.open('./score.sqlite');
require('./util/eventLoader')(client);
const prefix = 'l!';
const allowedUsers = ayarlar.allowedUsers;
const roles = ayarlar.roleToDisco;
const disco = new Discord.Client();

//////////////////////////////////////////////////////////////

//Bota dm atılan mesajlar
// client.on("message", message => {
//    const dmchannel = client.channels.find("name", "bota-dm");
//    if (message.channel.type === "dm") {
//        if (message.author.id === client.user.id) return;
//        dmchannel.sendMessage("", {embed: {
//                color: 3447003,
//                title: `BİR SAPIK YAKALANDI EFENDİM / DM: ${message.author.tag}`,
//                description: `BUYUR ABE: ${message.content}`
//              }})


//client.on("message", msg => {
//if (msg.content.toLowerCase().match(/(http|.com|discord.gg|discordapp.com)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
 //   msg.delete(30).then(deletedMsg => {
 //     deletedMsg.reply("Reklam Engellendi. :shield:").catch(e => {
//        console.error(e);
//    }).catch(e => {
//	  });
 //    console.error(e);
 //   });
 // }
//});

/*


 client.on("message", msg => {
  if (msg.content.toLowerCase().match(/(annan|amuq | sokuk | pic | ananı yarrak  sokarak  sikiyim | göt| amına  soktuğumsikerim|sik|yaram|yarram|orosbu|orospu|orspu|orsbu|am|amcık|aneni|sikerler|Oç|öç|orrospu|Fuck|mother|fucker|Annenizi|sikerim|annenize|sokarım|sok|sokmak|sokarlar|sokarim|ibine|ibne|meme|amını|yalarım|bacını|sakso|porno|sex|seks|31|döl|dol|brazzers|porn|brazers|hub|fake|taxi|cocugu|cocukları|amını|götünü|göt|gotoş|götoş|götos|gotos|sik|sık|amk|aq|ak|mq|ameka|nah|yarrak|bandik|orta|parmak|puşt|pezewenk|pezevenk|Veled|Kudur|Zaa|Reg|amuna|çaktığım|amcık|oglu|oğlu|enay|gay|top|toppik)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
     msg.delete(30).then(deletedMsg => {
       deletedMsg.reply("KÜFÜR Engellendi. :shield:").catch(e => {
         console.error(e);
       });
     }).catch(e => {
     console.error(e);
     });
  }
});
*/
//////////////////////////////////////////////////////////////

//fs.readdir("./komutlar/", (err, files) => {
//
//  if(err) console.log(err);
//
//  let jsfile = files.filter(f => f.split(".").pop() === "js")
//  if(jsfile.length <= 0){
//    console.log("Komut bulunamadı!");
//    return;
//  }
//
//  jsfile.forEach((f, i) =>{
//    let props = require(`./komutlar/${f}`);
//    console.log(`${f} dosyası başarıyla yüklendi!`);
//    bot.commands.set(props.help.name, props);
//  });
//
//});


/////////////////////////////////////////////////////////////////


///////////////////////
// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription(' | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('| Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**? | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Blind Bot | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('<| **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription(' | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' | **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('< | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('** | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('**| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('**| Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle(' | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("| **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Blind Bot | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(" | **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Blind Bot | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send(' | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("** | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(` **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(` **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(` **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Blind| ?? Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}

//////////////////


const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    }); 
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if(command === "çevir") {
    var translate = require('node-google-translate-skidz');
    let targetLang = args[0];
    if(!targetLang) return message.channel.send(":no_entry_sign: Ne yazacağını demelisin **m!translate tr merhaba** gibi.");
    if(targetLang.length > 2) return message.channel.send(":no_entry_sign: Lütfen bir dil gir **tr, en** gibisinden.");
    var translateText = args.slice(1).join(" ");
    if(!translateText) return message.channel.send(`:no_entry_sign: Çevirmek istediğiniz "${targetLang}" dili yazın..`);

    translate({
      text: translateText,
      target: targetLang
    }, function(result) {
      var translatedText = result.translation
      const embed = new Discord.RichEmbed()
      .setAuthor(`Çeviri`, message.author.avatarURL)
      .setColor(0x00AE86)
      .addField("Mesaj:", "**" + translateText + "**")
      .addField(`Çevrilen Mesaj: ${targetLang}`, "**" + translatedText + "**")
      .setFooter(`${message.author.tag} tarafından istendi!`, client.user.avatarURL)
      message.channel.send({embed})
        .catch(error => message.channel.send(`Üzgünüm ${message.author.tag} Sana embed şeklinde yollayamıyorum: ${error}`))
    });
  }
})

client.on('guildCreate', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Sunucuya katıldı;')
  .setDescription(`Bot, 》${guild.name}《 adlı sunucuya katıldı [${guild.memberCount} üye]!`)
  .setFooter('The Light', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('410451498259185667').send(embed);
});

client.on('guildDelete', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Sunucudan ayrıldı;')
  .setDescription(`Bot, 》${guild.name}《 Sunucdan Ayrıldı Uzulme\n Daha Guclu Askerlerimiz var \n 1 olur 1000 diriliriz [${guild.memberCount} üye]!`)
  .setFooter('The Light', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('410451498259185667').send(embed);
});

client.on('roleCreate', role => {
  const channel = role.guild.channels.find('name', '👤●│bot-log│●👤');
  if (!channel) return role.guild.createChannel('👤●│bot-log│●👤');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Rol oluşturuldu;')
  .setDescription(`"${role.name}"** Bu rolu Neden olusturdun abe \n Merak ettimDE !**`)
  .setFooter('The Light', client.user.avatarURL)
  .setTimestamp()
  channel.send(embed);
});

client.on('roleDelete', role => {
  const channel = role.guild.channels.find('name', '👤●│bot-log│●👤');
  if (!channel) return role.guild.createChannel('👤●│bot-log│●👤');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Rol silindi;')
  .setDescription(`"${role.name}"** Rol Silindi \n Biyanlısklı yapma abe\n Gozunu yiyem **`)
  .setFooter('The Light', client.user.avatarURL)
  .setTimestamp()
  channel.send(embed);
});

client.on('channelDelete', chnnl => {
  const channel = chnnl.guild.channels.find('name', '👤●│bot-log│●👤');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Kanal silindi;')
  .setDescription(`"${chnnl.name}" Tuh Gecende Sukruyle Konusuyoduk\n Bu kanalda Birisi Kanali Sildi!`)
  .setFooter('The Light', client.user.avatarURL)
  .setTimestamp()
  channel.send(embed);
});

client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find(r => r.name.startsWith('Üye')));
  const channel = member.guild.channels.find('name', '👤●│bot-log│●👤');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye katıldı;')
 .setDescription(`Sunucuya katıldı Abe \nBi Çay Soleyemmi Ona \n [${member.guild.memberCount} Asker Olduk Abe ]!`)
 .setFooter('The Light', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
 
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', '👤●│bot-log│●👤');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('[${member.guild.name} ')
 .setDescription(`** Sunucdan Ayrıldı Uzulme**\n** Daha Guclu Askerlerimiz var** \n** 1 olur 1000 diriliriz **\n** [${member.guild.memberCount} Asker Kaldi Abe]**!`)
 .setFooter('The Light', client.user.avatarURL)
 .setFooter('The Light', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
 
});

client.on('guildMemberAdd', member => {
  const hg = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .setTitle("Bu Sunucuda The Light Kullanılmakta Davet Etmek İçin Tikla ")
  .setDescription(`** ${member.guild.name} Sunucsuna Katıldın HoşGeldin** :wave:\n\n [❯  The Light Botun Sunucusu Gitmek İçin Tikla](https://discord.gg/cGt7Kwn)`)
  .setFooter(`© The Light`)
  .setTimestamp()
  .setURL('https://discordapp.com/oauth2/authorize?client_id=542318752210092036&scope=bot&permissions=-1')
  .setColor('RANDOM')
  member.send(hg);
});

client.on('guildMemberRemove', member => {
  const bb = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .setTitle("Bu Sunucuda The Light Kullanılmakta Davet Etmek İçin Tikla ")
.setDescription(`** ${member.guild.name} Sunucsundan Ayrıldın Görüşmek Üzere ** :wave:\n\n [❯  The Light Botun Sunucusu Gitmek İçin Tikla](https://discord.gg/cGt7Kwn)`)
  .setFooter(`© The Light Bot`)
  .setTimestamp()
  .setURL('https://discordapp.com/oauth2/authorize?client_id=542318752210092036&scope=bot&permissions=-1')
  .setColor('RANDOM')
  member.send(bb);
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Amk') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'AMK') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aMK') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oc') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oc') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('oc')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('oruspu')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('pic')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('mk')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('anan')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('yarram')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('yarrak')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('amk')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  if (msg.content.toLowerCase().includes('top')) msg.reply('**Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !**');
  msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oç') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OC') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OÇ') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'pic') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Pic') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Piç') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİC') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİÇ') {
    msg.reply('Terbiyesiz Neden Kufur Ediyon Yorma Beni Kufur Etme !');
	msg.react('🖕')
	msg.delete();
  }
});




		

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    setTimeout(() => {
	msg.react('🇦');
	},500);
	setTimeout(() => {
	msg.react('🇸');
	},1000);

	}
        
if (msg.content.toLowerCase() === 'sa') {
    setTimeout(() => {
	msg.react('punch');
	},2000);
	setTimeout(() => {
	msg.react('🇭');
	},2500);
setTimeout(() => {
	msg.react('🇬');
	},3000);		
	
  
  };
  

  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('herkese günaydın')) msg.reply('**GÜNAYDIN Güzel Kardeşim Bak Ne Güzel Yaşıyorsun Şükür Et ** :)');
  if (msg.content.toLowerCase().includes('iyi geceler')) msg.reply('**SAHİDEN İYİ Mİ GECELER ?**');
  if (msg.content.toLowerCase().includes('iyi akşamlar')) msg.reply('**EYV. İYİ AKŞAMLAR**');
  if (msg.content.toLowerCase().includes('güle güle')) msg.reply('**GÜLE GÜLE CİĞERİM**');
  if (msg.content.toLowerCase().includes('canım sıkkın')) msg.reply('** :smoking: Hayırdır Be Moruk Kim Sıktı Canını Biz Burdayız Anlat**');
});

client.on('message', msg => {
if (msg.content.toLowerCase() === 'l!sigara') {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'))
.then(nmsg => nmsg.edit('**Mesajı Siliyom Kimse gormesin**'));
msg.delete();

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() ==='l!cay') {
msg.channel.send(':tea: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':tea: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':tea: :cloud:'))
.then(nmsg => nmsg.edit('Sicacik Sicacik Umarim İçin İsinmiştir'))
.then(nmsg => nmsg.edit('Afiyet olsun'))
.then(nmsg => nmsg.edit('**Çay Bitti ** | **Çayin yanında hizmetler almak için **  **l!menu**'));

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() ==='çay') {
msg.channel.send('cay degil l!çay ')


}

});

client.on('message', msg => {
if (msg.content.toLowerCase() ==='l!hamburger') {
msg.channel.send('Hemen Pişiriyorum Bekle')
.then(nmsg => nmsg.edit(':hamburger: : :cloud::cloud: :cloud:'))
.then(nmsg => nmsg.edit(':hamburger:  :cloud: :cloud:'))
.then(nmsg => nmsg.edit(':hamburger:  :cloud: '))
.then(nmsg => nmsg.edit('Hamburgerin Hazir Afiyet olsun'))
.then(nmsg => nmsg.edit('Al bakem :hamburger: '));

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() ==='l!çay') {
msg.channel.send(':tea: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':tea: :cloud::cloud: :cloud:'))
.then(nmsg => nmsg.edit(':tea: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':tea: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':tea: :cloud:'))
.then(nmsg => nmsg.edit(':tea: :cloud:'))
.then(nmsg => nmsg.edit(':tea:'))
.then(nmsg => nmsg.edit(':tea:'))
.then(nmsg => nmsg.edit('Afiyet olsun'))
.then(nmsg => nmsg.edit('Afiyet olsun'))
.then(nmsg => nmsg.edit('**Çay Bitti ** | **Çayin yanında hizmetler almak için **  **l!menu**'));

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() === 'l!pasta') {
msg.channel.send('Kekını Pısiriyom 2 dk :pancakes:  :cloud: ')
.then(nmsg => nmsg.edit('Sole Kremasınıda surem :fish_cake: '))
.then(nmsg => nmsg.edit('Ahanda Bitti Tabaga Koyup veritom'))
.then(nmsg => nmsg.edit('Fazla Yeme Ha Obozite Olursun :cake: '))
.then(nmsg => nmsg.edit(':cake: '))

}

});
client.on('message', msg => {
if (msg.content.toLowerCase() === 'l!çorba') {
msg.channel.send('Corba somus isitiyom  2 dk :shallow_pan_of_food:   :cloud: ')
.then(nmsg => nmsg.edit('Sole kaseye de dokem '))
.then(nmsg => nmsg.edit("Afiyet Olsun :ramen: "))
.then(nmsg => nmsg.edit(':ramen: '))

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() === 'l!torpil') {
msg.channel.send('Torpil Yakılıyor :fire: ')
.then(nmsg => nmsg.edit('Rakibe atılıyor :fire: '))
.then(nmsg => nmsg.edit("Rakibe Atıldı :boom: "))
.then(nmsg => nmsg.edit('Rakip ; Hay babanı ... Gotumde patladı lann :boom: :smile: '))

}

});

client.on('message', msg => {
if (msg.content.toLowerCase() === 'l!salata') {
msg.channel.send('dometesle salatalıgı yıkayım :potable_water: ')
.then(nmsg => nmsg.edit('Bi guzel Keseyim  :tomato: :knife: :cucumber: '))
.then(nmsg => nmsg.edit("Afiyet Olsun :salad:"))
.then(nmsg => nmsg.edit(':salad:'))

}

});





client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type !== 'text') return;

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.3 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL || message.author.defaultAvatarURL)
        .setThumbnail(message.author.avatarURL || message.author.defaultAvatarURL)
        .setTitle('Seviye yükseldi;')
        .setDescription(`Tebrikler! :tada: Level atladın ${curLevel}.`)
        .setFooter('The Light', client.user.avatarURL)
        .setTimestamp()
        message.channel.send(embed);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    });
  });
  

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  let args = message.content.split(' ').slice(1);
  let cont = message.content.slice(prefix.length).split(' ');
  let args2 = cont.slice(1);

  if (command === 'like') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Like;')
    .addField('==★==★==★==★===★==★==★==★==★==★==★==★\n░░░░░░░░░░░░░░░░░░░░░░░▄▄ \n░░░░░░░░░░░░░░░░░░░░░░█░░█ ')
	.addField('░░░░░░░░░░░░░░░░░░░░░░█░░█ \n░░░░░░░░░░░░░░░░░░░░░█░░░█ \n░░░░░░░░░░░░░░░░░░░░█░░░░█ ')
	.addField('░░░░░░░░░░░███████▄▄█░░░░░██████▄\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█')
	.addField('░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█')
	.addField('░░░░░░░░░░░▓▓▓▓▓▓█████░░░░░░░░░█ \n░░░░░░░░░░░██████▀░░░░▀▀██████▀ ')
	.addField('◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈ \n░█░░░█░█░▄▀░█▀▀░░░░▀█▀░█░█░█░▄▀▀░\n░█░░░█░█▀░░░█▀░░▄▄░░█░░█▀█░█░░▀▄░')
	.addField('░█▄▄░█░█░▀▄░█▄▄░░░░░█░░█░█░█░▄▄▀░')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'resim-değiştir') {
    if(message.author.id !== '427884522068246539') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.tag + ', kullanım: l!resim-değiştir <bağlantı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    client.user.setAvatar(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Resim değiştir;')
    .setDescription(message.author.tag + ', profil resmim başarıyla değiştirildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  if (command === 'çeviri') {
    var translate = require('node-google-translate-skidz');
    let targetLang = args[0];
    if(!targetLang) return message.channel.send(":no_entry_sign: Ne yazacağını demelisin **m!translate tr merhaba** gibi.");
    if(targetLang.length > 2) return message.channel.send(":no_entry_sign: Lütfen bir dil gir **tr, en** gibisinden.");
    var translateText = args.slice(1).join(" ");
    if(!translateText) return message.channel.send(`:no_entry_sign: Çevirmek istediğiniz "${targetLang}" dili yazın..`);

    translate({
      text: translateText,
      target: targetLang
    }, function(result) {
      var translatedText = result.translation
      const embed = new Discord.RichEmbed()
      .setAuthor(`Çeviri`, message.author.avatarURL)
      .setColor(0x00AE86)
      .addField("Mesaj:", "**" + translateText + "**")
      .addField(`Çevrilen Mesaj: ${targetLang}`, "**" + translatedText + "**")
      .setFooter(`${message.author.tag} tarafından istendi!`, client.user.avatarURL)
      message.channel.send({embed})
        .catch(error => message.channel.send(`Üzgünüm ${message.author.tag} Sana embed şeklinde yollayamıyorum: ${error}`))
    });
  }
  if (command === 'durum-değiştir') {
    if(message.author.id !== '427884522068246539') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.tag + ', kullanım: l!durum-değiştir <durum>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    client.user.setStatus(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Durum değiştir;')
    .setDescription(message.author.tag + ', durumum başarıyla değiştirildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'aktivite-değiştir') {
    if(message.author.id !== '427884522068246539') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite deği��tir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite değiştir;').setDescription(message.author.tag + ', kullanım: l!aktivite-değiştir <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    client.user.setActivity(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Aktivite değiştir;')
    .setDescription(message.author.tag + ', aktivitem başarıyla değiştirildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'bağlantılar' || command === 'linkler') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Bağlantılar;')
    .addField('Facebook:', 'Eklenecek', true)
    .addField('YouTube:', 'Eklenecek', true)
    .addField('Twitter:', 'Eklenecek', true)
    .addField('İnstagram:', 'Eklenecek', true)
    .addField('Twitch:', 'Eklenecek', true)
    .addField('Steam:', 'Eklenecek', true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'yapımcı') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Yapımcı;')
    .setDescription('<@410451498259185667>')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
		
		if (command === 'partnerbb') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Partner Olmak İçin ')
    .setDescription('+100 luk bir sunucu \n Bu sunucuda <@439759823429566465> ekli olcak \neger bu sartları karsılıyosanız \n <@410451498259185667> Basvurun')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  
  if (command === 'istatistik' || command === 'i') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('İstatistik;')
    .addField('Gecikme:', client.ping + ' ms', true)
    .addField('Kullanıcılar:', client.guilds.reduce((a, b) => a + b.memberCount, 0), true)
    .addField('Kanallar:', client.channels.size, true)
    .addField('Sunucular:', client.guilds.size, true)
    .addField('Bellek kullanımı:', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), true)
    .addField('Discord.JS sürümü:', Discord.version, true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'sunucular' || command === 'bot-sunucu') {
    const guildArray = client.guilds.array()
    while (guildArray.length) {
    const embed = new Discord.RichEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.setColor('RANDOM')
      embed.setTitle('Sunucular;')
      embed.setDescription(`Şu an ${client.guilds.size} sunucuda bulunuyorum.`)
      embed.addField(guild.name, guild.memberCount + ' üye.', true)
      embed.setFooter('The Light', client.user.avatarURL)
      embed.setTimestamp()
    }
    message.channel.send({embed: embed});
    
        };
  }
  if (command === 'profil' || command === 'profile') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil;').setDescription(message.author.tag + ', kullanım: l!profil <@kullanıcı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
      if (!row) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil;').setDescription(message.author.tag + ', hiç puanı yok.').setFooter('The Light', client.user.avatarURL));
      economy.fetchBalance(user.id).then((i) => {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(user.tag, user.avatarURL || user.defaultAvatarURL)
    .setThumbnail(user.avatarURL || user.defaultAvatarURL)
    .setTitle('Profil;')
    .addField('Puan:', row.points, true)
    .addField('Seviye:', row.level, true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
     })
   })
        };
  
  if (command === 'yapımcı-para') {
    if(message.author.id !== '427884522068246539') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yapımcı para;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
      if(message.author.id === '427884522068246539') {
    economy.updateBalance(message.author.id, parseInt(100000)).then((i) => {
      console.log('+')
    });
    } else {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Yapımcı para;')
    .setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
   }
  }
  if (command === 'maden') {
    let sayılar = Math.floor(Math.random() * 50)
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazma işi başladı!').setFooter('The Light', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %25.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %50.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %75.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %100.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazma işi bitti!').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', madenden ' + sayılar + ' ₺ kazandın!').setFooter('The Light', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === 'kullanıcı' || command === 'kullanıcı-bilgi') {
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL || message.author.defaultAvatarURL).setThumbnail(message.author.avatarURL || message.author.defaultAvatarURL).setTitle('Kullanıcı;').addField('Oyun:', message.author.presence.game ? message.author.presence.game.name : 'Oyun oynamıyor', true).addField('Kimlik:', message.author.id, true).addField('Bot:', message.author.bot ? '\n Evet' : 'Hayır', true).addField('Rolleri:', message.guild.member(message.author).roles.map(m => m.name).join(' | '), true).addField('Son gönderdiği mesaj:', message.author.lastMessage || 'Yok', true).addField('Son gönderdiği mesajın kimliği:',message.author.lastMessageID || 'Yok', true).addField('Oluşturma tarihi:', message.author.createdAt.toLocaleDateString(), true).setFooter('The Light', client.user.avatarURL).setTimestamp());
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(user.tag, user.avatarURL || user.defaultAvatarURL)
      .setThumbnail(user.avatarURL || user.defaultAvatarURL)
      .setTitle('Kullanıcı;')
      .addField('Oyun:', user.presence.game ? user.presence.game.name : 'Oyun oynamıyor', true)
      .addField('Kimlik:', user.id, true)
      .addField('Bot:', user.bot ? '\n Evet' : 'Hayır', true)
      .addField('Rolleri:', message.guild.member(user).roles.map(m => m.name).join(' | '), true)
      .addField('Son gönderdiği mesaj:', user.lastMessage || 'Yok', true)
      .addField('Son gönderdiği mesajın kimliği:', user.lastMessageID || 'Yok', true)
      .addField('Oluşturma tarihi:', user.createdAt.toLocaleDateString(), true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
        };
  
  if (command === 'profil-resmi' || command === 'pp' || command === 'avatar') {
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil resmi;').setImage(message.author.avatarURL || message.author.defaultAvatarURL).setFooter('The Light', client.user.avatarURL).setTimestamp());
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Profil resmi;')
    .setImage(user.avatarURL || user.defaultAvatarURL)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  

  if (command === 'sunucuu' || command === 'sunucu-bilgii') {
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(' ');
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle('Sunucu;')
    .addField('İsim kısaltması:', message.guild.nameAcronym, true)
    .addField('Kimliği:', message.guild.id, true)
    .addField('Bölgesi:', message.guild.region, true)
    .addField('Sahibi:', message.guild.owner, true)
    .addField('Doğrulama seviyesi:', message.guild.verificationLevel, true)
    .addField('Emojiler:', emojiList || 'Yok', true)
    .addField('Üyeler:', `${message.guild.members.filter(member => member.user.bot).size} bot / ${message.guild.memberCount} üye`, true)
    .addField('Varsayılan rol:', message.guild.defaultRole, true)
    .addField('Roller:', message.guild.roles.map(role => role.name).join(' | '), true)
    .addField('Kanallar:', `${message.guild.channels.filter(chan => chan.type === 'voice').size} sesli / ${message.guild.channels.filter(chan => chan.type === 'text').size} metin`, true)
    .addField('Kanal sayısı:', message.guild.channels.size, true)
    .addField('Ana kanalı:', message.guild.defaultChannel || 'Yok', true)
    .addField('Sistem kanalı:', message.guild.generalChannel || 'Yok', true)
    .addField('AFK kanalı:', message.guild.afkChannel || 'Yok', true)
    .addField('AFK zaman aşımı:', message.guild.afkTimeout + ' saniye', true)
    .addField('Oluşturma tarihi:', message.guild.createdAt.toLocaleDateString(), true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'att' || command === 'kickk') {
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = guild.channels.find('name', 'The Light');
    if (!modlog) return message.guild.createChannel('The Light');
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', kullanım: l!at <@kullanıcı> <sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', kullanım: l!at <@kullanıcı> sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());

    if (!message.guild.member(user).kickable) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', yetkilileri atamam.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.guild.member(user).kick();

    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sunucudan atıldın;')
      .setDescription(message.guild.name + ' adlı sunucudan atıldın.')
      .addField('Yetkili:', message.author.tag, true)
      .addField('Sebep:', reason, true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    user.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('At;')
      .setDescription(user.tag + ' adlı kullanıcı başarıyla atıldı.')
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed2);
    const embed3 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('At;')
      .addField('Kullanıcı:', user.tag, true)
      .addField('Yetkili:', message.author.tag, true)
      .addField('Sebep:', reason, true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed3);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'yasaklaa' || command === 'bann') {
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = guild.channels.find('name', 'The Light');
    if (!modlog) return message.guild.createChannel('The Light');
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', kullanım: l!yasakla <@kullanıcı> <sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', kullanım: l!yasakla <@kullanıcı> <sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());

    if (!message.guild.member(user).bannable) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', yetkilileri yasaklayamam.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.guild.ban(user, 2);

    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sunucudan yasaklandın;')
      .setDescription(message.guild.name + ' adlı sunucudan yasaklandın.')
      .addField('Yetkili:', `${message.author.tag}`, true)
      .addField('Sebep:', reason, true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    user.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yasakla;')
      .setDescription(user.tag + ' adlı kullanıcı başarıyla yasaklandı.')
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed2);
    const embed3 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yasakla;')
      .addField('Kullanıcı:', `${user.tag}`, true)
      .addField('Yetkili:', `${message.author.tag}`, true)
      .addField('Sebep:', reason, true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed3);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'uyar') {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
      let guild = message.guild
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      let modlog = guild.channels.find('name', 'The Light');
      if (!modlog) return message.guild.createChannel('The Light');
      if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', kullanım: l!uyar <@kullanıcı> <sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', kullanım: l!uyar <@kullanıcı> <sebep>.').setFooter('The Light', client.user.avatarURL).setTimestamp());

      const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Sunucuda uyarıldın;')
        .setDescription(message.guild.name + ' adlı sunucuda uyarıldın.')
        .addField('Yetkili:', message.author.tag, true)
        .addField('Sebep:', reason, true)
        .setFooter('The Light', client.user.avatarURL)
        .setTimestamp()
      user.send(embed);
      const embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Uyar;')
        .setDescription(user.tag + ' adlı kullanıcı başarıyla uyarıldı.')
        .setFooter('The Light', client.user.avatarURL)
        .setTimestamp()
      message.channel.send(embed2);
      const embed3 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Uyar;')
        .addField('Kullanıcı:', user.tag, true)
        .addField('Yetkili:', message.author.tag, true)
        .addField('Sebep:', reason, true)
        .setFooter('The Light', client.user.avatarURL)
        .setTimestamp()
      return guild.channels.get(modlog.id).send(embed3)
        };
  
  if (command === 'sil') {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let modlog = guild.channels.find('name', 'The Light');
    if (!modlog) return message.guild.createChannel('The Light');
    let mesajsayisi = parseInt(args.join(' '));
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', kullanım: l!sil <sayı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (mesajsayisi > 100) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', 100 adetden fazla mesaj silemem.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.channel.bulkDelete(mesajsayisi + 1);
    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sil;')
      .setDescription(message.author.tag + ', mesajları başarıyla sildim.')
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sil;')
      .addField('Yetkili:', message.author.tag, true)
      .addField('Kanal:', message.channel.name, true)
      .addField('Mesaj sayısı:', mesajsayisi, true)
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed2)
    message.delete()
        };
  
  if (command === 'sunucu-adı-değiştir') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', kullanım: l!sunucu-adı-değiştir <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.guild.setName(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Sunucu adı değiştir;')
    .setDescription(message.author.tag + ', sunucu adı başarıyla değiştirildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'sunucu-resmi-değiştir') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', kullanım: l!sunucu-resmi-değiştir <bağlantı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.guild.setIcon(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Sunucu resmi değiştir;')
    .setDescription(message.author.tag + ', sunucu resmi başarıyla değiştirildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'kanal-aç') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', kullanım: l!kanal-aç <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    const channel = message.guild.createChannel(mesaj);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'rol-oluştur') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', kullanım: l!rol-oluştur <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    message.guild.createRole({
                    name: sayMessage,
                    color: "#FF4000",
                    permission:[]
            });
    const embed = new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('Rol oluştur;')
     .setDescription(`Başarıyla rol oluşturdum!`)
     .setFooter('The Light', client.user.avatarURL)
     .setTimestamp()
     message.channel.send(embed);
     economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if(command === 'mc-sunucu') {
    const IPhere = args.join(' ');
    if (IPhere.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', kullanım: l!mc-sunucu <sunucu IP>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    var request = require('request');
      request('https://api.mcsrvstat.us/1/' + IPhere, function (error, response, body) {
      if(error) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bir şeyler ters gitti.').setFooter('The Light', client.user.avatarURL).setTimestamp());

      var bodyJSON = JSON.parse(body)
      if(bodyJSON.debug.ping !== true) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bu sunucu kapalı.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      var serverIP = bodyJSON.ip
      var serverPort = bodyJSON.port
      var motd1 = bodyJSON.motd.clean[0]
      var motd2 = bodyJSON.motd.clean[1]
      if(!motd2){ 
        var motd2 = "No second line.";
      }
      var version = bodyJSON.version
      var onlinePlayers = bodyJSON.players.online
      var maxPlayers = bodyJSON.players.max
      const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(motd1)
        .addField('Sunucu IP:', `${serverIP}:${serverPort}`, true)
        .addField('Sürüm:', version, true)
        .addField('Açıklama:', `${motd1}\n${motd2}`)
        .addField('Oyuncular (çevrimiçi/toplam):', `${onlinePlayers}/${maxPlayers}`, true)
        .setFooter('Minecraft sunucu', client.user.avatarURL)
        .setTimestamp()
        message.channel.send({embed})
        .catch(error => message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bir şeyler ters gitti.').setFooter('The Light', client.user.avatarURL).setTimestamp()));
    });
  }
  
  if (command === 'kısalt') {
    if (!args[0]) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(message.author.tag + ', kullanım: l!kısalt <bağlantı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      if (!args[1]) {
        shorten.shorten(args[0], function(res) {
          message.channel.send(res);
        })
      } else {
        shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(res).setFooter('The Light', client.user.avatarURL).setTimestamp());
          message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(`<${res}>`).setFooter('The Light', client.user.avatarURL).setTimestamp());
        })
      }
  }
  if (command === 'müzik-ara') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Müzik ara;').setDescription(message.author.tag + ', kullanım: l!müzik-ara <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    genius.search(args.join(' '))
    .then(function(results) {
    return results[0]
      })
      .then(function(result) {
      const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Müzik ara;')
                .addField('Müzik adı:', result.title, true)
                .addField('Sanatçı:', result.artist, true)
                .addField('Sözler:', '[Genius]('+result.url+')', true)
                .setFooter('The Light', client.user.avatarURL)
                .setTimestamp()
                message.channel.send(embed);
        });
  }
  if (command === 'youtube') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('YouTube;').setDescription(message.author.tag + ', kullanım: l!youtube <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'YouTube',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://www.youtube.com/results?search_query=' + args.toString().replace(/,/g, '+') + ')',
      color: 0xff4000
    }
        });
  }
  if (command === 'twitter') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: l!twitter <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Twitter',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://twitter.com/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'google') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: l!twitter <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Google',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://google.com/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'instagram') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: l!twitter <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'İnstagram',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://instagram.com/' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'github') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('GitHub;').setDescription(message.author.tag + ', kullanım: l!github <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'GitHub',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://github.com/search?q=' + args.toString().replace(/,/g, '+') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'discord-bots') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: l!twitter <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Discord Bots',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://discordbots.org/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
    if (command === 'facebook') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: l!twitter <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Facebook',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://facebook.com/search/top/?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  

  if (command === '1v1') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 2) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription(message.author.tag + ', kullanım: l!2v2 <@kullanıcı> <@kullanıcı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaş başladı!').setFooter('The Light', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaşılıyor %25.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaşılıyor %50.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaşılıyor %75.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaşılıyor %100.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Savaş bitti!').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('1v1;').setDescription('Kazanan: ' + user.tag).setFooter('The Light', client.user.avatarURL).setTimestamp()));
        };
  
  if (command === '2v2') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 3) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription(message.author.tag + ', kullanım: l!3v3 <@kullanıcı> <@kullanıcı> <@kullanıcı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaş başladı!').setFooter('The Light', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %25.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %50.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %75.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %100.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaş bitti!').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Kazanan: ' + user.tag).setFooter('The Light', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === '4v4') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 4) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription(message.author.tag + ', kullanım: l!4v4 <@kullanıcı> <@kullanıcı> <@kulanıcı> <@kullanıcı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaş başladı!').setFooter('The Light', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %25.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %50.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %75.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %100.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaş bitti!').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Kazanan: ' + user.tag).setFooter('The Light', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === 'sunucu-davet') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    message.guild.channels.get(message.channel.id).createInvite().then(invite =>
    message.channel.send('Bu sunucunun davet bağlantısı;\n' + invite.url)
   );
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'reklam-kontrol') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name))
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Reklam kontrol;').setDescription(members.map(member => member.displayName + ' adlı kullanıcının aktivite kısmında sunucu bağlantısı var.').join('\n') || message.author.username + ', kimse aktivite kısmına sunucu bağlantısı koymamış.').setFooter('The Light', client.user.avatarURL).setTimestamp());

        };
  
  if (command === 'öneri') {
    let type = args.slice(0).join(' ');
        if (type.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Tavsiye;').setDescription(message.author.tag + ', kullanım: l!tavsiye <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye;')
    .setDescription(message.author.tag + ', tavsiyeniz başarıyla gönderildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye;')
    .addField('Tavsiye:', type, true)
    .addField('Kullanıcı:', message.author.tag, true)
    .addField('Sunucu:', message.guild.name, true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    client.channels.get('410451498259185667').send(embed2);
  }
  if (command === 'hata' || command === 'bug') {
    let type = args.slice(0).join(' ');
        if (type.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hata;').setDescription(message.author.tag + ', kullanım: l!hata <mesaj>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Hata;')
    .setDescription(message.author.tag + ', hatanız başarıyla gönderildi.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Hata;')
    .addField('Hata:', type, true)
    .addField('Kullanıcı:', message.author.tag, true)
    .addField('Sunucu:', message.guild.name, true)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    client.channels.get('410451498259185667').send(embed2);
        };
  
  if (command === 'oyun-öneri') {
    var cumleler= ['Grand Theft Auto', 'Minecraft', 'ROBLOX', 'Unturned', 'Creativerse', 'Prototype', 'Call of Duty', 'Zula', 'PLAYERUNKNOWNS BATTLEGROUNDS', 'League of Legends', 'Growtopia', 'Team Fortress', 'Counter-Strike', 'Garrys Mod', 'Black Desert Online', 'Rocket Leauge', 'Warframe', 'Battlefield', 'Half-Life', 'Rust', 'H1Z1', 'Fortnite', 'Overwatch', 'World of Tanks'];
    var cumle = cumleler[Math.floor(Math.random() * cumleler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Oyun öneri;')
    .setDescription(cumle)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'espri' || command === 'espiri') {
    var espriler = ['Seni görünce; \ngözlerim dolar, \nkulaklarım euro.','Gidenin arkasına bakmayın yoksa geleni göremezsiniz.','+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.','+Kanka ben banyoya 3 kişi giriyorum. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!','+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.','+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.','+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.','Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.','+Acıkan var mı ya? \n-Yok bizde tatlı kan var.','Yılanlardan korkma, yılmayanlardan kork.','+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.','Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.','Aaa siz çok terlemişsiniz durun size terlik getireyim.','Aklımı kaçırdım, 100.000 TL fidye istiyorum.'];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Espri;')
    .setDescription(espri)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'rastgele-sayı') {
    let sayılar = Math.floor(Math.random() * 100)
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Rastgele sayı;')
    .setDescription(sayılar)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'çekiliş') {
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rastgele kullanıcı;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('The Light', client.user.avatarURL).setTimestamp()); }
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Rastgele kullanıcı;')
    .setDescription(message.guild.members.random().displayName)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'yazı-tura') {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yazı-tura;')
      .setDescription('Tura.')
      .setImage('https://i.hizliresim.com/MaoYG2.jpg')
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
    } else if (result == 2) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yazı-tura;')
      .setDescription('Yazı.')
      .setImage('https://i.hizliresim.com/QpvX3G.jpg')
      .setFooter('The Light', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
    }
        };
  
  if (command === 'taş-kağıt-makas' || command === 'tkm') {
    var cumleler= ['Taş.', 'Kağıt.', 'Makas.'];
    var cumle = cumleler[Math.floor(Math.random() * cumleler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Taş-kağıt-makas;')
    .setDescription(cumle)
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'sigara') {
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud::cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud:').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription('Sigaram bitti.').setFooter('The Light', client.user.avatarURL).setTimestamp()))
      economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'topla') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Topla;').setDescription(message.author.tag + ', kullanım: l!topla <sayı> <sayı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'çıkar') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Çıkar;').setDescription(message.author.tag + ', kullanım: l!çıkar <sayı> <sayı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'çarp') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Çarp;').setDescription(message.author.tag + ', kullanım: l!çarp <sayı> <sayı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'böl') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Böl;').setDescription(message.author.tag + ', kullanım: l!böl <sayı> <sayı>.').setFooter('The Light', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('The Light', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
});


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip2) permlvl = 4;
  if (message.author.id === ayarlar.sahip3) permlvl = 4;
  return permlvl;
};



var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
