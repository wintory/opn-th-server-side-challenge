import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers?.authorization

  if (!authHeader || authHeader !== 'Bearer faketoken_user1') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      })
      return
    }
    next()
  }
}
