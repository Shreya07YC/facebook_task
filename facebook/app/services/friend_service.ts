import Friend from "#models/friend"

export class FriendService {
  // Your code here
  public async findAll() {
    const friends = await Friend.query().orderBy('id', 'asc')
    return friends
  }
  public async findOne(id: number) {
    const friend = await Friend.find(id)
    if (!friend) {
      throw new Error('Friend not found')
    }
    return friend
  }
  public async create(payload: {
    name: string
    email: string
    age: number
    phone: string
  }) {
    const friend = await Friend.create(payload)
    return friend
  }
  public async update(
    id: number,
    payload: { name?: string; email?: string; age?: number; phone?: string }
  ) {
    const friend = await Friend.find(id)
    if (!friend) {
      throw new Error('Friend not found')
    }
    friend.merge(payload)
    await friend.save()
    return friend
  }
  public async delete(id: number) {
    const friend = await Friend.find(id)
    if (!friend) {
      throw new Error('Friend not found')
    }
    await friend.delete()
    return friend
  }
}