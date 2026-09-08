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

router.get(
    '/staff',
    authenticate,
    requireRole('STAFF'),
    conversationController.getStaffConversations
);

router.get(
    '/admin',
    authenticate,
    requireRole('ADMIN'),
    conversationController.getAllConversations
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
    requireRole('STUDENT', 'STAFF', 'ADMIN'),
    conversationController.getMessages
);


module.exports = router;