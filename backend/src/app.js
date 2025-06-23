const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { morganMiddleware } = require('./middleware/morganMiddleware');

require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bandRoutes = require('./routes/bandRoutes');
const rehearsalRoutes = require('./routes/rehearsalRoutes');
const venueRoutes = require('./routes/venueRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morganMiddleware);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/attendance', attendanceRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rehearsal Scheduler API' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
