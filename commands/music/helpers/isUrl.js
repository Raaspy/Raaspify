function isURL(link) {
    
    try {
        const url = new URL(link);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
            return url.href;
        } else {
            console.log('despues ', url)
            return false;
        }
        
    } catch (error) {
        console.error(`Error al analizar la URL: ${error}`);
        return false;
    }

}

/*
!IMPORTANTE!
* Desde la consulta se registra un error que viene de esta función, pero es porque (new URL) no puede procesar un texto que no sea URL.
* Por lo tanto, este se salta el IF de comparación y se va directo al Catch. Pero si se entrega una URL entra tranquilamente.
*/

module.exports = { isURL };