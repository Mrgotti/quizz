const Discord = require("discord.js");
exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.guild.roles.find(role => role.name === "Mods");
  if (!modRole)
    return console.log("Le role Mods n'hésite pas!");

  if (!message.member.roles.has(modRole.id))
    return message.reply("Hey oh ?!!! Tu n'a pas les droits de faire cela!");

  if (message.mentions.members.size === 0)
    return message.reply("Mentionne l'utilisateur pour le kick!");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("");

  const kickMember = message.mentions.members.first();

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} a été kicker avec succès. Il nous enmerdera moins celui la!.`);
  });
};


