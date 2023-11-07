const express = require('express');
const path = require('path');
const app = express();

// Set the directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the POST request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));// Send a simple text response
  });

app.post('/get-elisa', (req, res) => {
  // Assuming the image1.jpg is located in the 'public' directory
  res.sendFile(path.join(__dirname, 'public', 'Elisa.jpg'));
});

app.get('/get-leo', (req, res) => {
    // Your code to handle the GET request for /get-leo
    res.sendFile(path.join(__dirname, 'public', 'Leo.jpg'));
});


const port = 4884;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
