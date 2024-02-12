import { Router } from "express";
import { handleLogin, handleLogout, handleRegister } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter
    .post('/login', handleLogin)
    .post('/register', handleRegister)
    //.use(authMiddleware)
    .post('/logout', handleLogout);

export default authRouter;