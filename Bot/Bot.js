function Bot(client, config){
    var Client = client;
    var commands = [];
    var prefix = config.prefix;

    Client.login(config.token).then(()=>{}).catch(e => {
        console.log("Cannot login!");
        console.log(e);
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
                    handler.execute(mes);
                }catch(e){
                    console.log('Error occurs when executing command: ' + handler.command);
                }
            }
        });
    }

    function attachCommand(command){
        commands.push(command);
    }

    return {
        attachCommand: attachCommand
    }
}

module.exports = Bot;