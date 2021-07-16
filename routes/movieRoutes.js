const { Router } = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../middleware/auth");

const router = Router();

router.post("/", authController.verifyToken, movieController.discover_movies_post);
router.post("/top", /*authController.verifyToken,*/ movieController.top_movies_post);
router.post("/popular", authController.verifyToken, movieController.popular_movies_post);
router.post("/info", /*authController.verifyToken,*/ movieController.movie_info);
router.post("/search", /*authController.verifyToken,*/ movieController.movie_search);

module.exports = router;
