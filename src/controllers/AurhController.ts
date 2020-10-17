import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '@models/User'

class AuthController {
  public index (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> | void {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ error: 'Token not provided' })
    }

    const authArray = authHeader.split(' ')

    if (authArray.length !== 2) {
      return res.status(401).send({ error: 'Invalid token' })
    }

    const [scheme, token] = authArray

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Invalid token' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded: any) => {
      if (error) {
        return res.status(401).send({ error: 'Invalid token' })
      }

      req.body.user = decoded.id

      const user = await User.findOne({ _id: decoded.id }).populate('tenant')

      const tenant = (user.tenant.isMaster && req.params.tenant)
        ? req.params.tenant
        : user.tenant._id

      req.body.userIds = (
        await User
          .find({ tenant })
          .select({ _id: 1 })
      ).map(user => user._id)

      req.body.isMasterTenant = user.tenant.isMaster
      req.body.isMasterUser = user.isMaster

      return next()
    })
  }

  public userMasterCheck (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> | void {
    if (!req.body.isMasterUser) {
      return res.status(401).send({ error: 'You have no permission to access this service' })
    }
    return next()
  }

  public tenantMasterCheck (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> | void {
    if (!req.body.isMasterTenant) {
      return res.status(401).send({ error: 'You have no permission to access this service' })
    }
    return next()
  }
}

export default new AuthController()
