var YtStreamHandler = require("../musicStream/youtubeStreamHandler");
var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('yt', (Bot, content, mes) => {
    var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
    if(regex.test(content)){
        var stream = new YtStreamHandler(content, mes.author.username);
        Bot.addSong(stream);
    }else{
        mes.channel.send("Error url")
    }
}, "Play youtube url, signle song only");