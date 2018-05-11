function CommandHandler(command, handler){
    if(!command || !fn){
        throw "Command and handler cannot be null";
    }

    return {
        command: command,
        execute: fn
    }
}

module.exports = CommandHandler;