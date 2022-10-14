const express = require('express');
const controller = require('../controllers/connectionController.js');
const router = express.Router();

//GET /connections - get a list of all connections
router.get('/', controller.index);

module.exports = router;