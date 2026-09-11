const conversationService = require('./conversation.service');

const {
    getIO
} = require("../../socket/socketManager");


const createConversation = async (req, res) => {
    try {
        const { supportUnitId } = req.validated.body;
        const userId = req.user.userId;

        const conversation =
            await conversationService.createConversation(
                userId,
                supportUnitId
            );

        res.status(201).json(conversation);

    } catch (error) {
        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getMyConversations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const conversations =
            await conversationService.getMyConversations(userId);

        res.status(200).json(conversations);

    } catch (error) {
        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getStaffConversations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const conversations =
            await conversationService.getStaffConversations(userId);

        res.status(200).json(conversations);

    } catch (error) {
        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getAllConversations = async (req, res) => {
    try {

        const conversations =
            await conversationService.getAllConversations();

        res.status(200).json(conversations);

    } catch (error) {

        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const createMessage = async (req, res) => {
    try {
        const conversationId = Number(req.params.id);
        const { content } = req.validated.body;

        const userId = req.user.userId;
        const role = req.user.role;

        const message =
            await conversationService.createMessage({
                userId,
                role,
                conversationId,
                content
            });

        const io = getIO();

        io.to(
            `conversation:${conversationId}`
        ).emit(
            "new_message",
            message
        );

        res.status(201).json(message);

    } catch (error) {
        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getMessages = async (req, res) => {
    try {
        const conversationId = Number(req.params.id);

        const userId = req.user.userId;
        const role = req.user.role;

        const messages =
            await conversationService.getMessages({
                userId,
                role,
                conversationId
            });

        res.status(200).json(messages);

    } catch (error) {
        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


module.exports = {
    createConversation,
    getMyConversations,
    getStaffConversations,
    getAllConversations,
    createMessage,
    getMessages
};