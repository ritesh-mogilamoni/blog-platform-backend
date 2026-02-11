import exp from 'express'
import { authenticate ,register} from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { checkAuthor } from '../middlewares/checkAuthor.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorRoute=exp.Router()

//Register author
authorRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body
    //call register
    const newUserObj=await register({...userObj,role:"AUTHOR"})
    //send res
    res.status(201).json({message:"author created",payload:newUserObj})

})

//Authenticate author

//Create article
authorRoute.post('/articles',verifyToken,async (req,res)=>{
    let articleObj=req.body
    
    const author=await UserTypeModel.findById(articleObj.author)
    if(!author || author.role!=="AUTHOR"){
        return res.status(201).json({message:"Invalid Author"})
    }
    const articleDoc=new ArticleModel(articleObj)
    const createdArticleDoc = await articleDoc.save()

    res.status(201).json({message:"Article created",payload:createdArticleDoc})
  
})

//Read articles of author by article id
authorRoute.get('/articles/:authorId',verifyToken,checkAuthor,async(req,res)=>{
    
    let authorId=req.params.authorId
    let articles=await ArticleModel.find({author:authorId,isArticleActive:true}).populate("author","firstName email")
    res.status(200).json({message:"Articles",payload:articles})
    
})

//Edit article
authorRoute.put('/articles',verifyToken,checkAuthor,async (req,res)=>{
    let {articleId,title,category,content,author}=req.body
    
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB ){
            return res.status(401).json({message:"Article not found"})
        }

    //{title:modifiedArticleObj.title,category:modifiedArticleObj.category})

    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,
        {
            $set:{title,category,content}
        },
    {new:true})



    res.status(201).json({message:"Article modified",payload:updatedArticle})
  
})

//delete(soft delete) article
authorRoute.delete('/articles/:author/:articleid',verifyToken,async(req,res)=>{
    let articleId=req.params.articleid
    let author=req.params.author
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB ){
            return res.status(401).json({message:"Article not found"})
        }

let articleDel=await ArticleModel.findByIdAndUpdate(articleId,{
        $set:{isArticleActive:false}
    },
{new:true})

res.status(200).json({message:"Article Deleted",payload:articleDel})


})
