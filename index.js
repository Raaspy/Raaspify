const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs')
const path = require('node:path');

require('dotenv').config();


//* Se crea la instancia para un nuevo cliente
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, // Para interactuar con los servidores
        GatewayIntentBits.GuildVoiceStates, // Permite al bot recibir información sobre el estado de los miembros en los canales de voz (conexión, desconexión, cambios de canal).
        GatewayIntentBits.GuildMessages, // Para escuchar los mensajes en los canales de texto
        GatewayIntentBits.MessageContent, // Necesario para acceder al contenido del mensaje (para obtener los comandos)
	]});

//* Se realiza una busqueda de la ruta de comandos mediante fs y path de node
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[Alerta] El comando ${filePath} requiere que las propiedades "data" o "execute" se encuentren definidas.`);
		}
	}
}

//* Se realiza una busqueda de los eventos guardados en la carpeta "events" mediante fs y path de node
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//* Se inicia el bot y se crea una coleccion para los comandos
client.login(process.env.DISCORD_TOKEN);