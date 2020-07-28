const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

yargs.command({
    command:'add',
    description:'add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'Note body content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(yargs.argv.title, yargs.argv.body)
    }
})

yargs.command({
    command:'remove',
    description: 'remove a note',
    handler: function(){
        console.log('Removing a note')
    }
})

yargs.command({
    command:'list',
    description: 'list all notes',
    handler: function(){
        console.log('Listing saved notes')
    }
})

yargs.command({
    command:'read',
    description: 'show a particular note to read',
    handler: function(){
        console.log('Read note command')
    }
})

yargs.parse()