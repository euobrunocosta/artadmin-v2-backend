import Baby from '@models/Baby'
import { TQuery, TId, BabyInterface } from '../types'

interface UpadateInterface extends BabyInterface {
  userIds: TId[]
}

class BabyService {
  public getList = async (userIds: TId[], query: TQuery, clientId: TId) => {
    if (!query.limit) query.limit = 7
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user: { $in: TId[] }
      client: TId
      name?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds },
      client: clientId
    }

    if (query.search) {
      find.name = new RegExp(query.search)
    }

    const babies = await Baby.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = babies.length > _limit
    if (nextPage) babies.pop()

    return {
      data: babies,
      nextPage
    }
  }

  public create = async (params: BabyInterface, clientId: TId) => {
    const baby = new Baby(params)
    baby.client = clientId
    await baby.save()
    const _baby = await Baby
      .findOne({ _id: baby.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _baby
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Baby.findOneAndUpdate(filter, body)
    const baby = await Baby.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return baby
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Baby.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Baby.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new BabyService()
