

module.exports = (err, req, res, next) => {
  // express-validator: validation details from controller
  if (err && err.status === 400 && err.details) {
    return res.status(400).json({ error: 'Bad Request', message: 'Validation failed', details: err.details });
  }
  // Fallback: errors array (legacy or other code)
  if (err && Array.isArray(err.errors)) {
    return res.status(400).json({ error: 'Bad Request', message: 'Validation failed', details: err.errors });
  }
  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Validation failed',
      details: Object.values(err.errors).map(e => ({ field: e.path, message: e.message }))
    });
  }
  // JWT errors
  if (err && (err.name === 'JsonWebTokenError' || err.name === 'UnauthorizedError' || err.name === 'TokenExpiredError')) {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
  // Not found
  if (err && err.status === 404) {
    return res.status(404).json({ error: 'Not found', message: err.message || 'Not found' });
  }
  // Custom error with status
  if (err && err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  // Default to 500
  res.status(500).json({
    error: 'Server error',
    details: process.env.NODE_ENV === 'development' ? (err.message || err) : undefined
  });
};
