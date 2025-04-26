import { hashPassword } from '../../utilities/password'
import { users } from './model'
import { User, UserRegisterRequest } from './type'

export const registerUser = async (userData: UserRegisterRequest) => {
  const hashedPassword = await hashPassword(userData.password)
  const newUser = {
    ...userData,
    password: hashedPassword,
    id: users.length + 1,
  }

  users.push(newUser)

  return {
    ...newUser,
    password: undefined,
  }
}

export const getAllUserData = async () => {
  return users.map((user) => ({
    ...user,
    password: undefined,
  }))
}

export const getUserDataById = async (id: number) => {
  const user = users.find((user) => user.id === id)

  if (!user) return null

  return user
}

export const updateUserById = async (
  id: number,
  data: Pick<
    User,
    'dateOfBirth' | 'address' | 'gender' | 'isSubscribeNewsletter'
  >
) => {
  const userIdx = users.findIndex((user) => user.id === id)

  if (userIdx === -1) {
    return null
  }

  const user = users[userIdx]

  users[userIdx] = {
    ...user,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    address: data.address,
    isSubscribeNewsletter: data.isSubscribeNewsletter,
  }

  return {
    ...users[userIdx],
    password: undefined,
  }
}
