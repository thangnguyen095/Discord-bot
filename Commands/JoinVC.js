const CommandHandler = require('./CommandHandler');

class JoinVCCommand extends CommandHandler {
    constructor(){
        super('join', 'Join user\'s current voice channel');
    }

    execute(Bot, msg){
        Bot.joinVC();
    }
}

module.exports = JoinVCCommand;