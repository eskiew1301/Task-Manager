import express from 'express'
import userRoutes from './user.routes.js'
import taskRoutes from './task.routes.js'

const router = express.Router()


router.use("/user", userRoutes)  //api/user/login
router.use("/task", taskRoutes)
export default router