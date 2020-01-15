const CommandHandler = require('./CommandHandler');

class LeaveVCCommand extends CommandHandler {
    constructor(){
        super('leave', 'Leave current voice channel');
    }

    execute(Bot, msg){
        Bot.leaveVC();
    }
}

module.exports = LeaveVCCommand;