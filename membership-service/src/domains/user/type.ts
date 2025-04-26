import { UserProfile } from '../user-profile/user-profile.type'

export type UserRegister = Omit<UserProfile, 'id'>

export interface UserRegisterRequest extends UserRegister {}

export interface UserRegisterResponse {
  data: Pick<UserProfile, 'name' | 'email'>
  message: string
  status: 'success' | 'error'
}
