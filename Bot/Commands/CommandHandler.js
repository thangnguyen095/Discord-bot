function CommandHandler(command, fn){
    var Command = command;

    function execute(mes){
        fn(mes);
    }

    return {
        command: Command,
        execute: execute
    }
}

module.exports = CommandHandler;