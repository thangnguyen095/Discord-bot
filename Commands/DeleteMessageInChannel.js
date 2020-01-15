const CommandHandler = require('./CommandHandler');

// TODO: currently not working, need to be revised
class DeleteMessageCommand extends CommandHandler {
    constructor(){
        super('purge', 'Delete n(integer) message in channel');
    }

    async execute(Bot, content, mes){
        let totalMessageDelete = parseInt(content);
        if (Number.isInteger(totalMessageDelete)){
            let channel = mes.channel;
            await mes.delete();
            try {
                const fetchMess = await channel.fetchMessages({ limit: totalMessageDelete });
                await Promise.all(
                    fetchMess.array().map(m => m.delete())
                );
            } catch (error) {
                console.log(error);
            }
        }else{
            mes.channel.send("purge <numbe>");
        }
        
    }
}

module.exports = DeleteMessageCommand;