import Client from '@models/Client'
import { TQuery, TId, ClientInterface } from '../types'

interface UpadateInterface extends ClientInterface {
  userIds: TId[]
}

class ClientService {
  public getList = async (userIds: TId[], query: TQuery) => {
    if (!query.limit) query.limit = 7
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user: { $in: TId[] }
      name?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds }
    }

    if (query.search) {
      find.name = new RegExp(query.search)
    }

    const clients = await Client.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = clients.length > _limit
    if (nextPage) clients.pop()

    return {
      data: clients,
      nextPage
    }
  }

  public create = async (params: ClientInterface) => {
    const product = new Client(params)
    await product.save()
    const _product = await Client
      .findOne({ _id: product.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _product
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Client.findOneAndUpdate(filter, body)
    const product = await Client.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return product
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Client.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Client.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new ClientService()
