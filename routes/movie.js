const { Router } = require('express');
const movieController = require('../controllers/movieController');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.verifyToken, movieController.all_movies_get);
router.post('/', movieController.new_movie_post);

module.exports = router;