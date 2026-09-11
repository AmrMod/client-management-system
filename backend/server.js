//Express internally creates an HTTP server for you.

// const app = require("./app");

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//explicitly create the HTTP server and attach the socket.io server to it

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const {
    initSocket
} = require("./socket/socketManager");

const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174"
        ],
        credentials: true
    }
});

// Initialize Socket.IO
initSocket(io);

// older way  of  handling events from socket
// io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     socket.on("disconnect", () => {
//         console.log("Client disconnected:", socket.id);
//     });
// });

//handle connection, join a conversation room
io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);
    


    socket.on("join_conversation", (conversationId) => {

        const room = `conversation:${conversationId}`;

        socket.join(room);

        console.log(
            `${socket.id} joined ${room}`
        );
    });


    socket.on("disconnect", () => {

        console.log(
            "Client disconnected:",
            socket.id
        );

    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

