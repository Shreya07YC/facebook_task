import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Page from './page.js'
import User from './user.js'
import Like from './like.js'
import Comment from './comment.js'
import Share from './share.js'

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

  @hasMany(()=>Like)
  declare likes: HasMany<typeof Like>

  @hasMany(()=>Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(()=>Share)
  declare shares: HasMany<typeof Share>
}