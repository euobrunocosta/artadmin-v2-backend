import Item from '@models/Item'
import { TQuery, TId, ItemInterface } from '../types'

interface UpadateInterface extends ItemInterface {
  userIds: TId[]
}

class ItemService {
  public getList = async (userIds: TId[], query: TQuery, orderId: TId) => {
    if (!query.sort) query.sort = '-createdAt'

    type TFind = {
      user: { $in: TId[] }
      order: TId
      title?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds },
      order: orderId
    }

    if (query.search) {
      find.title = new RegExp(query.search)
    }

    const item = await Item.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)

    return {
      data: item
    }
  }

  public importItem = async (order: TId, item: TId) => {
    const itemToImport = await Item.findOne({ _id: item })
    const data = {
      ...itemToImport._doc,
      order
    }
    delete data._id
    const _item = new Item(data)
    await _item.save()
    return await Item.findOne({ _id: _item._id })
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
  }

  public create = async (params: ItemInterface, orderId: TId) => {
    const item = new Item(params)
    item.order = orderId
    await item.save()
    const _item = await Item
      .findOne({ _id: item.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _item
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Item.findOneAndUpdate(filter, body)
    const item = await Item.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return item
  }

  public updateMaterials = async (id: TId, value: number) => {
    const filter = { _id: id }
    await Item.findOneAndUpdate(filter, { materials: value })
    const item = await Item.findOne(filter)
    return item
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Item.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Item.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new ItemService()
