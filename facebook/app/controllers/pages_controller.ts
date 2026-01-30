// import type { HttpContext } from '@adonisjs/core/http'

import { PageService } from "#services/page_service";
import { PageValidator } from "#validators/page";
import { HttpContext } from "@adonisjs/core/http";
import { messages } from "@vinejs/vine/defaults";
import { inject } from '@adonisjs/core';
import Page from "#models/page";
import PDFDocument from 'pdfkit';
// import type PDFKit from 'pdfkit';
import { PassThrough } from 'stream';

@inject()

export default class PagesController {

    public async store ({request ,response}:HttpContext){
        try{
            const payload= await request.validateUsing(PageValidator)
            const pageService = new PageService()
            const page = await pageService.create(payload)
            return response.status(200).send(page);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi bn paya"})
        }
    }
    public async index ({response}:HttpContext){
        try{
            const pageService=new PageService()
            const page=await pageService.findAll()
            return response.status(200).send(page)
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi bna"})
        }
    }
    public async show({params,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.findOne(params.id);
            return response.status(200).send(page);
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi mila"})
        }
    }
    public async update({params,request,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.update(params.id,request.only(['title','description','createdBy']))
            return response.status(200).send(page);
        }
        catch(error){
            console.log('error is there'+error)
            return response.status(400).send({messages:"page nhi update hua"})
        }
    }
    public async delete({params,response}:HttpContext){
        try{
            const pageService=new PageService();
            const page=await pageService.delete(params.id);
            return response.status(200).send({messages:"page deleted successfully",page});
        }
        catch(error){
            console.log("error is there"+error)
            return response.status(400).send({messages:"page nhi delete hua"})
        }
    }
    
  async pdfdownload({ response }: HttpContext) {
    try {
      const pages = await Page.all()
      // now creating the pdf file
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      })
      const stream = new PassThrough()
      doc.pipe(stream)

      doc.fontSize(18).fillColor('#0f172a').text('Users Report', { align: 'center' })
      doc.moveDown(0.5)

      pages.forEach((page, index) => {
        doc
          .text(`Page #${index + 1}`)
          .text(`Title: ${page.title}`)
          .text(`Description: ${page.description}`)
          .text(`Created By: ${page.createdBy}`)
          .moveDown()
      })

      this.drawPagesTable(doc)
      doc.end()

      response.header(`Content-Type`, 'application/pdf')
      response.header('content-Disposition', 'attachment; filename= "pages.pdf"')
      return response.status(200).stream(stream)
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  private drawPagesTable(doc: PDFKit.PDFDocument) {
    const startX = 50
    const startY = doc.y + 10
    let currentY = startY

    const colWidths = [40, 120, 150, 100, 80]
    const rowHeight = 20
    const headerColor = '#1e293b'
    const borderColor = '#cbd5e1'

    // Draw header background
    doc
      .rect(
        startX,
        currentY,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight
      )
      .fill(headerColor)
  }
}