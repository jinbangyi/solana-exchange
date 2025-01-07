from typing import Any, Callable, Set

from pydantic import (
    AliasChoices,
    AmqpDsn,
    BaseModel,
    Field,
    ImportString,
    PostgresDsn,
    RedisDsn,
)
from loguru import logger
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    redis_dsn: RedisDsn = Field(
        "redis://localhost:6379/0",
    )


SETTINGS = Settings()
logger.debug(SETTINGS.model_dump())
# print(Settings().model_dump())
# """
# {
#     'auth_key': 'xxx',
#     'api_key': 'xxx',
#     'redis_dsn': Url('redis://user:pass@localhost:6379/1'),
#     'pg_dsn': MultiHostUrl('postgres://user:pass@localhost:5432/foobar'),
#     'amqp_dsn': Url('amqp://user:pass@localhost:5672/'),
#     'special_function': math.cos,
#     'domains': set(),
#     'more_settings': {'foo': 'bar', 'apple': 1},
# }
# """
