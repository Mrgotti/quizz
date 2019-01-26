const truc= (client, message)=> {
    let continu= 0;
    let quizz= require("../database/quizz.json");
    let item= quizz[Math.floor(Math.random()*quizz.length)];
    message.channel.send(item.question).then(()=> {
        message.channel.awaitMessages((rep)=> {
            console.log(rep.content.toLowerCase());
            if(rep.content.toLowerCase()==="\u002Astop") {
                continu-= 1000;
                return false;
            } else {
                continu+= 1;
                return item.answers.some((question)=> {
                    return question.toLowerCase()===rep.content.toLowerCase();
                });
            }
        },{maxMatches: 1, time: 30000, errors: ["time"]}).then((collected)=> {
            message.channel.send(`${collected.first().author} a repondu corectement !`);
        console.log(`a${continu}`);
            if(continu>0) {
                truc(client, message);
            }
        }).catch(()=> {
            message.channel.send("Personne n'a repondu correctement!");
        console.log(`b${continu}`);
            if(continu>0) {
                truc(client, message);
            }
        });
    });
};

module.exports.run= truc;