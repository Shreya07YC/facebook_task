// import type { HttpContext } from '@adonisjs/core/http'

import { PostShareService } from "#services/post_share_service";
import { PostShareValidator } from "#validators/post_share";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";

export default class PostSharesController {
    public async index({response}:HttpContext){
        try{
        const postshareService=new PostShareService();
        const postshare=await postshareService.findAll();
        return response.status(200).send(postshare)
    }
    public async show({params,response}:HttpContext){
        const postshareService=new PostShareService();
        const postshare=await postshareService.findOne(params.id);
        return response.status(200).send(postshare);
    }
    public async store({request,response}:HttpContext){
        const payload=await request.validateUsing(PostShareValidator);
        const postshareService=new PostShareService();
        const postshare=await postshareService.create(payload);
        return response.status(200).send(postshare)
    }
    public async update({request,response,params}:HttpContext){
        const postshareService=new PostShareService();
        const postshare=await postshareService.update(params.id,request.only(['postId','userId']))
        return response.status(200).send(postshare)
    }
    public async delete({response,params}:HttpContext){
        const postshareService=new PostShareService();
        const postshare=await postshareService.delete(params.id)
        return response.status(400).send({messages:"post share deleted successfully",postshare})
    }
}