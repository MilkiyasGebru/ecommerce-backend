import jwt from 'jsonwebtoken';
const JWT_SECRET = "JWT_SECRET";
export const create_token = (id)=>{
    return jwt.sign({id}, JWT_SECRET, {expiresIn: '6h'});
}