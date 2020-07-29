const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')
const { demandOption } = require('yargs')

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
    builder:{
        title: {
            describe: "Note title to remove",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNote(yargs.argv.title)
    }
})

yargs.command({
    command:'list',
    description: 'list all notes',
    handler: function(){
        notes.getNotes();
    }
})

yargs.command({
    command:'read',
    description: 'show a particular note to read',
    builder:{
        title: {
            describe: "The note title you want to read",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(){
        notes.readNote(yargs.argv.title)
    }
})

yargs.parse()