import Share from "#models/share"
import { read } from "fs"

export class ShareService {
  // Your code here
  public async findAll(){
    const share= await Share.query().orderBy('id','asc')
    return share
  }
  public async findOne(id:number){
    const share = await Share.find(id)
    if(!share){
      throw new Error("Like not found")
    }
    return share
  }
  public async create(payload: { postId: number; userId: number }) {
    const share = await Share.create(payload);
    return share;
  }
  public async update(id: number, payload: { postId?: number; userId?: number }) {
      const share = await Share.find(id)
      if (!share) {
        throw new Error('Like not found')
      }
      share.merge(payload)
      await share.save()
      return share
    }
    public async delete(id:number){
      const share=await Share.find(id)
      if(!share){
        throw new Error("post not found")
      }
      await share.delete();
      return share;
    }
}