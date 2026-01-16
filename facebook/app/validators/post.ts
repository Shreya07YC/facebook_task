import vine from '@vinejs/vine'

export const PostValidator =vine.compile(
    vine.object({
        content:vine.string().trim().minLength(1).maxLength(100),
        pageId:vine.number().positive(),
        userId:vine.number().positive(),
    })
)