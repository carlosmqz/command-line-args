const fs = require('fs')
const util = require('util')

const getNotes = function(){
    fs.promises.readFile('notes.json').then(function(data){
        const jsonDataArray = JSON.parse(Buffer.from(data).toString());
        jsonDataArray.forEach(note => {
            console.log('Note Title: '+note.title);
        });
    }).catch(function(error){
        console.log('Error: '+ error)
    })
}

const readNote = function(title){
    fs.promises.readFile('notes.json').then(function(data){
        const jsonDataArray = JSON.parse(Buffer.from(data).toString());
        jsonDataArray.forEach(note => {
            if(note.title === title){
                console.log('Note content:\n' + note.body);
                return
            }
        });
    }).catch(function(error){
        console.log('Error: '+ error)
    })
}
const addNote = function(title, body){
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
}

const removeNote = function(title){
    fs.promises.readFile('notes.json',{'flag':'r+'}).then((data) => {
        const jsonData = JSON.parse(Buffer.from(data).toString());
        let found = false;
        jsonData.forEach((note, index) =>{
            if(note.title === title){
                jsonData.splice(index,1)
                found=true
                return
            }
        })
        return found ? {
                file: 'notes.json',
                data:jsonData
            } : null
        }).then((dataObject) => {
        if(dataObject === null){
            console.log('Note not found, no records deleted')
            return
        }
        fs.promises.writeFile(dataObject.file,JSON.stringify(dataObject.data))
            .then(() => {
                console.log('Note removed successfully!')
                return dataObject.file
            }).catch((e) => {console.log('Error: '+ e)})
        
    }).catch((e) => {console.log(e)})
}


module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote: removeNote,
    readNote : readNote
    
}

