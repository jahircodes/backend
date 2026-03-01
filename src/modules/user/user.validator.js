const Joi = require('joi');
const { ApiError } = require('../../shared/ApiError');

const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  role: Joi.string().optional(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(new ApiError('Validation failed', 400, error.details));
  }
  return next();
};

module.exports = { validate, updateUserSchema };
