const express = require('express');
const controller = require('../controllers/connectionController.js');
const router = express.Router();

//GET /connections - get a list of all connections
router.get('/', controller.index);

//GET /connections/new - send form to create a new connection
router.get('/new', controller.new);

//POST /connections - post a new connection to the site
router.post('/', controller.create);

//GET /connections/:id - send the connection with the specified ID
router.get('/:id', controller.details);

//GET /connections/:id/edit - send form to edit a specified connection
router.get('/:id/edit', controller.edit);

//PUT /connections/:id - update the connection with the given ID
router.put('/:id', controller.update);

//DELETE /connections/:id - delete the specified connection
router.delete('/:id', controller.delete);

module.exports = router;