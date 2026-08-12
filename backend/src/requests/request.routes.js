const express = require('express');
const router = express.Router();
const requestController = require('./request.controller');

router.post('/', requestController.createRequest);
router.get('/support-units', requestController.getSupportUnits);

module.exports = router;