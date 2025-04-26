import { User } from './type'

export const users: User[] = [
  // Mock User Data
  // TODO: Replace with database implementation
  {
    id: 1,
    email: 'email@mail.com',
    password: '$2b$10$fIT/TjSKXs05MXIJv9thGueTZnXFLAM8fPRmfmk/HPubYXnw22GGC', // Plaintext: securePassword123, for testing only, remove asap as it's a security risk
    name: 'Name1',
    dateOfBirth: '1997-04-26T10:27:59.915Z',
    gender: 'male',
    address: 'Address1, Bangkok, Thailand',
    isSubscribeNewsletter: true,
  },
]
