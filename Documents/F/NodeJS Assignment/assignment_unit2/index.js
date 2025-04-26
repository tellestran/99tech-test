const express = require("express");
const bodyParser = require("body-parser");
const employeesRoute = require("./routes/employees");
const customersRoute = require("./routes/customers");
const authRoute = require("./routes/auth");
const authenticateToken = require("./middleware/auth");
const { errors } = require("celebrate");
const { swaggerUi, specs } = require("./swagger");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Log request
app.use(requestLogger);

app.use("/auth", authRoute);
app.use("/employees", authenticateToken, employeesRoute);
app.use("/customers", authenticateToken, customersRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Celebrate error handler
app.use(errors());

// Custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
