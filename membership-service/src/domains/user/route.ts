import { Router } from 'express'
import { validateRequest, verifyToken } from '../../middlewares/user'
import {
  changePassword,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  register,
} from './controller'
import {
  changePasswordSchema,
  editUserSchema,
  registerSchema,
} from './validation'

const router = Router()

router.get('/', verifyToken, getAllUsers)
router.get('/:id', verifyToken, getUserById)
router.put('/:id', verifyToken, validateRequest(editUserSchema), editUser)
router.delete('/:id', verifyToken, deleteUser)
router.put(
  '/:id/password',
  verifyToken,
  validateRequest(changePasswordSchema),
  changePassword
)
router.post('/register', validateRequest(registerSchema), register)

module.exports = router

export default router
