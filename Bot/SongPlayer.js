function SongPlayer(vcc){    
    var songs = [];
    var playing = false;
    var player = null;

    this.addSong = function addSong(song){
        songs.push(song);
        if(!playing){
            this.play(guild);
        }

        return songs.length - 1; // return song index
    }

    this.play = function play(songIndex){
        var index = songIndex || 0;
        if(!songs[index]){
            return;
        }

        var song = songs[index];
        songs.splice(index, 1);
        
        if(playing && player){
            player.end();
        }
        player = Player(song);
    }

    function Player(song){
        var dispatcher = vcc.playStream(song.getStream());
    
        dispatcher.on('start', () => {
            playing = true;
        });
    
        dispatcher.on('end', () => {
            this.play();
        });

        return {
            end: dispatcher.end,
            pause: dispatcher.pause,
            resume: dispatcher.resume
        }
    }
}

module.exports = SongPlayer;