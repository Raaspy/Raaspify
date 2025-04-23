const fs = require('fs');
const path = require('path');
const dirPath = 'downloads';

function findSong(name) {
    try {
        const listSongs = fs.readdirSync(dirPath).filter(file => file.endsWith('.mp3'));

        const clean = (str) => str
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '');

        const cleanedQuery = clean(name);
        const songClean = listSongs.find(song => clean(song).includes(cleanedQuery));

        if (!songClean) {
            return false; // No se encontró ninguna canción
        }

        const songName = path.resolve(dirPath, songClean);

        return {
            path: songName,
            title: songClean.replace('.mp3', '')
        };

    } catch (error) {
        console.error(`Error al buscar la canción: ${error}`);
        return false;
    }
}

module.exports = { findSong };