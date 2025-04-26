import { getAgeFromISODate } from '../../utilities/date'
import { hashPassword } from '../../utilities/password'
import { users } from './model'
import { UserRegisterRequest } from './type'

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
    age: getAgeFromISODate(user.dateOfBirth),
    password: undefined,
  }))
}

export const geUserDataById = async (id: number) => {
  const user = users.find((user) => user.id === id)

  if (!user) return null

  return {
    email: user.email,
    name: user.name,
    age: getAgeFromISODate(user.dateOfBirth),
    gender: user.gender,
    address: user.address,
    isSubscribeNewsletter: user.isSubscribeNewsletter,
  }
}
