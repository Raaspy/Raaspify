const DB_PATH = './data/songs.json';
const { utils } = require('../../helpers');
const fs = require('fs');

const downloadsMetadata = async(link) => {
    try {
        const MetaData = await utils.dataPlaydl(link);

        const videoData = {
            id: MetaData.id,
            title: MetaData.title,
            author: MetaData.author,
            url: MetaData.url,
            duration: MetaData.duration
        };

        let dataFile = {};
        
        try {
            dataFile = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        } catch (err) {
            console.log('Archivo vacío o no existe, se creará uno nuevo.');
        }

        if (!dataFile[MetaData.id]) {
            //* Pasamos el id al objeto como idenficador unico. Luego sobreescribimos el archivo.
            dataFile[MetaData.id] = videoData;
            fs.writeFileSync(DB_PATH, JSON.stringify(dataFile, null, 2), 'utf8');
            
            return true; //* True indica que el archivo NO existe, por lo cual lo guarda en el sistema.

        }else {
            return false; //* False indica que el archivo SI existe, por lo cual no lo guarda en el sistema.
        }

    } catch (error) {
        console.error('Error durante el proceso: ', error);
    }
};

module.exports = downloadsMetadata;