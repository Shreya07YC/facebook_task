// import type { HttpContext } from '@adonisjs/core/http'

import { ShareService } from "#services/share_service";
import { ShareValidator } from "#validators/share";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";

export default class SharesController {
    public async index({response}:HttpContext){
        try{
            const shareService=new ShareService();
            const share=await shareService.findAll();
            return response.status(200).send(share)
        }
        catch(error){
            return response.status(404).send({messages:"not found"})
        }
    }
    public async show({params,response}:HttpContext){
        try{
            const shareService=new ShareService();
            const share=await shareService.findOne(params.id);
            return response.status(200).send(share);
        }
        catch(error){
            return response.status(404).send({messages:"not found"})
        }
    }
    public async store({request,response}:HttpContext){
        try{
            const payload = await request.validateUsing(ShareValidator);
            const shareService = new ShareService();
            const share=await shareService.create(payload);
            return response.status(200).send(share)
        }
        catch(error){
            return response.status(404).send({messages:"not found"})
        }
    }
    public async update({request,response,params}:HttpContext){
        const shareService=new ShareService();
        const share=await shareService.update(params.id,request.only(['postId','userId']))
        return response.status(200).send(share)
    }
    public async delete({response,params}:HttpContext){
        const shareService=new ShareService();
        const share=await shareService.delete(params.id)
        return response.status(400).send({messages:"post share deleted successfully",share})
    }
}