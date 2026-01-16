// import type { HttpContext } from '@adonisjs/core/http'

import { PostCommentService } from "#services/post_comment_service";
import { PostCommentValidator } from "#validators/post_comment";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";

export default class PostCommentsController {
    public async store({request,response}:HttpContext){
       try{
        const payload=await request.validateUsing(PostCommentValidator)
        const postcommentService=new PostCommentService();
        const postcomment=await postcommentService.create(payload);
        return response.status(200).send(postcomment);
       }
       catch(error){
        console.log("error is there"+error)
        return response.status(400).send({messages:"post comment nhi hua"})
       }
    }
    public async index({response}:HttpContext){
       try{
         const postcommentService=new PostCommentService();
        const postcomment=await postcommentService.findAll();
        return response.status(200).send(postcomment)
       }
       catch(error){
        console.log("error is there"+error)
        return response.status(400).send({messages:"Post comment is not done"})
       }
    }
    public async show({params,response}:HttpContext){
        const postcommentService=new PostCommentService();
        const postcomment=await postcommentService.findOne(params.id);
        return response.status(200).send(postcomment)
    }
    public async update({request,response,params}:HttpContext){
        const postcommentService=new PostCommentService();
        const postcomment=await postcommentService.update(params.id,request.only(['postId','userId','commentText']))
        return response.status(200).send(postcomment)
    }
    public async delete({response,params}:HttpContext){
        const postcommentService=new PostCommentService();
        const postcomment=await postcommentService.delete(params.id);
        return response.status(200).send({messages:"post comment deleted successfully ",postcomment})
    }
}