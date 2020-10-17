import {
  Schema, model, Types
} from 'mongoose'
import { PaymentInterface } from '../types'
import User from '@models/User'
import Order from '@models/Order'

const PaymentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  value: {
    type: Number,
    required: true
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

export default model<PaymentInterface>('Payment', PaymentSchema)
