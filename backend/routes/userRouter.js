import express from "express";
import { register,login,logout ,getUser} from "../controllers/userController.js";
import {isAuth} from "../middlewares/auth.js"

const router  = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuth,logout);
router.get("/getuser",isAuth,getUser);
export default router;