const logger = require("../logger");

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
  });
  next();
};

module.exports = requestLogger;
