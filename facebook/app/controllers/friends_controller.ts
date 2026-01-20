// import type { HttpContext } from '@adonisjs/core/http'

import Friend from "#models/friend";
import { FriendService } from "#services/friend_service";
// import { FriendValidator } from "#validators/friend";
import { FriendValidator } from "#validators/friend";
import { HttpContext } from "@adonisjs/core/http";

export default class FriendsController {
    public async index({response}:HttpContext){
        try {
            const friendService=new FriendService();
            const friends=await friendService.findAll();
            return response.status(200).send(friends);
        } catch (error) {
            return response.status(400).send({message:"friends not found"})
        }
    }
    public async show ({params,response}:HttpContext){
        try {
            const friendService=new FriendService();
            const friend=await friendService.findOne(params.id);
            if(!friend){
                return response.status(404).send({message:"friend not found"})
            }
            return response.status(200).send(friend);
        } catch (error) {
            return response.status(400).send({message:"error in fetching friend"})
        }
    }
    public async store({request,response}:HttpContext){
        try{
            const payload =await request.validateUsing(FriendValidator);
            const friendService=new FriendService();
            const friend=await friendService.create(payload);
            return response.status(200).send(friend);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post like nhi hua"})
        }
    
    }
    public async update({params,request,response}:HttpContext){
        try {
            const friendService=new FriendService();
            const friend=await friendService.update(params.id,request.only(['name','email','age','phone']));
            if(!friend){
                return response.status(404).send({message:"friend not found"})
            }
            return response.status(200).send(friend);
        } catch (error) {
            return response.status(400).send({message:"error in updating friend"})
        }
    }
    public async delete({params,response}:HttpContext){
        try {
            const friendService=new FriendService();
            const friend=await friendService.delete(params.id);
            if(!friend){
                return response.status(404).send({message:"friend not found"})
            }
            return response.status(200).send({message:"friend deleted successfully"});
        } catch (error) {
            return response.status(400).send({message:"error in deleting friend"})
        }
    }
}