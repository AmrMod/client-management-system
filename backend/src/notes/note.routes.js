const express = require('express');
const router = express.Router();
const noteController = require('./note.controller');

router.get('/user/:userId', noteController.getNotesByUserId);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
