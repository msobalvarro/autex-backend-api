import 'dotenv'
import crypto from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import { ReqHeaderAuthPropierties } from 'interfaces'

const SECRET_KEY: string = process.env.SECRET_KEY || ''

console.log('secret key:', SECRET_KEY)

export const createHash = (data: string): string => crypto.createHash('sha256').update(data).digest('hex')

export const verifyToken = (jwt: string) => verify(jwt, SECRET_KEY)

export const generateToken = (props: ReqHeaderAuthPropierties) => sign(props, SECRET_KEY, { expiresIn: '24h' })