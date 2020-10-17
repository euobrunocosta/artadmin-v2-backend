import {
  Schema, model, Types
} from 'mongoose'
import { TenantInterface } from '../types'

const TenantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  namespace: {
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
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
})

export default model<TenantInterface>('Tenant', TenantSchema)
