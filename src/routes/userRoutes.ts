import express,{Router} from "express"
import { userController } from "../controller/userController.ts"
import { DataCheckers } from "../middleware/datachecker.ts"
import { Validation } from "../middleware/validation.ts"
import VerifyAccess from "../middleware/verifyAccess.ts"



const router:Router=express.Router()
router.post("/create",DataCheckers.userRegistIsEmpty,DataCheckers.emailExist,Validation.userAccountRule(),
Validation.inputValidator,userController.createuser)
router.get("/get",VerifyAccess("admin"),userController.getusers)
router.get("/get/:id",userController.getOneUsers)
router.delete("/delete",VerifyAccess("admin"),userController.deleteusers)
router.delete("/delete/:id",VerifyAccess("admin"),userController.deleteOneUsers)
router.patch("/update/:id",VerifyAccess("admin"),DataCheckers.userRegistIsEmpty,userController.updateUsers)
router.post("/login",DataCheckers.userRegistIsEmpty,userController.Login)


export default router