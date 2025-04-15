const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Hace que el bot se una a tu canal de voz.'),
    
    async execute(interaction) {

        try {
            if (interaction.member.voice.channel) {
                
                const connection = joinVoiceChannel({
                    channelId: interaction.member.voice.channel.id,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                
                await interaction.reply('He llegado al canal de voz. ¡Vamos a divertirnos! :microphone:');

            } else {
                await interaction.reply('No te veo en ningún canal :face_with_raised_eyebrow:. ¡Entra a uno primero!');
            };

        } catch (error) {
            return console.log(`Error Detectado: ${error}`);
        }
    }
};