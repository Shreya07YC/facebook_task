import Like from "#models/like"
export class LikeService {
  // Your code here
  public async findAll(){
    const like= await Like.query().orderBy('id','asc')
    return like
  }
  public async findOne(id:number){
    const like = await Like.find(id)
    if(!like){
      throw new Error("Like not found")
    }
    return like
  }
  public async create(payload: { 
    postId: number;
    userId: number; 
    isLike: boolean }) 
    {
    const like = await Like.create(payload)
    return like
  }
  public async update(id: number, payload: { postId?: number; userId?: number; isLike?: boolean }) {
    const like = await Like.find(id)
    if (!like) {
      throw new Error('Like not found')
    }
    like.merge(payload)
    await like.save()
    return like
  }
  public async delete(id: number) {
    const like = await Like.find(id)
    if (!like) {
      throw new Error('Like not found')
    }
    await like.delete()
    return like
  }
}