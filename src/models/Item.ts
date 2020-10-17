import {
  Schema, model, Types
} from 'mongoose'
import { ItemInterface } from '../types'
import User from '@models/User'
import Order from '@models/Order'

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  materials: {
    type: Number,
    default: 0
  },
  labor: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 0
  },
  order: {
    type: Types.ObjectId,
    ref: Order,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true
  }
},
{
  timestamps: true
})

export default model<ItemInterface>('Item', ItemSchema)
