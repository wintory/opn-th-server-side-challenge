import { Router } from 'express'
import { validateRequest, verifyToken } from '../../middlewares/user'
import { getAllUsers, register } from './controller'
import { registerSchema } from './validation'

const router = Router()

router.get('/', verifyToken, getAllUsers)
router.post('/register', validateRequest(registerSchema), register)

module.exports = router

export default router
