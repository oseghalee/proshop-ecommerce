const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware
};

const errorHandler = (err, req, res, next) => {
  let status = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 for errors
  let message = err.message;


  res.status(status).json({ // Use 'status' instead of 'statusCode'
    message,
    stack: process.env.NODE_ENV === "production" ? "Hmm..." : err.stack, // Optional stack trace
  });
};

export { notFound, errorHandler };



