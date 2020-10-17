import { Request, Response, NextFunction } from 'express'
import MaterialService from '@services/MaterialService'

class MaterialsController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const materials = await MaterialService.getList(
        req.body.userIds, req.query, req.params.item
      )
      return res.json(materials)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const material = await MaterialService.create(req.body, req.params.item)
      res.json(material)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const material = await MaterialService.update(req.params.id, req.body)
      res.json(material)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await MaterialService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await MaterialService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new MaterialsController()
