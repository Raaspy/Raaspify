//const { downloadsMetadata } = require('./downloadMetadata');
//const { downloadSong } = require('./downloadSong')
const dataPlaydl = require('./dataPlaydl')
const downloadMetadata = require('../audio/downloadMetadata')

//downloadsMetadata('https://www.youtube.com/watch?v=spt1zvbezyE');
//downloadSong('https://www.youtube.com/watch?v=oSGgWlzZ9ko&ab_channel=BadBunny');
const test =  async() => {
    const result = await downloadMetadata('https://www.youtube.com/watch?v=vXtJkDHEAAc&ab_channel=Calle13VEVO');
    console.log(result);
} 

test();