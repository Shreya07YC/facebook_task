// import type { HttpContext } from '@adonisjs/core/http'

import { PostService } from "#services/post_service"
import { PostValidator } from "#validators/post"
import { HttpContext } from "@adonisjs/core/http"
import { messages } from "@vinejs/vine/defaults"
import { inject } from '@adonisjs/core'
import ExcelJS from 'exceljs'
import Post from "#models/post"


    @inject()
export default class PostsController {

  constructor(private postServices: PostService) {}

  private styleExcelHeader(worksheet: ExcelJS.Worksheet) {
    const headerRow = worksheet.getRow(1)
    headerRow.height = 25
  }
    public async store({request,response}:HttpContext){
        try{
            const payload=await request.validateUsing(PostValidator)
            const postService=new PostService()
            const post=await postService.create(payload)
            return response.status(200).send(post);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi bn paya"})
        }
    }
    public async index({response}:HttpContext){
        try{
            const postService=new PostService()
            const post=await postService.findAll()
            return response.status(200).send(post)
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi hui"})
        }
    }
    public async show({params,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.findOne(params.id);
            return response.status(200).send(post);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.update(params.id,request.only(['content','pageId','userId']))
            return response.status(200).send(post);
        }
        catch(error){
            console.log('error is there'+error)
            return response.status(400).send({messages:"post nhi update hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const postService=new PostService();
            const post=await postService.delete(params.id);
            return response.status(200).send({messages:"post deleted successfully",post});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"post nhi delete hua"})
        }
    }
     async export({ response }: HttpContext) {
    try {
      const posts = await Post.all()

      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Posts')

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Content', key: 'content', width: 25 },
        { header: 'Page ID', key: 'pageId', width: 30 },
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ]

      posts.forEach((post) => {
        worksheet.addRow({
          id: post.id,
          content: post.content,
          pageId: post.pageId,
          userId: post.userId,
          createdAt: post.createdAt?.toFormat('yyyy-MM-dd HH:mm:ss') || '',
          updatedAt: post.updatedAt?.toFormat('yyyy-MM-dd HH:mm:ss') || '',
        })
      })

      worksheet.getRow(1).font = { bold: true }
      this.styleExcelHeader(worksheet)

      const buffer = await workbook.xlsx.writeBuffer()

      response.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      response.header('Content-Disposition', 'attachment; filename=posts.xlsx')
      return response.status(200).send(buffer)
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}