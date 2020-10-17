import { Request, Response, NextFunction } from 'express'
import ProductService from '@services/ProductService'

class ProductsController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const products = await ProductService.getList(
        req.body.userIds, req.query
      )
      return res.json(products)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const product = await ProductService.create(req.body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const product = await ProductService.update(req.params.id, req.body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  public async toggleEnabled (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const product = await ProductService.toggleEnabled(req.params.id, req.body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ProductService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ProductService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductsController()
