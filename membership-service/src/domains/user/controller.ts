import { Request, Response } from 'express'
import { getAllUserData, geUserDataById, registerUser } from './service'
import { UserRegisterRequest } from './type'

export const register = async (req: Request, res: Response) => {
  try {
    const userData: UserRegisterRequest = req.body
    const newUser = await registerUser(userData)

    if (newUser) {
      res.status(201).json({ status: 'success', data: newUser })
    } else {
      res.status(400).json({
        status: 'error',
        message: 'User registration failed',
      })
    }
  } catch {
    res
      .status(500)
      .json({ status: 'error', message: 'User registration failed' })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserData()

    if (users) {
      res.status(200).json({ status: 'success', data: { users } })
    } else {
      res
        .status(500)
        .json({ status: 'error', message: 'User registration failed' })
    }
  } catch {
    res
      .status(500)
      .json({ status: 'error', message: 'User registration failed' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id
    const user = await geUserDataById(id)

    if (user) {
      res.status(200).json({ status: 'success', data: user })
    } else {
      res
        .status(500)
        .json({ status: 'error', message: 'User registration failed' })
    }
  } catch {
    res
      .status(500)
      .json({ status: 'error', message: 'User registration failed' })
  }
}
