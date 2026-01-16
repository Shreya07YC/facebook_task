import Page from "#models/page";
import Post from "#models/post";

export class PostService {
  // Your code here
  public async create(payload: { content: string; pageId: number; userId: number }) {
    const post = await Post.create(payload)
    return post
  }
  public async findAll() {
    const post = await Post.query().orderBy('id', 'asc')
  return post;
}
public async findOne(id:number){
  const post=await Post.find(id)
  return post;
}
public async update(id:number,payload:{content?:string;pageId?:number;userId?:number}){
  const post=await Post.find(id)
  if(!post){
    throw new Error("post not found")
  }
  post.merge(payload)
  await post.save();
  return post;
}
public async delete(id:number){
  const post=await Post.find(id)
  if(!post){
    throw new Error("post not found")
  }
  await post.delete()
  return post;
}
}