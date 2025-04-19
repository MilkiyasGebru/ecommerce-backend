import mongoose from 'mongoose'
import {ENV_VARS} from "./env_var.js";
export const connectToDB = async ()=>{
    return mongoose.connect(ENV_VARS.MONGODB_URI)
}

