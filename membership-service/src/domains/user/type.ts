export type Gender = 'male' | 'female' | 'other'

export interface User {
  id: number
  email: string
  password: string
  name: string
  dateOfBirth: string
  gender: Gender
  address: string
  isSubscribeNewsletter: boolean
}

export type UserRegisterRequest = Omit<User, 'id'>
