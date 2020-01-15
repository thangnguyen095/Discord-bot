const CommandHandler = require('./CommandHandler');

class PingCommand extends CommandHandler {
    constructor(){
        super('ping', 'Ping Pong');
    }

    handler(Bot, msg, mes){
        mes.channel.send('Pong');
    }
}

module.exports = PingCommand;