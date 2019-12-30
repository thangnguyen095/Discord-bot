function CommandHandler(command, handler){
    if(!command || !handler){
        throw "Command and handler cannot be null";
    }

    return {
        command: command,
        execute: handler
    }
}

module.exports = CommandHandler;