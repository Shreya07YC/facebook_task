// import type { HttpContext } from '@adonisjs/core/http'

import { LikeService } from "#services/like_service";
import { LikeValidator } from "#validators/like";
import { HttpContext } from "@adonisjs/core/http"
import { messages } from "@vinejs/vine/defaults"

export default class LikesController {
    public async store({request,response}:HttpContext){
        try{
            const payload =await request.validateUsing(LikeValidator);
            const likeservice=new LikeService();
            const like=await likeservice.create(payload);
            return response.status(200).send(like);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi hua"})
        }
    }
    public async index({response}:HttpContext){
        try{
            const likeService=new LikeService();
            const like=await likeService.findAll();
            return response.status(200).send(like);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi mile"})
        }
    }
    public async show ({params,response}:HttpContext){
        try{
            const likeService=new LikeService();
            const like=await likeService.findOne(params.id);
            return response.status(200).send(like);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const likeService=new LikeService();
            const like=await likeService.update(params.id,request.only(['postId','userId','isLike']));
            return response.status(200).send(like);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi upadte hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const likeService=new LikeService();
            const like=await likeService.delete(params.id);
            return response.status(200).send({messages:"post like deleted successfully",like});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi delete hua"})
        }
    }
}