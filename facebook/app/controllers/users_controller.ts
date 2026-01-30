import type { HttpContext } from '@adonisjs/core/http';
import { UserValidator } from "#validators/user";
import { UserService } from '#services/user_service';
import { messages } from '@vinejs/vine/defaults';

export default class UsersController {
    public async store({request,response}:HttpContext){
        try{
            const payload=await request.validateUsing(UserValidator)
            const userService=new UserService()
            const user=await userService.create(payload)
            return response.created(user)
        }
        catch(error){
            console.error("Error creating user:"+error)
            return response.status(500).send({message:"Could not create user"})
        }
    }

    public async index({response}:HttpContext){
        try{
            const userService= new UserService()
            const users=await userService.findAll()
            return response.ok(users)
        }
        catch(error){
            console.error("Error fetching users:"+error)
            return response.status(500).send({message:"Could not fetch users"})
        }
    }

    public async show ({params,response}:HttpContext){
        try{
            const userService =new UserService();
            const user= await userService.findOne(params.id)
            return response.ok(user)
        }
        catch(error){
            console.error("error is there :"+error)
            return response.status(404).send({messages:"user nahi mila"})
    }
}
  public async update({params,request,response}:HttpContext){
    try{
        console.log("inside try block")
        // const payload=await request.validateUsing(UserValidator)
        // console.log("1111111111")
        const userService=new UserService()
        // console.log("22222222222")
        const user=await userService.update(params.id,request.only(['name','email','password']))
        // console.log("3333333333")
        return response.ok(user)
    }
    catch(error){
        console.error("error is there"+error);
        return response.status(404).send({messages:"user nhi h bhai"})
    }
  }

  public async delete({params,response}:HttpContext){
    try{
        const userService=new UserService()
        const user=await userService.delete(params.id)
        return response.ok({message:"User deleted successfully",user})
    }
    catch(error){
        console.error("error is there:"+error)
        return response.status(500).send({message:"user nhi mila"})
    }
}
}