const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Entrega información sobre el server.'),
    async execute(interaction) {
        await interaction.reply(`El nombre del servidor es ${interaction.guild.name} y tiene ${interaction.guild.memberCount} miembros.`);
    }
}
