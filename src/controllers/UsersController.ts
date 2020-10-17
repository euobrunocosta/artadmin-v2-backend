import { Request, Response, NextFunction } from 'express'
import UserService from '@services/UserService'

class UsersController {
  public async authenticate (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await UserService.authenticate(req.body.email, req.body.password)
      if (user) {
        res.json(user)
      } else {
        res.status(400).json({ message: 'Email or password is incorrect' })
      }
    } catch (error) {
      next(error)
    }
  }

  public async index (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = await UserService.getList(
        req.body.userIds, req.query, req.body.isMasterUser
      )
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }

  public async create (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await UserService.create(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  public async update (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await UserService.update(req.params.id, req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  public async toggleEnabled (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await UserService.toggleEnabled(req.params.id, req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  public async delete (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await UserService.delete(req.params.id, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }

  public async deleteMany (
    req: Request, res: Response, next: NextFunction
  ): Promise<Response | void> {
    try {
      await UserService.deleteMany(req.body.ids, req.body.userIds)
      res.json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new UsersController()
