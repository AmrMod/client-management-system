// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//     withCredentials: true,
// });

// export default socket;

import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
});

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Socket disconnected");
});

export default socket;