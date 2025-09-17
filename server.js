require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
app.disable('x-powered-by');


// CORS configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN;
let corsOptions = {};
if (NODE_ENV === 'production') {
  if (CORS_ORIGIN && CORS_ORIGIN.trim()) {
    const origins = CORS_ORIGIN.split(',').map(o => o.trim()).filter(Boolean);
    corsOptions.origin = origins.length > 1 ? origins : origins[0];
  } else {
    console.warn('CORS_ORIGIN is missing in production. All CORS requests will be blocked. Set CORS_ORIGIN to allow origins.');
    corsOptions.origin = false;
  }
}
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount auth routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Mount ships routes
const shipsRouter = require('./routes/ships');
app.use('/ships', shipsRouter);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API connected and running.' });
});

// Error handling middleware (must be last)
const errorHandler = require('./middleware/errorHandler');
// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;




const mongoose = require('mongoose');
let srv;
if (require.main === module) {
  if (!process.env.JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not set in environment variables. Set JWT_SECRET in your .env file.');
    process.exit(1);
  }
  connectDB()
    .then(() => {
      srv = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      srv.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use. Please use a different port or stop the conflicting process.`);
          process.exit(1);
        } else if (err.code === 'EACCES') {
          console.error(`Insufficient privileges to bind to port ${PORT}. Try running with elevated permissions or use a different port.`);
          process.exit(1);
        } else {
          console.error('Server startup error:', err);
          process.exit(1);
        }
      });
    })
    .catch((err) => {
      console.error(err.message || 'Failed to connect to MongoDB. Server not started.');
      process.exit(1);
    });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`${signal} received: shutting down HTTP server and MongoDB connection...`);
    if (srv) {
      srv.close(() => {
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed due to app termination');
          process.exit(0);
        });
      });
    } else {
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });
    }
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

module.exports = app;
