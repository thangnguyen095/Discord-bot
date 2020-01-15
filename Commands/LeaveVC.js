const CommandHandler = require('./CommandHandler');

class LeaveVCCommand extends CommandHandler {
    constructor(){
        super('leave', 'Leave current voice channel');
    }

    handler(Bot, msg, mes){
        Bot.leaveVC(mes.guild);
    }
}

module.exports = LeaveVCCommand;