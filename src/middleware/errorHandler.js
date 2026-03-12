// Centralized error handler
function errorHandler(err, req, res, next) {
  console.error(err);

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Validation failed', errors: messages });
  }

  // Handle duplicate key errors (e.g., productCode uniqueness)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return res.status(400).json({ message: `${field} must be unique` });
  }

  // CastError covers invalid ObjectId formats
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  return res.status(500).json({ message: 'Server error' });
}

module.exports = errorHandler;
