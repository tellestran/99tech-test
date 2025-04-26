const logger = require("../logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, err);

  res.status(500).json({
    message: "An unexpected error occurred",
  });
};

module.exports = errorHandler;
