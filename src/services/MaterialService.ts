import Material from '@models/Material'
import { TQuery, TId, MaterialInterface } from '../types'

interface UpadateInterface extends MaterialInterface {
  userIds: TId[]
}

class MaterialService {
  public getList = async (userIds: TId[], query: TQuery, itemId: TId) => {
    if (!query.sort) query.sort = '-createdAt'

    type TFind = {
      user: { $in: TId[] }
      item: TId
      title?: RegExp
    }

    const find: TFind = {
      user: { $in: userIds },
      item: itemId
    }

    if (query.search) {
      find.title = new RegExp(query.search)
    }

    const materials = await Material.find(find)
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'product'
      ])
      .sort(query.sort)

    return {
      data: materials
    }
  }

  public importMaterials = async (itemFrom: TId, itemTo: TId) => {
    const materialsToImport = await Material.find({ item: itemFrom })
    materialsToImport.forEach(async material => {
      const data = { ...material._doc, item: itemTo }
      delete data._id
      const _material = new Material(data)
      await _material.save()
    })
    return true
  }

  public create = async (params: MaterialInterface, itemId: TId) => {
    const material = new Material(params)
    material.item = itemId
    await material.save()
    const _material = await Material
      .findOne({ _id: material.id })
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'product'
      ])
    return _material
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Material.findOneAndUpdate(filter, body)
    const material = await Material.findOne(filter)
      .populate([
        {
          path: 'user',
          populate: { path: 'tenant' }
        },
        'product'
      ])
    return material
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Material.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Material.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }
}

export default new MaterialService()
