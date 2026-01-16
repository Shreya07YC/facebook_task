// import type { HttpContext } from '@adonisjs/core/http'

import { PostLikeService } from "#services/post_like_service";
import { PostLikeValidator } from "#validators/post_like";
import { HttpContext } from "@adonisjs/core/http"
import { messages } from "@vinejs/vine/defaults"

export default class PostLikesController {
    public async store({request,response}:HttpContext){
        try{
            const payload =await request.validateUsing(PostLikeValidator);
            const postlikeService=new PostLikeService();
            const postlike=await postlikeService.create(payload);
            return response.status(200).send(postlike);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi hua"})
        }
    }
    public async index({response}:HttpContext){
        try{
            const postlikeService=new PostLikeService();
            const postlike=await postlikeService.findAll();
            return response.status(200).send(postlike);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi mile"})
        }
    }
    public async show ({params,response}:HttpContext){
        try{
            const postlikeService=new PostLikeService();
            const postlike=await postlikeService.findOne(params.id);
            return response.status(200).send(postlike);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const postlikeService=new PostLikeService();
            const postlike=await postlikeService.update(params.id,request.only(['postId','userId','isLike']));
            return response.status(200).send(postlike);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi upadte hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const postlikeService=new PostLikeService();
            const postlike=await postlikeService.delete(params.id);
            return response.status(200).send({messages:"post like deleted successfully",postlike});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi delete hua"})
        }
    }
}