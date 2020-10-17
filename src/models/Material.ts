import {
  Schema, model, Types
} from 'mongoose'
import { MaterialInterface } from '../types'
import User from '@models/User'
import Item from '@models/Item'
import Product from '@models/Product'

const MaterialSchema = new Schema({
  title: {
    type: String
  },
  measurementQuantity: {
    type: Number,
    required: true
  },
  width: {
    type: Number
  },
  waste: {
    type: Number
  },
  product: {
    type: Types.ObjectId,
    ref: Product,
    required: true
  },
  item: {
    type: Types.ObjectId,
    ref: Item,
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

export default model<MaterialInterface>('Material', MaterialSchema)
