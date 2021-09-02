// Dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/routes');

// Setting port
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static assets
app.use(express.static('public'));

// set the routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () => 
console.log(`Listening on PORT: ${PORT}`)
);