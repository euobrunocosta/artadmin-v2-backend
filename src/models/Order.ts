import {
  Schema, model, Types
} from 'mongoose'
import User from '@models/User'
import Client from '@models/Client'
import Baby from '@models/Baby'
import { OrderInterface } from '../types'

const OrderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: Types.ObjectId,
    ref: Client,
    required: true
  },
  baby: {
    type: Types.ObjectId,
    ref: Baby
  },
  deadline: {
    type: Date
  },
  status: {
    type: Number,
    default: '0'
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

export default model<OrderInterface>('Order', OrderSchema)
