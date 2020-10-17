import Order from '@models/Order'
import { TQuery, TId, OrderInterface } from '../types'

interface UpadateInterface extends OrderInterface {
  userIds: TId[]
}

class OrderService {
  public getList = async (userIds: TId[], query: TQuery) => {
    if (!query.limit) query.limit = 7
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user: { $in: TId[] }
      title?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds }
    }

    if (query.search) {
      find.title = new RegExp(query.search)
    }

    const orders = await Order.find(find)
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'client',
        'baby'
      ])
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = orders.length > _limit
    if (nextPage) orders.pop()

    return {
      data: orders,
      nextPage
    }
  }

  public create = async (params: OrderInterface) => {
    const order = new Order(params)
    await order.save()
    const _order = await Order
      .findOne({ _id: order.id })
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'client',
        'baby'
      ])
    return _order
  }

  public getById = async (id: TId, userIds: TId[]) => {
    const order = await Order
      .findOne({ _id: id, user: { $in: userIds } })
      .populate([{ path: 'user', populate: { path: 'tenant' } }, 'client', 'baby'])
    return order
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Order.findOneAndUpdate(filter, body)
    const order = await Order.findOne(filter)
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'client',
        'baby'
      ])
    return order
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Order.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Order.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new OrderService()
