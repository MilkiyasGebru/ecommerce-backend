import jwt from 'jsonwebtoken';
import {ENV_VARS} from "../config/env_var.js";
export const create_token = (id)=>{
    return jwt.sign({id}, ENV_VARS.JWT_SECRET, {expiresIn: '6h'});
}