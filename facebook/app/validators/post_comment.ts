import vine from '@vinejs/vine'

export const PostCommentValidator=vine.compile(
    vine.object({
        postId:vine.number().positive(),
        userId:vine.number().positive(),
        commentText:vine.string().trim().minLength(1).maxLength(300),
    })
)