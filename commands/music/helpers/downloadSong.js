const { exec } = require('child_process');
const playdl = require('play-dl');
const { promisify } = require('util');
require('dotenv').config();

const downloadSong = async (link) => {
    
    try {
        if (!process.env.FFMPEG_PATH) {
            console.error("FFMPEG_PATH no está configurado en .env");
            return false;
        }

        const info = await playdl.video_basic_info(link);
        const title = info.video_details.title.replace(/[<>:"/\\|?*]/g, ''); //* limpia nombre para evitar errores de archivo

        //* Realizamos la descarga del audio, si funciona obtenemos el titulo del video, si no, obtenemos False.
        const execPromise = promisify(exec); 
        const command = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --ffmpeg-location "${process.env.FFMPEG_PATH}" -o "downloads/${title}.%(ext)s" "${link}"`;

        await execPromise(command);

        return title;

    } catch (error) {
        console.error(`Error obteniendo info del video: ${error}`);
        return false;
    }

};

module.exports = { downloadSong };