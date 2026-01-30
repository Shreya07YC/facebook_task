import Page from "#models/page";

export class PageService {
  // Your code here

  public async findAll(){
    const page = await Page.query().orderBy('id','asc')
    return page;
  }
  public async findOne(id:number){
    const page =  await Page.find(id)
    if(!page){
      throw new Error("page not found")
    }
    return page;
  }
  public async create (payload:{title:string;description:string;createdBy:number}){
  const page=await Page.create(payload)
  return page;
  }
  public async update(id:number,payload:{title?:string;description?:string;createdBy?:number}){
    const page=await Page.find(id)
    if(!page){
      throw new Error("page not found")
    }
    page.merge(payload)
    await page.save()
    return page;
  }
  public async delete(id:number){
    const page=await Page.find(id)
    if(!page){
      throw new Error ("page nhi mila")
    }
    await page.delete()
    return page;
  }
}