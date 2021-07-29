module.exports = {
    name: 'youtubepl',
    description: "Play the given youtube playlist",
    async execute(message, args) {
        if (!message.guild) return;
        if (args.length != 1) {
            message.reply("Il me faut un lien");
            return;
        }

        if (message.client.dispatcher) {
            message.client.dispatcher.destroy(); // end the stream
            message.client.dispatcher = null;
            message.client.user.setActivity();
        }

        if (message.member.voice.channel) {
            if (args[0].includes('list=')) {

                var ytpl = require('ytpl');

                // console.log(ytpl.getPlaylistID(args[0]));

                const playlist = await ytpl(args[0]);

                var currentTrackId = 0;

                var tracksAmount = playlist.items.length;




                const ytdl = require('ytdl-core');

                const connection = await message.member.voice.channel.join();

                var dispatcher = connection.play(ytdl(playlist.items[currentTrackId]['shortUrl'], {
                    filter: 'audioonly',
                    volume: 0.5
                }));

                message.client.dispatcher = dispatcher;

                dispatcher.on('start', () => {
                    message.client.user.setActivity('Youtube', { url: args[currentTrackId], type: "LISTENING" });
                    console.log(`En cours (${currentTrackId+1}/${tracksAmount}) : ${playlist.items[currentTrackId]['title']}`);
                    message.channel.send(`En cours (${currentTrackId+1}/${tracksAmount}) : ${playlist.items[currentTrackId]['title']}`);
                });

                function loadNext() {
                    console.log("volume" + message.client.dispatcher.volume);
                    dispatcher = connection.play(ytdl(playlist.items[currentTrackId]['shortUrl'], {
                        filter: 'audioonly',
                        volume: message.client.dispatcher.volume
                    }));

                    message.client.dispatcher = dispatcher;

                    dispatcher.on('start', () => {
                        message.client.user.setActivity('Youtube', { url: args[currentTrackId], type: "LISTENING" });

                        console.log(`En cours (${currentTrackId+1}/${tracksAmount}) : ${playlist.items[currentTrackId]['title']}`);
                        message.channel.send(`En cours (${currentTrackId+1}/${tracksAmount}) : ${playlist.items[currentTrackId]['title']}`);
                    });

                    dispatcher.on('finish', () => {
                        currentTrackId += 1;
                        if (currentTrackId < tracksAmount) {
                            loadNext()
                        }
                        else {
                            console.log('Finished playing!');
                            dispatcher.destroy(); // end the stream
                            message.member.voice.channel.leave();
                            message.client.dispatcher = null;
                            message.client.user.setActivity();
                        }
                    });

                    dispatcher.on('error', () => {
                        message.reply("Je n'ai pas reussi a lire cette vidéo");
                        dispatcher.destroy(); // end the stream
                        message.member.voice.channel.leave();
                        message.client.dispatcher = null;
                        message.client.user.setActivity();
                    });
                }

                dispatcher.on('finish', () => {
                    currentTrackId += 1;
                    if (currentTrackId < tracksAmount) {
                        loadNext();
                    }
                    else {
                        console.log('Finished playing!');
                        dispatcher.destroy(); // end the stream
                        message.member.voice.channel.leave();
                        message.client.dispatcher = null;
                        message.client.user.setActivity();
                    }
                });

                dispatcher.on('error', () => {
                    message.reply("Je n'ai pas reussi a lire cette vidéo");
                    dispatcher.destroy(); // end the stream
                    message.member.voice.channel.leave();
                    message.client.dispatcher = null;
                    message.client.user.setActivity();
                });

            }
            else {
                message.reply(`Ce n'est pas une playlist valide`);
            }



        } else {
            message.reply(`Tu dois d'abord rejoindre un salon vocal`);
        }
    }
};