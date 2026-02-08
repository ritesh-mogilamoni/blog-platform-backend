
import {Schema, model} from "mongoose"

//create uer commment schema
const userCommentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    }
})

const articleSchema= new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:[true,"Author ID is required"]
    },
    title:{
        type:String,
        required:[true,"Author ID is required"]
    },
    category:{
        type:String,
        required:[true,"Author ID is required"]
    },
    content:{
        type:String,
        required:[true,"Author ID is required"]
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default :true
    }
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})

export const ArticleModel=model("article",articleSchema)