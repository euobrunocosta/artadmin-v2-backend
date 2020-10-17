import {
  Schema, model, Types
} from 'mongoose'
import User from '@models/User'
import { ClientInterface } from '../types'

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  referral: {
    type: String
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

export default model<ClientInterface>('Client', ClientSchema)
