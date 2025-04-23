# 🎧 **Raaspify** - Tu DJ Digital en Discord

> **“Donde hay música, hay Raaspify. 🎶”**

**Raaspify** es un bot musical desarrollado como proyecto personal, ideal para reforzar habilidades en **JavaScript** y **Node.js**, mientras te hace bailar en tu servidor de Discord.  
Permite reproducir canciones mediante **URLs o texto**, y si no encuentra una canción, la **descarga automáticamente y la guarda** para futuras sesiones.

---

## 📋 Tabla de Contenidos

- [⚙️ Estado del Proyecto](#️-estado-del-proyecto)
- [✨ Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [🚧 Próximas Funciones](#-próximas-funciones)
- [⚠️ Uso y Responsabilidad](#-uso-y-responsabilidad)
- [🔧 Instalación y Uso](#-instalación-y-uso)

---

## ⚙️ Estado del Proyecto

✅ **Raaspify** está completamente funcional y en uso activo en un servidor privado.  
Se encuentra en constante desarrollo, y está disponible para compartirlo con la comunidad en GitHub y con amigos.

---

## ✨ Características

- ▶️ **Control completo de reproducción**: play, pause, stop, skip, etc.
- 🔎 **Búsqueda por nombre o enlace directo** (YouTube).
- 📥 **Descarga automática** de canciones si no existen localmente.
- 🗂️ **Gestión de metadata** para una mejor organización.
- 💾 **Almacenamiento local** de canciones para ahorrar recursos.
- ⚠️ **Manejo de errores amigable** y respuestas con personalidad.

---

## 🛠️ Tecnologías Utilizadas

- ⚙️ **Node.js** – Motor principal del bot.
- 🤖 **Discord.js** – Librería para interacciones en Discord.
- 🔊 **yt-dlp** – Descarga de audio desde YouTube.
- 🎛️ **ffmpeg** – Procesamiento y conversión de audio.
- 📦 **dotenv** – Manejo seguro de variables de entorno.

---

## 🚧 Próximas Funciones

- 📜 **Playlists por usuario** para facilitar la reproduccion a los usuarios.
- ⏱️ **Sistema de colas** para gestionar varias canciones.
- 🛡️ **Comandos de moderación** para controlar el uso del bot en servidores.

---

## ⚠️ Uso y Responsabilidad

Este bot está en uso por amigos y para pruebas personales.  
Si deseas clonar el repositorio y usarlo en tu servidor, estás libre de hacerlo **bajo tu propia responsabilidad**.

> ⚠️ *Ten en cuenta que Raaspify descarga contenido de plataformas como YouTube. Asegúrate de cumplir con la legislación local respecto al uso de contenido con derechos de autor.*

---

## 🔧 Instalación y Uso

1. **Clona el repositorio:**
git clone https://github.com/tu-usuario/raaspify.git

2. **Instala las dependencias:**
npm install

3. **Agrega un archivo .env con:**
DISCORD_TOKEN=tu_token_aqui
FFMPEG_PATH=ruta/a/ffmpeg

4. **Ejecuta el bot:**
node index.js

¡Y listo! Usá el comando /play en Discord para disfrutar. 🚀


“Donde hay música, hay Raaspify.” 🎶