import Payment from '@models/Payment'
import { TQuery, TId, PaymentInterface } from '../types'

interface UpadateInterface extends PaymentInterface {
  userIds: TId[]
}

class PaymentService {
  public getList = async (userIds: TId[], query: TQuery, orderId: TId) => {
    if (!query.limit) query.limit = 7
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user: { $in: TId[] }
      order: TId
      description?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds },
      order: orderId
    }

    if (query.search) {
      find.description = new RegExp(query.search)
    }

    const payments = await Payment.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = payments.length > _limit
    if (nextPage) payments.pop()

    return {
      data: payments,
      nextPage
    }
  }

  public create = async (params: PaymentInterface, orderId: TId) => {
    const payment = new Payment(params)
    payment.order = orderId
    await payment.save()
    const _payment = await Payment
      .findOne({ _id: payment.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _payment
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Payment.findOneAndUpdate(filter, body)
    const payment = await Payment.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return payment
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Payment.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Payment.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new PaymentService()
