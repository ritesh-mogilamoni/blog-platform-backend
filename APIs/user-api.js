import exp from 'express'
import { authenticate ,register} from '../services/authService.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userRoute=exp.Router()

//Register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body
    //call register
    const newUserObj=await register({...userObj,role:"USER"})
    //send res
    res.status(201).json({message:"user created",payload:newUserObj})

})

//Authenticate user
userRoute.post('/authenticate',async(req,res)=>{
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

//Read all articles(protected route)
userRoute.get('/articles',verifyToken,async(req,res)=>{
    let articles=await ArticleModel.find({isArticleActive:true})
    res.status(200).json({message:"Articles",payload:articles})
})

//Add comment to an article(protected route)
userRoute.post('/articles/comments',verifyToken,async(req,res)=>{
    let {articleId,user,comment}=req.body

    let articleOfDB=await ArticleModel.findById(articleId)
    if(!articleOfDB ){
        return res.status(401).json({message:"Article not found"})
    }
    let commentedArticle=await ArticleModel.findByIdAndUpdate(articleId,
        {
            $push:{comments:{user:user,comment:comment}}
        },
    {new:true})

    res.status(201).json({message:"commented article",payload:commentedArticle})
})
