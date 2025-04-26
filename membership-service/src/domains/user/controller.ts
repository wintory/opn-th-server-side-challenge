import { Request, Response } from 'express'
import { registerUser } from './service'
import { UserRegister } from './type'

export const register = (req: Request, res: Response): void => {
  try {
    const userData: UserRegister = req.body
    const newUser = registerUser(userData)

    console.log({ newUser })

    res.status(201).json({ status: 'success', data: newUser })
  } catch {
    res
      .status(500)
      .json({ status: 'error', message: 'User registration failed' })
  }
}
