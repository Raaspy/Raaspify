const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus, StreamType, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { audio, search, utils } = require('./helpers');
// const { downloadSong } = require('./helpers/downloadSong');
// const { downloadsMetadata } = require('./helpers/downloadMetadata');
// const { isURL } = require('./helpers/isUrl');
// const { findSong } = require('./helpers/findSong');
const connectToChannel = require('./helpers/utils/voiceManager');//! REVISAR CONEXION MODULOS
const fs = require('fs');
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
        // async function connectionVoice(path) {
        //     const connection = joinVoiceChannel({
        //         channelId: interaction.member.voice.channel.id,
        //         guildId: interaction.guild.id,
        //         adapterCreator: interaction.guild.voiceAdapterCreator,
        //     });
        
        //     const player = createAudioPlayer();
        //     const resource = createAudioResource(path.path);
        
        //     player.play(resource);
        //     connection.subscribe(player);
        //     await interaction.editReply(`:arrow_forward: Reproduciendo: **[${path.title}]** ¡Disfrútala! :leaves:`);
            
        //     player.on(AudioPlayerStatus.Idle, () => { connection.destroy(); });
        // }

        const song = interaction.options.getString('url');

        if (!interaction.member.voice.channel) {
            return interaction.reply('No te veo en ningún canal :face_with_raised_eyebrow:. ¡Entra a uno primero!');
        }
        
        await interaction.deferReply(); //* Da tiempo para que el bot inicie tranquilamente.
        
        try {
            const songName = search.isURL(song);

            if (songName) {
                const isSongSaved = await search.searchSong(songName);

                if (!isSongSaved) {
                    const existingSongData = await audio.downloadSong(songName);

                    if (existingSongData) {

                        try {
                            const metadataSaved = await audio.downloadsMetadata(songName);
            
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
                    searchName = await search.searchSong(songName);
                    filePath = await search.findSong(searchName.title);

                    //connectionVoice(filePath);
                }

            } else {
                //* ESTA ES LA ZONA QUE REPRODUCE POR NOMBRE
                const filePath = await search.findSong(song);
                console.log("aAa", filePath)

                if (!filePath) {
                    await interaction.followUp(`:thinking: Aún no la tengo... Pero si me das el link, la bajo y la guardo para la próxima. :inbox_tray:`);
                } else {        
                    //connectionVoice(filePath);        
                    const connection = connectToChannel(interaction);

                    const player = createAudioPlayer();
                    //const resource = createAudioResource(filePath.path);
                    const resourceOpus = createAudioResource(filePath.path, { inputType: StreamType.Opus });
                
                    player.play(resourceOpus);
                    connection.subscribe(player);
                    
                    await interaction.editReply(`:arrow_forward: Reproduciendo: **[${filePath.title}]** ¡Disfrútala! :leaves:`);
                    player.on(AudioPlayerStatus.Idle, () => { connection.destroy(); }); //! REVISAR ESTO LUEGO
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply(':exclamation: Hubo un error al intentar reproducir la canción.');
        }

    }
}