const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const authRoutes = require('./src/auth/auth.routes');
const userRoutes = require('./src/users/user.routes');
const noteRoutes = require('./src/notes/note.routes');
const requestRoutes = require('./src/requests/request.routes');
const studentRoutes = require('./src/students/student.routes');
const staffRoutes = require('./src/staff/staff.routes');
const conversationRoutes =
    require('./src/conversation/conversation.route');
const dashboardRoutes =
    require('./src/dashboard/dashboard.route');
const {
    generalLimiter,
    authLimiter
} = require("./src/middleware/rateLimiter");
const notificationRoutes = require('./src/notifications/notification.routes');


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // allow React app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Allow cookies
}));
app.use(express.json());

app.use(cookieParser());

app.use(generalLimiter);


// Routes
app.use('/auth',authLimiter, authRoutes);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
app.use('/requests', requestRoutes);
app.use('/students', studentRoutes);
app.use('/staff', staffRoutes);
app.use('/conversations',
    conversationRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/notifications', notificationRoutes);


module.exports = app;