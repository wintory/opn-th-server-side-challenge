import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  address: Joi.string().required(),
  isSubscribeNewsletter: Joi.boolean().required(),
})

export const editUserSchema = Joi.object({
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  address: Joi.string().required(),
  isSubscribeNewsletter: Joi.boolean().required(),
})

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
})
