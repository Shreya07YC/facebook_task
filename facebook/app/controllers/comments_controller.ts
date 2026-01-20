// import type { HttpContext } from '@adonisjs/core/http'

import { CommentService } from "#services/comment_service";
import { CommentValidator } from "#validators/comment";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";

export default class CommentsController {
    public async store({request,response}:HttpContext){
       try{
        const payload=await request.validateUsing(CommentValidator)
        const commentService=new CommentService();
        const comment=await commentService.create(payload);
        return response.status(200).send(comment);
       }
       catch(error){
        console.log("error is there"+error)
        return response.status(400).send({messages:"post comment nhi hua"})
       }
    }
    public async index({response}:HttpContext){
       try{
           const commentService=new CommentService();
           const comment=await commentService.findAll();
           return response.status(200).send(comment)
       }
       catch(error){
           console.log("error is there"+error)
           return response.status(400).send({messages:"Post comment is not done"})
       }
    }
    public async show({params,response}:HttpContext){
        const commentService=new CommentService();
        const comment=await commentService.findOne(params.id);
        return response.status(200).send(comment)
    }
    public async update({request,response,params}:HttpContext){
        const commentService=new CommentService();
        const comment=await commentService.update(params.id,request.only(['postId','userId','commentText']))
        return response.status(200).send(comment)
    }
    public async delete({response,params}:HttpContext){
        const commentService=new CommentService();
        const comment=await commentService.delete(params.id);
        return response.status(200).send({messages:"post comment deleted successfully ",comment})
    }
}