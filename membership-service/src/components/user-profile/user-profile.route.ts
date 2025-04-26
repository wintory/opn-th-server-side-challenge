import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  res.status(200).json({ message: 'User Profile Endpoint' })
})

export default router
