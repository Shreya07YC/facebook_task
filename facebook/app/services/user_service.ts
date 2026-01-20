import User from "#models/user"

export class UserService {
  // Your code here
  public async findAll(){
    const user= await User.query().orderBy('id','asc')
    return user
  }
  public async findOne(id:number){
      const user = await User.find(id)
      if(!user){
        throw new Error("User not found")
      }
      return user
  }
    public async create(payload: { name: string; email: string; password: string }) {
      const user = await User.create(payload)
      return user
  }
    public async update(id: number, payload: { name?: string; email?: string; password?: string }) {
      const user = await User.find(id)
      // console.log("inside service")
      // console.log(user)
      if (!user) {
        throw new Error('User not found')
      }
      user.merge(payload)
      await user.save()
      return user
}
    public async delete(id: number) {
      const user = await User.find(id)
      if (!user) {
        throw new Error('User not found')
      }
      await user.delete()
      return user
  }
}
