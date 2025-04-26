import { Request, Response } from 'express'
import { getAgeFromISODate } from '../../utilities/date'
import {
  getAllUserData,
  getUserDataById,
  registerUser,
  updateUserById,
} from './service'
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
    const users = (await getAllUserData()) || []
    const result = users.map((user) => ({
      ...user,
      age: getAgeFromISODate(user.dateOfBirth),
    }))

    res.status(200).json({ status: 'success', data: result })
  } catch {
    res
      .status(500)
      .json({ status: 'error', message: 'User registration failed' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id
    const user = await getUserDataById(id)

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
      return
    }

    const result = {
      id: user.id,
      email: user.email,
      name: user.name,
      age: getAgeFromISODate(user.dateOfBirth),
      gender: user.gender,
      address: user.address,
      isSubscribeNewsletter: user.isSubscribeNewsletter,
    }

    res.status(200).json({ status: 'success', data: result })
  } catch {
    res.status(500).json({ status: 'error', message: 'Search User failed' })
  }
}

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id
    const user = await getUserDataById(id)

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
      return
    }

    const updatedUser = await updateUserById(id, req.body)

    if (updatedUser) {
      res.status(200).json({ status: 'success', data: updatedUser })
    } else {
      res.status(400).json({
        status: 'error',
        message: 'User update failed',
      })
    }
  } catch {
    res.status(500).json({ status: 'error', message: 'Search User failed' })
  }
}
