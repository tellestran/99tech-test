const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")),
  employeeNumber: Joi.number().integer().positive().required(),
});

module.exports = { userSchema };
