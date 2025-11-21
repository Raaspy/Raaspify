const cleanTitle = (title) => {
    return title
        .replace(/\(.*?\)/g, '')            // elimina todo lo que está entre paréntesis
        .replace(/\[.*?\]/g, '')            // elimina todo lo que está entre corchetes
        .replace(/official|oficial|video|letra|lyrics?/gi, '')  // elimina palabras comunes innecesarias
        .replace(/HD|4K|MV/gi, '')          // elimina resoluciones y etiquetas de música
        .replace(/\s*[-–—]\s*/g, ' - ')     // normaliza guiones con espacios
        .replace(/\s+/g, ' ')               // reemplaza múltiples espacios por uno
        .replace(/^\s+|\s+$/g, '')          // elimina espacios al inicio y final
}

module.exports = cleanTitle;