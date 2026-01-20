import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Post from './post.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commentText: string

  @column()
  declare postId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo (()=>Post, { foreignKey: 'postId' })
  declare post: BelongsTo<typeof Post>

  @belongsTo(()=>User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>
}