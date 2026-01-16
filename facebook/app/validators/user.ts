import vine from '@vinejs/vine'

export const UserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(3).maxLength(20),
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(5).maxLength(30),
    })
)