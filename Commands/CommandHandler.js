function CommandHandler(command, handler, describe="_"){
    if(!command || !handler){
        throw "Command and handler cannot be null";
    }

    return {
        command: command,
        execute: handler,
        describe: describe,
    }
}

module.exports = CommandHandler;