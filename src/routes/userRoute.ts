import { Router } from "express";
import { createUsersController, deleteUserController, getUserByIdController, getUserController, updateUserController } from "../controllers/userController";


const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)
userRouter.post('/',createUsersController)
userRouter.put('/:id',updateUserController)
userRouter.delete('/:id',deleteUserController)

export default userRouter