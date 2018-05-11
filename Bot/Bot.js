function Bot(client, config){
    var Client = client;
    var commands = [];
    var prefix = config.prefix;

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

        var command = content.splice(prefix.length).trim().split(/\b+/g).shift().toLowerCase();

        commands.forEach(handler => {
            if(handler.command.toLowerCase() == command){
                try{
                    handler.execute(this, mes);
                }catch(e){
                    console.log('Error occurs when executing command: ' + handler.command);
                }
            }
        });
    }

    this.attachCommand = function(command){
        commands.push(command);
    }
}

module.exports = Bot;