module.exports = class CommandHandler {
    constructor(command, describe = "_"){
        if(!command){
            throw "Command cannot be null";
        }
        this.command = command;
        this.describe = describe;
    }

    handler(Bot, content, mes){

    }
}