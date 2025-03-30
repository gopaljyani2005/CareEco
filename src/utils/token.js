import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

export const generateToken = (payload)=>{
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if(!SECRET_KEY){
        return null;
    }
    else{
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        return token;
    }
}


export const verifyToken = (token) => {
    const tokenstring = token?.toString();
    try {
        const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables.");
        }
        const check = jwtVerify(tokenstring, SECRET_KEY);
        return check;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null;
    }
};