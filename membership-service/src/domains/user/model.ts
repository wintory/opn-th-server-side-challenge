import { User } from './type'

export const users: User[] = [
  // Mock User Data
  {
    id: 1,
    email: 'email@mail.com',
    password: 'securePassword123',
    name: 'Name1',
    dateOfBirth: '1997-04-26T10:27:59.915Z',
    gender: 'male',
    address: 'Address1, Bangkok, Thailand',
    isSubscribeNewsletter: true,
  },
] // TODO: Replace with database implementation
