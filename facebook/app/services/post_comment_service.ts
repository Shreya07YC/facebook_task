import PostComment from "#models/post_comment";

export class PostCommentService {
  // Your code here
  public async findAll(){
    const postcomment=await PostComment.query().orderBy('id','asc');
    return postcomment;
  }
  public async findOne(id:number){
    const postcomment=await PostComment.find(id);
    if(!postcomment){
      throw new Error("PostComment not found");
    }
    return postcomment;
  }
  public async create(payload: { postId: number; userId: number; commentText: string }) {
    const postcomment = await PostComment.create(payload);
    return postcomment;
  }
  public async update(id:number,payload:{postId?:number;userID?:number;commnetText?:string}){
    const postcomment=await PostComment.find(id);
    if(!postcomment){
      throw new Error("Post comment not found");
    }
    postcomment.merge(payload);
    await postcomment.save();
    return postcomment;
  }
  public async delete(id:number){
    const postcomment=await PostComment.find(id);
    if(!postcomment){
      throw new Error("Post comment not found")
    }
    await postcomment.delete();
    return postcomment;
  }
}