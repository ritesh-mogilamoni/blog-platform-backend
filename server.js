import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { userRoute } from './APIs/user-api.js'
import { adminRoute } from './APIs/admin-api.js'
import { authorRoute } from './APIs/author-api.js'
import { commonRoute } from './APIs/common-api.js'
import cookieParser from 'cookie-parser'
config()    //process.env

const app=exp()



//add body parser middleware
app.use(exp.json())
app.use(cookieParser())
app.use('/user-api',userRoute)
app.use('/admin-api',adminRoute)
app.use('/author-api',authorRoute)
app.use('/common-api',commonRoute)




const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection successful")
    app.listen(process.env.PORT,()=>console.log("server started"))
    }
    catch(err){
        console.log("Err in DB connection",err)
    }
}

connectDB()

//dealing with invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url} is Invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",reason:err.message})
})

