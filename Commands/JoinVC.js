const CommandHandler = require('./CommandHandler');

class JoinVCCommand extends CommandHandler {
    constructor(){
        super('join', 'Join user\'s current voice channel');
    }

    handler(Bot, msg, mes){
        Bot.joinVC(mes.member.voiceChannel);
    }
}

module.exports = JoinVCCommand;