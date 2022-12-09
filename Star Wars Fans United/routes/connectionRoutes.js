const express = require('express');
const controller = require('../controllers/connectionController.js');
const rsvpController = require('../controllers/rsvpController.js');
const {isHost, isLoggedIn} = require('../middleware/auth');
const {validateId, validateConnection, validateResult} = require('../middleware/validator');
const router = express.Router();

//GET /connections - get a list of all connections
router.get('/', controller.index);

//GET /connections/new - send form to create a new connection
router.get('/new', isLoggedIn, controller.new);

//POST /connections - post a new connection to the site
router.post('/', isLoggedIn, validateConnection, validateResult, controller.create);

//GET /connections/:id - send the connection with the specified ID
router.get('/:id', validateId, controller.details);

//GET /connections/:id/edit - send form to edit a specified connection
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//PUT /connections/:id - update the connection with the given ID
router.put('/:id', validateId, isLoggedIn, isHost, controller.update);

//DELETE /connections/:id - delete the specified connection
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

//RSVP for an event
router.post('/:id/register', validateId, isLoggedIn, rsvpController.rsvp);

//Un-RSVP for an event
router.post('/:id/register', validateId, isLoggedIn, rsvpController.rsvpUndo);

module.exports = router;