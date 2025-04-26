import { Router } from 'express'
import { register } from './authorization.controller'

const router = Router()

router.post('/register', register)

module.exports = router

export default router
