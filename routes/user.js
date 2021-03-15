const { Router } = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', userController.all_users_get);
router.post('/register', authController.register_post);
router.post('/login', authController.login_post);

module.exports = router;