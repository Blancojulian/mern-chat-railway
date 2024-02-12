import { Router } from "express";
import { getUser, getAllUsers, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);

userRouter.route('/')
    .get(getAllUsers)//errorHandler(getAllUsers))
    .post((req, res) => res.status(200).json({mensaje: 'post usuario'}));

userRouter.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile);
    
userRouter.route('/:id')
    .get(getUser);

export default userRouter;