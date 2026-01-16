import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.firstOrCreate(
      { email: 'shreya@gmail.com' },
      { name: 'Shreya Chouhan',
         email: 'shreya@gmail.com', 
         password: 'shreya123' }
    )

    await User.firstOrCreate(
      { email:'khushi@gmail.com'},
      { name:'Khushi Jaiswal',
        email:'khushi@gmail.com',
        password:'khushi123' }
    )

    await User.firstOrCreate(
      { email:'rudresh@gmail.com'},
      {name:'Rudresh Dixit',
        email:'rudersh@gmail.com',
        password:'rudresh123'}
    )

    await User.firstOrCreate(
      { email:'sumit@gmail.com'},
      {name:'Sumit bro',
        email:'sumit@gmail.com',
        password:'sumit123'
      }
    )
    await User.firstOrCreate(
      { email:'hariom@gmail.com'},
      {name:'Hariom bro',
        email:'hariom@gmail.com',
        password:'hariom123'
      }
    )

    await User.firstOrCreate(
      {email:'anil@gmail.com'},
      {name:'Anil Patidar',
        email:'anil@gmail.com',
        password:'anil123'
      }
    )
  }
}