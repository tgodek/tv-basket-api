const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/", userController.all_users_get);
router.post("/register", userController.register_post);
router.post("/login", userController.login_post);

module.exports = router;
