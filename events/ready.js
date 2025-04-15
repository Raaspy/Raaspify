const { Events } = require('discord.js');


//* Crea la conexion usando los metodos de discord.js
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`¡Listo! Conectado como ${client.user.tag}`);
    }
};