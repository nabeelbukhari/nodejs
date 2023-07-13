const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();

    debugger

    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk.red.bold(`Note with title: '${title}' already exist!`));
        return;
    }

    notes.push({
        title,
        body
    });

    saveNotes(notes);

    console.log(chalk.green.bold('Note Added!'));
};

const removeNote = title => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title != title);
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.bold(`Note with title: '${title}' doesn't exist!`));
        return;
    }

    saveNotes(notesToKeep);

    console.log(chalk.green.bold('Note removed!'));
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.bold('Your notes:'));

    notes.forEach(note => console.log(note.title));
};

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);
    if (!note) {
        console.log(chalk.red.bold('Note not found!'));
        return;
    }

    console.log(chalk.inverse.bold(note.title));
    console.log(note.body);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    console.log(notes);
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
module.exports =  {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}