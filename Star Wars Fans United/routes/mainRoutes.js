const express = require('express');
const controller = require('../controllers/mainController.js');
const router = express.Router();

//GET / - gets the home page
router.get('/', controller.home);

//GET /contact - gets the contact page
router.get('/contact', controller.contact);

//GET /about - gets the about page
router.get('/about', controller.about);

module.exports = router;