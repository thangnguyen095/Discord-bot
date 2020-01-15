const CommandHandler = require('./CommandHandler');

class PingCommand extends CommandHandler {
    constructor(){
        super('ping', 'Ping Pong');
    }

    execute(Bot, msg){
        Bot.sendMessage('Pong')
    }
}

module.exports = PingCommand;