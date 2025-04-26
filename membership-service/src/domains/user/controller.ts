import { Request, Response } from 'express'
import { getAgeFromISODate } from '../../utilities/date'
import { comparePassword } from '../../utilities/password'
import {
  deleteUserById,
  getAllUserData,
  getUserDataById,
  registerUser,
  updatePasswordById,
  updateUserById,
} from './service'
import { UserRegisterRequest } from './type'

export const register = async (req: Request, res: Response) => {
  try {
    const userData: UserRegisterRequest = req.body
    const newUser = await registerUser(userData)

    if (newUser) {
      res
        .status(201)
        .json({ status: 'success', data: { ...newUser, password: undefined } })
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
      password: undefined,
    }))

    res.status(200).json({ status: 'success', data: result })
  } catch {
    res.status(500).json({ status: 'error', message: 'Get All User failed' })
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
    res.status(500).json({ status: 'error', message: 'Edit User failed' })
  }
}

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body
    const id = +req.params.id
    const user = await getUserDataById(id)

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
      return
    }

    const isVerifiedPassword = await comparePassword(
      currentPassword,
      user?.password
    )

    if (!isVerifiedPassword) {
      res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect',
      })
      return
    }

    const isUpdatedPassword = await updatePasswordById(id, newPassword)

    if (isUpdatedPassword) {
      res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Password update failed',
      })
    }
  } catch {
    res.status(500).json({ status: 'error', message: 'Change Password failed' })
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = +req.params.id
    const result = deleteUserById(id)

    if (!result) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
      return
    }

    res.json({ status: 'success', message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Delete User failed' })
  }
}
