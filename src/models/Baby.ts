import {
  Schema, model, Types
} from 'mongoose'
import { BabyInterface } from '../types'
import User from '@models/User'
import Client from '@models/Client'

const BabySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  birthday: {
    type: Date
  },
  client: {
    type: Types.ObjectId,
    ref: Client,
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

export default model<BabyInterface>('Baby', BabySchema)
