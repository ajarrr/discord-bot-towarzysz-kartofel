const { ApplicationCommandOptionType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const ffmpeg = require('ffmpeg-static');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);


module.exports = {
    callback: async (client, interaction) => {
        const userInput = interaction.options.getInteger('minutes');
        const audioPath = 'src/content/timer.mp3';
        
        let realtimer = userInput * 60 * 1000; // Convert minutes to milliseconds

        // Check if the user is in a voice channel
        const channel = interaction.member.voice.channel;
        if (channel) {
            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            // Create an audio player
            const player = createAudioPlayer();

            // Subscribe the connection to the audio player
            connection.subscribe(player);

            // Create an audio resource from the MP3 file
            let resource = createAudioResource(createReadStream(audioPath));

            // Play the audio resource on loop
            player.play(resource);
            player.on('error', error => console.error(`Error: ${error.message}`));
            player.on(AudioPlayerStatus.Idle, () => {
                resource = createAudioResource(createReadStream(audioPath));
                player.play(resource);
            }); 
            
        } else {
            return interaction.reply( {content: 'KGB donosi że nie ma cie na żadnym kanale. . .', ephemeral: true } );
        }

        if (userInput > 0) {
        if (userInput <= 10) {
            const timerEmbed = {
                color: 0xFF0000,
                title: `Rozpoczynam timer ustawiony na ${userInput} minuty`,
                image: {
                    url: 'https://media.giphy.com/media/xTk9Zx0YYJJqjZN4xa/giphy.gif',
                },
            };

            let message = await interaction.channel.send({ embeds: [timerEmbed] });
            
            let countdown = setInterval(() => {
                realtimer = realtimer - 1000; // Decrease the timer by 1 second

                // Calculate the remaining time in minutes and seconds
                let minutes = Math.floor((realtimer % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((realtimer % (1000 * 60)) / 1000);
                
                if ( realtimer >= 300000 ) 
                {
                    timerEmbed.title = `Zostało ${minutes} minut i ${seconds} sekund`;
                }
                if ( realtimer < 300000 && realtimer > 119000 ) 
                {
                    timerEmbed.title = `Zostały ${minutes} minuty i ${seconds} sekund`;
                }
                if ( realtimer < 119000 && realtimer > 59000 ) 
                {
                    timerEmbed.title = `Została ${minutes} minuta i ${seconds} sekund`;
                }
                if ( realtimer < 59000 && realtimer > 0 ) 
                {
                    timerEmbed.title = `Zostało ${seconds} sekund`;
                }
                if ( realtimer <= 0 )
                {
                    timerEmbed.title = `Czas się skończył`;
                    timerEmbed.image.url = `https://media.giphy.com/media/VEOPIjApsMIuwsAwJF/giphy.gif`;
                    clearInterval(countdown);
                    getVoiceConnection(channel.guild.id).destroy();

                }

                // Edit the message
                message.edit({ embeds: [timerEmbed] });
                
            }, 1000); // Update every second
        } else {
            interaction.reply({content: "Timer nie może wynosić więcej niż 10 minut.", ephemeral: true });
        }
        } else {
            interaction.reply({content: "Timer nie może być mniejszy niż 0 minut.", ephemeral: true });
        }

        console.log(`⚠️ ${interaction.user.tag} użył komendy TIMER`);
    },
    name: 'timer',
    description: 'Towarzysz rozpocznie podliczać ci podany czas',
    options: [
        {
            name: 'minutes',
            description: 'Podaj ile minut ma liczyć timer',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.joinVoiceChannel, PermissionFlagsBits.Connect, PermissionFlagsBits.Speak],
};
