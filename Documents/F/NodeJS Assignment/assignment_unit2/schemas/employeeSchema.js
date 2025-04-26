const Joi = require("joi");

const employeeSchema = Joi.object({
  employeeNumber: Joi.number().integer().positive().required(),
  lastName: Joi.string().min(3).max(50).required(),
  firstName: Joi.string().min(3).max(50).required(),
  extension: Joi.string().max(50).required(),
  email: Joi.string().email().min(10).max(100).required(),
  officeCode: Joi.string().max(10).required(),
  reportsTo: Joi.number().integer().positive().optional().allow(null),
  jobTitle: Joi.string()
    .valid("Manager", "Developer", "Sales", "Support")
    .required(), // Assuming roles from the permission matrix
});

module.exports = { employeeSchema };
