import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js'
import { authenticate } from '../services/authService.js'

export const adminRoute=exp.Router()

//Read all articles

//Block users
adminRoute.post('/block-user',async(req,res)=>{
    let {userid}=req.body
    
    let blockedUser=await UserTypeModel.findByIdAndUpdate(userid,
            {
                $set:{isactive:false}
            },
        {new:true})

    res.status(200).json({message:"User blocked",payload:blockedUser})
})

//Unblock users
adminRoute.post('/unblock-user',async(req,res)=>{
    let {userid}=req.body
    
    let unblockedUser=await UserTypeModel.findByIdAndUpdate(userid,
            {
                $set:{isactive:true}
            },
        {new:true})

    res.status(200).json({message:"User Unblocked",payload:unblockedUser})
})
