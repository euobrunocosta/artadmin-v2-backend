import Product from '@models/Product'
import { TQuery, TId, ProductInterface } from '../types'

interface UpadateInterface extends ProductInterface {
  userIds: TId[]
}

class ProductService {
  public getList = async (userIds: TId[], query: TQuery) => {
    if (!query.offset) query.offset = 0
    if (!query.sort) query.sort = '-createdAt'

    const _limit = query.limit
    query.limit++

    type TFind = {
      user: { $in: TId[] }
      title?: RegExp
      enabled?: boolean
    }

    const find: TFind = {
      user: { $in: userIds }
    }

    if (query.search) {
      find.title = new RegExp(query.search)
    }

    if (typeof query.enabled !== 'undefined') {
      find.enabled = query.enabled
    }

    const products = await Product.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = products.length > _limit
    if (nextPage) products.pop()

    return {
      data: products,
      nextPage
    }
  }

  public create = async (params: ProductInterface) => {
    const product = new Product(params)
    await product.save()
    const _product = await Product
      .findOne({ _id: product.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _product
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Product.findOneAndUpdate(filter, body)
    const product = await Product.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return product
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Product.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Product.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }

  public toggleEnabled = async (id: TId, body: UpadateInterface) => {
    await Product.findOneAndUpdate(
      { _id: id, user: { $in: body.userIds } },
      { enabled: body.enabled }
    )
    return { enabled: body.enabled }
  }
}

export default new ProductService()
