import jwt from 'jsonwebtoken'
import {verifyToken} from "../utils/ValidateToken.js";

export const requireAuth = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization required'});
    }
    const token = authorization.split(' ')[1];
    try {
        console.log("token is ", token);
        const payload = verifyToken(token);
        next()
    }
    catch(err){
        return res.status(401).json({error:"Request is not authorized"})
    }
}