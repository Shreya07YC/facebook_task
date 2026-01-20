import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Page from './page.js'
import User from './user.js'
import PostLike from './post_like.js'
import PostComment from './post_comment.js'
import PostShare from './post_share.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare pageId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=> Page, { foreignKey: 'pageId' })
  declare page: BelongsTo<typeof Page>

  @belongsTo(()=> User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @hasMany(()=>PostLike)
  declare likes: HasMany<typeof PostLike>

  @hasMany(()=>PostComment)
  declare comments: HasMany<typeof PostComment>

  @hasMany(()=>PostShare)
  declare shares: HasMany<typeof PostShare>
}