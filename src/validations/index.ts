import { z } from 'zod'

export const schemaCreateUser = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string({
    required_error: 'Password is required'
  }),
})
