import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export const verifyToken=async(req,res,next)=>{
    let token=req.cookies.token
    if(token===undefined){
        return res.status(400).json({message:"Unauthorized req.Plz login"})
    }

    let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    next()
}