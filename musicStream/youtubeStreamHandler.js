var MusicStreamHander = require("./musicStreamHander");
var ytdl = require("ytdl-core");


class YoutubeStreamHandler extends MusicStreamHander {
    getStream(){
        console.log(this.url);
        return ytdl(this.url, {filter: "audioonly"});
    }
}

module.exports = YoutubeStreamHandler;