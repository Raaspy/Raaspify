const playdl = require('play-dl');
const cleanTitle = require('./cleanTitle');

const dataPlaydl = async(link) => {
    
    try {
        const data = await playdl.video_basic_info(link);
        
        const id = data.video_details.id
        const title = data.video_details.title;
        const author = data.video_details.channel.name; //*Aqui obtenemos el nombre del canal, pero puede interpretarse como el artista.
        const url = data.video_details.url;
        const duration = data.video_details.durationInSec;

        const newTitle = await cleanTitle(title);

        return {
            id,
            title: newTitle,
            author,
            url,
            duration
        }

    } catch (error) {
        console.log('❌ Problemas con la funcion dataPlaydl:', error);
        return null;
    }

}

module.exports = dataPlaydl;