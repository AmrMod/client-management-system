const express = require('express');
const cors = require('cors');



let usersRouter = require('./src/routes/users');


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // allow React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use("/", usersRouter);


module.exports = app;