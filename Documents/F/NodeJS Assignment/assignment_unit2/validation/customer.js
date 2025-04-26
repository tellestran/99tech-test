const { Joi, celebrate } = require("celebrate");

const customerSchema = {
  body: Joi.object().keys({
    customerNumber: Joi.number().positive().required(),
    customerName: Joi.string().min(5).max(50).required(),
    contactLastName: Joi.string().min(3).max(50).required(),
    contactFirstName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    addressLine1: Joi.string().min(10).max(50).required(),
    addressLine2: Joi.string().min(10).max(50).optional().allow(null),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).optional().allow(null),
    postalCode: Joi.string().min(2).max(15).optional().allow(null),
    country: Joi.string().min(2).max(50).required(),
    salesRepEmployeeNumber: Joi.number().positive().required(),
    creditLimit: Joi.number().precision(2).optional().allow(null),
  }),
};

module.exports = {
  customerSchema: celebrate(customerSchema),
};
