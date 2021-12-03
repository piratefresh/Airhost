import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

const options: Redis.RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

export const pubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
