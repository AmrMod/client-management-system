const requestService = require('./request.service');

const createRequest = async (req, res) => {
    try {
        const { supportUnitId, title, description, priority } = req.body;
        const userId = req.user.userId;

        const newRequest = await requestService.createRequest({
            userId,
            supportUnitId,
            title,
            description,
            priority
        });

        res.status(201).json(newRequest);
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

const getMyRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requests = await requestService.getRequestsByUserId(userId);

        res.status(200).json(requests);
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

const getManagerRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requests = await requestService.getRequestsByManager(userId);

        res.status(200).json(requests);
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


const getSupportUnits = async (req, res) => {
    try {
        const supportUnits = await requestService.getSupportUnits();

        res.status(200).json(supportUnits);
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
    createRequest,
    getManagerRequests,
    getMyRequests,
    getSupportUnits
};