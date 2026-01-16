// import type { HttpContext } from '@adonisjs/core/http'

import { PostService } from "#services/post_service"
import { PostValidator } from "#validators/post"
import { HttpContext } from "@adonisjs/core/http"
import { messages } from "@vinejs/vine/defaults"

export default class PostsController {
    public async store({request,response}:HttpContext){
        try{
            const payload=await request.validateUsing(PostValidator)
            const postService=new PostService()
            const post=await postService.create(payload)
            return response.status(200).send(post);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi bn paya"})
        }
    }
    public async index({response}:HttpContext){
        try{
            const postService=new PostService()
            const post=await postService.findAll()
            return response.status(200).send(post)
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi hui"})
        }
    }
    public async show({params,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.findOne(params.id);
            return response.status(200).send(post);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.update(params.id,request.only(['content','pageId','userId']))
            return response.status(200).send(post);
        }
        catch(error){
            console.log('error is there'+error)
            return response.status(400).send({messages:"post nhi update hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.delete(params.id);
            return response.status(200).send({messages:"post deleted successfully",post});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi delete hua"})
        }
    }
}