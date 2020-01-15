const CommandHandler = require('./CommandHandler');
const YtStreamHandler = require('../musicStream/youtubeStreamHandler');

class YoutubeStreamCommand extends CommandHandler {
    constructor(){
        super('yt', 'Play youtube audio from url, single only');
    }

    handler(Bot, content, mes){
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
        if(regex.test(content)){
            const stream = new YtStreamHandler(content, mes.author.username);
            Bot.addSong(mes.guild, stream);
        }else{
            mes.channel.send("Error url")
        }
    }
}

module.exports = YoutubeStreamCommand;