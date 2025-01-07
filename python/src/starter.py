from typing import Annotated
import uvicorn
from fastapi import FastAPI, Query

from src.lib import REDIS_CLIENT
from src.models import MsgPayload, FetchOHLCVDto
from src.services import Service

app = FastAPI(
    title="solana exchange python api",
    servers=[
        {
            "url": "http://localhost:8080/",
            "description": "Local server",
        },
    ],
    version="v0.0.1",
    description="for internal",
)

services = Service()


@app.get("/api/v1/market/ohlcv")
async def ohlcv(query: Annotated[FetchOHLCVDto, Query()]):
    token = query.symbol.split("/")[0]

    pd = await services.read_pd_from_redis(token, 0, 8640, '10s')
    '''
                                 open          high           low         close    volume
timestamp                                                                            
2025-01-05 04:43:10  3.025754e-08  3.025754e-08  3.025754e-08  3.025754e-08  1.418637
2025-01-05 04:43:20  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:43:30  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:43:40  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:43:50  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:44:00  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:44:10  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:44:20  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  0.000000
2025-01-05 04:44:30  2.985399e-08  2.985399e-08  2.985399e-08  2.985399e-08  1.418637
    '''
    # convert the table to [[timestamp, open, high, low, close, volume]], the timestamp shoud be an int in seconds
    pd = pd.reset_index()
    pd['timestamp'] = pd['timestamp'].astype(int) / pow(1000, 3)
    res = pd.values.tolist()
    print(pd)
    return res
