import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { userApp } from './APIs/user-api.js'
import { adminApp } from './APIs/admin-api.js'
import { authorApp } from './APIs/author-api.js'
config()    //process.env

const app=exp()



//add body parser middleware
app.use(exp.json())

app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)

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

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",reason:err.message})
})

