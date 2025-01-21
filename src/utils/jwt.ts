import 'dotenv'
import crypto from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import { ReqHeaderAuthPropierties } from 'interfaces'
import { SECRET_KEY as Key } from './enviroments'

const SECRET_KEY: string = (Key || '').replace('s', "$")

export const createHash = (data: string): string => crypto.createHash('sha256').update(data).digest('hex')

export const verifyToken = (jwt: string) => verify(jwt, SECRET_KEY)

export const generateToken = (props: ReqHeaderAuthPropierties) => sign(props, SECRET_KEY, { expiresIn: '24h' })