require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);

mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

var db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to DB");
});

db.on('error', console.error.bind(console, 'Error connecting to database'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,
  console.log(`Server running mode on port ${PORT}`)
);



//home route
app.get('/', (req, res) => {
    res.send('Hello 1');
});