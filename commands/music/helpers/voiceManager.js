const { joinVoiceChannel } = require('@discordjs/voice');

const listConnections = new Map();

function connectToChannel(voiceChannel) {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.member.voice.channel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    listConnections.set(voiceChannel.guild.id, connection)
    return connection
}

function getConnection(guildId) {
    return listConnections.get(guildId);
}

function destroyConnection(guildId) {
    const connection = listConnections.get(guildId);

    if (connection) {
        connection.destroy();
        listConnections.delete(guildId);
    }
}

module.exports = { connectToChannel, getConnection, destroyConnection }