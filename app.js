require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

var db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to DB");
});

db.on('error', console.error.bind(console, 'Error connecting to database'));

const PORT = process.env.PORT || 3001;
app.listen(PORT,
  console.log(`Server running mode on port ${PORT}`)
);



//rute
app.get('/', (req, res) => {
    res.send('Hello 1');
});

app.listen(3000);