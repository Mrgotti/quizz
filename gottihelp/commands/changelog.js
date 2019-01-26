const Discord = require("discord.js");

exports.run = (client,message) => {
    let clientIcon = client.user.displayAvatarURL; {}
    const embed = new Discord.RichEmbed()
    .setThumbnail("http://web-fabrique.fr/public/images/list-icons/ecrou.png")
    .setTitle ("`Changelog version 0.3.0`")
    .setDescription("``Ici vous pourrez voir l'avancer de mon developpement.``")
    .addField("\u2022commande mute bug", "En cours... :chart_with_upwards_trend:")
    .addField("\u2022 Bibliothèque pour le quizz", "En cours... :chart_with_upwards_trend: ")
    .addField("\u2022 Bot musique", "En cours... :chart_with_upwards_trend: ")
    .addField ("\u2022 commande ping evolue", "OK :ok_hand:")
    .setColor('RANDOM');
   
        
        




    message.channel.send(embed);

}