const Joi = require('joi');
const { ApiError } = require('../../shared/ApiError');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(new ApiError('Validation failed', 400, error.details));
  }
  return next();
};

module.exports = { validate, registerSchema, loginSchema };
