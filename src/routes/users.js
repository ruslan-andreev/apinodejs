const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

/**get all users */
router.get('/users', userControllers.getAllUsersHandler);

/**get user by id */
router.get('/users/id/:userId', userControllers.getUserByIdHandler);

/**signUp */
router.post('/users/signUp', userControllers.signUpHandler);

/**signIn */
router.post('/users/signIn', userControllers.signInHandler);

module.exports = router;
