import { Types, Document } from 'mongoose'

export type TQuery = {
  limit?: number
  offset?: number
  sort?: string
  search?: string
  enabled?: boolean
}

export type TId = string

export interface TenantInterface extends Document {
  nome: string
  namespace: string
  isMaster: boolean
  enabled: boolean
  user: Types.ObjectId
}

export interface UserInterface extends Document {
  nome: string
  email: string
  password: string
  isMaster: boolean
  enabled: boolean
  tenant: TenantInterface
  user: Types.ObjectId
}

export interface ProductInterface extends Document {
  title: string
  boughtBy: string
  price: number
  width?: number
  enabled: boolean
  user: Types.ObjectId
}

export interface ClientInterface extends Document {
  name: string
  city: string
  state: string
  referral: string
  user: Types.ObjectId
}

export interface BabyInterface extends Document {
  name: string
  gender: string
  birthday: Date
  client: TId
  user: Types.ObjectId
}

export interface OrderInterface extends Document {
  title: string
  client: TId
  baby: TId
  deadline: Date
  status: number
  user: Types.ObjectId
}

export interface PaymentInterface extends Document {
  date: Date
  desciption: string
  value: number
  order: TId
  user: Types.ObjectId
}

export interface ItemInterface extends Document {
  _doc?: any
  title: string
  desciption: string
  materials: number
  labor: number
  quantity: number
  price: number
  order: TId
  user: Types.ObjectId
}

export interface MaterialInterface extends Document {
  _doc?: any
  title: string
  measurementQuantity: number
  width: number
  waste: number
  product: TId
  item: TId
  user: Types.ObjectId
}
