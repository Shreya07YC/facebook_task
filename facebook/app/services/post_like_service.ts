import PostLike from "#models/post_like"
export class PostLikeService {
  // Your code here
  public async findAll(){
    const postLike= await PostLike.query().orderBy('id','asc')
    return postLike
  }
  public async findOne(id:number){
    const postLike = await PostLike.find(id)
    if(!postLike){
      throw new Error("PostLike not found")
    }
    return postLike
  }
  public async create(payload: { 
    postId: number;
    userId: number; 
    isLike: boolean }) 
    {
    const postLike = await PostLike.create(payload)
    return postLike
  }
  public async update(id: number, payload: { postId?: number; userId?: number; isLike?: boolean }) {
    const postLike = await PostLike.find(id)
    if (!postLike) {
      throw new Error('PostLike not found')
    }
    postLike.merge(payload)
    await postLike.save()
    return postLike
  }
  public async delete(id: number) {
    const postLike = await PostLike.find(id)
    if (!postLike) {
      throw new Error('PostLike not found')
    }
    await postLike.delete()
    return postLike
  }
}