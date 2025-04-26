import express, { Application } from 'express'
import UserRoute from './features/user/route'

const app: Application = express()

app.use(express.json())
app.use('/api/user', UserRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
