// import type { HttpContext } from '@adonisjs/core/http'

import { PageService } from "#services/page_service";
import { PageValidator } from "#validators/page";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";

export default class PagesController {

    public async store ({request ,response}:HttpContext){
        try{
            const payload= await request.validateUsing(PageValidator)
            const pageService = new PageService()
            const page = await pageService.create(payload)
            return response.status(200).send(page);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi bn paya"})
        }
    }
    public async index ({response}:HttpContext){
        try{
            const pageService=new PageService()
            const page=await pageService.findAll()
            return response.status(200).send(page)
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi bna"})
        }
    }
    public async show({params,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.findOne(params.id);
            return response.status(200).send(page);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.update(params.id,request.only(['title','description','createdBy']))
            return response.status(200).send(page);
        }
        catch(error){
            console.log('error is there'+error)
            return response.status(400).send({messages:"page nhi update hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.delete(params.id);
            return response.status(200).send({messages:"page deleted successfully",page});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi delete hua"})
        }
    }
}