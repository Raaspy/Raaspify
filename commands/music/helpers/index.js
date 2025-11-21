module.exports = {
    audio: {
        downloadsMetadata: require('./audio/downloadMetadata'),
        downloadSong: require('./audio/downloadSong')
    },
    search: {
        findSong: require('./search/findSong'),
        isURL: require('./search/isUrl'),
        searchSong: require('./search/searchSong')
    },
    utils: {
        cleanTitle: require('./utils/cleanTitle'),
        dataPlaydl: require('./utils/dataPlaydl'),
        test: require('./utils/test'),
        voiceManager: require('./utils/voiceManager')
    }
};

/*
!COMO SE LLAMAN

const { audio, search, strings } = require('./helpers');

audio.downloadSong(...);
search.searchSong(...);

*/