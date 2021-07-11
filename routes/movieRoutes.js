const { Router } = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../middleware/auth");

const router = Router();

router.get("/", authController.verifyToken, movieController.all_movies_get);
router.get(
  "/popularMovies",
  authController.verifyToken,
  movieController.popular_movie_get
);
router.post("/", authController.verifyToken, movieController.new_movie_post);

module.exports = router;
