const http = require('http');
const fs = require('fs');

const url = 'http://www.reddit.com/r/popular.json'; // Replace with your JSON file URL

let startTime; // Declare the variable to hold the start time

const options = {
    hostname: 'www.reddit.com', // Change to the actual hostname
    port: 80,
    path: '/r/popular.json', // Change to the actual path
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' // Add your User-Agent string here
    },
    highWaterMark: 128*1024
  };
  
const req = http.request(options, (res) => {
  let data = '';

//   res.socket.readableHighWaterMark = 32 * 1024;
//   res.socket.writableHighWaterMark = 32 * 1024;
  console.log("readableHighWaterMark: ", res.socket.readableHighWaterMark);
  console.log("writableHighWaterMark: ", res.socket.writableHighWaterMark);
  res.on('data', (chunk) => {
    if (!startTime) {
        console.log("Reading started!")
        startTime = Date.now(); // Record the start time on the first data event
    }

    data += chunk;
    console.log("Reading data with chunk size: ", chunk.length);
  });

  res.on('end', () => {
    const endTime = Date.now(); // Record the end time
    const elapsedTime = endTime - startTime; // Calculate elapsed time
    console.log("Reading data ended with total size: ", data.length);

    try {
      const jsonData = JSON.parse(data);
      const filePath = './output.json'; // Define the path where you want to save the file

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log(`File saved to ${filePath}`);
          console.log(`Time taken to read body: ${elapsedTime} ms`);
        }
      });
    } catch (error) {
      console.error(`Error parsing JSON: ${error.message}`);
      console.error(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.end();