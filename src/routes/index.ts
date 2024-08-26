import express,{Router} from "express"

import userRouter from "../routes/userRoutes.ts"
import newsRoutes from "../routes/newsRoutes.ts"
import memberRoutes from "../routes/memberRoutes.ts"

const router:Router=express.Router()
router.use("/user",userRouter)
router.use("/news",newsRoutes)
router.use("/member",memberRoutes)
export default router