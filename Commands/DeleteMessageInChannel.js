var CommandHandler = require('./CommandHandler');

var discordMaxDelMes = 99;

module.exports = new CommandHandler(
    'purge',
    async (Bot, content, mes) => {
        let totalMessageDelete = parseInt(content);
        if (Number.isInteger(totalMessageDelete)){
            await mes.delete();
            while (totalMessageDelete > discordMaxDelMes) {
                const fetchMess = await mes.channel.fetchMessages({ limit: discordMaxDelMes });
                await mes.channel.bulkDelete(fetchMess);
                totalMessageDelete -= discordMaxDelMes
            }
            const fetchMess = await mes.channel.fetchMessages({ limit: totalMessageDelete });
            await mes.channel.bulkDelete(fetchMess);
        }else{
            mes.channel.send("purge <numbe>");
        }
        
    },
    "Delete n(integer) message in channel, no exclude"
);