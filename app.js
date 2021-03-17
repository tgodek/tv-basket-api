const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
require('dotenv/config');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: ["http://localhost:3001"],
}));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

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
    res.send('TV Basket home route');
});