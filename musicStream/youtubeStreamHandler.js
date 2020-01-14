var MusicStreamHander = require("./musicStreamHander");
var ytdl = require("ytdl-core");


class YoutubeStreamHandler extends MusicStreamHander {
    getStream(){
        console.log("get stream url: ", this.url);
        return ytdl(this.url, {filter: "audioonly"});
    }
}

module.exports = YoutubeStreamHandler;