// lib/redis.js
import { createClient } from 'redis';

let redisClient;

if (!redisClient) {
  redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.connect();
}

export default redisClient;
