const express = require('express');
const cors = require('cors');



let usersRouter = require('./src/routes/users');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // allow React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use("/", usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;