const playdl = require('play-dl');
const DB_PATH = './data/songs.json';
const fs = require('fs');

const searchSong = async(link) => {
    try {
        //* Entregamos el link a playdl para que nos devuelva el id de la cancion.
        const data = await playdl.video_basic_info(link);
        const idVideo = data.video_details.id

        //* Vamos a buscar la data que tenemos registrada en el songs.json y la guardamos para revisarla.
        let dataFile = {};
        try {
            dataFile = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        } catch (error) {
            console.log('Error durante al búsqueda: ', error);
        }

        //* Transformamos el object y realizamos la comparacion para encontrar coincidencias. Si es así, retornamos los datos.
        const transformacion = Object.values(dataFile)
        const searchResults = transformacion.find(obj => obj.id === idVideo);

        if (!searchResults) {
            return false; //* Retornamos False si no tenemos datos de la cancion registrado en el Json.
        } else {
            return {
                id: searchResults.id,
                title: searchResults.title
            }
        }

    } catch (error) {
        console.error('Error durante el proceso: ', error);
    }
};

module.exports = { searchSong };