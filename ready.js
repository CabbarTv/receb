const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require('snekfetch');
const api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1NDIzMTYzMDQwNTA0MjE3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE2Mjc0MTQ1fQ.2H9LjNjH6WFp5LmswfXAYSDsHQn2JSPPgbgf1WjSi_c';

var prefix = ayarlar.prefix;

module.exports = client => {
	snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
  .set('Authorization', api)
  .send({ server_count: client.guilds.size })
  .then(() => console.log('Updated discordbots.org stats.'))
  .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
console.log(` ${client.users.size} Kullanıcı Var Abe`);
console.log('Botta Bir Skıntı Yok');

    var Games = [

        `Cabbar Yapimcim - l!yardım`,
    
        
		
		` senle birlikte ${client.users.size} Kişi`,
		
		` senin sunucuyla birlikte ${client.guilds.size} sunucu `,
		
		`Rıca Etsem benı Eklermisin l!davet `,



        `${prefix}yardım | ${client.guilds.size} sunucu ${client.users.size} Aktif Kullanıcı | By Cabbar`


    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(Games.length-0+1)+0);

        client.user.setGame(Games[random], "https://www.twitch.tv/emir_youtub");
		
        }, 2 * 2500);

};

