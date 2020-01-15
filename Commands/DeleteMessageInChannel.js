var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler(
    'purge',
    async (Bot, content, mes) => {
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
        
    },
    "Delete n(integer) message in channel, no exclude"
);