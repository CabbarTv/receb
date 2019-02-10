const Discord = require('discord.js');
exports.run = (client, message, args) => {

  bot.on("message", function(message) {
    // convert message into all upper case and store it in input
    var input = message.content.toUpperCase();
    var server = message.channel.server;
    var roles = message.channel.server.roles;
    var user = message.author;
    var role;
    var roleName = message.content.split(" "); // roleName[0] = "ADDROLE", roleName[1] = "GivenRole"
    var channels = message.channel.server.channels;
    var channel;
    var reserved;        // Hello Jarvis
    if (input === "SekoBot") {
        bot.reply(message, "Buyurun.");


}else if (input.startsWith("!VOICE") && (parsed[1] === "Guild-Chat" || parsed[1] === "Raiding" || parsed[1] === "Overwatch" || parsed[1] === "PvP" || parsed[1] === "Officers")) {
    channel = channels.get("name", parsed[1]).id;
    role = roles.get("name", "Officers").id;
    if (bot.memberHasRole(user, role)) {
        if (bot.voiceConnection == null) {
            bot.joinVoiceChannel(channel);
            bot.voiceConnection.playfile(parsed[2], {
                volume: 0.25
            }, function(error, intent) {
                if (error) console.log(error);
                intent.on("end", function() {
                    bot.voiceConnection.stopPlaying();
                });
            });
        }
        bot.leaveVoiceChannel(channel);
    }
}
// !say channel message
else if (input.startsWith("!SAY") && (parsed[1] === "developers" || parsed[1] === "guild-chat" || parsed[1] === "senior-raiders" || parsed[1] === "officers" || parsed[1] === "overwatch" || parsed[1] === "challengemodes" || parsed[1] === "theorycrafting" || parsed[1] === "welcome" || parsed[1] === "healing" || parsed[1] === "mages" || parsed[1] === "hunters" || parsed[1] === "hot-button-issues")) {
    channel = channels.get("name", parsed[1]).id; // get channel id
    role = roles.get("name", "Officers").id;
    reserved = parsed[2];
    for (var i = 3; i < parsed.length; i++) {
        reserved = reserved + " " + parsed[i];
    }
    if (bot.memberHasRole(user, role)) {
        bot.sendMessage(channel, reserved);
    } else {
        bot.reply(message, "You don't have valid permissions to do that.");
    }
}
    // !addrole Role
    else if (input.startsWith("!ADDROLE") || input.startsWith("!ADD")) {
        //bot.sendMessage(message,roleName[1]); // send message that contains the roleid
        // Check of role matches the class list
        if (roleName[1] == "Mage" || roleName[1] == "Death" || roleName[1] == "Druid" || roleName[1] == "Hunter" || roleName[1] == "Demon" || roleName[1] == "Monk" || roleName[1] == "Paladin" || roleName[1] == "Rogue" || roleName[1] == "Shaman" || roleName[1] == "Warlock" || roleName[1] == "Warrior") {
            role = roles.get("name", "Officers").id; //get roll id of Officer/Admin role
            // Check if member is an Officer/Admin
            if (bot.memberHasRole(user, role)) {
                if(roleName[1] == "Death"){
                  roleName[1] = "Death Knight";
                }
                if(roleName[1] == "Demon"){
                  roleName[1] = "Demon Hunter";
                }
                role = roles.get("name", roleName[1]).id; // get roleid of class
                bot.addMemberToRole(user, role);
                bot.reply(message, "You are now a " + roleName[1] + "!");
            } else { // if not an officer/admin
                bot.reply(message, "Class does not exist, or you do not have permission to add that role.");
            }
        // Check if role matches channel list
      } else if (roleName[1] == "Developers" || roleName[1] == "CMs" || roleName[1] == "Healers" || roleName[1] == "Theorycrafting" || roleName[1] == "Overwatch" || roleName[1] == "HBI") {
            role = roles.get("name", roleName[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + roleName[1] + " channel!");
        } else { // if role does not exist
            bot.reply(message, "Role does not exist.");
        }
    }
    // !removerole Developers
    else if (input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) {
        if (roleName[1] == "Mage" || roleName[1] == "Death" || roleName[1] == "Druid" || roleName[1] == "Hunter" || roleName[1] == "Demon" || roleName[1] == "Monk" || roleName[1] == "Paladin" || roleName[1] == "Rogue" || roleName[1] == "Shaman" || roleName[1] == "Warlock" || roleName[1] == "Warrior") {
            role = roles.get("name", "Officers").id;
            if (bot.memberHasRole(user, role)) {
                if(roleName[1] == "Death"){
                  roleName[1] = "Death Knight";
                }
                if(roleName[1] == "Demon"){
                  roleName[1] = "Demon Hunter";
                }
                role = roles.get("name", roleName[1]).id;
                bot.removeMemberFromRole(user, role);
                bot.reply(message, "You are no longer a " + roleName[1] + "!");
            } else {
                bot.reply(message, "Class does not exist, or you cannot remove that role.");
            }
        } else if (roleName[1] == "Developers" || roleName[1] == "CMs" || roleName[1] == "Healers" || roleName[1] == "Theorycrafting" || roleName[1] == "Overwatch" || roleName[1] == "HBI") {
            role = roles.get("name", roleName[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from " + roleName[1] + "!");
        } else {
            bot.reply(message, "Role does not exist, or you cannot remove that role.");
        }
    }
    // Good Night Jarvis
    else if (input === "GOOD NIGHT JARVIS") {
        bot.reply(message, "Good Night Sir.");
    }
    // Jarvis GIF
    else if (input === "!JARVIS") {
        bot.sendFile(message, "XXX");
    }
    // invite link
    else if (input === "!INVITE") {
        bot.sendMessage(message, "Here is the invite link: XXX");
    }
    // Archimonde Kill Video
    else if (input === "!ARCHIMONDE") {
        bot.sendMessage(message, "Here's the kill video for Mythic Archimonde: XXX");
    }
    // Mannoroth Kill video
    else if (input === "!MANNY" || input === "!MANNOROTH") {
        bot.sendMessage(message, "Here's the kill video for Mythic Mannoroth: XXX");
    }
    // Xhul'Horac Kill video
    else if (input === "!XHUL'HORAC" || input === "!XHUL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Xhul'Horac: XXX");
    }
    // Tyrant Kill video
    else if (input === "!TYRANT") {
        bot.sendMessage(message, "Here's the kill video for Mythic Tyrant: XXX");
    }
    // Fel Lord Kill video
    else if (input === "!FEL LORD" || input === "!FEL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Fel Lord: XXX");
    }
    // Iskar Kill video
    else if (input === "!ISKAR") {
        bot.sendMessage(message, "Hey it's @Codiak#2504 favorite!! Mythic Iskar: XXX");
    }
    // Socrethar Kill video
    else if (input === "!SOCRETHAR" || input === "!SOC") {
        bot.sendMessage(message, "Here's the kill video for Mythic Socrethar: XXX");
    }
    // Gorefiend Kill video
    else if (input === "!GOREFIEND" || input === "!GORE") {
        bot.sendMessage(message, "Here's the kill video for Mythic Gorefiend: XXX");
    }
    // Kilrogg Kill video
    else if (input === "!KILROGG") {
        bot.sendMessage(message, "Here's the kill video for Mythic Kilrogg: XXX");
    }
    // COUNCIL Kill video
    else if (input === "!COUNCIL" || input === "!HELLFIRE HIGH COUNCIL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hellfire High Council: XXX");
    }
    // Kormrok Kill video
    else if (input === "!KORMROK" || input === "!KORM") {
        bot.sendMessage(message, "Here's the kill video for Mythic Kormrok: XXX");
    }
    // Reaver Kill video
    else if (input === "!REAVER" || input === "!IRON REAVER") {
        bot.sendMessage(message, "Here's the kill video for Mythic Iron Reaver: XXX");
    }
    // Assault Kill video
    else if (input === "!ASSAULT" || input === "!HELLFIRE ASSAULT") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hellfire Assault: XXX");
    }
    // Hans Kill video
    else if (input === "!HANS" || input === "!FRANZ" || input === "!HANS'GAR AND FRANZOK") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hans'gar and Franzok: XXX");
    }
    // Oreo Kill video
    else if (input === "!OREO" || input === "!ORE" || input === "!OREGORGER") {
        bot.sendMessage(message, "Here's the kill video for Mythic Oregorger: XXX");
    }
    // Gruul Kill video
    else if (input === "!GRUUL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Gruul: XXX");
    }
    // Beastlord Kill video
    else if (input === "!BEASTLORD" || input === "!BEASTLORD DARMAC") {
        bot.sendMessage(message, "Here's the kill video for Mythic Beastlord Darmac: XXX");
    }
    // Beastlord Kill video
    else if (input === "!YOUTUBE") {
        bot.sendMessage(message, "Here's our youtube channel: XXX");
    }
    // Plug.dj
    else if (input === "!MUSIC" || input === "!PLUG" || input === "!DJ" || input === "!PLUG.DJ") {
        bot.sendMessage(message, "Here's our Plug.DJ channel: XXX");
    }
    // Website Link
    else if (input === "!WEBSITE") {
        bot.sendMessage(message, "Check out dat website: XXX");
    }
    // Prints out the link to the roster in Google Sheets
    else if (input === "!ROSTER" || input === "#AMISITTING?") {
        bot.sendMessage(message, "Here is the roster: XXX");
    }
    // Prints out list of commands in Discord
    else if (input === "!HELP") {
        bot.sendMessage(message, "List of Commands:\n Kill Vidoes = !BossNameHere\n Website Link = !website\n Weekly Roster = !roster\n Plug.DJ = !music\n Discord invite = !invite\n  Add/Remove Channel Roles = !add [or !remove] roleName (roleName = Developers, Healers, Theorycrafting, Overwatch, HBI)");
    }
    // creator
    else if (input === "!QUESTION WHO CREATED YOU?" || input === "!CREATOR" || input === "!QUESTION WHO IS YOUR CREATOR?") {
        bot.sendMessage(message, "My creator is the almighty Republic of course. He's pretty swell.");
    }
    // !Is cody good at playing hunter?
    else if (input === "!QUESTION IS CODY GOOD AT PLAYING HUNTER?") {
        bot.reply(message, "Nope");
    }
    // its not random
    else if (input === "!RANDOM" || input === "#ITSRANDOM") {
        bot.sendMessage(message, "It's never random. Molo is a cheater.");
    }
});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'role',
  description: 'İstediğiniz kişiye rol verir.',
  usage: 'role [kullanıcı] [yetki]'
};
