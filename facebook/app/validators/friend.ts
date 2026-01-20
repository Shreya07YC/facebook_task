import vine from '@vinejs/vine'

export const FriendValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(255),
    email: vine.string().email(),
    age: vine.number().min(0),
    phone: vine.string().minLength(1).maxLength(20),
  })
)