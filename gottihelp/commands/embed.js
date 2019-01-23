const Discord = require("discord.js");

exports.run = (client,message) => {
    let clientIcon = client.user.displayAvatarURL; {}
    const embed = new Discord.RichEmbed()
    
        .setTitle ("Informations")
        .setAuthor("Créer par MrGotti")
        .setDescription("En cours")
        .setThumbnail(clientIcon)
        .setTimestamp()
        .setColor("#FF0000")
        .addField("test1")
        .addField("test2")
        .addField("Field 1", "test3, true")
        .addField("Field 2","test4, true")
        .setFooter("© 2019 - bot par MrGotti");
        
        




    message.channel.send(embed);

}