var SongPlayer = require('./SongPlayer');

function Bot(client, config){
    var Client = client;
    var commands = [];
    var prefix = config.prefix;
    var guilds = new Object();
    var commandsHelp = {
        color: 3447003,
        author: {},
        title: "Help command",
        description: "This is a show all command support",
        fields: []
    }
    Client.login(config.token).then(()=>{}).catch(e => {
        console.log(e);
        console.log("Cannot login! Please check your token");
    });

    Client.on('ready', function(){
        commandsHelp.author = {
            name: client.user.username,
            icon_url: client.user.avatarURL
        }
        console.log('The Bot is ready');
    });

    Client.on('message', function(mes){
        handleMessage(mes);
    });

    function handleMessage(mes){
        var content = mes.content;

        if(!content.startsWith(prefix)){
            return;
        }

        var command = content.slice(prefix.length).trim().split(/(?:\s|\n)+/g).shift().toLowerCase();
        var content = content.slice(prefix.length + command.length).trim();
        if (command == "help"){
            helpCommand(mes)
        }else{
            commands.forEach(handler => {
                if(handler.command.toLowerCase() == command){
                    try{
                        handler.execute(functions, content, mes);
                    }catch(e){
                        console.log('Error occurs when executing command: ' + handler.command);
                        console.log(e);
                    }
                }
            });
        }
    }

    async function helpCommand(mes){
        try{
            await mes.channel.send({embed: commandsHelp});
        }catch(e){
            console.log('Error occurs when executing command: help ');
            console.log(e);
        }
    }

    this.attachCommand = function(command){
        commandsHelp.fields.push({
            name: command.command.toLowerCase(),
            value: command.describe
        });
        commands.push(command);
    }

    // these functions will be pass down to command handlers in order for them to access some of the boss functions
    var functions = {
        joinVC: function joinVC(vc){
            var guildID = vc.guild.id;
            if(!guilds[guildID]){
                guilds[guildID] = new Object();
            }
    
            guilds[guildID].vc = vc;
    
            return new Promise((resolve, reject) => {
                vc.join().then(con => {
                    guilds[guildID].songPlayer = new SongPlayer(con);
                    resolve();
                }).catch(reject);
            });
        },
        leaveVC: function leaveVC(guild){
            return new Promise((resolve, reject) => {
                if(guilds[guild.id].vc){
                    guilds[guild.id].vc.leave();
                    delete guilds[guild.id].songPlayer;
                    return resolve();
                }
                reject();
            });
        },
        addSong: function addSong(guild, song){
            return new Promise((resolve, reject) => {
                try{
                    resolve(guilds[guild.id].songPlayer.addSong(song));
                }catch(e){
                    reject();
                }
            });
        },
        playSong: function playSong(guild, index){
            return new Promise((resolve, reject) => {
                try{
                    resolve(guilds[guild.id].songPlayer.play(index));
                }catch(e){
                    reject();
                }
            })
        }
    }
}

module.exports = Bot;