const express = require('express');
const router = express.Router();

const conversationController =
    require('./conversation.controller');

const authenticate =
    require('../middleware/auth.middleware');

const requireRole =
    require('../middleware/role.middleware');

const validate =
    require('../middleware/validate.middleware');

const {
    createConversationSchema,
    createMessageSchema
} = require('./conversation.validation');


router.post(
    '/',
    authenticate,
    requireRole('STUDENT'),
    validate(createConversationSchema),
    conversationController.createConversation
);


router.get(
    '/',
    authenticate,
    requireRole('STUDENT'),
    conversationController.getMyConversations
);


router.post(
    '/:id/messages',
    authenticate,
    requireRole('STUDENT', 'STAFF'),
    validate(createMessageSchema),
    conversationController.createMessage
);


router.get(
    '/:id/messages',
    authenticate,
    requireRole('STUDENT', 'STAFF'),
    conversationController.getMessages
);


module.exports = router;