module.exports = (client, message, guild, channel) => {
   // 537378757489590293
   //rôle précis
   if (message.member.roles.has("537378757489590293")) return message.channel.send("Tu possède le rôle BotPermission et tu possèdes ses permissions! "
   );
  
   //recherche une role
 message.member.roles.some(role.name === "BotPermission");

 //Definir les permissions d'un role (role par defaut = @everyone)
 guild.defaultRole.setPermissions(["SEND_MESSAGES", "VIEW_CHANNEL"]);

 //créer un role avec permissions
guild.createRole({
    name: "Nouveau membre",
    permissions: ["ADD_REACTIONS", "CHANGE_NICKNAME"]

});

//verifier si l'utilisateur possède une permision
message.member.hasPermission("ADD_REACTIONS");

//verifier si l'utilisateur possède plusieurs permisions
message.member.hasPermission(["ADD_REACTIONS", "CHANGE_NICKNAME"]);

//modifier les permissions d'un salon

channel.overwritePermissions(channel.guild.defaultRole, {
    ADD_REACTIONS: false
    });
    //création d'un salon et des permissions
    const aRole = message.member.roles.some(role.name === "BotPermission");
    guild.createChannel(test, "text", [
        {
            id:guild.defaultRole.id,
            deny: ["VIEW_CHANNEL"]
        },
        {
        id: aRole.id,
        allow: ["VIEW_CHANNEL"]
    }
    ]);

    // Modiffier permissions de tout les salons
    message.guil.channels.forEach(async channel => {
        await channel.overwritePermissions(channel.guild.defaultRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
         });
    });
    // Syncroniser un salon avec sa catégorie parente
    channel
    .lockPermissions()
    .then(() => console.log ("synchronisation réussie!"));


};
        
    