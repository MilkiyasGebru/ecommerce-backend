import express from 'express';
import {login_user, register_user} from "../controllers/UserControllers.js";

const user_router = express.Router();


user_router.post("/register", register_user)
user_router.post("/login", login_user)

export default user_router;