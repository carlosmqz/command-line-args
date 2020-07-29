const fs = require('fs')
const util = require('util')

const getNotes = function(){
    const notes = 
        fs.promises.readFile('notes.json').then(function(data){
            const jsonDataArray = JSON.parse(Buffer.from(data).toString());
            jsonDataArray.forEach(note => {
                console.log('Title: '+note.title+'\n Body: '+ note.body+'\n');
            });
        }).catch(function(error){
            console.log('Error: '+ error)
        })

}
const addNote = function(title, body){
    const notes = 
        fs.promises.readFile('notes.json',{'flag':'r+'}).then((data) => {
            const jsonData = data.length > 0 ? JSON.parse(Buffer.from(data).toString()): []
            jsonData.push({
                title:title,
                body:body
            })
            return {
                    file: 'notes.json',
                    data:jsonData
                }
         }).then((dataObject) => {
            fs.promises.writeFile(dataObject.file,JSON.stringify(dataObject.data))
                .then(() => {
                    console.log('Data saved successfully!')
                    return dataObject.file
                }).catch((e) => {console.log('Error: '+ e)})
            
        }).catch((e) => {console.log(e)})
    
    
    //console.log(notes)
}


module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    
    
}

