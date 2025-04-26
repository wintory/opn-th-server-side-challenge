import bcrypt from 'bcrypt'
import { comparePassword, hashPassword } from './password'

jest.mock('bcrypt')

describe('Password', () => {
  const plainPassword = 'testPassword123'
  const hashedPassword = 'hashedPassword123'
  const saltRounds = 10

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      ;(bcrypt.genSalt as jest.Mock).mockResolvedValue('mockSalt')
      ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)

      const result = await hashPassword(plainPassword)

      expect(bcrypt.genSalt).toHaveBeenCalledWith(saltRounds)
      expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 'mockSalt')
      expect(result).toBe(hashedPassword)
    })
  })

  describe('comparePassword', () => {
    it('should return true when passwords match', async () => {
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const result = await comparePassword(plainPassword, hashedPassword)

      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword)
      expect(result).toBe(true)
    })

    it('should return false when passwords do not match', async () => {
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const result = await comparePassword(plainPassword, hashedPassword)

      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword)
      expect(result).toBe(false)
    })
  })
})
