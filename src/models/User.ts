import {
  Schema, model, Types
} from 'mongoose'
import { UserInterface } from '../types'
import Tenant from '@models/Tenant'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isMaster: {
    type: Boolean,
    default: false
  },
  enabled: {
    type: Boolean,
    default: true
  },
  tenant: {
    type: Types.ObjectId,
    ref: Tenant,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
})

export default model<UserInterface>('User', UserSchema)
