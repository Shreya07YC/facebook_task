import Comment from "#models/comment";

export class CommentService {
  // Your code here
  public async findAll(){
    const comment=await Comment.query().orderBy('id','asc');
    return comment;
  }
  public async findOne(id:number){
    const comment=await Comment.find(id);
    if(!comment){
      throw new Error("Comment not found");
    }
    return comment;
  }
  public async create(payload: { postId: number; userId: number; commentText: string }) {
    const comment = await Comment.create(payload);
    return comment;
  }
  public async update(id:number,payload:{postId?:number;userID?:number;commnetText?:string}){
    const comment=await Comment.find(id);
    if(!comment){
      throw new Error("Post comment not found");
    }
    comment.merge(payload);
    await comment.save();
    return comment;
  }
  public async delete(id:number){
    const comment=await Comment.find(id);
    if(!comment){
      throw new Error("Post comment not found")
    }
    await comment.delete();
    return comment;
  }
}