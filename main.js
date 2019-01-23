const config = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client({disableEveryone: true})

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`)
    bot.user.setActivity('Maintenance')
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

// Informations sur le Serveur

    if (command === `${prefix}infoserv`) {
        let servIcon = message.guild.iconURL;
        let servEmbed = new Discord.RichEmbed()
        .setDescription('Informations sur le serveur')
        .setColor("#dc143c")
        .setThumbnail(servIcon)
        .addField ('Nom du serveur', message.guild.name)
        .addField ('Nombre total de membres', message.guild.memberCount)
        .addField ('Créer le', message.guild.createdAt)
        .addField ('Vous avez rejoint le', message.member.joinedAt);
        
        return message.channel.send(servEmbed);
    }


// Informations sur le Bot

    if (command === `${prefix}info`) {
    
    let botIcon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
        .setDescription('Informations sur le bot')
        .setColor("#dc143c")
        .setThumbnail(botIcon)
        .addField('Nom du Bot', bot.user.username)
        .addField('Créer le', bot.user.createdAt)
        .addField('Commandes', '----------')
        .addField(`${prefix}info`, 'Renvoie des informations sur le bot')
        .addField(`${prefix}infoserv`, 'Renvoie des informations sur le serveur')
        .addField(`${prefix}report`, 'Met un avertissement à l utilisateur');
        


    
    return message.channel.send(embed);
    }

    //commande report
    if (command === `${prefix}report`) {

        let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!reportedUser) {
            return message.channel.send("l'utilisateur n'existe pas !");
        }
        let reportedReason = args.join(" ").slice(22);


        let reportEmbed = new Discord.RichEmbed()
            .setDescription('Reports')
            .setColor('#dc143c')
            .addField(
                'utilisateur reporté',
                 `${reportedUser} (ID: ${reportedUser.id})`
                 )
            .addField(
                'utilisateur ayant reporté',
                 `${message.author} (ID: ${reportedUser.id})`
                 )
            .addField('Channel du report',message.channel)
            .addField('Raison', reportedReason);

            let reportChannel = message.guild.channels.find(`name`, "reports");
            if (!reportChannel) {
                return message.channel.send(
                    "Channel 'Reports' introuvable. Veuillez créer ce channel !")
            }

            message.delete();
            reportChannel.send(reportEmbed);
       
        }

        //commande kick
        if (command === `${prefix}kick`) {

            let kickedUser = message.guild.member(
                message.mentions.users.first() || message.guild.members.get(args[0])
                );
        if (!kickedUser) {
                return message.channel.send("L'utilisateur n'existe pas !");
            }
            let kickReason = args.join(' ').slice(22);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.channel.send("Hé oh tu me fais quoi la ? Tu n as pas les permissions de faire cela!"
                    );
            }
            if(kickedUser.hasPermission ('MANAGE_MESSAGES')) {
                
                return message.channel.send ('Quoi tu veux que je kick un dieu? Ce n est pas possible !');
            }


            let KickEmbed = new Discord.RichEmbed()
            .setDescription('kicks')
            .setColor('#dc143c')
            .addField('utilisateur Kické', `${kickedUser} (ID: ${kickedUser.id})`)
            .addField('utilisateur ayant Kické',
                 `${message.author} (ID: ${message.author.id})`
                 )
            .addField('Canal', message.channel)
            .addField('Raison', kickReason);

            let kickChannel = message.guild.channels.find(`name`, 'reports');
            if (!kickChannel) {
                return message.channel.send(
                    "Channel 'Reports' introuvable. Veuillez créer ce channel !")
            }

            message.guild.member(kickedUser).kick(kickReason);
            kickChannel.send(KickEmbed)

    }
});

bot.login(config.token);
