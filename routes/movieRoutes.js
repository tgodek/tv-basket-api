const { Router } = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../middleware/auth");

const router = Router();

router.get("/", authController.verifyToken, movieController.discover_movies_get);
router.get("/top", authController.verifyToken, movieController.top_movies_get);
router.get("/popular", authController.verifyToken, movieController.popular_movies_get);
router.get("/info", authController.verifyToken, movieController.movie_info);
router.post("/add_to_watchlist", authController.verifyToken, movieController.movie_add_to_watchlist);
router.post("/add_to_tracked", authController.verifyToken, movieController.movie_add_to_tracked);
router.post("/remove_from_watchlist", authController.verifyToken, movieController.movie_remove_from_watchlist);
router.post("/remove_from_tracked", authController.verifyToken, movieController.movie_remove_from_tracked);


module.exports = router;
