const Discord = require("discord.js");

exports.run = (client,message) => {
    const embed = new Discord.RichEmbed()
        .setAuthor("Créer par MrGotti")
        .setDescription("En cours")
        .setTimestamp()
        .setColor("#FF0000")
        .addField("test1")
        .addField("test2")
        .addField("Field 1", "test3, true")
        .addField("Field 2","test4, true")
        .setFooter("© 2019 - bot par MrGotti");
        




    message.channel.send(embed);

}