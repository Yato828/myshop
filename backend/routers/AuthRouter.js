const Router = require('express');
const router = new Router();
const authController = require('../../backend/controllers/AuthController');

router.post('/registration', authController.registration);
router.post('/login', authController.login);

module.exports = router;
