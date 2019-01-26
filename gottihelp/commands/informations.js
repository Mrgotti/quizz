const Discord = require("discord.js");

exports.run = (client,message) => {
    let clientIcon = client.user.displayAvatarURL; {}
    let AuthorIcon = url = ("https://cdn.discordapp.com/avatars/289771502432419841/d56e3d0906dd058953b01368d5256c59.png?size=256")
    const embed = new Discord.RichEmbed()
        .setImage(AuthorIcon)
        .setThumbnail(clientIcon)
        .setAuthor(client.user.iconURL)
        .setTimestamp()
        .setColor("#FF0000")
        .addField("test1", "allo")
        .addField("test2")
        .addField("Field 1", "test3")
        .addField("Field 2","test4,")
        .setFooter("© 2019 - bot par MrGotti");
        
        




    message.channel.send(embed);

}