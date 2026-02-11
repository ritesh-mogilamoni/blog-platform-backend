import exp from 'express'
export const commonRoute=exp.Router()
import { authenticate } from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import bcrypt from 'bcryptjs'

//login
commonRoute.post('/authenticate',async(req,res)=>{
    //get user cred obj
    let userCred=req.body
    let {token,user}=await authenticate(userCred)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.status(200).json({message:"login success",payload:user})
})

//logout
//logout for user,admin,author
commonRoute.get('/logout',(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })

    res.status(200).json({message:'Logged out successfully'})
})


commonRoute.put('/change-pass',async(req,res)=>{
    let {currPass,newPass,email}=req.body
    let user=await UserTypeModel.findOne({email:email})
    
    //check passwords are correct or not(compare)
    const isMatch=await bcrypt.compare(currPass,user.password)
    if(!isMatch){
        const err=new Error("Invalid current password")
        err.status=401
        throw err
    }

    user.password=await bcrypt.hash(newPass,12)

    await user.save()

    res.status(200).json({message:"Password changed successfully"})
    
})