import PostShare from "#models/post_share"
import { read } from "fs"

export class PostShareService {
  // Your code here
  public async findAll(){
    const postshare= await PostShare.query().orderBy('id','asc')
    return postshare
  }
  public async findOne(id:number){
    const postshare = await PostShare.find(id)
    if(!postshare){
      throw new Error("PostLike not found")
    }
    return postshare
  }
  public async create(payload: { postId: number; userId: number }) {
    const postshare = await PostShare.create(payload);
    return postshare;
  }
  public async update(id: number, payload: { postId?: number; userId?: number }) {
      const postshare = await PostShare.find(id)
      if (!postshare) {
        throw new Error('PostLike not found')
      }
      postshare.merge(payload)
      await postshare.save()
      return postshare
    }
    public async delete(id:number){
      const postshare=await PostShare.find(id)
      if(!postshare){
        throw new Error("post not found")
      }
      await postshare.delete();
      return postshare;
    }
}