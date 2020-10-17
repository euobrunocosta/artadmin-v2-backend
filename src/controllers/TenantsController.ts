import { Request, Response, NextFunction } from 'express'
import TenantService from '@services/TenantService'

class TenantsController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const tenants = await TenantService.getList(
        req.body.userIds, req.query, req.body.isMasterTenant
      )
      return res.json(tenants)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const tenant = await TenantService.create(req.body)
      res.json(tenant)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const tenant = await TenantService.update(req.params.id, req.body)
      res.json(tenant)
    } catch (error) {
      next(error)
    }
  }

  public async toggleEnabled (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const tenant = await TenantService.toggleEnabled(req.params.id, req.body)
      res.json(tenant)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await TenantService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await TenantService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new TenantsController()
