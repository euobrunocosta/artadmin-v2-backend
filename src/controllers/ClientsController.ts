import { Request, Response, NextFunction } from 'express'
import ClientService from '@services/ClientService'

class ClientsController {
  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const clients = await ClientService.getList(
        req.body.userIds, req.query
      )
      return res.json(clients)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const client = await ClientService.create(req.body)
      res.json(client)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const client = await ClientService.update(req.params.id, req.body)
      res.json(client)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ClientService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await ClientService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new ClientsController()
