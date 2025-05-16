const playdl = require('play-dl');
const DB_PATH = './data/songs.json';
const fs = require('fs');

const downloadsMetadata = async(link) => {
    try {
        const data = await playdl.video_basic_info(link);

        const id = data.video_details.id
        const title = data.video_details.title;
        const url = data.video_details.url;
        const duration = data.video_details.durationInSec;

        

        function cleanTitle(title) {
            return title
                .replace(/\(.*?\)/g, '')            // elimina todo lo que está entre paréntesis
                .replace(/\[.*?\]/g, '')            // elimina todo lo que está entre corchetes
                .replace(/official|oficial|video|letra|lyrics?/gi, '')  // elimina palabras comunes innecesarias
                .replace(/HD|4K|MV/gi, '')          // elimina resoluciones y etiquetas de música
                .replace(/\s*[-–—]\s*/g, ' - ')     // normaliza guiones con espacios
                .replace(/\s+/g, ' ')               // reemplaza múltiples espacios por uno
                .replace(/^\s+|\s+$/g, '')          // elimina espacios al inicio y final
        }
        
        let cleanSong = cleanTitle(title);

        const videoData = {
            id,
            cleanSong, //* Aqui va la variable del titulo que modificamos.
            url,
            duration
        };

        let dataFile = {};
        
        try {
            dataFile = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        } catch (err) {
            console.log('Archivo vacío o no existe, se creará uno nuevo.');
        }

        if (!dataFile[id]) {
            //* Pasamos el id al objeto como idenficador unico. Luego sobreescribimos el archivo.
            dataFile[id] = videoData;
            fs.writeFileSync(DB_PATH, JSON.stringify(dataFile, null, 2), 'utf8');
            
            return true; //* True indica que el archivo NO existe, por lo cual lo guarda en el sistema.

        }else {
            return false; //* False indica que el archivo SI existe, por lo cual no lo guarda en el sistema.
        }

    } catch (error) {
        console.error('Error durante el proceso: ', error);
    }
};

module.exports = { downloadsMetadata };