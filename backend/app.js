const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/auth/auth.routes');
const userRoutes = require('./src/users/user.routes');
const noteRoutes = require('./src/notes/note.routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // allow React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

module.exports = app;