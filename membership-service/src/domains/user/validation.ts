import Joi from 'joi'

const userSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  address: Joi.string().required(),
  isSubscribeNewsletter: Joi.boolean().required(),
}

export const registerSchema = Joi.object(userSchema)

export const editUserSchema = Joi.object({
  dateOfBirth: userSchema.dateOfBirth,
  gender: userSchema.gender,
  address: userSchema.address,
  isSubscribeNewsletter: userSchema.isSubscribeNewsletter,
})

export const changePasswordSchema = Joi.object({
  currentPassword: userSchema.password,
  newPassword: userSchema.password,
})
