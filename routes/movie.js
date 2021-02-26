const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    try {
        const allMovies = await Movie.find(); 
        res.json(allMovies);
    } catch (e) {
        res.send(e);
    }
}
);

router.post('/', async (req, res) => {
    try {
        const movie = new Movie(
            {
                title:req.body.title, 
                description:req.body.description, 
                releaseDate: req.body.releaseDate,
                poster:req.body.poster
            });
        const newMovie = await movie.save();

        res.json(newMovie);
    } catch (e) {
        res.send(e);
    }
}
);

module.exports = router;