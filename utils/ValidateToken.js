import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/env_var.js";
export const verifyToken = (token) => {
     return jwt.verify(token, ENV_VARS.JWT_SECRET);
}