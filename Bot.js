var SongPlayer = require('./SongPlayer');

function Bot(client, config){
    var Client = client;
    var commands = {};
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
        console.error("Cannot login! Please check your token", e);
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

    async function handleMessage(mes){
        var content = mes.content;

        if(!content.startsWith(prefix)){
            return;
        }

        var command = content.slice(prefix.length).trim().split(/(?:\s|\n)+/g).shift().toLowerCase();
        var content = content.slice(prefix.length + command.length).trim();
        if (command == "help"){
            helpCommand(mes)
        }else if(commands[command]){
            try{
                await commands[command].execute(functions(mes), content);
            }catch(e){
                console.error('Error occurs when executing command: ' + command, e);
            }
        }
    }

    async function helpCommand(mes){
        try{
            await mes.channel.send({embed: commandsHelp});
        }catch(e){
            console.error('Error occurs when executing command: help ', e);
        }
    }

    this.attachCommand = function(command){
        commandsHelp.fields.push({
            name: command.command.toLowerCase(),
            value: command.describe
        });
        commands[command.command.toLowerCase()] = command;
    }

    // these functions will be pass down to command handlers in order for them to access some of the boss functions
    var functions = function(mes){
        const guildID = mes.guild.id;

        return {
            sendMessage: function(msg){
                return mes.channel.send(msg);
            },
            joinVC: function joinVC(){
                const vc = mes.member.voiceChannel;
                if(!guilds[guildID]){
                    guilds[guildID] = new Object();
                }

                guilds[guildID].vc = vc;

                return vc.join().then(con => {
                        guilds[guildID].songPlayer = new SongPlayer(con);
                    });
            },
            leaveVC: function leaveVC(){
                return new Promise((resolve, reject) => {
                    if(guilds[guildID].vc){
                        guilds[guildID].vc.leave();
                        delete guilds[guildID].songPlayer;
                        return resolve();
                    }
                    reject();
                });
            },
            addSong: function addSong(song){
                return new Promise((resolve, reject) => {
                    try{
                        resolve(guilds[guildID].songPlayer.addSong(song));
                    }catch(e){
                        reject(e);
                    }
                });
            },
            playSong: function playSong(index){
                return new Promise((resolve, reject) => {
                    try{
                        resolve(guilds[guildID].songPlayer.play(index));
                    }catch(e){
                        reject(e);
                    }
                })
            },
        }
    }
}

module.exports = Bot;