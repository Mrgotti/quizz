module.exports = (client, message) => {
// ID
let role = message.guild.roles.get("537378757489590293");
// Nom du role
let role2 = message.guild.find(role = role.name === "BotPermission");

// vérification d'un rôle
if(message.member.roles.has(role.id)) {
    console.log("Génial, tu as le rôle 'BotPermission'.");

}   else {
    console.log("Dommage, tu n'as pas le rôle BotPermission.")
}

// vérification plusieurs role

if(message.member.roles.some(r => ["BotPermission", "Modérateur", "Admin"].includes(r.name))
){
        console.log("Génial, tu as le rôle 'BotPermission'.");
    
    }   else {
        console.log("Dommage, tu n'as pas le rôle BotPermission.");
    }
    

    //compter le nombre d'utilisateur qui possède un role
    let roleID = "537378757489590293";
    let userNumber = message.guild.roles.get(roleID).members;
    console.log(`${userNumber.size} utilisateurs possèdent ce rôle`)

    //l'utilisateur s'ajoute un rôle
    let roleToAdd = message.guild.roles.find(r => r.name === "Girl", "Boy")
    let member = message.member;

    member.addRole(roleToAdd).catch(console.error);
}
    
