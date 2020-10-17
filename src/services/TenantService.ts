import Tenant from '@models/Tenant'
import { TQuery, TId, TenantInterface } from '../types'

interface UpadateInterface extends TenantInterface {
  userIds: TId[]
}

class TenantService {
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

    const tenants = await Tenant.find(find)
      .populate({
        path: 'user',
        populate: { path: 'tenant' }
      })
      .sort(query.sort)
      .skip(Number(query.offset))
      .limit(Number(query.limit))
    const nextPage = tenants.length > _limit
    if (nextPage) tenants.pop()

    return {
      data: tenants,
      nextPage
    }
  }

  public create = async (params: TenantInterface) => {
    const tenant = new Tenant(params)
    await tenant.save()
    const _tenant = await Tenant
      .findOne({ _id: tenant.id })
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return _tenant
  }

  public update = async (id: TId, body: UpadateInterface) => {
    const filter = { _id: id, user: { $in: body.userIds } }
    await Tenant.findOneAndUpdate(filter, body)
    const tenant = await Tenant.findOne(filter)
      .populate({ path: 'user', populate: { path: 'tenant' } })
    return tenant
  }

  public delete = async (id: TId, userIds: TId[]) => {
    await Tenant.deleteOne({ _id: id, user: { $in: userIds } })
  }

  public deleteMany = async (ids: TId[], userIds: TId[]) => {
    await Tenant.deleteMany({ _id: { $in: ids }, user: { $in: userIds } })
  }

  public toggleEnabled = async (id: TId, body: UpadateInterface) => {
    await Tenant.findOneAndUpdate(
      { _id: id, user: { $in: body.userIds } },
      { enabled: body.enabled }
    )
    return { enabled: body.enabled }
  }
}

export default new TenantService()
