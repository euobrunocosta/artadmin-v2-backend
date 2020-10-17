import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '@models/User'
import { TQuery, TId, UserInterface } from '../types'

interface UpadateInterface extends UserInterface {
  userIds: TId[]
}

class UserService {
  public authenticate = async (email: string, password: string) => {
    const user = await User.findOne({ email }).populate('tenant')
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

      return {
        ...user.toJSON(),
        token
      }
    }
  }

  public getList = async (
    userIds: TId[], query: TQuery, isTenantMaster: boolean
  ) => {
    if (!query.limit) query.limit = 7
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user?: { $in: TId[] }
      name?: RegExp
      enabled?: boolean
    }

    const find: TFind = {}

    if (!isTenantMaster) {
      find.user = { $in: userIds }
    }

    if (query.search) {
      find.name = new RegExp(query.search)
    }

    if (typeof query.enabled !== 'undefined') {
      find.enabled = query.enabled
    }

    const users = await User.find(find)
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'tenant'
      ])
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = users.length > _limit
    if (nextPage) users.pop()

    return {
      data: users,
      nextPage
    }
  }

  public create = async (params: UserInterface) => {
    const user = new User(params)
    await user.save()
    const _user = await User
      .findOne({ _id: user.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _user
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await User.findOneAndUpdate(filter, body)
    const user = await User.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return user
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await User.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await User.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }

  public toggleEnabled = async (id: TId, body: UpadateInterface) => {
    await User.findOneAndUpdate(
      { _id: id, user: { $in: body.userIds } },
      { enabled: body.enabled }
    )
    return { enabled: body.enabled }
  }
}

export default new UserService()
