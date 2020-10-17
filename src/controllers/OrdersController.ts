import { Request, Response, NextFunction } from 'express'
import OrderService from '@services/OrderService'

class OrdersController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const orders = await OrderService.getList(
        req.body.userIds, req.query
      )
      return res.json(orders)
    } catch (error) {
      next(error)
    }
  }

  public async getById (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const order = await OrderService.getById(req.params.id, req.body.userIds)
      if (order) { res.json(order) } else { res.sendStatus(404) }
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const order = await OrderService.create(req.body)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const order = await OrderService.update(req.params.id, req.body)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await OrderService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await OrderService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new OrdersController()
