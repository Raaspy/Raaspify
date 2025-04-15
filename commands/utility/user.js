const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Entrega información sobre el usuario.'),
    async execute(interaction) {
        await interaction.reply(`Este comando fue ejecutado por ${interaction.user.username}, quien se unio el ${interaction.member.joinedAt}.`);
    }
}
