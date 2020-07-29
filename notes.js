const fs = require('fs')
const util = require('util')

const getNotes = function(){
    return 'Your notes...'
}
const addNote = function(title, body){
    const notes =  loadNotes()
    console.log(notes)
     /*notes.push({
         title:title,
         body:body
    })*/
}
const loadNotes = function(){

    //const read = util.promisify(fs.readFile);
    const openFile = util.promisify(fs.open);
    try{
        const dataBuffer = function(){
            return openFile('notes.json','a+')
        }
        let jsonData=''
        dataBuffer().then(data => {
            jsonData = data.toString();
        })
        console.log(jsonData)
        const notesData = JSON.stringify(jsonData) 
        return notesData
    }catch(e){
        console.error(e)
    }
    
    
}


module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    
    
}

