module.exports = (client, message) => {
    const quizz = require("./quizz.json");
    const item = quizz[Math.floor(Math.random() * quizz.lenght)];
    const filter = Response => {
        return item.answers.some(
            answer => answer.toLowerCase() === Response.content.toLowerCase()
        );
    };
    message.channel.send(item.question).then(() => {
        message.channel
        .awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ["time"]})
        .then(collected => {
            message.channel.send(
                `${collected.first().author} a repondu corectement !`
            );
        })
        .catch(()=> {
            message.channel.send("Personne n'a repondu correctement!");


        });
    });

};
