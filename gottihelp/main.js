const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();

const config = require("./config.json");
client.config = config; // attacher le fichier config au client (accéder a la config partout)

client.on('ready', async () => {
    console.log(`${client.user.username} est en ligne !`);
    client.user.setActivity('Dispo')
});

fs.readdir("./events", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });

});

client.commands = new Enmap();



fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const props = require(`./commands/${file}`);
        const commandName = file.split(".")[0];
        console.log(`Lancement de la commande ${commandName}`);
        client.commands.set(commandName, props);


    });

    //youtube
    const API_KEY = "AIzaSyC9G1gWw9SdxLu7AdIRh-cfhyS_bO3VlKs";
    var ytdl = require('ytdl-core');   // youtube download library 
    var youtube = require('./youtube.js');  // performs youtube API requests 
     
    var ytAudioQueue = []; 
    var dispatcher = null; 
    
    client.on('ready', function() { 
        console.log('I am ready'); 
    }); 
    
    client.on('message', function (message) { 
        var messageParts = message.content.split(' '); 
    
        var command = messageParts[0].toLowerCase(); 
        var parameters = messageParts.splice(1, messageParts.length); 
    

    
        switch (command) { 
         case "hi": 
          message.reply("Hey there!"); 
          break; 
         case "*help": 
          HelpCommand(message); 
          break; 
         case "*join": 
          message.reply("Attempting to join channel: " + parameters[0]); 
          JoinCommand(parameters[0]); 
          break; 
         case "*play": 
          PlayCommand(parameters.join(" "), message); 
          break; 
         case "*playqueue": 
          PlayQueueCommand(message); 
          break; 
        } 
    }); 
    
    /* COMMAND HANDLERS */ 
    
    /// lists out all of the bot commands 
    function HelpCommand(originalMessage) { 
        originalMessage.reply("*join <channel-to-join> - Connects to bot to a channel by channel name"); 
        originalMessage.reply("*play <YouTube search term> - Plays audio from YouTube based on the search term"); 
        originalMessage.reply("*playqueue - Lists the audio remaining in the play queue"); 
    } 
    
    /// plays audio based on results from youtube search 
    function PlayCommand(searchTerm) { 
    
        // if not connected to a voice channel then connect to first one 
        if (client.voiceConnections.array().length == 0) { 
         var defaultVoiceChannel = client.channels.find(val => val.type === 'music').name; 
         JoinCommand(defaultVoiceChannel); 
        } 
    
        // search youtube using the given search search term and perform callback action if video is found 
        youtube.search(searchTerm, QueueYtAudioStream); 
    } 
    
    /// lists out all music queued to play 
    function PlayQueueCommand(message) { 
        var queueString = ""; 
    
        for(var x = 0; x < ytAudioQueue.length; x++) { 
         queueString += ytAudioQueue[x].videoName + ", "; 
        } 
    
        queueString = queueString.substring(0, queueString.length - 2); 
        message.reply(queueString); 
    } 
    
    /// joins the bot to the specified voice channel 
    function JoinCommand(channelName) { 
        var voiceChannel = GetChannelByName(channelName); 
    
        if (voiceChannel) { 
         voiceChannel.join(); 
         console.log("Joined " + voiceChannel.name); 
        } 
    
        return voiceChannel; 
    } 
    
    /* END COMMAND HANDLERS */ 
    /*----------------------------------------------------------------------*/ 
    /* HELPER METHODS */ 
    
    /// returns the channel that matches the name provided 
    function GetChannelByName(name) { 
        var channel = client.channels.find(val => val.name === name); 
        return channel; 
    } 
    
    /// Queues result of Youtube search into stream 
    function QueueYtAudioStream(videoId, videoName) { 
        var streamUrl = `${youtube.watchVideoUrl}${videoId}`; 
    
        if (!ytAudioQueue.length) { 
         ytAudioQueue.push(
          { 
           'streamUrl': streamUrl, 
           'videoName': videoName 
          } 
         ); 
    
         console.log("Queued audio " + videoName); 
         PlayStream(ytAudioQueue[0].streamUrl); 
        } 
        else { 
         ytAudioQueue.push(
          { 
           'streamUrl': streamUrl, 
           'videoName': videoName 
          } 
         ); 
    
         console.log("Queued audio " + videoName); 
        } 
    
    } 
    
    /// Plays a given stream 
    function PlayStream(streamUrl) { 
    
        const streamOptions = {seek: 0, volume: 1}; 
    
        if (streamUrl) { 
         const stream = ytdl(streamUrl, {filter: 'audioonly'}); 
    
         if (dispatcher == null) { 
    
          var voiceConnection = client.voiceConnections.first(); 
          //console.log(voiceConnection); 
    
          if (voiceConnection) { 
    
           console.log("Now Playing " + ytAudioQueue[0].videoName); 
           dispatcher = client.voiceConnections.first().playStream(stream, streamOptions); 
    
           dispatcher.on('end',() => { 
            PlayNextStreamInQueue(); 
           }); 
    
           dispatcher.on('error', (err) => { 
            console.log(err); 
           }); 
          } 
         } 
         else { 
          dispatcher = client.voiceConnections.first().playStream(stream, streamOptions); 
         } 
        } 
    } 
    
    /// Plays the next stream in the queue 
    function PlayNextStreamInQueue() { 
    
        ytAudioQueue.splice(0, 1); 
    
        // if there are streams remaining in the queue then try to play 
        if (ytAudioQueue.length != 0) { 
         console.log("Now Playing " + ytAudioQueue[0].videoName); 
         PlayStream(ytAudioQueue[0].streamUrl); 
        } 
    } 
    /* END HELPER METHODS */ 
});


client.login(config.token);