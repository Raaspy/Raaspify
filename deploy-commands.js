const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');


const commands = [];

//* Se realiza una busqueda de la ruta de comandos mediante fs y path de node
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
			commands.push(command.data.toJSON());
		} else {
			console.log(`[Alerta] El comando ${filePath} requiere que las propiedades "data" o "execute" se encuentren definidas.`);
		}
	}
}

// Construye y prepara una instancia del módulo REST
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// ¡Y despliega tus comandos!
(async () => {
	try {
		console.log(`Se inició la actualización de ${commands.length} comandos de aplicación (/).`);

		// El método "put" se usa para actualizar completamente todos los comandos en el servidor con el conjunto actual
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
			{ body: commands },
		);

		console.log(`Se recargaron correctamente ${data.length} comandos de aplicación (/).`);
	} catch (error) {
		// Y por supuesto, asegúrate de capturar y registrar cualquier error
		console.error(error);
	}
})();