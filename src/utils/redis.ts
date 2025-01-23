import { createClient } from 'redis'

export const redisClient = createClient()

export const getRedisValue = async <T = never>(key: string): Promise<T> => {
  const reply = await redisClient.get(key)
  return JSON.parse(String(reply))
}
