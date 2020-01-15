const CommandHandler = require('./CommandHandler');
const YtStreamHandler = require('../musicStream/youtubeStreamHandler');

class YoutubeStreamCommand extends CommandHandler {
    constructor(){
        super('yt', 'Play youtube audio from url, single only');
    }

    execute(Bot, content){
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
        if(regex.test(content)){
            const stream = new YtStreamHandler(content);
            Bot.addSong(stream);
        }else{
            Bot.sendMessage("Error url")
        }
    }
}

module.exports = YoutubeStreamCommand;