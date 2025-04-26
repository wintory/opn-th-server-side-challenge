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
  console.log({ users })

  return {
    ...newUser,
    password: undefined,
  }
}
