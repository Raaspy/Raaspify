const { spawn } = require('child_process');
const { PassThrough } = require('stream');
const fs = require('fs');
const playdl = require('play-dl');
require('dotenv').config();

const downloadSong = async (link) => {
    
    try {
        if (!process.env.FFMPEG_PATH) {
            console.error("FFMPEG_PATH no está configurado en .env");
            return false;
        }

        //! AQUI CREO QUE TIENE QUE HABER UN CAMBIO CON EL TITLE YA QUE ANTES YA SE MODIFICA EL TEXTO.

        const info = await playdl.video_basic_info(link);
        const title = info.video_details.title.replace(/[<>:"/\\|?*]/g, ''); //* limpia nombre para evitar errores de archivo

        console.log("✅ inicio de comando");
        const command = spawn('yt-dlp', [
            '-f', 'bestaudio[ext=webm]',
            '--extract-audio',
            '--audio-format', 'opus',
            '--audio-quality', '3', //* Para una calidad mayor usar 0, pero aumenta el peso del archivo. (Calidad: Mayor 0 - Menor 10)
            `--ffmpeg-location=${process.env.FFMPEG_PATH}`,
            '-o', '-', //* Salida a stdout
            link
        ]);

        
        console.log("✅ iniciamos doble camino")
        const stream = new PassThrough();
        command.stdout.pipe(stream);

        console.log("✅ salida en stdout")
        const writeStream = fs.createWriteStream(`${process.env.DOWNLOAD_PATH}${title}.opus`);
        stream.pipe(writeStream);

        console.log("✅ se guardo el archivo")

        //* Manejo de errores
        command.stderr.on('data', (data) => console.error('yt-dlp error:', data.toString()));
        command.on('close', (code) => {
            if (code !== 0) console.error(`yt-dlp exited with code ${code}`);
        });
        
        console.log("✅ retorna stream", stream)
        return stream;


    } catch (error) {
        console.error(`Error obteniendo info del video: ${error}`);
        return false;
    }

};

module.exports = { downloadSong };