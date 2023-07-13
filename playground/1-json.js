const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json');
let dataJSON = dataBuffer.toString();
let data = JSON.parse(dataJSON);

console.log(data);

data.name = "Nabeel Bukhari";
data.age = "35";

console.log(data);

dataJSON = JSON.stringify(data);
fs.writeFileSync('1-json.json', dataJSON);