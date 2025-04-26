import { User } from './type'

export class UserModel {
  private users: User[] = [
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

  getAll(): User[] {
    return [...this.users]
  }

  create(user: User): User {
    this.users.push(user)
    return user
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  update(id: number, data: Partial<User>): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...data }

    return this.users[userIndex]
  }

  delete(id: number): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)

    return true
  }

  resetAll() {
    this.users = []
  }
}

export const userModel = new UserModel()
