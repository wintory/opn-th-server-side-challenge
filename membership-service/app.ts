import express, { Application } from 'express'
import AuthorizationRoutes from './src/components/authorization/authorization.route'
import UserProfileRoutes from './src/components/user-profile/user-profile.route'

const app: Application = express()

app.use(express.json())
app.use('/api/authorization', AuthorizationRoutes)
app.use('/api/user-profile', UserProfileRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
