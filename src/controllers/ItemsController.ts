import { Request, Response, NextFunction } from 'express'
import ItemService from '@services/ItemService'
import MaterialService from '@services/MaterialService'

class ItemsController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const items = await ItemService.getList(
        req.body.userIds, req.query, req.params.order
      )
      return res.json(items)
    } catch (error) {
      next(error)
    }
  }

  public async importItem (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const _item = await ItemService.importItem(req.params.order, req.body.item)
      await MaterialService.importMaterials(req.body.item, _item.id)
      res.json(_item)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const item = await ItemService.create(req.body, req.params.order)
      res.json(item)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const item = await ItemService.update(req.params.id, req.body)
      res.json(item)
    } catch (error) {
      next(error)
    }
  }

  public async updateMaterials (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const item = await ItemService.updateMaterials(req.params.id, req.body.value)
      res.json(item)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ItemService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ItemService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new ItemsController()
