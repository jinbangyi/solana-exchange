from typing import Optional
from pydantic import BaseModel
import time


class MsgPayload(BaseModel):
    msg_id: Optional[int]
    msg_name: str

class FetchOHLCVDto(BaseModel):
    # xx/SOL
    symbol: str = ''
    # 1m, 5m, 15m, 30m, 1h, 4h, 1d, 1w
    timeframe: str = "10s"
    since: int = int(time.time()) - 86400
    limit: int = 8640
