import { hashPassword } from '../../utilities/password'
import { userModel } from './model'
import { User, UserRegisterRequest } from './type'

export const registerUser = async (userData: UserRegisterRequest) => {
  const hashedPassword = await hashPassword(userData.password)
  const newUser = {
    ...userData,
    password: hashedPassword,
    id: userModel.getAll().length + 1,
  }

  userModel.create(newUser)

  return newUser
}

export const getAllUserData = async () => {
  return userModel.getAll()
}

export const getUserDataById = async (id: number) => {
  return userModel.findById(id)
}

export const updateUserById = async (
  id: number,
  data: Pick<
    User,
    'dateOfBirth' | 'address' | 'gender' | 'isSubscribeNewsletter'
  >
) => {
  const updatedData = {
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    address: data.address,
    isSubscribeNewsletter: data.isSubscribeNewsletter,
  }
  const user = userModel.update(id, updatedData)

  return user
}

export const deleteUserById = async (id: number) => {
  return userModel.delete(id)
}

export const updatePasswordById = async (
  id: number,
  hashedPassword: string
) => {
  return userModel.update(id, { password: hashedPassword })
}
