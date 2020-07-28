const fs = require('fs')
const util = require('util')

const getNotes = function(){
    return 'Your notes...'
}
const addNote = function(title, body){
    const notes =  loadNotes().then((data) => { 
        console.log(data); 
        return data
    })
    
     notes.push({
         title:title,
         body:body
    })
}
const loadNotes = async function(){

    const read = util.promisify(fs.readFile);

    const dataBuffer = await read('notes.json', function(err, data){
        if (err){
            throw err
        }
        return Buffer.from(data);
    })

    const jsonData = dataBuffer.toString();
    const notesData = JSON.parse(jsonData);
    
    return notesData
}


module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    
    
}

