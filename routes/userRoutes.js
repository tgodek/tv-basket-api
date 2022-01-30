const { Router } = require("express");
const userController = require("../controllers/userController");
const authController = require("../middleware/auth");

const router = Router();

router.get("/", userController.all_users_get);
router.get("/revoke_refresh_token", userController.revokeRefreshTokenForUser);
router.get("/me", authController.verifyToken, userController.me_get);
router.post("/register", userController.register_post);
router.post("/login", userController.login_post);

module.exports = router;
