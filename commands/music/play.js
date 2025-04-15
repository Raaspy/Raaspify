const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const playdl = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una canción de YouTube.')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('Nombre o URL de la canción.')
                .setRequired(true)),

    async execute(interaction) {

        const query = interaction.options.getString('query');

        if (!interaction.member.voice.channel) {
            return interaction.reply('No te veo en ningún canal :face_with_raised_eyebrow:. ¡Entra a uno primero!');
        }
        
        await interaction.deferReply(); // Da tiempo para que el bot inicie tranquilamente.
        
        try {
            
            const stream = await playdl.stream(query);
            const resource = createAudioResource(stream.stream, { inputType: stream.type });

            console.log(stream.type);
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => { connection.destroy(); });

            await interaction.editReply(`:notes: Reproduciendo: ${query}`);

        } catch (error) {
            console.error(error);
            await interaction.editReply(':exclamation: Hubo un error al intentar reproducir la canción.');
        }

    }
}