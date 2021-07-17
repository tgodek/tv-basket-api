const { Router } = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../middleware/auth");

const router = Router();

router.get("/", authController.verifyToken, movieController.discover_movies_get);
router.get("/top", authController.verifyToken, movieController.top_movies_get);
router.get("/popular", authController.verifyToken, movieController.popular_movies_get);
router.get("/info", authController.verifyToken, movieController.movie_info);
router.get("/search", /*authController.verifyToken,*/ movieController.movie_search);

module.exports = router;
