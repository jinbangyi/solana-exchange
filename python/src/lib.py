import aioredis
from src.settings import SETTINGS


class RedisClient:
    def __init__(self):
        self.redis = aioredis.from_url(str(SETTINGS.redis_dsn))

    async def connect(self):
        self.redis = await aioredis.create_redis_pool(self.redis_url)

    async def close(self):
        await self.redis.close()


REDIS_CLIENT = RedisClient()
