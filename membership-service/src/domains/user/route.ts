import { Router } from 'express'
import { validateRequest, verifyToken } from '../../middlewares/user'
import { editUser, getAllUsers, getUserById, register } from './controller'
import { editUserSchema, registerSchema } from './validation'

const router = Router()

router.get('/', verifyToken, getAllUsers)
router.get('/:id', verifyToken, getUserById)
router.put('/:id', validateRequest(editUserSchema), editUser)
router.post('/register', validateRequest(registerSchema), register)

module.exports = router

export default router
