import vine from '@vinejs/vine'

export const PostShareValidator = vine.compile(
    vine.object({
        postId:vine.number().positive(),
        userId:vine.number().positive()
    })
)