const { Events, MessageFlags } = require('discord.js');


//* Comprueba que los comandos ingresados existan en el bot
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction){
        if (!interaction.isChatInputCommand()) { return;

        } else {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`El comando ${interaction.commandName} no fue encontrado.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log('Error: ' + error)

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: '¡Hubo un error al ejecutar este comando!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', flags: MessageFlags.Ephemeral });
                }
            }
            
        }
    }
};