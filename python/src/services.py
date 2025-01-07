import json
from src.lib import REDIS_CLIENT
import pandas as pd


class Service:
    def __init__(self):
        pass
    
    async def read_pd_from_redis(self, token: str, since: int, limit: int, timeframe: str):
        # filter data
        key = f"token:trade:{token}"
        print(key)
        trades = await REDIS_CLIENT.redis.lrange(key, 0, -1)
        df = pd.DataFrame([json.loads(trade) for trade in trades])
        df = df.loc[df.index > since]
        print(df.head())
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
        df.set_index('timestamp', inplace=True)

        df['current_price'] = df['vSolInBondingCurve'] / df['vTokensInBondingCurve']
        df['trade_price'] = df['solAmount'] / df['tokenAmount']
        # if buy 0.1 now, what the avg price will be
        # x: sol, y: token
        # y - [(x * y) / (x + 0.1)]
        df['future_buy_token'] = df['vTokensInBondingCurve'] - ((df['vSolInBondingCurve'] * df['vTokensInBondingCurve']) / (df['vSolInBondingCurve'] + 0.1))
        df['future_buy_price'] = 0.1 / df['future_buy_token']
        # [(x * y) / (x - 0.12)] - y
        df['future_sell_token'] = ((df['vSolInBondingCurve'] * df['vTokensInBondingCurve']) / (df['vSolInBondingCurve'] - 0.12)) - df['vTokensInBondingCurve']
        df['future_sell_price'] = 0.12 / df['future_sell_token']

        df['sell_volume'] = df.apply(lambda x: 0 if x['txType'] == 'buy' else x['solAmount'], axis=1)
        df['buy_volume'] = df.apply(lambda x: x['solAmount'] if x['txType'] == 'buy' else 0, axis=1)
        df['total_volume'] = df['solAmount'].sum()

        # convert data
        df['quote_amount'] = df['total_volume']
        # token sol 计价
        df['price_quote'] = df['current_price']
        df.sort_index(inplace=True)

        # prepare kline data
        klineDf = df.groupby(['timestamp']).agg({'price_quote': 'mean', 'quote_amount': 'sum'}).reset_index()

        price_klineDf = klineDf.loc[:, ['timestamp', 'price_quote']]
        # Ensure the DataFrame has a continuous time series with 5-minute intervals
        price_klineDf.set_index('timestamp', inplace=True)
        price_klineDf = price_klineDf.resample(timeframe).ffill()
        # Replace near-zero values with the last existing price
        price_klineDf['price_quote'] = price_klineDf['price_quote'].mask(price_klineDf['price_quote'] <= 1e-010, price_klineDf['price_quote'].shift())

        amount_klineDf = klineDf.loc[:, ['timestamp', 'quote_amount']]
        amount_klineDf.set_index('timestamp', inplace=True)
        amount_klineDf = amount_klineDf.resample(timeframe).sum()
        amount_klineDf['quote_amount'] = amount_klineDf['quote_amount'].fillna(0)

        klineDf_resampled = price_klineDf.join(amount_klineDf, how='outer')

        # generate kline
        ohlc = klineDf_resampled['price_quote'].resample(timeframe).ohlc()
        volume = klineDf_resampled['quote_amount'].resample(timeframe).sum()

        # Remove rows with NaN values
        ohlc.dropna(inplace=True)
        volume.dropna(inplace=True)

        # Create a new DataFrame for mplfinance
        ohlc['volume'] = volume

        ohlc = ohlc.iloc[:limit]
        return ohlc
