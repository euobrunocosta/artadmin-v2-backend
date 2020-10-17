import {
  Schema, model, Types
} from 'mongoose'
import { ProductInterface } from '../types'
import User from '@models/User'

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  boughtBy: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  width: {
    type: Number
  },
  enabled: {
    type: Boolean,
    default: true
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

export default model<ProductInterface>('Product', ProductSchema)
