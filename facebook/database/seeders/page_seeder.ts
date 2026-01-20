import Page from '#models/page'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Page.firstOrCreate(
      { title: 'Tech World' },
      {
        title: 'Tech World',
        description: 'A page about the latest in technology.',
        createdBy: 5,
      }
    )
    
    await Page.firstOrCreate(
      { title: 'Foodies Unite' },
      {
        title: 'Foodies Unite',
        description: 'A page for food lovers to share recipes and reviews.',
        createdBy: 3,
      }
    )
    await Page.firstOrCreate(
      { title: 'Travel Diaries' },
      {
        title: 'Travel Diaries',
        description: 'Exploring the world one destination at a time.',
        createdBy: 4,
      }
    )
    await Page.firstOrCreate(
      { title: 'Fitness Freaks' },
      {
        title: 'Fitness Freaks',
        description: 'Your daily dose of fitness tips and motivation.',
        createdBy: 1,
      }
    )
    await Page.firstOrCreate(
      { title: 'Movie Buffs' },
      {
        title: 'Movie Buffs',
        description: 'Discussing the latest movies and classic films.',
        createdBy: 2,
      }
    )
  }
}