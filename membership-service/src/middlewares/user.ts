import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { MOCK_TOKEN } from '../constants/token'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers?.authorization

  if (!authHeader || authHeader !== MOCK_TOKEN) {
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
        status: 'error',
        messages: error.details.map((err) => err.message.replace(/"/g, '')),
      })
      return
    }
    next()
  }
}
