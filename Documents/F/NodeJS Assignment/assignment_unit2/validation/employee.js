const { Joi, celebrate } = require("celebrate");

const employeeSchema = {
  body: Joi.object().keys({
    employeeNumber: Joi.number().positive().required(),
    lastName: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().optional().allow(null),
    jobTitle: Joi.string().required(),
  }),
};

module.exports = {
  employeeSchema: celebrate(employeeSchema),
};
