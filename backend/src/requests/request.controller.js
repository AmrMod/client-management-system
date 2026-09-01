const requestService = require('./request.service');

const createRequest = async (req, res) => {
    try {
        const { supportUnitId, title, description, priority } = req.validated.body;
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

// const getMyRequests = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         const requests = await requestService.getRequestsByUserId(userId);

//         res.status(200).json(requests);
//     } catch (error) {
//         console.error(error);

//         if (error.status) {
//             return res.status(error.status).json({
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

const getMyRequests = async (req, res) => {

    try {

        const userId = req.user.userId;

        const {
            page,
            limit,
            search,
            sortBy,
            order
        } = req.validated.query;


        const data =
            await requestService.getRequestsByUserId(
                userId,
                page,
                limit,
                search,
                sortBy,
                order
            );


        res.status(200).json(data);


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

// const getManagerRequests = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         const requests = await requestService.getRequestsByManager(userId);

//         res.status(200).json(requests);
//     } catch (error) {
//         console.error(error);

//         if (error.status) {
//             return res.status(error.status).json({
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

// const getManagerRequests = async (req, res) => {
//     try {

//         const userId = req.user.userId;

//         const {
//             page,
//             limit,
//             search,
//             status,
//             priority,
//             sortBy,
//             order
//         } = req.query;

//         const requests =
//             await requestService.getRequestsByManager({
//                 userId,
//                 page,
//                 limit,
//                 search,
//                 status,
//                 priority,
//                 sortBy,
//                 order
//             });

//         res.status(200).json(requests);

//     } catch (error) {

//         console.error(error);

//         if (error.status) {
//             return res.status(error.status).json({
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

// const getManagerRequests = async (req, res) => {
//     try {

//         const userId = req.user.userId;

//         const {
//             page,
//             limit,
//             search,
//             status,
//             priority,
//             sortBy,
//             order
//         } = req.query;

//         const requests =
//             await requestService.getRequestsByManager({
//                 userId,
//                 page,
//                 limit,
//                 search,
//                 status,
//                 priority,
//                 sortBy,
//                 order
//             });

//         res.status(200).json(requests);

//     } catch (error) {

//         console.error(error);

//         if (error.status) {
//             return res.status(error.status).json({
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             error: "Internal server error"
//         });
//     }
// };

const getManagerRequests = async (req, res) => {
    try {

        const userId = req.user.userId;

        const {
            page,
            limit,
            search,
            status,
            priority,
            sortBy,
            order
        } = req.validated.query;

        const requests =
            await requestService.getRequestsByManager({
                userId,
                page,
                limit,
                search,
                status,
                priority,
                sortBy,
                order
            });

        res.status(200).json(requests);

    } catch (error) {

        console.error(error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Internal server error"
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

const getSupportStaff = async (req, res) => {
    try {

        const userId = req.user.userId;

        const staff = await requestService.getSupportStaffByManager(userId);

        res.status(200).json(staff);

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

const assignRequest = async (req, res) => {
    try {

        const requestId = Number(req.params.id);
        const { staffId } = req.body;
        const managerUserId = req.user.userId;

        const updatedRequest = await requestService.assignRequest(
            requestId,
            staffId,
            managerUserId
        );

        res.status(200).json(updatedRequest);

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

// const getSupportRequests = async (req, res) => {
//     try {
//         const userId = req.user.userId;

//         const requests =
//             await requestService.getSupportRequests(userId);

//         res.status(200).json(requests);

//     } catch (error) {
//         console.error(error);

//         if (error.status) {
//             return res.status(error.status).json({
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

const getSupportRequests = async (req, res) => {
    try {

        const userId = req.user.userId;

        const {
            page,
            limit,
            search,
            status,
            priority,
            sortBy,
            order
        } = req.validated.query;

        const data =
            await requestService.getSupportRequests({
                userId,
                page,
                limit,
                search,
                status,
                priority,
                sortBy,
                order
            });

        res.status(200).json(data);

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

const updateRequestStatus = async (req, res) => {
    try {

        const requestId = Number(req.params.id);
        const userId = req.user.userId;
        const { status } = req.body;

        const updatedRequest =
            await requestService.updateRequestStatus(
                requestId,
                userId,
                status
            );

        res.status(200).json(updatedRequest);

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
    getSupportUnits,
    getSupportStaff,
    assignRequest,
    getSupportRequests,
    updateRequestStatus
};