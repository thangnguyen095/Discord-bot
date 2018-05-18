var SongPlayer = require('./SongPlayer');

function Bot(client, config){
    var Client = client;
    var commands = [];
    var prefix = config.prefix;
    var guilds = new Object();

    Client.login(config.token).then(()=>{}).catch(e => {
        console.log("Cannot login! Please check your token");
    });

    Client.on('ready', function(){
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
        var msg = content.slice(prefix.length + command.length).trim();

        commands.forEach(handler => {
            if(handler.command.toLowerCase() == command){
                try{
                    handler.execute(functions, msg, mes);
                }catch(e){
                    console.log('Error occurs when executing command: ' + handler.command);
                    console.log(e);
                }
            }
        });
    }

    this.attachCommand = function(command){
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
        play: function play(guild, song){
            return new Promise((resolve, reject) => {
                try{
                    resolve(guilds[guildID].songPlayer.addSong(song));
                }catch(e){
                    reject();
                }
            });
        }
    }
}

module.exports = Bot;