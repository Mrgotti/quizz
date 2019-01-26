const embed = require('discord-embed-maker');

    exports.run = (client,message) => {
 embed.setTitle("\ud83c\udfd3 Pong!")
 embed.setColor('RANDOM');
 embed.setThumbnail("https://cdn.discordapp.com/attachments/538510846176002048/538511040493649921/pingpong.png")
 embed.addField("\ud83d\udcf6 Latence moyenne\u003a", `\u0060\u0060\u0060js\n${Number(Math.round(client.ping+'e2')+'e-2')}ms\u0060\u0060\u0060`,  true)
 embed.addField("\ud83d\udcbe Edit\u0027 latence\u003a", `\u0060\u0060\u0060js\n${Number(Math.round(client.ping+'e2')+'e-2')}ms\u0060\u0060\u0060`,  true)
 embed.addField("\ud83e\udd5d Derni\u00e8res latences\u003a", `\u0060\u0060\u0060js\n${client.pings.map((a,b)=>{return Number(Math.round(a+'e2')+'e-2')}).join('ms, ')}ms\u0060\u0060\u0060`, true)
 embed.setAuthor("Mrgotti#3193", "https://cdn.discordapp.com/avatars/289771502432419841/d56e3d0906dd058953b01368d5256c59.png", "https://discord.gg/A7zbu98")
 .setFooter("© 2019 - bot par MrGotti");




message.channel.send(embed);

}
