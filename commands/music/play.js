const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { searchSong } = require('./helpers/searchSong');
const { downloadSong } = require('./helpers/downloadSong');
const { downloadsMetadata } = require('./helpers/downloadMetadata');
const { isURL } = require('./helpers/isUrl');
const { findSong } = require('./helpers/findSong');
require('dotenv').config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una canción de YouTube.')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('Nombre o URL de la canción.')
                .setRequired(true)),

    async execute(interaction) {

        //* Función para no repetir el mismo codigo constantemente.
        async function connectionVoice(path) {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        
            const player = createAudioPlayer();
            const resource = createAudioResource(path.path);
        
            player.play(resource);
            connection.subscribe(player);
            await interaction.editReply(`:arrow_forward: Reproduciendo: **[${path.title}]** ¡Disfrútala! :leaves:`);
            
            player.on(AudioPlayerStatus.Idle, () => { connection.destroy(); });
        }

        const song = interaction.options.getString('url');

        if (!interaction.member.voice.channel) {
            return interaction.reply('No te veo en ningún canal :face_with_raised_eyebrow:. ¡Entra a uno primero!');
        }
        
        await interaction.deferReply(); //* Da tiempo para que el bot inicie tranquilamente.
        
        try {
            const songName = isURL(song);

            if (songName) {
                const isSongSaved = await searchSong(songName);

                if (!isSongSaved) {
                    const existingSongData = await downloadSong(songName);

                    if (existingSongData) {

                        try {
                            const metadataSaved = await downloadsMetadata(songName);
            
                            if (metadataSaved) {
                                await interaction.editReply(`:white_check_mark: **[${existingSongData}]** - Está oficialmente en mis archivos. Dale **/play** para oírla. :file_folder::notes:`);
                                
                            } else {
                                await interaction.editReply(`:white_check_mark: Descarga completa, pero falló la metadata. :tools: Será corregido pronto.`);
                            }
                        } catch (metaError) {
                            console.error('Error al guardar metadata:', metaError);
                            await interaction.editReply(`:white_check_mark: Canción descargada, pero falló el guardado de metadata. :bug:`);
                        }
                        
                    } else {
                        await interaction.followUp(`¡Ups! No pude descargar la canción. :confused: Intenta con otro enlace.`);
                    }
        
                } else {

                    //* ESTA ES LA ZONA QUE REPRODUCE POR URL
                    searchName = await searchSong(songName);
                    filePath = await findSong(searchName.title);

                    connectionVoice(filePath);
                }

            } else {
                //* ESTA ES LA ZONA QUE REPRODUCE POR NOMBRE
                const filePath = await findSong(song);

                if (!filePath) {
                    await interaction.followUp(`:thinking: Aún no la tengo... Pero si me das el link, la bajo y la guardo para la próxima. :inbox_tray:`);
                } else {                
                    connectionVoice(filePath);
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply(':exclamation: Hubo un error al intentar reproducir la canción.');
        }

    }
}