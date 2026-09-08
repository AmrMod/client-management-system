//Express internally creates an HTTP server for you.

// const app = require("./app");

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//explicitly create the HTTP server yourself and attach the socket.io server to it

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

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

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

