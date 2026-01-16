import vine from '@vinejs/vine'

export const PageValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(100),
        description: vine.string().trim().minLength(10).maxLength(500),
        createdBy: vine.number().positive(),
    })
)